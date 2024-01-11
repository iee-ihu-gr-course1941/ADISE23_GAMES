<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn']) {
    echo json_encode(["username" => $_SESSION['username']]);
} else {
    echo json_encode(["username" => null]);
}
?>
