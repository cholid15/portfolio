<?php
// ==========================================
// ✅ testimony_get.php — ambil data testimoni
// ==========================================

// -------------------------
// CORS & Header
// -------------------------
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    http_response_code(200);
    exit;
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// -------------------------
// Logging util
// -------------------------
$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    mkdir($logDir, 0777, true);
}
$logFile = $logDir . '/testimony_' . date('Y-m-d') . '.log';
function logMessage($msg)
{
    global $logFile;
    $time = date('[Y-m-d H:i:s] ');
    file_put_contents($logFile, $time . $msg . PHP_EOL, FILE_APPEND);
}

// -------------------------
// Load .env (manual mode, no Dotenv)
// -------------------------
$envPath = dirname(__DIR__) . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        [$name, $value] = array_map('trim', explode('=', $line, 2));
        $value = trim($value, "\"'");
        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }
}

// -------------------------
// Database Config
// -------------------------
$dbHost = $_ENV['DB_HOST'] ?? 'localhost';
$dbUser = $_ENV['DB_USER'] ?? 'root';
$dbPass = $_ENV['DB_PASS'] ?? '';
$dbName = $_ENV['DB_NAME'] ?? 'portfolio_db';

logMessage("Fetching testimonies... DB={$dbName}");

// -------------------------
// Koneksi ke Database
// -------------------------
$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
if ($conn->connect_error) {
    logMessage("❌ DB Connection failed: " . $conn->connect_error);
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// -------------------------
// Ambil data dari tabel
// -------------------------
$sql = "SELECT id, name, email, message, rating, created_at FROM testimonies ORDER BY id DESC";
$result = $conn->query($sql);

if (!$result) {
    logMessage("❌ SQL Error: " . $conn->error);
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Query failed"]);
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

logMessage("✅ Found " . count($rows) . " testimonies");

// -------------------------
// Output JSON
// -------------------------
echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
