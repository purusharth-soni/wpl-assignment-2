const validCities = [
    "Houston", "San Antonio", "Dallas", "Austin", "Fort Worth",
    "El Paso", "Arlington", "Corpus Christi", "Plano", "Garland",
    "Lubbock", "Laredo", "Irving", "Amarillo", "Brownsville",

    "Los Angeles", "San Diego", "San Jose", "San Francisco",
    "Long Beach", "Sacramento", "Fresno", "Oakland", "Santa Ana",
    "Anaheim", "Riverside", "Bakersfield", "Stockton", "Modesto",
    "Chula Vista"
];

function isValidCity(city) {
    if (!city || city.trim() === "") return false;
    
    return (
        validCities.map((c) => c.toLowerCase()).indexOf(city.toLowerCase()) !== -1
    );
}

function updateDateTime() {
    const now = new Date();
    const datetimeElement = document.getElementsByClassName("datetime")[0]; 
    datetimeElement.textContent = now.toLocaleString();
}
setInterval(updateDateTime, 1000);
updateDateTime();