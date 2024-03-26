<?php
include 'script.php'; // Include the database connection script

// Get the JSON data sent from the client-side
$data = json_decode(file_get_contents('php://input'), true);

// Insert each order item into the database
foreach ($data as $item) {
    $itemId = $item['id'];
    $quantity = $item['quantity'];
    $sql = "INSERT INTO orders (item_id, quantity) VALUES ('$itemId', '$quantity')";
    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
        exit();
    }
}

// Close the database connection
$conn->close();
?>
