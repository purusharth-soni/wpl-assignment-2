const validCities = [
  // Texas
  "Austin",
  "Dallas",
  "Houston",
  "San Antonio",
  "Fort Worth",
  "El Paso",
  "Arlington",
  "Corpus Christi",
  "Plano",
  "Lubbock",
  "McAllen",
  "Amarillo",
  "Brownsville",
  "Waco",
  "Killeen",
  "Midland",
  "Odessa",
  "Harlingen",
  "Laredo",
  "Beaumont",
  "College Station",
  "Wichita Falls",
  "Longview",
  "Abilene",
  "Tyler",

  // California
  "Los Angeles",
  "San Francisco",
  "San Diego",
  "San Jose",
  "Sacramento",
  "Fresno",
  "Oakland",
  "Santa Ana",
  "Long Beach",
  "Burbank",
  "Palm Springs",
  "Ontario",
  "Santa Barbara",
  "Bakersfield",
  "Riverside",
  "Stockton",
  "Modesto",
  "San Bernardino",
  "Redding",
  "Santa Rosa",
  "Oxnard",
  "Visalia",
  "Chico",
  "Monterey",
  "Eureka",
];

function isValidCity(city) {
  if (!city || city.trim() === "") return false;

  return (
    validCities.map((c) => c.toLowerCase()).indexOf(city.toLowerCase()) !== -1
  );
}

function updateDateTime() {
    const now = new Date();
    const datetimeElement = document.getElementById('datetime');
    datetimeElement.textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();