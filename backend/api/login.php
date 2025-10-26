

<?php
require_once "cors.php";

require_once "../db.php";
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if(!$email || !$password){
    echo json_encode(["status"=>0,"message"=>"Email and password required"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE email=:email");
$stmt->execute(['email'=>$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if($user && password_verify($password, $user['password'])){
    echo json_encode(["status"=>1,"user"=>$user]);
}else{
    echo json_encode(["status"=>0,"message"=>"Invalid credentials"]);
}
?>
