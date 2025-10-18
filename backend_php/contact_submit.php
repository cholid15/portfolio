<?php
// =========================
// contact_submit.php (WITH INDONESIAN DATE FORMAT)
// =========================

// Prevent timeout
set_time_limit(60);
ini_set('max_execution_time', 60);

// =========================
// CORS CONFIG
// =========================
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
$allowed_origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost',
    'http://127.0.0.1'
];

header("Access-Control-Allow-Origin: " . (in_array($origin, $allowed_origins) ? $origin : '*'));
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json; charset=utf-8');

// =========================
// ERROR HANDLING
// =========================
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// =========================
// AUTOLOAD + LOGGER
// =========================
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Setup logging
$log_dir = __DIR__ . '/logs';
if (!file_exists($log_dir)) {
    @mkdir($log_dir, 0755, true);
}
$log_file = $log_dir . '/' . date('Y-m-d') . '.log';

function write_log($msg)
{
    global $log_file;
    $timestamp = date('[Y-m-d H:i:s]');
    @file_put_contents($log_file, "$timestamp $msg" . PHP_EOL, FILE_APPEND);
}

write_log("========== NEW REQUEST ==========");
write_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
write_log("Request URI: " . $_SERVER['REQUEST_URI']);

// =========================
// HELPER: Format Indonesian Date/Time
// =========================
function format_indonesian_datetime($datetime = null)
{
    // Set timezone to Indonesia (WIB)
    date_default_timezone_set('Asia/Jakarta');

    $timestamp = $datetime ? strtotime($datetime) : time();

    // Array hari dalam bahasa Indonesia
    $hari = [
        'Sunday' => 'Minggu',
        'Monday' => 'Senin',
        'Tuesday' => 'Selasa',
        'Wednesday' => 'Rabu',
        'Thursday' => 'Kamis',
        'Friday' => 'Jumat',
        'Saturday' => 'Sabtu'
    ];

    // Array bulan dalam bahasa Indonesia
    $bulan = [
        1 => 'Januari',
        2 => 'Februari',
        3 => 'Maret',
        4 => 'April',
        5 => 'Mei',
        6 => 'Juni',
        7 => 'Juli',
        8 => 'Agustus',
        9 => 'September',
        10 => 'Oktober',
        11 => 'November',
        12 => 'Desember'
    ];

    $day_name = $hari[date('l', $timestamp)];
    $day = date('d', $timestamp);
    $month = $bulan[(int)date('n', $timestamp)];
    $year = date('Y', $timestamp);
    $time = date('H:i', $timestamp);

    // Format: Senin, 18 Oktober 2025 - 14:30 WIB
    return "$day_name, $day $month $year - $time WIB";
}

// =========================
// HELPER: Load Template
// =========================
function load_template($file, $data)
{
    if (!file_exists($file)) {
        write_log("❌ Template not found: $file");
        return null;
    }

    $template = file_get_contents($file);
    write_log("✅ Template loaded: $file");

    // Replace placeholders
    foreach ($data as $key => $value) {
        $placeholder = "{{" . strtoupper($key) . "}}";
        $template = str_replace($placeholder, $value, $template);
    }

    return $template;
}

// =========================
// LOAD .env
// =========================
$possibleEnvPaths = [
    __DIR__,
    realpath(__DIR__ . '/..'),
];

$envLoaded = false;
foreach ($possibleEnvPaths as $path) {
    $envFile = $path . '/.env';
    if (file_exists($envFile)) {
        write_log("✅ Found .env at: $envFile");
        try {
            $dotenv = Dotenv::createImmutable($path);
            $dotenv->safeLoad();
            $envLoaded = true;
            write_log("✅ Dotenv loaded successfully");
            break;
        } catch (Exception $e) {
            write_log("❌ Dotenv load failed: " . $e->getMessage());
        }
    }
}

if (!$envLoaded) {
    write_log("⚠️ No .env file loaded");
}

// =========================
// CONFIG
// =========================
$host = $_ENV['DB_HOST'] ?? $_SERVER['DB_HOST'] ?? 'localhost';
$user = $_ENV['DB_USER'] ?? $_SERVER['DB_USER'] ?? 'root';
$pass = $_ENV['DB_PASS'] ?? $_SERVER['DB_PASS'] ?? '';
$dbname = $_ENV['DB_NAME'] ?? $_SERVER['DB_NAME'] ?? 'portfolio_db';
$telegram_token = $_ENV['TELEGRAM_BOT_TOKEN'] ?? $_SERVER['TELEGRAM_BOT_TOKEN'] ?? '';
$telegram_chat_id = $_ENV['TELEGRAM_CHAT_ID'] ?? $_SERVER['TELEGRAM_CHAT_ID'] ?? '';
$email_user = $_ENV['EMAIL_USER'] ?? $_SERVER['EMAIL_USER'] ?? '';
$email_pass = $_ENV['EMAIL_PASS'] ?? $_SERVER['EMAIL_PASS'] ?? '';

write_log("🔧 CONFIG CHECK:");
write_log("   DB_HOST=" . $host);
write_log("   TELEGRAM_BOT_TOKEN=" . ($telegram_token ? 'SET (***' . substr($telegram_token, -4) . ')' : 'NOT SET'));
write_log("   TELEGRAM_CHAT_ID=" . ($telegram_chat_id ?: 'NOT SET'));
write_log("   EMAIL_USER=" . ($email_user ?: 'NOT SET'));

// =========================
// DB CONNECTION
// =========================
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    write_log("❌ DB connection error: " . $conn->connect_error);
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit;
}
$conn->set_charset("utf8mb4");
write_log("✅ Database connected successfully");

// =========================
// READ JSON INPUT
// =========================
$raw = file_get_contents("php://input");
write_log("📥 Raw input: " . substr($raw, 0, 200));

$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    write_log("❌ JSON decode error: " . json_last_error_msg());
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON format"
    ]);
    exit;
}

if (!$data || !is_array($data)) {
    write_log("⚠️ Invalid data structure");
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid input data"
    ]);
    exit;
}

// =========================
// SANITIZE & VALIDATE INPUT
// =========================
$firstname = trim($data["firstname"] ?? '');
$lastname = trim($data["lastname"] ?? '');
$email = trim($data["email"] ?? '');
$phone = trim($data["phone"] ?? '');
$service = trim($data["service"] ?? '');
$message = trim($data["message"] ?? '');

// Basic validation
if (empty($firstname) || empty($lastname) || empty($email) || empty($service) || empty($message)) {
    write_log("⚠️ Missing required fields");
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit;
}

// Escape for database
$firstname_db = $conn->real_escape_string($firstname);
$lastname_db = $conn->real_escape_string($lastname);
$email_db = $conn->real_escape_string($email);
$phone_db = $conn->real_escape_string($phone);
$service_db = $conn->real_escape_string($service);
$message_db = $conn->real_escape_string($message);
$time = date("Y-m-d H:i:s");

write_log("📩 New message from: $firstname $lastname <$email>");

// =========================
// SAVE TO DB
// =========================
$sql = "INSERT INTO contacts (firstname, lastname, email, phone, service, message, created_at)
        VALUES ('$firstname_db', '$lastname_db', '$email_db', '$phone_db', '$service_db', '$message_db', '$time')";

if ($conn->query($sql)) {
    $insert_id = $conn->insert_id;
    write_log("💾 Data saved successfully (ID: $insert_id)");
} else {
    write_log("❌ DB Insert error: " . $conn->error);
    // Don't fail the entire request if DB fails
}

// =========================
// FORMAT INDONESIAN DATE
// =========================
$time_indonesian = format_indonesian_datetime($time);
write_log("🕐 Formatted time: $time_indonesian");

// =========================
// PREPARE DATA FOR TEMPLATES
// =========================
$template_data = [
    'firstname' => htmlspecialchars($firstname, ENT_QUOTES, 'UTF-8'),
    'lastname' => htmlspecialchars($lastname, ENT_QUOTES, 'UTF-8'),
    'email' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
    'phone' => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
    'service' => htmlspecialchars($service, ENT_QUOTES, 'UTF-8'),
    'message' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8'),
    'time' => $time_indonesian  // Indonesian formatted time
];

// =========================
// TELEGRAM SEND (FROM TEMPLATE)
// =========================
$telegram_sent = false;
if ($telegram_token && $telegram_chat_id) {
    $template_file = __DIR__ . '/templates/telegram_template.txt';
    write_log("📱 Attempting to send Telegram from template: $template_file");

    $telegram_text = load_template($template_file, $template_data);

    if ($telegram_text) {
        $telegram_url = "https://api.telegram.org/bot$telegram_token/sendMessage";

        $ch = curl_init($telegram_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'chat_id' => $telegram_chat_id,
            'parse_mode' => 'HTML',
            'text' => $telegram_text,
            'disable_web_page_preview' => true
        ]));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

        $result = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curl_error = curl_error($ch);
        curl_close($ch);

        if ($http_code == 200) {
            write_log("✅ Telegram message sent successfully");
            $telegram_sent = true;
        } else {
            write_log("❌ Telegram send failed. HTTP: $http_code | Error: $curl_error | Response: " . substr($result, 0, 200));
        }
    } else {
        write_log("❌ Failed to load Telegram template");
    }
} else {
    write_log("⚠️ Telegram not configured (Token or Chat ID missing)");
}

// =========================
// EMAIL SEND (FROM TEMPLATE)
// =========================
$email_sent = false;
if ($email_user && $email_pass) {
    $template_file = __DIR__ . '/templates/email_template.html';
    write_log("📧 Attempting to send Email from template: $template_file");

    $email_html = load_template($template_file, [
        'firstname' => htmlspecialchars($firstname, ENT_QUOTES, 'UTF-8'),
        'lastname' => htmlspecialchars($lastname, ENT_QUOTES, 'UTF-8'),
        'email' => htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
        'phone' => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
        'service' => htmlspecialchars($service, ENT_QUOTES, 'UTF-8'),
        'message' => nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')),
        'time' => $time_indonesian  // Indonesian formatted time
    ]);

    if ($email_html) {
        $mail = new PHPMailer(true);
        try {
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $email_user;
            $mail->Password = $email_pass;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->CharSet = 'UTF-8';
            $mail->Timeout = 15;

            // Recipients
            $mail->setFrom($email_user, 'Portfolio Contact Form');
            $mail->addAddress($email_user);
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $mail->addReplyTo($email, "$firstname $lastname");
            }

            // Content
            $mail->isHTML(true);
            $mail->Subject = "🎯 New Contact: $firstname $lastname";
            $mail->Body = $email_html;

            // Plain text version
            $mail->AltBody = "
NEW CONTACT MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
Name: $firstname $lastname
Email: $email
Phone: $phone

SERVICE REQUESTED
$service

MESSAGE
$message

━━━━━━━━━━━━━━━━━━━━━━━━
Received: $time_indonesian
Status: Saved to Database
            ";

            $mail->send();
            write_log("✅ Email sent successfully");
            $email_sent = true;
        } catch (Exception $e) {
            write_log("❌ Email send failed: " . $e->getMessage());
        }
    } else {
        write_log("❌ Failed to load Email template");
    }
} else {
    write_log("⚠️ Email not configured (Username or Password missing)");
}

// =========================
// RESPONSE
// =========================
write_log("✅ Request processing complete");
write_log("========================================");

$response = [
    "status" => "success",
    "message" => "Message received successfully",
    "notifications" => [
        "database" => true,
        "telegram" => $telegram_sent,
        "email" => $email_sent
    ]
];

http_response_code(200);
echo json_encode($response);

$conn->close();
exit;
