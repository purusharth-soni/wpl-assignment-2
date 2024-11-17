const express = require("express");
const fs = require("fs");
const xml2js = require("xml2js");
const cors = require("cors");

const app = express();
app.use(cors()); // Enables CORS for all routes
app.use(express.json());

app.post("/book-flight", (req, res) => {
  console.log("Request: " + req.body);
  const { flightId } = req.body;

  // Read the XML file
  fs.readFile("../data/flights.xml", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the XML file");
    }

    // Parse the XML data
    xml2js.parseString(data, (parseErr, result) => {
      if (parseErr) {
        return res.status(500).send("Error parsing XML data");
      }

      let updated = false;
      const flights = result.flights.flight; // Adjust path as per your XML structure

      console.log("Flight ID recieved: " + flightId);
      flights.forEach((flight) => {
        if (flight["flight-id"] && flight["flight-id"][0] == flightId) {
          flight["available-seats"][0] = String(
            parseInt(flight["available-seats"][0]) - 1
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
      fs.writeFile("../data/flights.xml", updatedXML, (writeErr) => {
        if (writeErr) {
          return res.status(500).send("Error writing to the XML file");
        }
      });
    });
  });
  return res.status(200).send("Flight Booked successfully");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
