const express = require("express");
const fs = require("fs");
const xml2js = require("xml2js");
const cors = require("cors");

const app = express();
app.use(cors()); // Enables CORS for all routes
app.use(express.json());

// File paths
const flightsXML = "./data/flights.xml";
const bookingsJSON = "./data/bookings.json";
const staysXML = "./data/stays.xml";
const staysJSON = "./data/hotels.json";

// Endpoind to update available seats
app.post("/book-flight", (req, res) => {
  console.log("Request: " + req.body);
  const { ids, count } = req.body;

  // Read the XML file
  fs.readFile(flightsXML, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading the XML file - ", err);
      return res.status(500).send("Error reading the XML file");
    }

    // Parse the XML data
    xml2js.parseString(data, (parseErr, result) => {
      if (parseErr) {
        return res.status(500).send("Error parsing XML data");
      }

      let updated = false;
      const flights = result.flights.flight; // Adjust path as per your XML structure

      console.log("Flight IDs recieved: " + ids);
      flights.forEach((flight) => {
        if (flight["flight-id"] && ids.includes(flight["flight-id"][0])) {
          flight["available-seats"][0] = String(
            parseInt(flight["available-seats"][0]) - count
          );
          updated = true;
        }
      });

      if (!updated) {
        return res.status(404).send("Flight ID not found");
      }

      // Convert the modified JS object back to XML
      const builder = new xml2js.Builder();
      const updatedXML = builder.buildObject(result);

      // Write the updated XML back to the file
      fs.writeFile(flightsXML, updatedXML, (writeErr) => {
        if (writeErr) {
          return res.status(500).send("Error writing to the XML file");
        }
        res.status(200).send("Flight Booked successfully");
      });
    });
  });
});

// Endpoint to save flight booking
app.post("/save-booking", (req, res) => {
  const data = req.body; // Get data from the request body

  // Read existing data (if any) and append new data
  fs.readFile(bookingsJSON, "utf8", (err, fileData) => {
    let jsonData = [];

    if (!err && fileData) {
      // Parse existing data if the file is not empty
      jsonData = JSON.parse(fileData);
    }

    // Append new data to existing array
    jsonData.push(data);

    // Write updated data to the file
    fs.writeFile(
      bookingsJSON,
      JSON.stringify(jsonData, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing to file", writeErr);
          return res.status(500).send("Failed to save booking");
        }

        res.status(200).send("Booking successfully saved");
      }
    );
  });
});

// Endpoind to update available rooms
app.post("/book-stay", (req, res) => {
  //console.log("Request: " + req.body);
  const staysData = req.body;

  console.log(staysData)
  // Read and update JSON file
  fs.readFile(staysJSON, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return res.status(500).send("Error reading JSON file");
  }
  
  let hotels = JSON.parse(data);
  
  staysData.forEach((stay) => {
    const { staysId, checkIn, checkOut, rooms } = stay;

    // Find the corresponding hotel
    const hotel = hotels.find((h) => h.hotelId === staysId);

  
    if (!hotel) {
      console.error(`Hotel with ID ${staysId} not found.`);
      return;
    }

    // Convert check-in and check-out dates to Date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    console.log("found hotel : " + hotel)

    for (let d = new Date(checkInDate); d <= checkOutDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

      // Find the availability entry for the current date
      const availabilityEntry = hotel.availability.find((a) => a.date === dateStr);
      // Decrease the room count
      availabilityEntry.rooms -= rooms;
    }
  });

  // Write updated JSON back to file
  fs.writeFile(staysJSON, JSON.stringify(hotels, null, 2), (writeErr) => {
    if (writeErr) {
      console.error("Error writing JSON file:", writeErr);
      return res.status(500).send("Error writing JSON file");
    } 
  });
});
});

// Endpoint to save stay booking
app.post("/save-stay-booking", (req, res) => {

  const bookingData = req.body;
  //console.log(bookingData)
  const staysData = bookingData['stays'];
  // Read the XML file
  fs.readFile(staysXML, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading XML file:", err);
      return callback(err);
    }

    // Parse the XML data
    xml2js.parseString(data, (parseErr, result) => {
      if (parseErr) {
        console.error("Error parsing XML:", parseErr);
        return callback(parseErr);
      }

      // Ensure "bookings" and "booking" array exist
      if (!result.bookings) {
        result.bookings = {};
      }

      // console.log(result.bookings);
      if (!result.bookings.booking) {
        result.bookings.booking = [];
      }

      console.log(staysData);
      // Prepare new booking entries
      staysData.forEach((stay) => {
        console.log("allo")
        console.log(stay)
        const newBooking = {
          "hotel-id": stay.staysId,
          "hotel-name": stay.hotelName,
          "city": stay.city,
          "check-in": stay.checkIn,
          "check-out": stay.checkOut,
          "price": stay.price,
          "rooms": stay.rooms.toString(),
        };

        console.log(newBooking);
        // console.log(result.bookings.booking)
        result.bookings.booking.push(newBooking);
      });

      // Build the updated XML
      const builder = new xml2js.Builder();
      const updatedXML = builder.buildObject(result);

      // Write back to the XML file
      fs.writeFile(staysXML, updatedXML, (writeErr) => {
        if (writeErr) {
          console.error("Error writing to XML file:", writeErr);
          return callback(writeErr);
        }
        console.log("Booking info appended to XML successfully!");
        // callback(null);
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
