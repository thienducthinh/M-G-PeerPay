// Creating your own Web server with nodejs and conencting to mySQL database

var http = require('http');     
var fs = require('fs');         
var url = require('url');       
var path = require('path');     
var mysql = require("mysql");
var fileExtensions = {
     ".html":    "text/html",
     ".css":     "text/css",
     ".js":      "text/javascript",
     ".jpeg":    "image/jpeg",
     ".jpg":     "image/jpeg",
     ".png":     "image/png"
 };

//replace the below parameters with your own

var con = mysql.createConnection({
    host: "107.180.1.16",
    user: "fall2023team8",
    password: "fall2023team8",
    database: "fall2023team8"
});
con.connect();


/*
var server = http.createServer(function(request, response) { 


//console.log(request.url);
//console.log(request.headers.host);
var base = "http://" + request.headers.host;
//console.log(base);
var completeurl = new URL(request.url, base);
// console.log(completeurl);
//console.log(completeurl.href);

var table = completeurl.searchParams.get("tableName");
// console.log(table);
if (table=="products") {

var myQuery = "SELECT * FROM ProductService";
con.query(myQuery, function(err, result, fields){
// console.log(result);
	response.end(JSON.stringify(result));
});

}

else {
    var pathname = url.parse(request.url).pathname;
    var filename;
    if(pathname === "/") {
        // change the 'filename' to the homepage of your website (if other than "index.html") 
        filename = "index.html"; 
    }
    else
        filename = path.join(process.cwd(), pathname);

    try {
        fs.accessSync(filename, fs.F_OK);
        var fileStream = fs.createReadStream(filename);
        var typeAttribute = fileExtensions[path.extname(filename)];
        response.writeHead(200, {'Content-Type': typeAttribute});
        fileStream.pipe(response);
    }
    catch(e) {
            console.log("\n\n");
            console.log('File does not exist: ' + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 - File Not Found (' + filename + ')');
            response.end();
    }
} // end for else
}); // var server = http.createServer



server.listen(3306);

*/







// Creating your own Web server with nodejs and conencting to mySQL database
// use this template for your Project Phase 2

// var http = require('http');     
// var fs = require('fs');         
// var url = require('url');       
// var path = require('path');     
// var mysql = require("mysql");
// var fileExtensions = {
//      ".html":    "text/html",
//      ".css":     "text/css",
//      ".js":      "text/javascript",
//      ".jpeg":    "image/jpeg",
//      ".jpg":     "image/jpeg",
//      ".png":     "image/png"
//  };

// //replace the below parameters with your own

// var con = mysql.createConnection({
//     host: "sql.wpc-is.online",
//     user: "jjfabian",
//     password: "jjfa0533",
//     database: "db_test_jjfabian"
// });
// con.connect();

var server = http.createServer(function(request, response) { 

//console.log(request.url);
//console.log(request.headers.host);
var base = "http://" + request.headers.host;
//console.log(base);
var completeurl = new URL(request.url, base);
// console.log(completeurl);
//console.log(completeurl.href);

var table = completeurl.searchParams.get("tableName");
// console.log(table);
if (table == "users") {
    // get into sql
var MyQuery = "SELECT * from users";
con.query(MyQuery, function(err, result, fields){
    // console.log(result);
    response.end(JSON.stringify(result));

}); 

}

else {

    var pathname = url.parse(request.url).pathname;
    var filename;
    if(pathname === "/") {
        // change the 'filename' to the homepage of your website (if other than "index.html") 
        filename = "index.html"; 
    }
    else
        filename = path.join(process.cwd(), pathname);

    try {
        fs.accessSync(filename, fs.F_OK);
        var fileStream = fs.createReadStream(filename);
        var typeAttribute = fileExtensions[path.extname(filename)];
        response.writeHead(200, {'Content-Type': typeAttribute});
        fileStream.pipe(response);
    }
    catch(e) {
            console.log("\n\n");
            console.log('File does not exist: ' + filename);
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 - File Not Found (' + filename + ')');
            response.end();
    }
} // end for else
}); // var server = http.createServer

server.listen(3306);
console.log("\nThe Web server is alive!!!\n"  + 
    "It's listening on http://127.0.0.1:3306 or http://localhost:3306");