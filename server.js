// Creating your own Web server with nodejs and conencting to mySQL database

var http = require('http');
var fs = require('fs');
var url = require('url');
const { openConn, closeConn } = require('./dbConn');
var path = require('path');
var querystring = require('querystring');

var mysql = require("mysql");
var fileExtensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png"
};

//replace the below parameters with your own

/*
var con = mysql.createConnection({
    host: "107.180.1.16",
    user: "fall2023team8",
    password: "fall2023team8",
    database: "fall2023team8"
});
*/
//con.connect();

var server = http.createServer(function (request, response) {

    //console.log(request.url);
    //console.log(request.headers.host);
    var base = "http://" + request.headers.host;
    //console.log(base);
    var completeurl = new URL(request.url, base);
    console.log(completeurl);
    //console.log(completeurl.href);

    var table = completeurl.searchParams.get("tableName");
    // console.log(table);
    if (table == "users") {
        // get into sql
        openConn()
            .then((con) => {
                console.log("Connected!");
                var MyQuery = "SELECT * FROM users";
                con.query(MyQuery, function (err, result, fields) {
                    if (err) throw err;
                    response.end(JSON.stringify(result));
                    closeConn(con);
                });
            })
            .catch((error) => {
                console.log("Db not connected successfully", error);
            });
    } else if (request.method === 'POST' && completeurl.pathname === "/updateBalance") {

        console.log(request.body)
        // Handle POST request to update balance
        var requestData = '';
        request.on('data', function (chunk) {
            requestData += chunk;
        });

        request.on('end', function () {
            //var postData = querystring.parse(requestData);
            var postData = JSON.parse(requestData);
            console.log(postData)
            var senderEmail = postData.senderEmail;
            var receiverEmail = postData.receiverEmail;
            var amount = parseFloat(postData.amount);

            if (isNaN(amount) || amount <= 0) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid amount. Please enter a positive number.' }));
                return;
            }

            // Update the sender's balance
            var updateSenderQuery = `
            UPDATE users
            SET M_and_G = M_and_G - ?
            WHERE email = ?
        `;
            openConn()
                .then((con) => {
                    console.log("Connected!");
                    con.query(updateSenderQuery, [amount, senderEmail], function (err, result) {
                        if (err) {
                            console.log('update sender err')
                            console.log(err)
                            response.writeHead(500, { 'Content-Type': 'application/json' });
                            response.end(JSON.stringify({ error: 'Error updating sender balance.' }));
                            return;
                        }
                        console.log('update sender ok')
                        // Update the receiver's balance
                        var updateReceiverQuery = `
                        UPDATE users
                        SET M_and_G = M_and_G + ?
                        WHERE email = ?
                    `;
                        console.log('update receive')
                        con.query(updateReceiverQuery, [amount, receiverEmail], function (err, result) {
                            if (err) {
                                console.log('update receive err')
                                console.log(err)
                                response.writeHead(500, { 'Content-Type': 'application/json' });
                                response.end(JSON.stringify({ error: 'Error updating receiver balance.' }));
                                return;
                            }
                            console.log(`update receive result:${result}`)
                            var insertTrx = `
                                insert into transactions (sender_id, receiver_id, amount)
                                values (?,?,?)
                            `;
                            con.query(insertTrx,[senderEmail, receiverEmail, amount], function(err,result){
                                if (err) {
                                    console.log('insert trx err')
                                    console.log(err)
                                    response.writeHead(500, { 'Content-Type': 'application/json' });
                                    response.end(JSON.stringify({ error: 'Error insert transaction.' }));
                                    return;
                                }
                                console.log(`insert transactionresult:${result}`)
                                response.writeHead(200, { 'Content-Type': 'application/json' });
                                response.end(JSON.stringify({ message: 'Balance updated successfully.' }));
                                closeConn(con)
       
                            });
                            // Balance updated successfully
                        });
                    });
                })
                .catch((error) => {
                    console.log("Db not connected successfully", error);
                }).finally(() => {
                    console.log('Experiment completed');
                  });;

        });
    }
    else if (request.method === 'POST' && table === "transactions") {
        // Handle POST request to update balance
        var requestData = '';
        request.on('data', function (chunk) {
            requestData += chunk;
        });

        request.on('end', function () {
            var postData = querystring.parse(requestData);
            var senderEmail = postData.senderEmail;
            var receiverEmail = postData.receiverEmail;
            var amount = parseFloat(postData.amount);

            if (isNaN(amount) || amount <= 0) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid amount. Please enter a positive number.' }));
                return;
            }

            // Update the sender's balance
            var updateSenderQuery = `
            UPDATE users
            SET M_and_G = M_and_G - ?
            WHERE email = ?
        `;
            con.connect();
            con.query(updateSenderQuery, [amount, senderEmail], function (err, result) {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'Error updating sender balance.' }));
                    return;
                }

                // Update the receiver's balance
                var updateReceiverQuery = `
                UPDATE users
                SET M_and_G = M_and_G + ?
                WHERE email = ?
            `;

                con.query(updateReceiverQuery, [amount, receiverEmail], function (err, result) {
                    if (err) {
                        response.writeHead(500, { 'Content-Type': 'application/json' });
                        response.end(JSON.stringify({ error: 'Error updating receiver balance.' }));
                        return;
                    }

                    // Balance updated successfully
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: 'Balance updated successfully.' }));
                });
            });
        });
    }

    else {

        var pathname = url.parse(request.url).pathname;
        var filename;
        if (pathname === "/") {
            // change the 'filename' to the homepage of your website (if other than "index.html") 
            filename = "index.html";
        }
        else
            filename = path.join(process.cwd(), pathname);

        try {
            fs.accessSync(filename, fs.F_OK);
            var fileStream = fs.createReadStream(filename);
            var typeAttribute = fileExtensions[path.extname(filename)];
            response.writeHead(200, { 'Content-Type': typeAttribute });
            fileStream.pipe(response);
        }
        catch (e) {
            console.log("\n\n");
            console.log('File does not exist: ' + filename);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 - File Not Found (' + filename + ')');
            response.end();
        }
    } // end for else
}); // var server = http.createServer

server.listen(3307);
console.log("\nThe Web server is alive!!!\n" +
    "It's listening on http://127.0.0.1:3307 or http://localhost:3307");