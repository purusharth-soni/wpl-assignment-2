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

// Load settings from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const savedFontSize = localStorage.getItem("fontSize") || "medium"; // Default to medium
    const savedBgColor = localStorage.getItem("bgColor") || "white"; // Default to white
    
    // Apply the saved settings
    document.getElementById("fontSize").value = savedFontSize;
    document.getElementsByClassName("container")[0].style.fontSize = 
        savedFontSize === "small" ? "12px" : 
        savedFontSize === "medium" ? "16px" : 
        "20px";
    document.getElementById("bgColor").value = savedBgColor;
    document.body.style.backgroundColor = savedBgColor;
});

document.getElementById("fontSize").addEventListener("change", function () {
    const fontSize = document.getElementById("fontSize").value;
    document.getElementsByClassName("container")[0].style.fontSize = 
        fontSize === "small" ? "12px" : 
        fontSize === "medium" ? "16px" : 
        "20px";
    localStorage.setItem("fontSize", fontSize); // Save to localStorage
});

document.getElementById("bgColor").addEventListener("change", function () {
    const bgColor = document.getElementById("bgColor").value;
    document.body.style.backgroundColor = bgColor;
    localStorage.setItem("bgColor", bgColor); // Save to localStorage
});

if (localStorage.getItem("user-fname")) {
    document.getElementById("user_info").textContent = 
        `Welcome, ${localStorage.getItem("user-fname")} ${localStorage.getItem("user-lname")}!`;
}