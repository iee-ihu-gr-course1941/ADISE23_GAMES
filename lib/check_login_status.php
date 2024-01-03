<?php
session_start();
header('Content-Type: application/json');

$response = ['loggedIn' => false, 'username' => ''];

if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === true) {
    $response['loggedIn'] = true;
    $response['username'] = isset($_SESSION['username']) ? $_SESSION['username'] : '';
}

echo json_encode($response);
?>
