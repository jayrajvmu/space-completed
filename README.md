# HSMS (Hogarth Seat Management Systems) #
This Project Deals with the web applications for employee and admin can book and pre-book seat for the day/shift job timing basics work in office.

Agenda of this project is to avoid seats availability issues in office for all employee's
## TOC ##
## Modules ##
The applications is split into the following modules

1. Authentication
2. Wings
3. Seat availability
4. Bookings

## Authentication ##
This module deals with User/Admin Authentication process to access the web application further with user Active Directory Details

### Login Page ###
In this Page Existing User can able to login using there Credentials like Username and Password
Page Form Consist of following fields and constrains.

1. Username - Varchar
2. Password - Varchar

### Forgot Password Page ###


### Registration Page ###

### Login API ###

### Forgot Password API ###

### Registration API ###

## Wings ##
This module deals with creations of Wings with number of tables and Seats are Auto Generated while wings is created.

### Wings Creation Page ###
In this page admin can create new wing and view all wings details
Create wing form Consists of Following fields and constrains

1. Wing Name - String
2. Total number of Tables - Integer
3. Created By - Integer

### Wings Creation API ###
Request hit (http://localhost:5000/wings)

Method - POST

Request Body Content in JSON Format
    {
        "wing_name": "Informations",
        "wing_total_table": 3,
        "created_by": 1
    }

### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Added 3",
        "data":
            {
                "name": "Informations",
                "total_tables": "3",
                "total_seats": 12,
                "is_active": 0,
                "created_at": "2022/10/28 9:47:31 am",
                "created_by": 1
            }
    }

#### Failed JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }

### Wings Update Page ###
Wing Update Page ##
In this page admin can Update Existing wing and view all wings details
Update wing form Consists of Following fields and constrains

1. Wing Name - String
2. Wing ID - Integer

### Wings Update API ###
Request hit (http://localhost:5000/wings/1)

Method - POST

Request Body Content in JSON Format
    {
        "wing_id":1,
        "wing_name":"Informations"
    }

### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Updated",
    }

#### Failed Output JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }

### Wing Delete Page ###
In this page admin can Delete Existing wing and view all wings details
Delete wing form Consists of Following fields and constrains
1. Wing ID - Integer

### Wings Delete API ###
Request hit (http://localhost:5000/wings/1)

Method - DELETE

Request Body Content in JSON Format
    {
        "wing_id":1,
    }

### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Deleted",
    }

#### Failed JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }


### Wing Add Tables Page ###
In this page admin can Add Table in the Existing wing and view all wings Tables details
Add Tables form Consists of Following fields and constrains

1. Wing ID - Integer
3. Total no of Table - Integer

### Wings Add Tables API ###
Request hit (http://localhost:5000/wings/addtable)

Method - POST

Request Body Content in JSON Format
    {
        "wing_id": 2,
        "wing_total_table": 5,
        "created_by": 1
    }
### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Table is Added",
    }

#### Failed JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }

### Wings Update Table Page ###
Wing Update Table Page ##
In this page admin can Update Existing wing Table and view all wings details
Update wing form Consists of Following fields and constrains

1. Table Id - Integer
2. Table Name - String

### Update Table API ###
Request hit (http://localhost:5000/wings/updateTable)

Method - POST

Request Body Content in JSON Format
    {
        "wing_id": 1,
        "table_id": 1,
        "table_name": "WS_Digital_Tables"
    }

### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Updated",
    }

#### Failed Output JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }

### Wing Delete Tables Page ###
In this page admin can Delete Table in the Existing wing and view all wings Tables details
Delete Table form Consists of Following fields and constrains

1. Wing ID - Integer
2. Table ID - Integer
3. Total no of Table - Integer

### Wings Delete Tables API ###
Request hit (http://localhost:5000/wings/deletetable)

Method - DELETE

Request Body Content in JSON Format
    {
        "wing_id": 2,
        "table_id": 7,
        "created_by": 1
    }
### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Table is Deleted",
    }

#### Failed JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }


### Wing Add Seat Page ###
In this page admin can Add Seats in the Existing wing Table and view all wings Seat details
Add Seats form Consists of Following fields and constrains

1. Table ID - Integer
2. Total no of Seats - Integer

### Wings Add Seat API ###
Request hit (http://localhost:5000/wings/addseat)

Method - POST

Request Body Content in JSON Format
    {
        "table_id": 2,
        "total_no_seats": 5,
        "created_by": 1
    }
### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Seats Added",
    }

#### Failed JSON ####
    {
        "success":false,
        "message":"Something Went Wrong"
    }

### Wings Update Seat API ###
Wing Seat Table Page ##
In this page admin can Update Existing wing Seat and view all wings details
Update wing form Consists of Following fields and constrains

1. Seat Id - Integer
2. Seat Name - String
3. Table ID - Integer

### Update Table ###
Request hit (http://localhost:5000/wings/updateSeat)

Method - POST

Request Body Content in JSON Format
    {
        "table_id": 1,
        "seat_id":1,
        "seat_name": "Digital_seat"
    }
### Response Output JSON Format ###
#### Success JSON ####
    {
        "Success": true,
        "message": "Successfully Seat is Updated"
    }

#### Failed Output JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }


### Wing Delete Seat Page ###
In this page admin can Delete Seats in the Existing wing Table and view all wings Seat details
Delete Seat form Consists of Following fields and constrains

1. Table ID - Integer
2. Seat ID - Integer

### Wings Delete Seat API ###
Request hit (http://localhost:5000/wings/deleteSeat)

Method - DELETE

Request Body Content in JSON Format
    {
        "table_id": 2,
        "seat_id": 7,
        "created_by": 1
    }
### Response Output JSON Format ###
#### Success JSON ####
    {
        "success": true,
        "message": "Successfully Seats Deleted",
    }

#### Failed JSON ####
    {
        "success":false,
        "message":"Something Went Wrong"
    }



### View All Wings Page ###
In this page admin can View Wings in the Existing wing and view all wings details.

### View All Wings API ###
Request hit (http://localhost:5000/wings)

Method - GET

### Response Output JSON Format ###
#### Success JSON ####
    {
        "wing_name": 
            [
                {
                    "id": 1,
                    "name": "digital"
                },
                {
                    "id": 2,
                    "name": "print"
                },
                {
                    "id": 3,
                    "name": "Informations"
                }
            ]
    }

#### Failed JSON ####
    {
        "success": false,
        "message": "Something Went Wrong"
    }

## Seat Booking ##
This is main module to book seats, in this module have two type bookings.

We add lot of logic for this module.

1.User can not book more than one seat for the day.
2.User can not book more than one shift for the day.

1. Regular Booking.
2. Advance Booking.

#### Regular Booking ####
1.User can book seats before 48 hours and before 6 hours of actual shift.
2.User can book seats for next two days.

#### Advance Booking ####
1.User can only 3 seats for a week, week will be calculate form the current date.

### Booking Page ###
Request hit (http://localhost:5500/booking.html)

User can select wing, date and particular shift, we will show the available seat in the particular wing, user click the green color available seat and fill the employee id and book the seat.

### My Booking Page ###
Request hit (http://localhost:5500/cancel.html)

in this page user will see the all booked seats for the user.

every booked card will contain two button below mentioned.

1.Cancel Seat.
2.Check-in.

#### Cancel Seat ####
User click the button one warning pop-up will be shown "you really want to cancel the seat" after click the ok button seat will be cancelled.

in this button no other logic added.

#### Check-in ####
in this button we add some logic, user can check in the seat after the shift start time and maximum 30 minutes otherwise we show error timing problem you can not check-in the particular seat.


### Booking API ###
Request hit (http://localhost:5000/booking)

Method - POST

#### Request ####
    {
        "desk_id": 1,
        "emp_id": 1,
        "date": 2022-10-30,
        "shift": 1,
        "booked_by": 1,
        "booking_type": 0
    }

#### Success Response ####
    {
        "success": true,
        "message": "1 seat booked successfully",
    }

#### Failed Response ####
    {
        "success": false,
        "message": "You already booked for the day",
    }

### View Booking API ###
Request hit (http://localhost:5000/booking/:id)

ID- Employee ID
Method - GET

#### Success Response ####
    {
        "success": true,
        "message": "fetched successfully",
        "data":[]
    }

#### Failed Response ####
    {
        "success": false,
        "message": "No data available",
    }

### Cancel Booking API ###
Request hit (http://localhost:5000/booking/:id)

ID- Booking ID
Method - PUT

#### Success Response ####
    {
        "success": true,
        "message": "Seat Cancelled successfully",
    }

#### Failed Response ####
    {
        "success": false,
        "message": "No Booking Available",
    }

### Get User Names API ###
Request hit (http://localhost:5000/booking/user/name)

Method - GET

#### Success Response ####
    {
        "success": true,
        "message": "User Cancelled successfully",
        "data":[]
    }

#### Failed Response ####
    {
        "success": false,
        "message": "Error Connection",
    }

### Check-in API ###
Request hit (http://localhost:5000/checkin/:id)

ID- Booking ID
Method - PUT

#### Request ####
    {
        "emp_id": 1,
    }
#### Success Response ####
    {
        "success": true,
        "message": "Check-In successfully",
    }

#### Failed Response ####
    {
<<<<<<< HEAD
    "success": false,
    "message": "Timing Problem",
    }

Method - GET

#### Sucess Response ####
    {
    "success": true,
    "message": "User Cancelled successfully",
    "data":[]
    }

#### Failed Response ####
    {
    "success": false,
    "message": "Error Connection",
    }

### Check-in API ###
Request hit (http://localhost:5000/checkin/:id) 

ID- Booking ID
Method - PUT

#### Request ####
    {
    "emp_id": 1,
    }
#### Sucess Response ####
    {
    "success": true,
    "message": "Chek-in successfully",
    }

#### Failed Response ####
    {
    "success": false,
    "message": "Timing Problem",
    }    

## Seat Availability ##
 This module deal with see all seat available and based on each booking an seats.

### Seat Availabilities Page ###
 In this page users can see, how many seats are available and used to booking a seats.
 Users can see the all available seats belong to wings, date and shift.
  1. Select a valuable wing
  2. Select a booking date
  3. Select a valuable shift
### Seat Availability API ###
Get all wings name 
    {http://localhost:5000/availability/wings}
    Method : GET
### Response output ###  
#### Sucess output JSON ####
``` 
{
  "success": true,
  "message": "Successfully get seats availability data"
}
```
#### Failed output JSON ####
```
{
  "success": false,
  "message": "No data available"
}
```
Get all wings name 
    {http://localhost:5000/availability/shifts}
    Method : GET
### Response output ###  
#### Sucess output JSON ####
``` 
{
  "success": true,
  "message": "Successfully get seats availability data"
}
```
#### Failed output JSON ####
```
{
  "success": false,
  "message": "No data available"
}
```

Request on seats availability based on wing, date and shift.
   {http://localhost:5000/availability/} 
   Method : POST
   Resquest body content 
   ```
   {
    "wing": 1,
    "date": "2022-10-30",
    "shift": "APAC"
   }
   ```
### Response output ###     
#### Sucess output JSON ####
``` 
{
  "success": true,
  "message": "Successfully get seats availability data"
}
```
#### Failed output JSON ####
```
{
  "success": false,
  "message": "No data available"
}
```
