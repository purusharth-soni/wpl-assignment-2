// validation.js for flights.html
  const tripTypeSelect = document.getElementById("tripType");
  const passengerIcon = document.getElementById("passengerIcon");
  const passengerForm = document.getElementById("passengerForm");
  const now = new Date();
  const startDate = new Date("2024-09-01");
  const endDate = new Date("2024-12-01");
	
  // Show/hide arrival date based on trip type
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
  
  // Validate departure date
  if (!departure || new Date(departure) < startDate || new Date(departure) > endDate) {
    alert("Departure date must be between September 1, 2024 and December 1, 2024.");
    return;
  }

  // Validate cities (hardcoded list for simplicity)
  const validCities = ["austin", "houston", "dallas", "fort worth", "san antonio", "el paso", "lubbock", "los angeles", "san francisco", "san diego", "san jose", "sacramento", "oakland", "burbank", "orange county"];
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
  
  var flightResult;
  // Show flight details
  if (tripTypeSelect.value === "roundtrip") {
	flightResult = `Trip Type: ${tripTypeSelect.value}, Origin: ${origin}, Destination: ${destination}, Departure: ${departure}, Arrival: ${arrival}, Adults: ${adults}, Children: ${children}, Infants: ${infants}`;
  }
  else{
	flightResult = `Trip Type: ${tripTypeSelect.value}, Origin: ${origin}, Destination: ${destination}, Departure: ${departure}, Adults: ${adults}, Children: ${children}, Infants: ${infants}`;
  }
  document.getElementById("flightResult").textContent = flightResult;
});
