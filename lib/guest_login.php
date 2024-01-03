<?php
session_start();
header('Content-Type: application/json');

require_once 'dbconnect.php';

$stmt = $pdo->prepare("INSERT INTO GuestPlayers (Username) VALUES (?)");
$guestUsername = "Guest"; // Or any default name you want to use
$stmt->execute([$guestUsername]);

$playerId = $pdo->lastInsertId();

if($playerId) {
    // Set session variables
    $_SESSION['loggedIn'] = true;
    $_SESSION['user_id'] = $playerId; // Storing the PlayerID in the session
    $_SESSION['username'] = "User " . $playerId; // Storing the username as "User PlayerID" in the session

    // Return the ID in a JSON response
    echo json_encode(["success" => true, "playerId" => $playerId]);
} else {
    echo json_encode(["success" => false, "error" => "Could not create guest player"]);
}
?>
