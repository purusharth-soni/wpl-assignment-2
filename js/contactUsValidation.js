// validation.js for contact-us.html
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const comments = document.getElementById("comments").value.trim();

  const nameRegex = /^[A-Z][a-z]*$/; // Capitalized alphabetic names
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // (ddd) ddd-dddd
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
  let isValid = true;

  // Validate first name
  if (!nameRegex.test(firstName)) {
    alert("First name must start with a capital letter and be alphabetic only.");
    isValid = false;
  }

  // Validate last name
  if (!nameRegex.test(lastName)) {
    alert("Last name must start with a capital letter and be alphabetic only.");
    isValid = false;
  }

  // Validate first and last name are not the same
  if (firstName === lastName) {
    alert("First name and last name cannot be the same.");
    isValid = false;
  }

  // Validate phone
  if (!phoneRegex.test(phone)) {
    alert("Phone number must be in the format (ddd) ddd-dddd.");
    isValid = false;
  }

  // Validate email
  if (!emailRegex.test(email)) {
    alert("Email must be valid and contain @ and .");
    isValid = false;
  }

  // Validate gender
  if (!gender) {
    alert("Please select a gender.");
    isValid = false;
  }

  // Validate comments
  if (comments.length < 10) {
    alert("Comments must be at least 10 characters long.");
    isValid = false;
  }

  // Show result if all validations pass
  if (isValid) {
    document.getElementById("contactResult").textContent = 
      `Thank you for your submission, ${firstName}!`;
  }
});
