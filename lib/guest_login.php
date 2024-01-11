<?php


session_start();
header('Content-Type: application/json');

require_once 'dbconnect.php';

$guestUsername = "Guest " . mt_rand(1000, 9999);

$stmt = $pdo->prepare("INSERT INTO Players (Username, Password, UserType, LoggedIn) VALUES (?, NULL, 'guest', true)");
$stmt->execute([$guestUsername]);

$playerId = $pdo->lastInsertId();

if ($playerId) {
    $_SESSION['loggedIn'] = true;
    $_SESSION['user_id'] = $playerId;
    $_SESSION['username'] = $guestUsername;

    echo json_encode(["success" => true, "playerId" => $playerId, "username" => $guestUsername]);
} else {
    echo json_encode(["success" => false, "error" => "Could not create guest player"]);
}
?>
