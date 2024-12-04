const user = localStorage.getItem("user-phone");
if (user === null) {
    document.getElementById("login-div").style.display = "block";
} else if (user === "222-222-2222") {
    document.getElementById("admin-div").style.display = "block";
} else {
    document.getElementById("user-div").style.display = "block";
}

function loadFlightData() {
    fetch("http://localhost:5500/data/flights.xml")
    .then((response) => response.text())
    .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const flightNodes = xml.getElementsByTagName("flight");
        for (let i = 0; i < flightNodes.length; i++) {
            const origin =
            flightNodes[i].getElementsByTagName("origin")[0].textContent;
            const destination =
            flightNodes[i].getElementsByTagName("destination")[0].textContent;
            const departureDate =
            flightNodes[i].getElementsByTagName("departure-date")[0].textContent;
            const arrivalDate =
            flightNodes[i].getElementsByTagName("arrival-date")[0].textContent;
            const departureTime =
            flightNodes[i].getElementsByTagName("departure-time")[0].textContent;
            const arrivalTime =
            flightNodes[i].getElementsByTagName("arrival-time")[0].textContent;
            const availableSeats =
            flightNodes[i].getElementsByTagName("available-seats")[0].textContent;
            const price = flightNodes[i].getElementsByTagName("price")[0].textContent;
            const id =
            flightNodes[i].getElementsByTagName("flight-id")[0].textContent;
            flight = {
                origin: origin,
                destination: destination,
                departureDate: departureDate,
                arrivalDate: arrivalDate,
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                availableSeats: availableSeats,
                price: price,
                id: id,
            };
            storeFlight(flight);
        }
    });
}

function loadStaysData() {
    fetch("http://localhost:5500/data/hotels.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach(hotel => {
            hotel = {
                id: hotel.hotelId,
                name: hotel.name,
                city: hotel.city,
                price: hotel.price
            }
            storeHotel(hotel);
        })
    });
}

function storeHotel(hotel) {
    const hotelString = JSON.stringify(hotel);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5500/php/stays-load.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(hotelString);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
}

function storeFlight(flight) {
    const flightString = JSON.stringify(flight);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5500/php/flight-load.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(flightString);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
}

function getBookedFlights() {
    const city = document.getElementById("flight-city").value;
    xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5500/php/get-booked-flights.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({ city: city }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            const flights = JSON.parse(xhr.responseText);
            const flightDiv = document.getElementById("booked-flights-results");
                flightDiv.innerHTML = `<table>
                <tr>
                <th>Flight Booking ID</th>
                <th>Flight ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Departure Date</th>
                <th>Arrival Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Price</th>
                </tr>`;
            for (let i = 0; i < flights.length; i++) {
                const flight = flights[i];
                flightDiv.innerHTML += `
                <tr>
                <td>${flight.bookingId}</td>
                <td>${flight.flightId}</td>
                <td>${flight.origin}</td>
                <td>${flight.destination}</td>
                <td>${flight.departureDate}</td>
                <td>${flight.arrivalDate}</td>
                <td>${flight.departureTime}</td>
                <td>${flight.arrivalTime}</td>
                <td>${flight.totalPrice}</td>
                </tr>`;
            }
            flightDiv.innerHTML += "</table>";
        }
    };
}