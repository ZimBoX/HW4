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

    $sql = "SELECT * FROM `products` WHERE `name` LIKE '%{$search}%' LIMIT 4;";

    $result = mysqli_query($conn, $sql);

    die(json_encode(mysqli_fetch_all($result)));
}

?>