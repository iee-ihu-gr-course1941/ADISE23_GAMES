<?php
header('Content-Type: application/json');

ini_set('session.cookie_lifetime', 30 * 24 * 60 * 60); // 30 meres
ini_set('session.gc_maxlifetime', 30 * 24 * 60 * 60); 
session_start();

require_once 'dbconnect.php'; 

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT PlayerID, Username, Password FROM Players WHERE Username = ?");
    $stmt->bindParam(1, $username);
    $stmt->execute();
    
    if ($stmt->rowCount() == 1) {
        $user = $stmt->fetch();
        if (password_verify($password, $user['Password'])) {
            $_SESSION['loggedIn'] = true;
            $_SESSION['user_id'] = $user['PlayerID']; 
            $_SESSION['username'] = $user['Username']; 

            $updateStmt = $pdo->prepare("UPDATE Players SET LoggedIn = true WHERE PlayerID = ?");
            $updateStmt->execute([$user['PlayerID']]);

            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Invalid password"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Username not found"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Missing username or password"]);
}
?>
