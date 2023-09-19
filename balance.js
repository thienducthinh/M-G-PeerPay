$(document).ready(function () {
    const userBalance = document.getElementById('balance');
    // Parse the query parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var userEmail = urlParams.get('email');

    // Now userEmail contains the email address
    console.log('User Email:', userEmail);


        // Load and parse the CSV file using jQuery
        $.get('Users.csv', function (data) {
            console.log(data)
            // Split CSV data into rows
            const rows = data.split('\n');

            console.log(rows)

            // Loop through each row to check for the user
            let userFound = false;
            for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
                const [csvEmail, csvPassword, csvBalance] = rows[i].split(',');

                if (csvEmail === userEmail) {
                    userFound = true;
                        // Redirect to the next page if email and password match
                        userBalance.textContent = csvBalance;
                        console.log()

            }
        }

        });

});