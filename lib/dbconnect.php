<?php
$host = '127.0.0.1'; 
$port = '3333'; 
$db   = 'GAMES'; 
require_once "db_upass.php";
$user=$DB_USER;
$pass=$DB_PASS;

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
