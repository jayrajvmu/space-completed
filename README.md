Wing Master


Call Wing Details for dropdown
    Hit the (http://localhost:8000/wingMaster/wing) with (GET) Method 

    -- data = [
                    {
                        "id": 1,
                        "wing_name": "North WS"
                    },
                    {
                        "id": 2,
                        "wing_name": "South WS"
                    }
              ]
*************************************************************************

Table and Seat Details--
    1 table consist of 4 Chairs(Seats)

Create---
    
    Hit the (http://localhost:8000/wingMaster/create) through (PUT) Method with below Json Body Format with Value
    Json Format
    {
        "wing_name": (Wing Name),
        "wing_total_table": (Total Number of Tables - integer),
        "created_by": (Creator Primary Id )
    }
once the master Entry created tables and seats will be automatically created with respective Id's
