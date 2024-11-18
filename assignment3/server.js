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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
