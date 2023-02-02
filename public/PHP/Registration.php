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
    $userEmail = $input["email"];
    $userName = $input["userName"];
    $userCountry = $input["country"];
    $userCity = $input["city"];
    $userPostcode = $input["postcode"];

    empty($userCountry) ? $userCountry = "NULL" : $userCountry ;
    empty($userCity) ? $userCity = "NULL" : $userCity ;
    empty($userPostcode) ? $userPostcode = "NULL" : $userPostcode ;

    $sqlReg = "
    INSERT INTO `users` 
    (
        `id`, 
        `login`, 
        `password`, 
        `email`, 
        `user_name`, 
        `country`, 
        `city`, 
        `postcode`
    ) 
        VALUES 
        (
            NULL, 
            '{$userLogin}', 
            '{$userPassword}', 
            '{$userEmail}', 
            '{$userName}', 
            '{$userCountry}', 
            '{$userCity}', 
            {$userPostcode}
        )
    ";
    $sqlLogin = "SELECT `login` FROM `users` WHERE `login` LIKE '$userLogin'";
    $sqlEmail = "SELECT `email` FROM `users` WHERE `email` LIKE '$userEmail'";
    
    if(mysqli_fetch_row(mysqli_query($conn,$sqlLogin)) !== null){
        die("clone login");
    }
    else if(mysqli_fetch_row(mysqli_query($conn,$sqlEmail)) !== null){
        die("clone email");
    }
    else{
        mysqli_query($conn, $sqlReg);
        die("done");
    }
}

?>