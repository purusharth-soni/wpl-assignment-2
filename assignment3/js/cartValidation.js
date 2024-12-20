const flightInfoContainer = document.getElementsByClassName(
  "flightInfoContainer"
)[0];
const stayInfoContainer =
  document.getElementsByClassName("stayInfoContainer")[0];
const adultInfoContainer =
  document.getElementsByClassName("adultInfoContainer")[0];
const childrenInfoContainer = document.getElementsByClassName(
  "childrenInfoContainer"
)[0];
const infantsInfoContainer = document.getElementsByClassName(
  "infantsInfoContainer"
)[0];
const bookingInfoContainer = document.getElementsByClassName(
  "bookingInfoContainer"
)[0];

var f = 0;

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cartData"));
  const passengers = JSON.parse(localStorage.getItem("passengerData"));
  console.log(cart);
  if (!cart || !passengers) {
    flightInfoContainer.innerHTML = "<p>Cart is Empty!</p>";
    return;
  }
  const totalAdults = parseInt(passengers.adults);
  const totalChildren = parseInt(passengers.children);
  const totalInfants = parseInt(passengers.infants);

  flightInfoContainer.innerHTML = getFlightAndPriceHTML(cart, passengers);

  displayPassengerForm(totalAdults, totalChildren, totalInfants);
}

function getFlightAndPriceHTML(cart, passengers) {
  const totalAdults = parseInt(passengers.adults);
  const totalChildren = parseInt(passengers.children);
  const totalInfants = parseInt(passengers.infants);
  let adultPrice = 0,
    childrenPrice = 0,
    infantPrice = 0;
  let table = `
  <h3>Selected Flight(s)</h3>
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

  cart.forEach((flight) => {
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
    singlePrice = parseFloat(flight.price);
    adultPrice += totalAdults * singlePrice;
    childrenPrice += totalChildren * singlePrice * 0.7;
    infantPrice += totalInfants * singlePrice * 0.1;
  });

  table += `
    </table>
    <p>Prices -</p>
    <p>Adult: $${adultPrice}<br>
    Children: $${childrenPrice}<br>
    Infant: $${infantPrice}<br>
    Total: $${adultPrice + childrenPrice + infantPrice}<br>
    </p>
    `;
  return table;
}

function displayStaysCart() {
  const stays = JSON.parse(localStorage.getItem("staysCart"));
  console.log(stays);
  const passengers = JSON.parse(localStorage.getItem("passengerData"));
  if (!stays) {
    stayInfoContainer.innerHTML = "<p>Cart is Empty!</p>";
    return;
  }
  const totalAdults = parseInt(passengers.adults);
  const totalChildren = parseInt(passengers.children);
  const totalInfants = parseInt(passengers.infants);
  let adultPrice = 0,
    childrenPrice = 0,
    infantPrice = 0;
  let table = `
  <h3>Selected Hotel(s)</h3>
      <table>
          <tr>
              <th>Hotel Id</th>
              <th>Hotel Name</th>
              <th>City</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Price Per Room</th>
              <th>Number Of Rooms Required</th>
          </tr>`;

  stays.forEach((stay) => {
    table += `
      <tr>
          <td>${stay.hotelId}</td>
          <td>${stay.name}</td>
          <td>${stay.city}</td>
          <td>${stay.checkin}</td>
          <td>${stay.checkout}</td>
          <td>${stay.price}</td>
          <td>${stay.numRooms}</td>
      </tr>`;
    singlePrice = parseFloat(stay.price);
    adultPrice += totalAdults * singlePrice;
    childrenPrice += totalChildren * singlePrice;
    console.log("Children - ", totalChildren);
    infantPrice = 0;
    //infantPrice += totalInfants * singlePrice * 0.1;
  });

  table += `
    </table>
    <p>Prices -</p>
    <p>Adult: $${adultPrice}<br>
    Children: $${childrenPrice}<br>
    Infant: $${infantPrice}<br>
    Total: $${adultPrice + childrenPrice + infantPrice}<br>
    </p>
    `;
  stayInfoContainer.innerHTML = table;

  if (!f) displayPassengerForm(totalAdults, totalChildren, totalInfants);
}

function displayPassengerForm(adults, children, infants) {
  f = 1;
  // Add adults
  adultHtml = "";
  for (let i = 1; i <= adults; i++) {
    adultHtml += `
      <h4>Adult ${i}</h4>
      <label for="fname_a_${i}">First Name</label>
      <input type="text" id="fname_a_${i}" required />
      <label for="lname_a_${i}">Last Name</label>
      <input type="text" id="lname_a_${i}" required />
      <label for="ssn_a_${i}">SSN</label>
      <input type="text" id="ssn_a_${i}" required />
      <label for="dob_a_${i}">Date of Birth</label>
      <input type="date" id="dob_a_${i}" required />
    `;
  }
  adultInfoContainer.innerHTML = adultHtml;

  // Add children
  childrenHtml = "";
  for (let i = 1; i <= children; i++) {
    childrenHtml += `
    <h4>Child ${i}</h4>
    <label for="fname_c_${i}">First Name</label>
    <input type="text" id="fname_c_${i}" required />
    <label for="lname_c_${i}">Last Name</label>
    <input type="text" id="lname_c_${i}" required />
    <label for="ssn_c_${i}">SSN</label>
    <input type="text" id="ssn_c_${i}" required />
    <label for="dob_c_${i}">Date of Birth</label>
    <input type="date" id="dob_c_${i}" required />
    `;
  }
  childrenInfoContainer.innerHTML = childrenHtml;

  // Add infants
  infantHtml = "";
  for (let i = 1; i <= infants; i++) {
    infantHtml += `
    <h4>Infant ${i}</h4>
    <label for="fname_i_${i}">First Name</label>
    <input type="text" id="fname_i_${i}" required />
    <label for="lname_i_${i}">Last Name</label>
    <input type="text" id="lname_i_${i}" required />
    <label for="ssn_i_${i}">SSN</label>
    <input type="text" id="ssn_i_${i}" required />
    <label for="dob_i_${i}">Date of Birth</label>
    <input type="date" id="dob_i_${i}" required />
    `;
  }
  infantsInfoContainer.innerHTML = infantHtml;
}

function validatePassengerForm(adults, children, infants) {
  // Adult
  for (let i = 1; i <= adults; i++) {
    const firstName = document.getElementById(`fname_a_${i}`);
    const lastName = document.getElementById(`lname_a_${i}`);
    const ssn = document.getElementById(`ssn_a_${i}`);
    const dob = document.getElementById(`dob_a_${i}`);
    if (!validateSingleEntry(firstName, lastName, dob, ssn)) {
      return false;
    }
  }

  // Children
  for (let i = 1; i <= children; i++) {
    const firstName = document.getElementById(`fname_c_${i}`);
    const lastName = document.getElementById(`lname_c_${i}`);
    const ssn = document.getElementById(`ssn_c_${i}`);
    const dob = document.getElementById(`dob_c_${i}`);
    if (!validateSingleEntry(firstName, lastName, dob, ssn)) {
      return false;
    }
  }

  // Infant
  for (let i = 1; i <= infants; i++) {
    const firstName = document.getElementById(`fname_i_${i}`);
    const lastName = document.getElementById(`lname_i_${i}`);
    const ssn = document.getElementById(`ssn_i_${i}`);
    const dob = document.getElementById(`dob_i_${i}`);
    if (!validateSingleEntry(firstName, lastName, dob, ssn)) {
      return false;
    }
  }
  return true;
}

function validateSingleEntry(firstName, lastName, dob, ssn) {
  let isValid = true;
  let errorMessage = "";
  const namePattern = /^[A-Za-z]+$/;

  // Check if the first name contains only alphabetic characters
  if (!namePattern.test(firstName.value)) {
    errorMessage += "First Name must contain only alphabetic characters.\n";
    isValid = false;
  }
  // Check if the first name contains only alphabetic characters
  if (!namePattern.test(lastName.value)) {
    errorMessage += "Last Name must contain only alphabetic characters.\n";
    isValid = false;
  }
  // Check if the SSN is in the correct format (e.g., XXX-XX-XXXX)
  const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
  if (!ssnPattern.test(ssn.value)) {
    errorMessage += "SSN must be in the format XXX-XX-XXXX.\n";
    isValid = false;
  }
  // Check if the date of birth is a valid date and not in the future
  const today = new Date();
  const dobValue = new Date(dob.value);
  if (!dob.value || dobValue > today) {
    errorMessage +=
      "Date of Birth must be a valid date and cannot be in the future.\n";
    isValid = false;
  }
  // Display error message if any validation fails
  if (!isValid) {
    alert(errorMessage);
    return false;
  }
  return true;
}

displayCart();
displayStaysCart();

class Person {
  constructor(firstName, lastName, ssn, dateOfBirth) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.ssn = ssn;
    this.dateOfBirth = dateOfBirth;
  }
}

document.getElementById("cartForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const passengers = JSON.parse(localStorage.getItem("passengerData"));
  const cart = JSON.parse(localStorage.getItem("cartData"));
  // if (!passengers || !cart) {
  //   alert("Cart/Passenger info is empty!");
  //   return;
  // }
  const stays = JSON.parse(localStorage.getItem("staysCart"));
  const totalAdults = parseInt(passengers.adults);
  const totalChildren = parseInt(passengers.children);
  const totalInfants = parseInt(passengers.infants);
  const adultsData = [];
  const childrenData = [];
  const infantsData = [];

  if (validatePassengerForm(totalAdults, totalChildren, totalInfants)) {
    const bookingId = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log(`Passenger info saved - ${bookingId}`);
    bookingHtml = `<h3>Booking Information</h3><p>Booking Number: ${bookingId}</p>`;

    // display adults
    for (let i = 1; i <= totalAdults; i++) {
      if (i == 1) {
        bookingHtml += "<p>";
      }
      if (i == totalAdults) {
        bookingHtml += "</p>";
      }
      const firstName = document.getElementById(`fname_a_${i}`).value;
      const lastName = document.getElementById(`lname_a_${i}`).value;
      const ssn = document.getElementById(`ssn_a_${i}`).value;
      const dob = document.getElementById(`dob_a_${i}`).value;
      bookingHtml += `
      Adult ${i}<br>
      First Name: ${firstName}<br>
      Last Name: ${lastName}<br>
      SSN: ${ssn}<br>
      Date of Birth: ${dob}<br>
      `;
      adultsData.push(new Person(firstName, lastName, ssn, dob));
    }

    // display children
    for (let i = 1; i <= totalChildren; i++) {
      if (i == 1) {
        bookingHtml += "<p>";
      }
      if (i == totalAdults) {
        bookingHtml += "</p>";
      }
      const firstName = document.getElementById(`fname_c_${i}`).value;
      const lastName = document.getElementById(`lname_c_${i}`).value;
      const ssn = document.getElementById(`ssn_c_${i}`).value;
      const dob = document.getElementById(`dob_c_${i}`).value;
      bookingHtml += `
      Child ${i}<br>
      First Name: ${firstName}<br>
      Last Name: ${lastName}<br>
      SSN: ${ssn}<br>
      Date of Birth: ${dob}<br>
      `;
      childrenData.push(new Person(firstName, lastName, ssn, dob));
    }

    // display infants
    for (let i = 1; i <= totalInfants; i++) {
      if (i == 1) {
        bookingHtml += "<p>";
      }
      if (i == totalAdults) {
        bookingHtml += "</p>";
      }
      const firstName = document.getElementById(`fname_i_${i}`).value;
      const lastName = document.getElementById(`lname_i_${i}`).value;
      const ssn = document.getElementById(`ssn_i_${i}`).value;
      const dob = document.getElementById(`dob_i_${i}`).value;
      bookingHtml += `
      Infant ${i}<br>
      First Name: ${firstName}<br>
      Last Name: ${lastName}<br>
      SSN: ${ssn}<br>
      Date of Birth: ${dob}<br>
      `;
      infantsData.push(new Person(firstName, lastName, ssn, dob));
    }

    bookingInfoContainer.innerHTML =
      bookingHtml + getFlightAndPriceHTML(cart, passengers);

    // Book Flight POST call
    const flightsData = [];
    const ids = [];
    cart.forEach((flight) => {
      ids.push(flight.id);
      flightsData.push({
        flightId: flight.id,
        origin: flight.origin,
        destination: flight.destination,
        departureDate: flight.departureDate,
        arrivalDate: flight.arrivalDate,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
      });
    });
    const bookingData = {
      bookingId: bookingId,
      flights: flightsData,
      passengers: {
        adults: adultsData,
        children: childrenData,
        infants: infantsData,
      },
    };

    // Server API Calls
    bookFlight(ids, totalAdults + totalChildren + totalInfants);
    saveBooking(bookingData);
    flightInfoContainer.innerHTML = "";
    localStorage.removeItem("cartData");
    localStorage.removeItem("passengerData");
    alert("Flight booked succesfully!");

    // Book Stays POST call
    const staysData = [];
    const staysIds = [];
    stays.forEach((stay) => {
      staysIds.push(stay.id);
      staysData.push({
        staysId: stay.hotelId,
        hotelName: stay.name,
        city: stay.city,
        checkIn: stay.checkin,
        checkOut: stay.checkout,
        price: stay.price,
        rooms: stay.numRooms,
      });
    });
    const stayBookingData = {
      //pnr: pnr,
      stays: staysData,
      passengers: {
        adults: adultsData,
        children: childrenData,
        infants: infantsData,
      },
    };

    bookStay(staysData);
    saveStayBooking(stayBookingData);
    alert("Flight booked succesfully!");
  }
});

function bookFlight(ids, numPassengers) {
  // Send POST request to server using fetch
  fetch("http://localhost:3000/book-flight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Important to tell the server it's JSON
    },
    body: JSON.stringify({
      ids: ids,
      count: numPassengers,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Flight Book Call successful");
      console.log(data); // Log server response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function saveBooking(bookingData) {
  // Send POST request to server using fetch
  fetch("http://localhost:3000/save-booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Important to tell the server it's JSON
    },
    body: JSON.stringify(bookingData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Log server response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function bookStay(staysData) {
  // Send POST request to server using fetch
  console.log(staysData);
  fetch("http://localhost:3000/book-stay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Important to tell the server it's JSON
    },
    body: JSON.stringify(staysData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Stay Book Call successful");
      console.log(data); // Log server response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function saveStayBooking(bookingData) {
  // Send POST request to server using fetch
  fetch("http://localhost:3000/save-stay-booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Important to tell the server it's JSON
    },
    body: JSON.stringify(bookingData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Log server response
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
