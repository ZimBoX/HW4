<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$input = json_decode(file_get_contents('php://input'), true);

include("Connect_db.php");

$conn = Connection_DB();

$sql = "SELECT `id`,`name`,`price`,`img_folder` FROM `products` ORDER BY `id` DESC LIMIT 4;";

$result = mysqli_query($conn, $sql);

die(json_encode(mysqli_fetch_all($result)));

?>