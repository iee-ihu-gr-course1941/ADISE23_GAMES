<?php
$host='localhost';
$db ='GAMES';
require_once 'db_upass.php';


$user=$DB_USER;
$pass=$DB_PASS;

if(gethostname()=='users.iee.ihu.gr'){
    $mysqli = new mysqli($host,$user,$pass,$db,null,'/home/student/iee/2019/iee2019149/mysql/run/mysql.sock');
    $conn=$mysqli;

} else {
    $pass = null;
    $mysqli = new mysqli($host,$user,$pass,$db);
    $conn=$mysqli;
}

if($mysqli->connect_errno){
    echo "Failed to connect to MySQL: (" . 
    $mysqli->connect_errno . ") " . $mysqli->connect_error;
}




?>
