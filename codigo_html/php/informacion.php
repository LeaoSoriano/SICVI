<?php
include "config.php";
include "utils.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

$db_conexion = connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = $db_conexion->prepare("SELECT DATE_FORMAT(Fecha, '%H:%I:%S' ) AS Tiempo, Temperatura, Humedad FROM informacion");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll());
    exit();
}
