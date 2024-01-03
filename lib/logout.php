<?php
header('Content-Type: application/json');
session_start();

// Clear all session variables
$_SESSION = array();

// Destroy the session
session_destroy();

// Check if the session is destroyed
if (session_status() == PHP_SESSION_NONE) {
  echo json_encode(["success" => true, "message" => "Logout successful"]);
} else {
  echo json_encode(["success" => false, "message" => "Logout failed"]);
}

?>
