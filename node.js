const express =require("express");
const app =express();
const cors = require("cors");
const fs = require("fs")

const port = 5500;

app.use(cors());
app.use(express.json());
app.get("/",(request,response)=>{
    response.send("hell world");
})
app.get("/updated",(request,response)=>{
    fs.readFile('summa.json', function(err, data) {
        response.send(data);
        console.log(response);
      });
})
app.put("/update",(request,response)=>{
    console.log(request.body);
    response.send("successful")
})

app.listen(port,()=>{
    console.log(`port successfully running in ${port}`);
})