$(document).ready(function () {
  const userBalance = document.getElementById('balance');
  const userName = document.getElementById('dashboard-name');
  // Parse the query parameter from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var userEmail = urlParams.get('email');

  // Now userEmail contains the email address
  console.log('User Email:', userEmail);
  $.get('/api/users?email=' + encodeURIComponent(userEmail), function(user){
    console.log(user)
      userBalance.textContent = user[0].M_and_G;
      userName.textContent = user[0].name;
  });

}); 

function getUsers(){
  $.get('/api/users', function(users){
    $("#usersTable").empty();
    users.forEach(function(user){
      $("#usersTable").append("<tr><td width=200px>" + user.email + "</td><td width=170px>" + user.M_and_G + "</td></tr>");
    });
  });
}

function transfer() {
  var urlParams = new URLSearchParams(window.location.search);
  var senderEmail = urlParams.get("email");
  console.log(senderEmail)
  var receiverEmail = document.getElementById("friendEmail").value;
  var amount = parseFloat(document.getElementById("amount").value);
  var requestData = {
  senderEmail: senderEmail,
  receiverEmail: receiverEmail,
  amount: amount
  };

  fetch("/api/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
    getUsers()
  })
  .catch(error => {
    console.error("Error:", error);
  });
  location.reload();
}