$(document).ready(function () {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const errorText = document.getElementById('errorText');

    // Event listener for the login button click
    loginButton.addEventListener('click', function () {
        // Get user input
        console.log("button press")
        const emailInput = document.getElementById('email').value;
        console.log(emailInput)
        const passwordInput = document.getElementById('password').value;
        

        // Load and parse the CSV file using jQuery
        $.get('Users.csv', function (data) {
            // Split CSV data into rows
            const rows = data.split('\n');

            // Loop through each row to check for the user
            let userFound = false;
            for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
                const [csvEmail,csvPassword] = rows[i].split(',');

                if (csvEmail === emailInput) {
                    userFound = true;
                    if (csvPassword === passwordInput) {
                        // Redirect to the next page if email and password match
                        // Assuming userEmailAddress contains the email address
                        window.location.href = 'dashboard.html?email=' + encodeURIComponent(csvEmail);
                    } else {
                        errorText.textContent = 'Incorrect password';
                    }
                    break;
                }
            }

            if (!userFound) {
                errorText.textContent = 'User not found';
            }
        });
    });
});