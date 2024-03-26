var orderItems = []; // Array to store order items

window.onload = function() {
    fetchMenuItems();
};

function fetchMenuItems() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var menuItems = JSON.parse(xhr.responseText);
            displayMenuItems(menuItems);
        }
    };
    xhr.open("GET", "get_menu_items.php", true);
    xhr.send();
}

function displayMenuItems(menuItems) {
    var menuDiv = document.getElementById("menu");
    menuItems.forEach(function(item) {
        var itemDiv = document.createElement("div");
        itemDiv.innerHTML = "<h3>" + item.name + "</h3><p>$" + item.price + "</p>";
        itemDiv.onclick = function() {
            addToOrder(item.id, item.name, item.price);
        };
        menuDiv.appendChild(itemDiv);
    });
}

function addToOrder(itemId, itemName, itemPrice) {
    var existingItem = orderItems.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        orderItems.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
    }
    updateOrderList();
}

function updateOrderList() {
    var orderList = document.getElementById("order-items");
    orderList.innerHTML = ""; // Clear previous order list

    orderItems.forEach(function(item) {
        var listItem = document.createElement("li");
        listItem.textContent = item.name + " x " + item.quantity + " - $" + (item.price * item.quantity).toFixed(2);
        orderList.appendChild(listItem);
    });
}

document.getElementById("place-order-btn").onclick = function() {
    placeOrder();
};

function placeOrder() {
    if (orderItems.length === 0) {
        alert("Your order is empty!");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            orderItems = []; // Reset order items after placing order
            updateOrderList();
            alert("Order placed successfully!");
        }
    };
    xhr.open("POST", "place_order.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(orderItems));
}
