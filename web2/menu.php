<?php
include 'script.php'; // Include the database connection script

// Fetch menu items from the database
$sql = "SELECT * FROM menu_items";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $menuItems = array();
    while ($row = $result->fetch_assoc()) {
        $menuItem = array(
            "id" => $row["id"],
            "name" => $row["name"],
            "price" => $row["price"]
        );
        $menuItems[] = $menuItem;
    }
    // Convert menu items array to JSON and output
    echo json_encode($menuItems);
} else {
    echo "No menu items found";
}

// Close the database connection
$conn->close();
?>
