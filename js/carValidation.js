document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Get input values
    const city = document.getElementById("city").value.trim();
    const carType = document.getElementById("carType").value;
    const checkin = new Date(document.getElementById("checkin").value);
    const checkout = new Date(document.getElementById("checkout").value);
    
    const carResult = document.getElementById("carResult");
    carResult.innerHTML = ""; // Clear previous results
    
    // Validation for city
    if (!isValidCity(city)) {
        console.log("Invalid city" + city);
        carResult.innerHTML =
        "<p>Please enter a valid city from Texas or California.</p>";
        return;
    }
    
    // Validation for car type
    if (carType === "") {
        carResult.innerHTML =
        "<p>Please select a valid car type (Economy, SUV, Compact, Midsize).</p>";
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
        carResult.innerHTML =
        "<p>Check-in and check-out dates must be between September 1, 2024, and December 1, 2024, and check-out must be after check-in.</p>";
        return;
    }
    
    // Display entered information if validation passes
    carResult.innerHTML = `
        <p>City: ${city}<br/>
        Car Type: ${carType}<br/>
        Check-in: ${checkin.toDateString()}<br/>
        Check-out: ${checkout.toDateString()}</p>
    `;
    
    // Clear form inputs after successful submission
    document.getElementById("carForm").reset();
});
