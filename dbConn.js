//this code is for conenct to db
const mysql = require('mysql');
module.exports.openConn = ()=>{
return new Promise((resolve,reject)=>{
  const con = mysql.createConnection( {
    host: "107.180.1.16",
    user: "fall2023team8",
    password: "fall2023team8",
    database: "fall2023team8"
});
  con.connect((err) => {
    if(err){
      reject(err);
    }
    resolve(con);
  });
  
})
}
module.exports.closeConn =(con)=> {
  con.destroy();
}