document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("pass").value.trim();

    if (!phone || !password) {
        alert("Please fill out all fields.");
        return;
    }

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // ddd-ddd-dddd
    if (!phoneRegex.test(phone)) {
        alert("Phone number must be in the format ddd-ddd-dddd.");
        return;
    }
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5500/php/login.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(
        JSON.stringify({
            phone: phone,
            password: password
        })
    );
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.responseText)[0];
            if (response["success"] === "true") {
                localStorage.clear();
                localStorage.setItem("user-fname", response["fname"]);
                localStorage.setItem("user-lname", response["lname"]);
                localStorage.setItem("user-phone", response["phone"]);
                location.reload();
                alert("Login successful!");
            } else {
                alert("Login failed.");
            }
        }
    };
});
