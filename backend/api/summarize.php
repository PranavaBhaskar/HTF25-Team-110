<?php
require_once "cors.php";
require_once "../config.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$file = $data['file'] ?? '';

if (!$file) {
    echo json_encode(["status" => 0, "message" => "File not provided"]);
    exit;
}

$filepath = UPLOAD_DIR . $file;
if (!file_exists($filepath)) {
    echo json_encode(["status" => 0, "message" => "File not found"]);
    exit;
}

$text = file_get_contents($filepath);

// --- Send text to Google GenAI REST API ---
$apiKey = getenv('API_KEY'); // store your Google GenAI API key in env
$prompt = "Summarize the following text for a student. Focus on key points:\n$text";

$ch = curl_init("https://genai.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "contents" => [
        ["parts" => [["text" => $prompt]]]
    ]
]));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo json_encode(["status" => 0, "message" => "AI request failed"]);
    exit;
}
curl_close($ch);

$responseData = json_decode($response, true);

// Extract the summary text (depends on GenAI response structure)
$summary = $responseData['candidates'][0]['content'][0]['parts'][0]['text'] ?? "";

echo json_encode(["status" => 1, "summary" => $summary]);
?>
