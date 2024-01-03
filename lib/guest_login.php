<?php
session_start();
header('Content-Type: application/json');

// Include your database connection details
require_once 'dbconnect.php';

// Insert a new guest player record
$stmt = $pdo->prepare("INSERT INTO GuestPlayers (Username) VALUES (?)");
$guestUsername = "Guest"; // Or any default name you want to use
$stmt->execute([$guestUsername]);

// Get the last inserted ID which will serve as the PlayerID
$playerId = $pdo->lastInsertId();

// Check if the guest player was successfully created
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
