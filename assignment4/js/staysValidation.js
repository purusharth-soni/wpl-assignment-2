if (localStorage.getItem("user-phone") === null) {
    document.getElementById("login-div").style.display = "block";
} else {
    document.getElementById("stays-div").style.display = "block";
}

document.getElementById("staysForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    // Collect input values
    const city = document.getElementById("city").value.trim();
    const checkin = new Date(document.getElementById("checkin").value);
    const checkout = new Date(document.getElementById("checkout").value);
    const adults = parseInt(document.getElementById("adults").value, 10);
    const children = parseInt(document.getElementById("children").value, 10);
    const infants = parseInt(document.getElementById("infants").value, 10);
    
    const staysResult = document.getElementsByClassName("result")[0];
    staysResult.innerHTML = ""; // Clear previous results
    
    // Validation for city
    if (!isValidCity(city)) {
        alert("Please enter a valid city from Texas or California.");
        return;
    }
    
    // Validation for check-in and check-out dates
    const minDate = new Date("2024-09-01");
    const maxDate = new Date("2024-12-01");
    if (
        checkin < minDate ||
        checkin > maxDate ||
        checkout < minDate ||
        checkout > maxDate ||
        checkin >= checkout
    )
    {
        alert(
            "Check-in and check-out dates must be between September 1, 2024," +
            " and December 1, 2024, and check-out must be after check-in."
        );
        return;
    }
    
    // Calculate number of rooms
    let totalGuests = adults + children;
    let roomsNeeded = Math.ceil(totalGuests / 2);
    
    // query hotels
    filteredHotels = await getHotels(city);
    console.log(filteredHotels);
    
    let table = `
      <table>
      <tr>
      <th>Hotel ID</th>
      <th>Hotel Name</th>
      <th>City</th>
      <th>Check-in Date</th>
      <th>Check-out Date</th>
      <th>Price per Night</th>
      </tr>`;
    
    filteredHotels.forEach((hotel) => {
        table += `
        <tr>
        <td>${hotel.hotelId}</td>
        <td>${hotel.name}</td>
        <td>${hotel.city}</td>
        <td>${checkin.toISOString().slice(0, 10)}</td>
        <td>${checkout.toISOString().slice(0, 10)}</td>
        <td>${hotel.price}</td>
        </tr>
        `;
    });
    table += "</table>";
    staysResult.innerHTML += table;
    staysResult.innerHTML += '<button id="cart">Add to Cart</button>';
    staysResult.innerHTML += "<br/><br/>";
    
    const rows = staysResult.querySelectorAll("tr:not(:first-child)");
    rows.forEach((row) => {
        row.addEventListener("click", function () {
            if (this.classList.contains("selected")) {
                this.classList.remove("selected");
                this.style.backgroundColor = "";
            } else {
                this.classList.add("selected");
                this.style.backgroundColor = "grey";
            }
        });
    });
    
    var addToCartButton = document.getElementById("cart");
    addToCartButton.addEventListener("click", function () {
        var selectedRows = staysResult.querySelectorAll("tr.selected");
        if (selectedRows.length !== 1) {
            alert("Please select exactly one hotel to add to the cart.");
            return;
        }
        
        const cart = [];
        selectedRows.forEach((row) => {
            const cells = row.getElementsByTagName("td");
            const hotel = {
                hotelId: cells[0].innerText,
                name: cells[1].innerText,
                city: cells[2].innerText,
                checkin: cells[3].innerText,
                checkout: cells[4].innerText,
                price: cells[5].innerText,
                numRooms: roomsNeeded
            }
            cart.push(hotel);
        });
        
        const passengerData = {
            adults: adults,
            children: children,
            infants: infants,
        };
        
        localStorage.setItem("staysCart", JSON.stringify(cart));
        localStorage.setItem("passengerData", JSON.stringify(passengerData));
        alert("Hotel added to cart successfully.");
    });
});

async function getHotels(city) {
    return new Promise((resolve, reject) => {
        const request = {
            city: city
        };
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5500/php/get-hotels-city.php", true); // Async mode
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                }
            }
        };
        xhr.send(JSON.stringify(request));
    });
}