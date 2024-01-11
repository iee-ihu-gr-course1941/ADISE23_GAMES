<?php
header('Content-Type: application/json');
session_start();

require_once 'dbconnect.php'; 

if (isset($_SESSION['user_id'])) {
 
    $updateStmt = $pdo->prepare("UPDATE Players SET LoggedIn = false WHERE PlayerID = ?");
    $updateStmt->execute([$_SESSION['user_id']]);
}

$_SESSION = array();

session_destroy();

if (session_status() == PHP_SESSION_NONE) {
  echo json_encode(["success" => true, "message" => "Logout successful"]);
} else {
  echo json_encode(["success" => false, "message" => "Logout failed"]);
}
?>
