<?php
header('Content-Type: application/json');

//cookie and session data to expire in 30 days
ini_set('session.cookie_lifetime', 30 * 24 * 60 * 60); // 30 days
ini_set('session.gc_maxlifetime', 30 * 24 * 60 * 60); // 30 days
session_start();

require_once 'dbconnect.php'; 

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare the SQL statement
    $stmt = $pdo->prepare("SELECT PlayerID, Username, Password FROM Players WHERE Username = ?");
    $stmt->bindParam(1, $username);
    $stmt->execute();
    
    if ($stmt->rowCount() == 1) {
        $user = $stmt->fetch();
        // Verify the password
        if (password_verify($password, $user['Password'])) {
            $_SESSION['user_id'] = $user['PlayerID']; // Store user ID in session
            $_SESSION['username'] = $user['Username']; // Store username in session

            echo json_encode(["success" => true]);
        } else {
            // Password is incorrect
            echo json_encode(["success" => false, "error" => "Invalid password"]);
        }
    } else {
        // Username not found
        echo json_encode(["success" => false, "error" => "Username not found"]);
    }
} else {
    // Missing username or password
    echo json_encode(["success" => false, "error" => "Missing username or password"]);
}
?>
