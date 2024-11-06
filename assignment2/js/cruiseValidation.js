$(document).ready(function () {
    $("#cruiseForm").submit(function (event) {
        event.preventDefault();
        
        // Get input values
        const destination = $("#destination").val();
        const departureDate = new Date($("#departureDate").val());
        const durationMin = parseInt($("#durationMin").val());
        const durationMax = parseInt($("#durationMax").val());
        const adults = parseInt($("#adults").val());
        const children = parseInt($("#children").val());
        const infants = parseInt($("#infants").val());
        
        // Validation
        const validDestinations = ["Alaska", "Bahamas", "Europe", "Mexico"];
        const startDate = new Date("2024-09-01");
        const endDate = new Date("2024-12-01");
        
        if (!validDestinations.includes(destination)) {
            alert(
                "Invalid destination. Please select from Alaska, Bahamas, Europe, or Mexico."
            );
            return;
        }
        
        if (departureDate < startDate || departureDate > endDate) {
            alert("Departure date must be between Sep 1, 2024 and Dec 1, 2024.");
            return;
        }
        
        if (durationMin < 3 || durationMax > 10 || durationMin > durationMax) {
            alert(
                "Duration must be between 3 and 10 days, and minimum cannot exceed maximum."
            );
            return;
        }
        
        // Display entered information
        $("#result").html(`
                <p>Booking Information<br/>
                Destination: ${destination}<br/>
                Departing at: ${departureDate.toLocaleDateString()}<br/>
                Duration: ${durationMin} to ${durationMax} days<br/>
                Adults: ${adults}<br/>
                Children: ${children}<br/>
                Infants: ${infants}</p>
            `);
        });
    });
    