<?php
$servername = "localhost";
$username = "root"; 
$password = "123243"; //Password as it is in my actual database.
$dbname = "restaurant_menu";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
