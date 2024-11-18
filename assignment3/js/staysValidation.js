class Hotel {
  constructor(
    hotelId,
    name,
    city,
    availability,
    price
  ) {
    this.hotelId = hotelId;
    this.name = name;
    this.city = city;
    this.availability = availability;
    this.price = price;
  }
}

hotels = [];
fetch("./data/hotels.json")
.then((response) => response.json())
.then((data) => {
  data.forEach(hotel => {
    const hotelId = hotel.hotelId;
    const name = hotel.name;
    const city = hotel.city;
    const availability = hotel.availability;
    const price = hotel.price;
    hotels.push(new Hotel(hotelId, name, city, availability, price));
  });
});

console.log(hotels);

document.getElementById("staysForm").addEventListener("submit", function (e) {
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
  
  let filteredHotels = hotels.filter((hotel) => {
    if (hotel.city.toLowerCase() != city.toLowerCase()) {
      return false;
    }
    let allDatesAvailable = true;
    for (let currentDate = new Date(checkin); currentDate < checkout; currentDate.setDate(currentDate.getDate() + 1)) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      const availabilityEntry = hotel.availability.find(entry => entry.date === formattedDate);
      if (!availabilityEntry || availabilityEntry.rooms < roomsNeeded) {
        allDatesAvailable = false;
        break;
      }
    }
    return allDatesAvailable;
  });
  
  if (filteredHotels.length === 0) {
    staysResult.innerHTML = "No hotels available for the selected dates.";
    return;
  }
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
        <td>${checkin.toDateString()}</td>
        <td>${checkout.toDateString()}</td>
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
    localStorage.setItem("staysCart", JSON.stringify(cart));
    alert("Hotel added to cart successfully.");
  });
});
