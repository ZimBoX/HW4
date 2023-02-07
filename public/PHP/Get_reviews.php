<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input)) {
    
    include("Connect_db.php");

    $conn = Connection_DB();

    $productId = $input["id"];

    $sql = "SELECT R.review, U.user_name, U.id, R.id 
            FROM `reviews` AS R, 
            `users` AS U, 
            `products` AS P, 
            `pr_us_re` AS PUR 
            WHERE U.id = PUR.user_id 
            AND P.id = PUR.product_id 
            AND R.id = PUR.review_id 
            AND P.id = '{$productId}'
            ORDER BY R.id;";

    $result = mysqli_query($conn, $sql);

    die(json_encode(mysqli_fetch_all($result)));
}
?>