<?php
header('Content-Type: application/json');
session_start();
require_once 'dbconnect.php';

$response = [];

if (isset($_POST['deckType'])) {
  $deckType = $_POST['deckType'];
  $_SESSION['deckPreference'] = $deckType; 

  $response['success'] = true;
} else {
  $response['success'] = false;
  $response['error'] = 'Deck type not provided.';
}


echo json_encode($response);
?>
