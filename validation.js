// Form validation for stays
document.getElementById("staysForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.getElementById("city").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;

  if (guests > 2) {
    alert("No more than 2 guests per room!");
    return;
  }

  document.getElementById(
    "staysResult"
  ).textContent = `City: ${city}, Check-in: ${checkin}, Check-out: ${checkout}, Guests: ${guests}`;
});

// Similar validation can be added for flights, cars, and contact-us
