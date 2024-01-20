<?php
$host = 'localhost';
$db = 'GAMES';
require_once "db_upass.php";

$user = $DB_USER;
$pass = $DB_PASS;

if(gethostname() == 'users.iee.ihu.gr') {
    $dsn = "mysql:unix_socket=/home/student/iee/2019/iee2019149/mysql/run/mysql.sock;dbname=$db;charset=utf8";
} else {
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8";
}

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
