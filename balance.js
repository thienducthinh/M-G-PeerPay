$(document).ready(function () {
    const userBalance = document.getElementById('balance');
    // Parse the query parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var userEmail = urlParams.get('email');

    // Now userEmail contains the email address
    console.log('User Email:', userEmail);


        // Load and parse the CSV file using jQuery
        // $.get('Users.csv', function (data) {
        //     console.log(data)
        //     // Split CSV data into rows
        //     const rows = data.split('\n');

        //     console.log(rows)

        //     // Loop through each row to check for the user
        //     let userFound = false;
        //     for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        //         const [csvEmail, csvPassword, csvBalance] = rows[i].split(',');

        //         if (csvEmail === userEmail) {
        //             userFound = true;
        //                 // Redirect to the next page if email and password match
        //                 userBalance.textContent = csvBalance;
        //                 console.log()

        //     }
        // }

        // });
        $.get("?tableName=users", function(table){
            //   console.log(appUsers);
            let userFound = false;
            appUsers = JSON.parse(table);
            appUsers.forEach(function(user){
                if (user.email === userEmail) {
                    userFound = true;
                    userBalance.textContent = user.M_and_G;
                }
            });
            
            if (!userFound) {
                errorText.textContent = 'User not found';
            }
        });

});

function getMandGBalance(emailToFind) {
    // Iterate through the appUsers array
    for (let i = 0; i < appUsers.length; i++) {
      const user = appUsers[i];
  
      // Check if the current user's email matches the emailToFind
      if (user.email === emailToFind) {
        // Return the M_and_G balance for the matching user
        return user.M_and_G;
      }
    }
  
    // If the email address is not found, you can return an error message or handle it as needed
    return "Email not found"; // Example error message
  }
  

var appUsers;
  
function getUsers(){

$.get("?tableName=users", function(table){
//   console.log(appUsers);
  $("#usersTable").empty();
  appUsers = JSON.parse(table);
  appUsers.forEach(function(user){

    $("#usersTable").append("<tr><td width=200px>" + user.email + "</td> <td width=50px>" + 
    	user.password + "</td><td width=170px>" + user.M_and_G + "</td></tr>");
  });
//   $("#users").append("<div id=''> </div>")

}); //end $.get

}

