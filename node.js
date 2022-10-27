const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const axios = require("axios").default;


const port = 5500;

app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
    response.send("hell world");
})
app.get("/updated", (request, response) => {
    fs.readFile('summa.json', "utf8", function (err, data) {
        response.send("Successful");
    });
})
app.put("/update", (request, response) => {
    console.log(request.body);
    response.send("successful")
})



app.get("/wings", (request, response) => {
    let wings = {
        "wing_name": [
            {
                "id": 1,
                "name": "Digital"
            }, {
                "id": 2,
                "name": "Creative"
            }
            
        ]
    }
    response.send(wings);
})

app.get("/wings/1", (request, response) => {
    let s = {
        "id": 1,
        "name": "Digital",
        "no_of_tables": 3,
        "no_of_seats": 12,
        "tables": [
            {
                "id": 1,
                "name": "table-1",
                "seats": [
                    {
                        "id": 1,
                        "name": "seat-1"
                    },
                    {
                        "id": 2,
                        "name": "seat-2"
                    },
                    {
                        "id": 3,
                        "name": "seat-3"
                    },
                    {
                        "id": 4,
                        "name": "seat-4"
                    }
                ]
            },
            {
                "id": 2,
                "name": "table-2",
                "seats": [
                    {
                        "id": 1,
                        "name": "seat-1"
                    },
                    {
                        "id": 2,
                        "name": "seat-2"
                    },
                    {
                        "id": 3,
                        "name": "seat-3"
                    },
                    {
                        "id": 4,
                        "name": "seat-4"
                    }
                ]
            },
            {
                "id": 1,
                "name": "table-3",
                "seats": [
                    {
                        "id": 1,
                        "name": "seat-1"
                    },
                    {
                        "id": 2,
                        "name": "seat-2"
                    },
                    {
                        "id": 3,
                        "name": "seat-3"
                    },
                    {
                        "id": 4,
                        "name": "seat-4"
                    },
                    {
                        "id": 5,
                        "name": "seat-4"
                    }
                ]
            }

        ]
    }
    response.send(s);
});

app.get("/wings/2", (request, response) => {
    let si = {
        "id": 1,
        "name": "Creative",
        "no_of_tables": 2,
        "no_of_seats": 8,
        "tables": [
            {
                "id": 1,
                "name": "table-1",
                "seats": [
                    {
                        "id": 1,
                        "name": "seat-1"
                    },
                    {
                        "id": 2,
                        "name": "seat-2"
                    },
                    {
                        "id": 3,
                        "name": "seat-3"
                    },
                    {
                        "id": 4,
                        "name": "seat-4"
                    }
                ]
            },
            {
                "id": 2,
                "name": "table-2",
                "seats": [
                    {
                        "id": 1,
                        "name": "seat-1"
                    },
                    {
                        "id": 2,
                        "name": "seat-2"
                    },
                    {
                        "id": 3,
                        "name": "seat-3"
                    },
                    {
                        "id": 4,
                        "name": "seat-4"
                    }
                ]
            }

        ]
    }
    response.send(si);
});
app.post("/wingGeneration", (request, response) => {
    console.log(request.body);   
    response.send({
        "success": true,
        "message": "Successfully Added 1",
        "data": {
          "name": "Creative",
          "total_tables": "3",
          "total_seats": 12,
          "is_active": 0,
          "created_at": "2022/10/26 10:38:17 am",
          "created_by": "1"
        }
      })
})

app.delete("/wings/:id",(request,response)=>{
    console.log(request.params);
    response.send(
        {
            success:"Fail"
        }
    )
})
app.listen(port, () => {
    console.log(`port successfully running in ${port}`);
})