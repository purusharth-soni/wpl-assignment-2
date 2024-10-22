// validation.js for flights.html
  const tripTypeSelect = document.getElementById("tripType");
  const origin = document.getElementById("origin").value.trim().toLowerCase();
  const destination = document.getElementById("destination").value.trim().toLowerCase();
  const departure = document.getElementById("departure").value;
  const arrivalDateField = document.getElementById("arrivalDateField");
  const passengerIcon = document.getElementById("passengerIcon");
  const passengerForm = document.getElementById("passengerForm");
  const now = new Date();
  const startDate = new Date("2024-09-01");
  const endDate = new Date("2024-12-01");
	
  // Show/hide arrival date based on trip type
  tripTypeSelect.addEventListener("change", function () {
	  console.log(tripTypeSelect.value);
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
  
  console.log(departure);
  // Validate departure date
  if (!departure || new Date(departure) < startDate || new Date(departure) > endDate) {
	  console.log(departure);
	  console.log(startDate);
	  console.log(endDate);
    alert("Departure date must be between September 1, 2024 and December 1, 2024.");
    return;
  }

  // Validate cities (hardcoded list for simplicity)
  const validCities = ["austin", "houston", "dallas", "fort worth", "san antonio", "el paso", "lubbock", "los angeles", "san francisco", "san diego", "san jose", "sacramento", "oakland", "burbank", "orange county"];
  if (!validCities.includes(origin) || !validCities.includes(destination)) {
    alert("Origin and destination must be cities in Texas or California.");
    return;
  }

  // Additional round trip validations
  if (tripTypeSelect.value === "roundtrip") {
    const arrival = document.getElementById("arrival").value;
    if (!arrival || new Date(arrival) < startDate || new Date(arrival) > endDate) {
      alert("Arrival date must be between September 1, 2024 and December 1, 2024.");
      return;
    }
  }

  // Show flight details
  const flightResult = `Trip Type: ${tripTypeSelect.value}, Origin: ${origin}, Destination: ${destination}, Departure: ${departure}`;
  document.getElementById("flightResult").textContent = flightResult;
});
