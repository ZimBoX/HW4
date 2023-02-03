<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input)) {
    if($input["type"] === "getUser"){

        if(!isset($_SESSION["UserID"])){
            die('false');
        }
        else{
            die($_SESSION["UserName"]);
        }
    }
    if($input["type"] === "getPermissions"){

        include("Connect_db.php");

        $conn = Connection_DB();

        $userId = $_SESSION["UserID"];

        $sql = "SELECT `access_level` FROM `permissions` as P, `users` as U 
        WHERE U.id = P.user_id and U.id = '{$userId}';";

        $result = mysqli_query($conn, $sql);

        $result = mysqli_fetch_array($result)["access_level"];

        die($result);
    }
}
?>