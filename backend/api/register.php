

<?php
require_once "../db.php";
require_once "cors.php";

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if(!$email || !$password){
    echo json_encode(["status"=>0,"message"=>"Email and password required"]);
    exit;
}

$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
$stmt->execute(['email'=>$email, 'password'=>$hashed]);

echo json_encode(["status"=>1,"message"=>"User registered successfully"]);
?>
