const flightInfoContainer = document.getElementsByClassName(
  "flightInfoContainer"
)[0];
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

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cartData"));
  const passengers = JSON.parse(localStorage.getItem("passengerData"));
  if (!cart || !passengers) {
    flightInfoContainer.innerHTML = "<p>Cart is Empty!</p>";
    return;
  }
  adults = parseInt(passengers.adults);
  children = parseInt(passengers.children);
  infants = parseInt(passengers.infants);

  flightInfoContainer.innerHTML += "<h3>Selected Flight</h3>";
  cart.forEach((flight) => {
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
    table += "</table>";
    singlePrice = parseFloat(flight.price);
    totalPrice = (adults + 0.7 * children + 0.1 * infants) * singlePrice;
    table += `
        <p>Prices -</p>
        <p>Adult: $${adults * singlePrice}<br>
        Children: $${children * singlePrice * 0.7}<br>
        Infant: $${infants * singlePrice * 0.1}<br>
        Total: $${totalPrice}<br>
        </p>
    `;
    flightInfoContainer.innerHTML += table;
  });

  displayPassengerForm(adults, children, infants);
}

function displayPassengerForm(adults, children, infants) {
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

document.getElementById("cartForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const passengers = JSON.parse(localStorage.getItem("passengerData"));
  if (!passengers) {
    alert("Passenger Information not loaded!");
    return;
  }
  adults = parseInt(passengers.adults);
  children = parseInt(passengers.children);
  infants = parseInt(passengers.infants);

  if (validatePassengerForm(adults, children, infants)) {
    const pnr = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log(`Passenger info saved - ${pnr}`);
    bookingHtml = `<h3>Booking Information</h3><p>Booking Number: ${pnr}</p>`;

    // display adults
    for (let i = 1; i <= adults; i++) {
      if (i == 1) {
        bookingHtml += "<p>";
      }
      if (i == adults) {
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
    }

    // display children
    for (let i = 1; i <= children; i++) {
      if (i == 1) {
        bookingHtml += "<p>";
      }
      if (i == adults) {
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
    }

    // display infants
    for (let i = 1; i <= infants; i++) {
      if (i == 1) {
        bookingHtml += "<p>";
      }
      if (i == adults) {
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
    }

    bookingInfoContainer.innerHTML = bookingHtml;
    alert("Flight booked succesfully!");
  }
});

displayCart();
