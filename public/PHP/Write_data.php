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
    if($input["type"] === "getCategories"){
        $sql = "SELECT `category_name` FROM `categories` ORDER BY `category_name`;";

        $result = mysqli_query($conn, $sql);

        die(json_encode(mysqli_fetch_all($result)));
    }
    if($input["type"] === "setNewProduct"){
        $ProductName = $input["ProductName"];
        $ProductDescription = $input["ProductDescription"];
        $ProductCategory = $input["ProductCategory"];
        $ProductPrice = $input["ProductPrice"];

        $sqlSetProduct = "INSERT INTO `products` (`id`, `name`, `description`, `price`) 
        VALUES (NULL, 
            '{$ProductName}', 
            '{$ProductDescription}', 
            '{$ProductPrice}');";

        mysqli_query($conn, $sqlSetProduct);

        $sqlGetNewProductId = "SELECT `id` FROM `products` 
            WHERE `name` = '{$ProductName}' 
            AND `description` = '{$ProductDescription}' 
            AND `price` = '{$ProductPrice}';";

        $NewProductId = mysqli_query($conn, $sqlGetNewProductId);

        $sqlGetCategoryId = "SELECT `id` FROM `categories` 
        WHERE `category_name` = '{$ProductCategory}';";

        $CategoryId = mysqli_query($conn, $sqlGetCategoryId);

        $NewProductId = mysqli_fetch_assoc($NewProductId)["id"];
        $CategoryId = mysqli_fetch_assoc($CategoryId)["id"];

        $sqlNewLink = "INSERT INTO `product_category` (`id`, `product_id`, `category_id`) 
        VALUES (NULL, 
            '{$NewProductId}', 
            '{$CategoryId}');";

        mysqli_query($conn, $sqlNewLink);

        die("done");
    }
}
?>