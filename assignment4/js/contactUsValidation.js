document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const comments = document.getElementById("comments").value.trim();
    
    if (localStorage.getItem("user-fname") === null) {
        alert("Please login to submit a contact form.");
        return;
    }
    
    if (comments.length < 10) {
        alert("Comments must be at least 10 characters long.");
        return;
    }
    
    try {
        // Fetch user data asynchronously
        const user = await fetchUserData();
        const commentId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const firstName = user["fname"];
        const lastName = user["lname"];
        const phone = user["phone"];
        const email = user["email"];
        const gender = user["gender"];
        
        console.log(`Name: ${firstName} ${lastName}, Phone: ${phone}, Email: ${email}, Gender: ${gender}`);
        
        // Generate XML data
        const xmlData = `
        <contact>
            <commentId>${commentId}</commentId>
            <firstName>${firstName}</firstName>
            <lastName>${lastName}</lastName>
            <phone>${phone}</phone>
            <email>${email}</email>
            <gender>${gender}</gender>
            <comment>${comments}</comment>
        </contact>
      `;
        
        // TODO append to a xmlData to xml file
        
        // Show result if all validations pass
        alert(`Thank you for your submission, ${firstName}!`);
    } catch (error) {
        console.error(error.message);
        alert("An error occurred. Please try again.");
    }
});

async function fetchUserData() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:5500/php/comments.php", true); // Async mode
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText)[0];
                        if (response["success"] === "true") {
                            resolve(response);
                        } else {
                            reject(new Error("User data retrieval failed."));
                        }
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error(`Request failed with status: ${xhr.status}`));
                }
            }
        };
        xhr.send(
            JSON.stringify({
                phone: localStorage.getItem("user-phone"),
            })
        );
    });
}
