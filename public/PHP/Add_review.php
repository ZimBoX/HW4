<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input)) {

    $userId = $input["userId"];
    $productId = $input["productId"];
    $reviewText = $input["reviewText"];
    
    include("Connect_db.php");

    $conn = Connection_DB();

    $sqlAddReview = "INSERT INTO `reviews` (`id`, `review`) VALUES (NULL, '{$reviewText}');";

    mysqli_query($conn, $sqlAddReview);

    $sqlGetNewReviewId = "SELECT `id` FROM `reviews` WHERE `review` = '{$reviewText}'";

    $result = mysqli_query($conn, $sqlGetNewReviewId);

    $reviewId = mysqli_fetch_assoc($result)["id"];

    $sqlAddLinks = "INSERT INTO `pr_us_re` (`id`, `user_id`, `product_id`, `review_id`) 
    VALUES (NULL, '{$userId}', '{$productId}', '$reviewId');";

    mysqli_query($conn, $sqlAddLinks);

    die("done");
}
?>