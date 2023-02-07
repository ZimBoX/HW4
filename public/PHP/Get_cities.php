<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input)) {

    if($input["mode"] === "GetCities"){

        include("Connect_db.php");

        $conn = Connection_DB();
    
        $value = $input["userCity"];
    
        $sql = "SELECT `name` FROM `geo_city` WHERE `name` LIKE '{$value}%' ORDER BY `region_id` ASC LIMIT 3; ";
    
        $result = mysqli_query($conn, $sql);
    
        die(json_encode(mysqli_fetch_all($result)));
    }

    if($input["mode"] === "GetUserCity"){
        if(!empty($_SESSION["userCity"])){
            die($_SESSION["userCity"]);
        }
        else{
            die("false");
        }
    }
}

?>