const tripTypeSelect = document.getElementById("tripType");
const passengerIcon = document.getElementById("passengerIcon");
const passengerForm = document.getElementById("passengerForm");
const arrivalDateField = document.getElementById("arrivalDateField");
const now = new Date();
const startDate = new Date("2024-09-01");
const endDate = new Date("2024-12-01");

class Flight {
  constructor(
    origin,
    destination,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    availableSeats,
    price = null,
    id
  ) {
    this.origin = origin;
    this.destination = destination;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.availableSeats = availableSeats;
    this.price = price;
    this.id = id;
  }
}

flights = [];
fetch("./data/flights.xml")
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
      const flight = new Flight(
        origin,
        destination,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        availableSeats,
        price,
        id
      );
      flights.push(flight);
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
  const destination = document
    .getElementById("destination")
    .value.trim()
    .toLowerCase();
  const adults = document.getElementById("adults").value;
  const children = document.getElementById("children").value;
  const infants = document.getElementById("infants").value;
  const flightResult = document.getElementsByClassName("result")[0];
  flightResult.innerHTML = ""; // Clear previous results

  // Validate departure date
  if (
    !departure ||
    new Date(departure) < startDate ||
    new Date(departure) > endDate
  ) {
    alert(
      "Departure date must be between September 1, 2024 and December 1, 2024."
    );
    return;
  }

  // Validate cities (hardcoded list for simplicity)
  if (!isValidCity(origin) || !isValidCity(destination)) {
    alert("Origin and destination must be cities in Texas or California.");
    return;
  }

  // Additional round trip validations
  if (tripTypeSelect.value === "roundtrip") {
    if (
      !arrival ||
      new Date(arrival) < startDate ||
      new Date(arrival) > endDate
    ) {
      alert(
        "Arrival date must be between September 1, 2024 and December 1, 2024."
      );
      return;
    }
  }

  if (adults > 4 || children > 4 || infants > 4) {
    alert("Number of Passengers of any type cannot be more than 4");
    return;
  }

  var resultString = `
        <p>Trip Information:<br/>
        Type: ${tripTypeSelect.value}<br/>
        Origin: ${origin}<br/>
        Destination: ${destination}<br/>
        Departure: ${departure}<br/>`;
  if (tripTypeSelect.value === "roundtrip") {
    resultString += `Arrival: ${arrival}<br/>`;
  }
  resultString += `Adults: ${adults}<br/>
        Children: ${children}<br/>
        Infants: ${infants}</p>`;
  flightResult.innerHTML = resultString;

  const departureDate = new Date(departure);
  var matchingFlights = flights.filter((flight) => {
    const flightDepartureDate = new Date(flight.departureDate);
    return (
      flight.origin.toLowerCase() === origin &&
      flight.destination.toLowerCase() === destination &&
      Math.abs(flightDepartureDate - departureDate) <=
        3 * 24 * 60 * 60 * 1000 && // within 3 days
      parseInt(flight.availableSeats) > 0 // availables seats > 0
    );
  });
  var exactMatch = matchingFlights.filter((flight) => {
    return flight.departureDate === departure;
  });

  if (exactMatch.length === 0 && matchingFlights.length === 0) {
    flightResult.innerHTML += "<p>No matching flights found.</p>";
    return;
  }
  if (exactMatch.length !== 0) {
    matchingFlights = exactMatch;
  }

  if (tripTypeSelect.value === "roundtrip") {
    const arrivalDate = new Date(arrival);
    var matchingFlightsReturning = flights.filter((flight) => {
      const flightArrivalDate = new Date(flight.arrivalDate);
      return (
        flight.origin.toLowerCase() === destination &&
        flight.destination.toLowerCase() === origin &&
        Math.abs(flightArrivalDate - arrivalDate) <= 3 * 24 * 60 * 60 * 1000
      ); // within 3 days
    });
    var exactMatchReturning = matchingFlightsReturning.filter((flight) => {
      return flight.arrivalDate === arrival;
    });
    if (
      exactMatchReturning.length === 0 &&
      matchingFlightsReturning.length === 0
    ) {
      flightResult.innerHTML +=
        "<p>No matching flights found for return trip.</p>";
      return;
    }
    if (exactMatchReturning.length !== 0) {
      matchingFlightsReturning = exactMatchReturning;
    }
    matchingFlights = matchingFlights.concat(matchingFlightsReturning);
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
                <th>ID</th>
            </tr>`;
  matchingFlights.forEach((flight) => {
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
                <td>${flight.id}</td>
            </tr>`;
  });
  table += "</table>";
  flightResult.innerHTML += table;
  flightResult.innerHTML += '<button id="cart">Add to Cart</button>';
  flightResult.innerHTML += "<br/><br/>";

  const rows = flightResult.querySelectorAll("tr:not(:first-child)");
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
    const selectedRows = flightResult.querySelectorAll("tr.selected");
    if (
      (tripTypeSelect.value === "oneway" && selectedRows.length !== 1) ||
      (tripTypeSelect.value === "roundtrip" && selectedRows.length !== 2)
    ) {
      alert("Please select the correct number of flights.");
      return;
    }

    const cart = [];
    selectedRows.forEach((row) => {
      const cells = row.getElementsByTagName("td");
      const flight = {
        origin: cells[0].textContent,
        destination: cells[1].textContent,
        departureDate: cells[2].textContent,
        arrivalDate: cells[3].textContent,
        departureTime: cells[4].textContent,
        arrivalTime: cells[5].textContent,
        availableSeats: cells[6].textContent,
        price: cells[7].textContent,
        id: cells[8].textContent,
      };
      cart.push(flight);
    });
    const passengerData = {
      adults: adults,
      children: children,
      infants: infants,
    };
    // Store cart in localStorage
    localStorage.setItem("flightData", JSON.stringify(cart));
    localStorage.setItem("passengerData", JSON.stringify(passengerData));

    alert("Flights added to cart.");
  });
});
