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
    $exists = usernameExists($pdo, $username);
    echo json_encode(['exists' => $exists]);
    exit();
}

// Form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encrypt the password
    $email = $_POST['email'];

    if (!usernameExists($pdo, $username)) {
        $stmt = $pdo->prepare("INSERT INTO Players (Username, Password, Email) VALUES (?, ?, ?)");
        $stmt->bindParam(1, $username);
        $stmt->bindParam(2, $password);
        $stmt->bindParam(3, $email);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Registration successful']); //an ginei to registration
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed', 'errorInfo' => $stmt->errorInfo()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Username already exists']);
    }
    exit();
}
?>
