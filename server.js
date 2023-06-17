import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";
import http, { request } from "http";
import { log } from "console";

const app = express();

const server = http.createServer(app);

app.use(cors({
    Credential: true,
    origin: "*"
}));

app.use(express.json({limit:"50mb"}));

// const connection = mysql.createConnection({
//     host: "localhost",
//     password: "S9840583417a!",
//     port: 3306,
//     database: "travelix",
//     user: "root"

// });
const connection = mysql.createConnection({
    host: "db4free.net",
    password: "S9840583417a!",
    port: 3306,
    database: "travelixsvcentry",
    user: "saicharan"

});

connection.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("Mysql connected successfully");
    }
})

app.post("/add/destination", (request, response) => {
    const form = request.body;
    const mysql = `insert into destinationList(destinationName, destinationImage, destinationCount) values ('${form.destinationName}','${form.destinationImage}', '${form.destinationCount}') `;
    connection.query(mysql,(error,result)=>{
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send({
                message:"Destination has been created"
            });
        }
    })
})

app.get("/list/destination",(request,response)=>{
    
    const destinationName = request.query.destinationName;
    let mysql="";
    if(destinationName == undefined){
     mysql=`select *from destinationList`;
    }
    else{
     mysql=`select *from destinationList where destinationName='${destinationName}'`;
    }
    console.log(mysql);
    connection.query(mysql,(error,result)=>{
        if(error){
            response.status(500).send(error);
        }
        else{
           response.status(200).send(result);
        }
    })
})

app.delete("/delete/destination/:id",(request,response)=>{
    const recordId=request.params.id;
    const mysql=`delete from destinationList where id=${recordId}`;
    connection.query(mysql,(error,result)=>{
        if(error){
            response.status(500).send(error);
        }
        else{
            response.status(200).send({
                message:"Destination has been deleted"
            })
        }
    })
})

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server connected successfully", port);
})