const tripTypeSelect = document.getElementById("tripType");
const passengerIcon = document.getElementById("passengerIcon");
const passengerForm = document.getElementById("passengerForm");
const arrivalDateField = document.getElementById("arrivalDateField");
const now = new Date();
const startDate = new Date("2024-09-01");
const endDate = new Date("2024-12-01");

class Flight {
    constructor(origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, availableSeats, price = null) {
        this.origin = origin;
        this.destination = destination;
        this.departureDate = departureDate;
        this.arrivalDate = arrivalDate;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.availableSeats = availableSeats;
        this.price = price;
    }
}

flights = [];
fetch("../data/flights.xml")
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const flightNodes = xml.getElementsByTagName("flight");
        const flight = new Flight();
        for (let i = 0; i < flightNodes.length; i++) {
            const origin = flightNodes[i].getElementsByTagName("origin")[0].textContent;
            const destination = flightNodes[i].getElementsByTagName("destination")[0].textContent;
            const departureDate = flightNodes[i].getElementsByTagName("departure-date")[0].textContent;
            const arrivalDate = flightNodes[i].getElementsByTagName("arrival-date")[0].textContent;
            const departureTime = flightNodes[i].getElementsByTagName("departure-time")[0].textContent;
            const arrivalTime = flightNodes[i].getElementsByTagName("arrival-time")[0].textContent;
            const availableSeats = flightNodes[i].getElementsByTagName("available-seats")[0].textContent;
            const price = flightNodes[i].getElementsByTagName("price")[0].textContent;
            flights.push(new Flight(origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, availableSeats, price));
        }
    });

// Sow/hide arrival date based on trip type
tripTypeSelect.addEventListener("change", function () {
    if (tripTypeSelect.value === "roundtrip") {
        arrivalDateField.style.display = "block";
    } else {
        arrivalDateField.style.display = "none";
    }
});

// Show/hide passenger form when passenger icon is clicked
passengerIcon.addEventListener("click", function () {
    if (passengerForm.style.display === "none") {
        passengerForm.style.display = "block";
    } else {
        passengerForm.style.display = "none";
    }
});

document.getElementById("flightForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const departure = document.getElementById("departure").value;
    const arrival = document.getElementById("arrival").value;
    const origin = document.getElementById("origin").value.trim().toLowerCase();
    const destination = document.getElementById("destination").value.trim().toLowerCase();
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;
    const infants = document.getElementById("infants").value;
    const flightResult = document.getElementsByClassName("result")[0];
    flightResult.innerHTML = ""; // Clear previous results


    // Validate departure date
    if (!departure || new Date(departure) < startDate || new Date(departure) > endDate) {
        alert("Departure date must be between September 1, 2024 and December 1, 2024.");
        return;
    }

    // Validate cities (hardcoded list for simplicity)
    if (!isValidCity(origin) || !isValidCity(destination)) {
        alert("Origin and destination must be cities in Texas or California.");
        return;
    }

    // Additional round trip validations
    if (tripTypeSelect.value === "roundtrip") {
        if (!arrival || new Date(arrival) < startDate || new Date(arrival) > endDate) {
            alert("Arrival date must be between September 1, 2024 and December 1, 2024.");
            return;
        }
    }

    if(adults > 4 || children > 4 || infants > 4){
        alert("Number of Passengers of any type cannot be more than 4");
        return;
    }


    var resultString = `
        <p>Trip Information:<br/>
        Type: ${tripTypeSelect.value}<br/>
        Origin: ${origin}<br/>
        Destination: ${destination}<br/>
        Departure: ${departure}<br/>`
    if (tripTypeSelect.value === "roundtrip") {
        resultString += `Arrival: ${arrival}<br/>`
    }
    resultString += `Adults: ${adults}<br/>
        Children: ${children}<br/>
        Infants: ${infants}</p>`;
    flightResult.innerHTML = resultString;

    if (tripTypeSelect.value === "roundtrip") return;

    const departureDate = new Date(departure);
    var matchingFlights = flights.filter(flight => {
        const flightDepartureDate = new Date(flight.departureDate);
        return flight.origin.toLowerCase() === origin &&
            flight.destination.toLowerCase() === destination &&
            Math.abs(flightDepartureDate - departureDate) <= 3 * 24 * 60 * 60 * 1000; // within 3 days
    });
    var exactMatch = matchingFlights.filter(flight => {
        return flight.departureDate === departure;
    });

    if (exactMatch.length === 0 && matchingFlights.length === 0) {
        flightResult.innerHTML += "<p>No matching flights found.</p>";
        return;
    }
    if (exactMatch.length !== 0) {
        matchingFlights = exactMatch;
    }

    let table = `
        <table>
            <tr>
                <th>Origin</th>
                <th>Destination</th>
                <th>Departure Date</th>
                <th>Arrival Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Available Seats</th>
                <th>Price</th>
            </tr>`;
    matchingFlights.forEach(flight => {
        table += `
            <tr>
                <td>${flight.origin}</td>
                <td>${flight.destination}</td>
                <td>${flight.departureDate}</td>
                <td>${flight.arrivalDate}</td>
                <td>${flight.departureTime}</td>
                <td>${flight.arrivalTime}</td>
                <td>${flight.availableSeats}</td>
                <td>${flight.price}</td>
            </tr>`;
    });
    table += "</table>";
    flightResult.innerHTML += table;
});
