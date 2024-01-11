<?php
session_start();
require_once 'dbconnect.php'; 

$response = ['gameStarted' => false, 'gameId' => null, 'message' => ''];

if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] && isset($_SESSION['user_id'])) {
    $currentUserId = $_SESSION['user_id'];

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("SELECT GameID FROM Game 
                               WHERE IsFinished = 0 AND PlayerOneID = ? AND PlayerTwoID IS NULL");
        $stmt->execute([$currentUserId]);
        $existingGame = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existingGame) {
            $_SESSION['waitingForOpponent'] = $existingGame['GameID']; 
            $response['message'] = "You are already waiting for an opponent.";
            $response['gameId'] = $existingGame['GameID'];
        } else {
            $stmt = $pdo->prepare("SELECT GameID FROM Game 
                                   WHERE IsFinished = 0 AND PlayerTwoID IS NULL AND PlayerOneID != ? 
                                   LIMIT 1");
            $stmt->execute([$currentUserId]);
            $waitingGame = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($waitingGame) {
                $gameId = $waitingGame['GameID'];
                $stmt = $pdo->prepare("UPDATE Game SET PlayerTwoID = ? WHERE GameID = ?");
                $stmt->execute([$currentUserId, $gameId]);

                $response['gameStarted'] = true;
                $response['gameId'] = $gameId;
                $_SESSION['waitingForOpponent'] = null;
            } else {
                $stmt = $pdo->prepare("INSERT INTO Game (PlayerOneID, IsFinished) VALUES (?, 0)");
                $stmt->execute([$currentUserId]);
                $gameId = $pdo->lastInsertId();

                $response['message'] = "Game created. Waiting for an opponent.";
                $response['gameId'] = $gameId;
                $_SESSION['waitingForOpponent'] = $gameId;
            }
        }

        $pdo->commit();
    } catch (PDOException $e) {
        $pdo->rollBack();
        $response['message'] = "Database error: " . $e->getMessage();
    }
} else {
    $response['message'] = "User not logged in.";
}

if (isset($_SESSION['waitingForOpponent']) && $_SESSION['waitingForOpponent'] == $gameId) {
    $response['gameStarted'] = true;
    unset($_SESSION['waitingForOpponent']); 
}

echo json_encode($response);
?>
