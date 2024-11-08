document.getElementById("staysForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect input values
    const city = document.getElementById("city").value.trim();
    const checkin = new Date(document.getElementById("checkin").value);
    const checkout = new Date(document.getElementById("checkout").value);
    const adults = parseInt(document.getElementById("adults").value, 10);
    const children = parseInt(document.getElementById("children").value, 10);
    const infants = parseInt(document.getElementById("infants").value, 10);
    
    const staysResult = document.getElementsByClassName("result")[0];
    staysResult.innerHTML = ""; // Clear previous results
    
    // Validation for city
    if (!isValidCity(city)) {
        alert("Please enter a valid city from Texas or California.");
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
        alert("Check-in and check-out dates must be between September 1, 2024," +
            " and December 1, 2024, and check-out must be after check-in.");
            return;
        }
	
	// Calculate number of rooms
    let totalGuests = adults + children;
    let roomsNeeded = Math.ceil(totalGuests / 2);
	
	let hotelsData = [];
	let filteredHotels = [];
	
	// Fetch the JSON file containing hotel data
	fetch('./data/hotels.json')
		.then(response => response.json())
		.then(data => {
			hotelsData = data; // Store the data in the variable
			
			hotelsData.forEach(hotel => {
				
				console.log(hotel.hotelId)
				if(hotel.city.toLowerCase() != city.toLowerCase()){
					return;
				}
				
				let allDatesAvailable = true; // Assume all dates are available initially
				let price = 0;
				let cnt = 0;
				
				// Loop through each date from checkin to checkout
				for (let currentDate = new Date(checkin); currentDate <= checkout; currentDate.setDate(currentDate.getDate() + 1)) {
					const formattedDate = currentDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
					
					// Find availability entry for this date
					const availabilityEntry = hotel.availability.find(entry => entry.date === formattedDate);
					
					// If any date doesn't have enough rooms, mark hotel as unavailable
					if (!availabilityEntry || availabilityEntry.rooms < roomsNeeded) {
						allDatesAvailable = false; // This hotel is unavailable for this range
						break; // No need to check further dates
					}
					
					price += availabilityEntry.price;
					cnt++;
				}
				//(hotel-id, hotel name, city, check in date, check out date, and price per night
				if(allDatesAvailable){
					
					price /= cnt;
					
					let validHotel = {"hotelId" : hotel.hotelId, "name" : hotel.name, "city" : hotel.city, "checkin" : checkin, "checkout" : checkout, "price" : price};
					filteredHotels.push(validHotel);
				}
			})
			
			// Display filtered hotels
			if (filteredHotels.length > 0) {
				filteredHotels.forEach(hotel => {

					staysResult.innerHTML += `
						<div class="hotel">
							<p><strong>Hotel ID:</strong> ${hotel.hotelId}</p>
							<p><strong>Hotel Name:</strong> ${hotel.name}</p>
							<p><strong>City:</strong> ${hotel.city}</p>
							<p><strong>Check-in Date:</strong> ${checkin.toDateString()}</p>
							<p><strong>Check-out Date:</strong> ${checkout.toDateString()}</p>
							<p><strong>Price per Night:</strong> ${hotel.price}</p>
							<button onclick="addToCart(${JSON.stringify(hotel)}, '${checkin}', '${checkout}', ${adults}, ${children})">Add to Cart</button>
						</div>
					`;
				});
			} else {
				staysResult.innerHTML = "<p>No hotels available for the selected criteria.</p>";
			}
		})
		.catch(error => console.error("Error fetching hotel data:", error));

        
    // Display information
    //staysResult.innerHTML = `
    //    <p>Booking Information:<br/>
    //    City: ${city}<br/>
    //    Check-in: ${checkin.toDateString()}<br/>
    //    Check-out: ${checkout.toDateString()}<br/>
    //    Number of Adults: ${adults}<br/>
    //    Number of Children: ${children}<br/>
    //    Number of Infants: ${infants}<br/>
    //    Rooms Needed: ${roomsNeeded}</p>
    // `;
        
    // Clear form inputs after successful search
    document.getElementById("staysForm").reset();
    });
    