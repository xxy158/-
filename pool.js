const mysql=require("mysql");
var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    port:3306,
    database:"xingyouwang",
    connectionLimit:10
})
module.exports=pool;