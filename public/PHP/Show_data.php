<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input)) {

    include("Connect_db.php");

    $conn = Connection_DB();

    $search = $input["search"];

    $sql = "SELECT P.* 
    FROM `products` AS P, 
        `categories` AS C, 
        `product_category` AS PC 
        WHERE PC.product_id = P.id 
        AND PC.category_id = C.id 
        AND C.category_name = '{$search}' 
        ORDER BY P.price
        LIMIT 4;";

    $result = mysqli_query($conn, $sql);

    die(json_encode(mysqli_fetch_all($result)));
}

?>