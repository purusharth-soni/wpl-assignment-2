document.getElementById("staysForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect input values
  const city = document.getElementById("city").value.trim();
  const checkin = new Date(document.getElementById("checkin").value);
  const checkout = new Date(document.getElementById("checkout").value);
  const adults = parseInt(document.getElementById("adults").value, 10);
  const children = parseInt(document.getElementById("children").value, 10);
  const infants = parseInt(document.getElementById("infants").value, 10);

  const staysResult = document.getElementById("staysResult");
  staysResult.innerHTML = ""; // Clear previous results

  // Validation for city
  if (!isValidCity(city)) {
    staysResult.innerHTML =
      "<p>Please enter a valid city from Texas or California.</p>";
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
  ) {
    staysResult.innerHTML =
      "<p>Check-in and check-out dates must be between September 1, 2024, and December 1, 2024, and check-out must be after check-in.</p>";
    return;
  }

  // Calculate number of rooms
  let totalGuests = adults + children;
  let roomsNeeded = Math.ceil(totalGuests / 2);

  // Display information
  staysResult.innerHTML = `
  <h2>Booking Information:<h2>
  <p>City: ${city}</p>
  <p>Check-in: ${checkin.toDateString()}</p>
  <p>Check-out: ${checkout.toDateString()}</p>
  <p>Number of Adults: ${adults}</p>
  <p>Number of Children: ${children}</p>
  <p>Number of Infants: ${infants}</p>
  <p>Rooms Needed: ${roomsNeeded}</p>
`;

  // Clear form inputs after successful search
  document.getElementById("staysForm").reset();
});
