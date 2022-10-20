const express =require("express");
const app =express();
const cors = require("cors");
const fs = require("fs");
const axios = require("axios").default;


const port = 5500;

app.use(cors());
app.use(express.json());
app.get("/",(request,response)=>{
    response.send("hell world");
})
app.get("/updated",(request,response)=>{
    fs.readFile('summa.json',"utf8", function(err, data) {
        response.send(data);
        console.log(data);
      });
})
app.put("/update",(request,response)=>{
    console.log(request.body);
    response.send("successful")
})

app.get("/creative",(request,response)=>{
    let a={
        totalTable:4,
        tableIds:[
            {
                tableName:"table1",
                seat:11
            },
            {
                tableName:"table2",
                seat:2
            },
            {
                tableName:"table3",
                seat:1
            },
            {
                tableName:"table4",
                seat:3
            }
        ]
        
    }
    response.send(a);
})

app.post("/wingGeneration",(request,response)=>{
    console.log(request.body);
    let some = request.body;
    some1 = JSON.stringify(some);
    console.log(some1);
    response.send(request.body)
})

app.listen(port,()=>{
    console.log(`port successfully running in ${port}`);
})