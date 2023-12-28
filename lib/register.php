<?php
require_once 'dbconnect.php'; //database connection

// Elegxos gia an uparxei to username
function usernameExists($pdo, $username) {
    $stmt = $pdo->prepare("SELECT Username FROM Players WHERE Username = ?");
    $stmt->bindParam(1, $username);
    $stmt->execute();
    return $stmt->rowCount() > 0;
}

// apanthsh sto AJAX request gia elegxo  username 
if (isset($_POST['action']) && $_POST['action'] == 'check_username') {
    $username = $_POST['username'];
    echo usernameExists($pdo, $username) ? "exists" : "not_exists";
    exit(); // Terminate script 
}

// Form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encrypt the password
    $email = $_POST['email'];

    if (!usernameExists($pdo, $username)) {
        $stmt = $pdo->prepare("INSERT INTO Players (Username, Password, Email) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $username);
        $stmt->bindParam(2, $password);
        $stmt->bindParam(3, $email);

        if ($stmt->execute()) {
            // Redirect to a success page or show a success message
            header("Location: ../HTML/register.html?signup=success"); 
            exit();
        } else {
            echo "Error: " . $stmt->errorInfo()[2];
        }
    } else {
        // den xreiazetai idiaitera
        header("Location: ../HTML/register.html?error=username_exists");
        exit();
    }
}
?>
