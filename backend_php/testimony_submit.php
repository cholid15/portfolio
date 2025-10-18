<?php
// ==============================================
// ✅ testimony_submit.php — versi final (global $_ENV + fallback $_SERVER)
// ==============================================

// ----------------------
// CORS & Headers
// ----------------------
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(200);
    exit;
}
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// ----------------------
// Logging Utility
// ----------------------
$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0777, true);
}
$logFile = $logDir . '/testimony_' . date('Y-m-d') . '.log';

function write_log($msg)
{
    global $logFile;
    $time = date('Y-m-d H:i:s');
    @file_put_contents($logFile, "[$time] $msg\n", FILE_APPEND);
}

function respond($code, $payload)
{
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

// ----------------------
// Load Composer & .env (defensive)
// ----------------------
$autoload = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoload)) {
    require_once $autoload;
    // write_log("vendor/autoload.php loaded.");
} else {
    // write_log("⚠️ vendor/autoload.php not found. Composer dependencies may be missing.");
}

// Jika Dotenv tersedia, muat .env
if (class_exists('\\Dotenv\\Dotenv')) {
    try {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
        $dotenv->safeLoad();
        // write_log(".env loaded successfully using Dotenv.");
    } catch (Exception $e) {
        // write_log("⚠️ Dotenv error: " . $e->getMessage());
    }
} else {
    // Jika tidak ada Dotenv, coba parse manual file .env di root
    $envPath = realpath(__DIR__ . '/../.env');
    if ($envPath && file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value, " \t\n\r\0\x0B\"'");
                $_ENV[$key] = $value;
                $_SERVER[$key] = $value;
            }
        }
        // write_log(".env parsed manually (Dotenv missing).");
    } else {
        // write_log("⚠️ .env file not found at expected path.");
    }
}

// ----------------------
// Ambil konfigurasi (utamakan $_ENV dan $_SERVER)
// ----------------------
function env_var($key, $default = '')
{
    if (!empty($_ENV[$key])) return $_ENV[$key];
    if (!empty($_SERVER[$key])) return $_SERVER[$key];
    return $default;
}

$DB_HOST = env_var('DB_HOST', 'localhost');
$DB_USER = env_var('DB_USER', 'root');
$DB_PASS = env_var('DB_PASS', '');
$DB_NAME = env_var('DB_NAME', 'portfolio_db');
$TELEGRAM_BOT_TOKEN = env_var('TELEGRAM_BOT_TOKEN', '');
$TELEGRAM_CHAT_ID   = env_var('TELEGRAM_CHAT_ID', '');

// write_log("DB config: host=$DB_HOST user=$DB_USER db=$DB_NAME");

// ----------------------
// Koneksi Database
// ----------------------
$conn = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    // write_log("❌ DB connection error: " . $conn->connect_error);
    respond(500, ['success' => false, 'message' => 'Database connection failed']);
}

// ----------------------
// Baca input JSON
// ----------------------
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    // write_log("❌ Invalid JSON payload: " . substr($raw, 0, 300));
    respond(400, ['success' => false, 'message' => 'Invalid JSON payload']);
}

$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$company = trim($input['company'] ?? '');
$rating  = intval($input['rating'] ?? 0);
$message = trim($input['message'] ?? '');

// ----------------------
// Validasi
// ----------------------
if ($name === '' || $email === '' || $message === '') {
    // write_log("❌ Missing fields: name='$name', email='$email', msg-len=" . strlen($message));
    respond(400, ['success' => false, 'message' => 'Please fill all required fields']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // write_log("❌ Invalid email: $email");   
    respond(400, ['success' => false, 'message' => 'Invalid email format']);
}

// ----------------------
// Simpan ke DB
// ----------------------
$stmt = $conn->prepare("INSERT INTO testimonies (name, email, company, rating, message) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    // write_log("❌ SQL prepare failed: " . $conn->error);
    respond(500, ['success' => false, 'message' => 'Server error (prepare failed)']);
}

$stmt->bind_param("sssis", $name, $email, $company, $rating, $message);
if (!$stmt->execute()) {
    // write_log("❌ SQL execute failed: " . $stmt->error);
    $stmt->close();
    respond(500, ['success' => false, 'message' => 'Failed to save testimony']);
}

$insertId = $conn->insert_id;
// write_log("✅ Inserted testimony id=$insertId name=$name email=$email rating=$rating");

// ----------------------
// Kirim Telegram
// ----------------------
if (!empty($TELEGRAM_BOT_TOKEN) && !empty($TELEGRAM_CHAT_ID)) {
    $telegramMessage = "🗣️ *New Testimony Received!*\n\n"
        . "👤 *Name:* $name\n"
        . "📧 *Email:* $email\n"
        . "🏢 *Company:* " . ($company ?: '-') . "\n"
        . "⭐ *Rating:* " . ($rating ?: '-') . "/5\n"
        . "💬 *Message:* $message\n";

    $ch = curl_init("https://api.telegram.org/bot{$TELEGRAM_BOT_TOKEN}/sendMessage");
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => [
            'chat_id' => $TELEGRAM_CHAT_ID,
            'text' => $telegramMessage,
            'parse_mode' => 'Markdown',
        ],
    ]);

    $response = curl_exec($ch);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($response === false || $curlErr) {
        // write_log("⚠️ Telegram send failed: $curlErr");
    } else {
        // write_log("📨 Telegram sent: " . substr($response, 0, 200));
    }
} else {
    // write_log("ℹ️ Telegram not configured — skipped send.");
}

// ----------------------
// Selesai
// ----------------------
respond(200, ['success' => true, 'message' => 'Testimony successfully submitted', 'id' => $insertId]);

$stmt->close();
$conn->close();
