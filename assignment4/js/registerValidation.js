document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("pass").value.trim();
    const cPassword = document.getElementById("cpass").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("email").value.trim();
    var gender = document.querySelector('input[name="gender"]:checked');
    if (gender === null) {
        gender = "undefined";
    } else {
        gender = gender.value;
    }
    
    const nameRegex = /^[A-Z][a-z]*$/; // Capitalized alphabetic names
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // ddd-ddd-dddd
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    
    // Validate first name
    if (!nameRegex.test(firstName)) {
        alert(
            "First name must start with a capital letter and be alphabetic only."
        );
        return;
    }
    
    // Validate last name
    if (!nameRegex.test(lastName)) {
        alert("Last name must start with a capital letter and be alphabetic only.");
        return;
    }
    
    // Validate phone
    if (!phoneRegex.test(phone)) {
        alert("Phone number must be in the format (ddd) ddd-dddd.");
        return;
    }
    
    // Validate email
    if (!emailRegex.test(email)) {
        alert("Email must be valid and contain @ and .");
        return;
    }
    
    // Validate password
    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }
    if (password !== cPassword) {
        alert("Passwords do not match.");
        return;
    }
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5500/php/register.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(
        JSON.stringify({
            phone: phone,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            email: email,
            gender: gender
        })
    );
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            if (xhr.responseText === "success") {
                alert("Registration successful!");
            } else {
                alert("Registration failed.");
            }
        }
    };
});
