$(document).ready(function () {
  const userBalance = document.getElementById('balance');
  // Parse the query parameter from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var userEmail = urlParams.get('email');

  // Now userEmail contains the email address
  console.log('User Email:', userEmail);
  $.get("?tableName=users", function(table){
      //   console.log(appUsers);
      let userFound = false;
      appUsers = JSON.parse(table);
      appUsers.forEach(function(user){  
          userFound = true;
          userBalance.textContent = user.M_and_G;
      });
      
  });

});

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