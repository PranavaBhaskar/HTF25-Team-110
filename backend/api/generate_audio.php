
<?php
require_once "../config.php";
require_once "cors.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$text = $data['text'] ?? '';

if(!$text){
    echo json_encode(["status"=>0,"message"=>"No text provided"]);
    exit;
}

// TODO: Call TTS API here
// For now, generate a dummy MP3 file
$filename = AUDIO_DIR . "podcast_" . time() . ".mp3";
file_put_contents($filename, "Dummy audio content");

echo json_encode(["status"=>1,"audio"=>$filename]);
?>
