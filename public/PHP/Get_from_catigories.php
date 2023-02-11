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
    
    $value = $input["name"];

    if(isset($input["sort"])){
        $sort = $input["sort"];
    }
    else{
        $sort = "price DESC";
    }

    $value = urldecode($value);
    
    $sql = "SELECT P.id, P.name, P.price, P.img_folder, p.description 
    FROM `products` as P, `categories` as C, `product_category` as PC 
    WHERE PC.product_id = P.id 
    AND PC.category_id = C.id 
    AND C.category_name = '{$value}'
    ORDER BY P.{$sort}";
    
    $result = mysqli_query($conn, $sql);

    die(json_encode(mysqli_fetch_all($result)));

}

?>