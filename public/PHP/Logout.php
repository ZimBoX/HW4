<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if(isset($input)){

    $_SESSION["UserID"] = null;
    $_SESSION["UserName"] = null;
    $_SESSION["UserAccessLevel"] = null;

    session_write_close();
}
?>