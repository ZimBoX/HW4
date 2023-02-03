<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$input = json_decode(file_get_contents('php://input'), true);

if(isset($input)){

    include("Connect_db.php");

    $conn = Connection_DB();

    if($input["type"] === "category"){
        $sql = "INSERT INTO `categories` (`id`, `category_name`) VALUES (NULL, '". $input['categoryName'] ."');";

        mysqli_query($conn, $sql);

        die("done");
    }
}
?>