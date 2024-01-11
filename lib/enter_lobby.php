<?php
header('Content-Type: application/json');

session_start();

require_once 'dbconnect.php';

if (isset($_SESSION['user_id'])) {
    $stmt = $pdo->prepare("UPDATE Players SET InLobby = true WHERE PlayerID = ?");
    $stmt->execute([$_SESSION['user_id']]);
}
?>
