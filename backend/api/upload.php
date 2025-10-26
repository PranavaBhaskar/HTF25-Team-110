
<?php
require_once "../config.php";
require_once "cors.php";

header('Content-Type: application/json');

if(!isset($_FILES['file'])){
    echo json_encode(["status"=>0,"message"=>"No file uploaded"]);
    exit;
}

$file = $_FILES['file'];
$target = UPLOAD_DIR . basename($file['name']);

if(move_uploaded_file($file['tmp_name'], $target)){
    echo json_encode(["status"=>1,"file"=>$file['name']]);
}else{
    echo json_encode(["status"=>0,"message"=>"Failed to upload"]);
}
?>
