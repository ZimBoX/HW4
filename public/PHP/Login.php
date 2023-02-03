<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if(isset($input)){

    include("Connect_db.php");

    $conn = Connection_DB();

    $userLogin = $input["login"];
    $userPassword = $input["password"];

    $sqlLogin = "SELECT `login`, `password` FROM `users` WHERE `login` LIKE '$userLogin';";

    $getLogin = mysqli_query($conn, $sqlLogin);
    $result = mysqli_fetch_assoc($getLogin);

    if(isset($result["login"])){
        if($result["password"] === $userPassword){
            $sqlUserInfo = "SELECT U.id, `user_name`, `access_level`  FROM `users` as U, `permissions` as P WHERE U.id = P.user_id AND `login` = '$userLogin';";
            $userInfo = mysqli_fetch_assoc(mysqli_query($conn, $sqlUserInfo));
            $_SESSION["UserID"] = $userInfo["id"];
            $_SESSION["UserName"] = $userInfo["user_name"];
            $_SESSION["UserAccessLevel"] = $userInfo["access_level"];
            session_write_close();
            die("done");
        }
        else{
            die("error");
        }
    }
    else{
        die("error");
    }
}

?>