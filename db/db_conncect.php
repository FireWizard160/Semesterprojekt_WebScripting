<?php
$db = null;
function getDBConnection() {

    global $db;
    if($db != null) {
        return $db;
    }

    $host = "localhost";
    $dbname = "appointmentfinder";
    $username = "root";
    $password = "";

    $db = new mysqli($host, $username, $password, $dbname);

    if($db->connect_error) {

        echo "Verbindung zur DB konnte nicht hergestellt werden.<br>";
        echo $db->connect_error;

        die();
    }



    return $db;
}