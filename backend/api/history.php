

<?php
require_once "../db.php";
require_once "cors.php";

header('Content-Type: application/json');

// TODO: get user_id from JWT / session
$user_id = 1;

$stmt = $conn->prepare("SELECT * FROM podcasts WHERE user_id=:uid ORDER BY created_at DESC");
$stmt->execute(['uid'=>$user_id]);
$history = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["status"=>1,"history"=>$history]);
?>
