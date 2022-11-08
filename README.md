# HSMS (Hogarth Seat Management Systems)

This Project Deals with the web applications for employee and admin can book and pre-book seat for the day/shift job timing basics work in office.

Agenda of this project is to avoid seats availability issues in office for all employee's

## Table of Content

- [Modules](#heading)
  - [Authentication](#Authentication)
    - [Login Page -FE](#login-page)
    - [Login page-BE](#login-api)
    - [Registration Page-FE](#registration-page)
    - [Registration API-BE](#registration-api)
    - [Forgot Password link sending Page-FE](#forgot-password-link-sending-page)
    - [Forgot Password link sending  API-BE](#forgot-password-link-sending-api)
    - [Reset password page-FE](#reset-password-page)
    - [Reset password API-BE](#reset-password-api)
  - [Wings](#Wings)
    - [Wings](#wings-creation-page)
      - [Wing Create](#wings-creation-page)
      - [Wing Update](#wings-update-page)
      - [Wing Delete](#wing-delete-page)
    - [Tables](#wing-add-tables-page)
      - [Add Tables](#wing-add-tables-page)
      - [Update Table](#wings-update-table-page)
      - [Delete Table](#wing-delete-tables-page)
    - [Seats](#wing-add-seat-page)
      - [Add Seats](#wing-add-seat-page)
      - [Update Seat](#wings-update-seat-api)
      - [Delete Seat](#wing-delete-seat-page)
  * [Seat-availability](#Seat-availability)
  * [Bookings](#seat-booking)
    - [Booking Page](#Booking-Page)
    - [My Booking Page](#My-Booking-Page)
    - [Booking API](#Booking-API)
    - [View Booking API](#View-Booking-API)
    - [Cancel Booking Page](#Cancel-Booking-Page)
    - [Get User Names API](#Get-User-Names-API)
    - [Check-in API](#Check-in-API)

## Modules

The applications is split into the following modules.

1. Authentication
2. Wings
3. Seat availability
4. Bookings

## Authentication

This module deals with User/Admin Authentication process to access the web application further with user Active Directory Details

### Login Page 

In this Page Existing User can able to login using there Credentials like Username and Password
Page Form Consist of following fields and constrains.

1. User Id or User Email-id- Varchar field
2. Password - Varchar field


### Login API

While Form submission Hit the Below API 

Request hit (http://localhost:5000/auth/login)

Method - POST(axios)



Request Body Content in JSON Format
 {
   "email_id": "sekar.saravanan@hogarth.com",
  "password": "password",
"valid_user":"true or false"
}

 Response Output JSON Format

valid users
{
  "success": true,
  "message": "valid user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3ODAxMDE2LCJleHAiOjE2NzU1NzcwMTZ9.RaN943bfHEKCOg5X0xOpy_k2uyyOT4M6CSGaBiiGu-o",
  "cookies": {
    "expires": "2023-02-05T06:03:36.558Z",
    "httpOnly": true,
    "loginuser_id": 1
  }
}




Invalid users

 {
  "success": "ture" // "false",
  "message": null,
  "status": "password not matched"//"invalid_Email-id"
}

### Registration Page

A registration form is a list of fields that a user will input data into and submit to a company or individual. Company use registration forms to sign up Users for hogarth seat booking credientials or services, or other programs or plans.

user input fiels 

1. Employee_name
2. Employee Id
3. Employee Email-id
4. Password 
5. Confirm Password


### Registration API

While Form submission Hit the Below API 

Request hit (http://localhost:5000/auth/register)

Method - POST(axios)

Request Body Content in JSON Format
 {
      "employee_name":"bhargav",
   "employee_id":"1233" ,
   "email_id": "bhargav@hogarth.com",
   "password": "bhargav@hogarth.com",
   "confirm_password": "bhargav@hogarth.com",
   "create_status":"true or false",
   "status":""
}

 Response Output JSON Format

valid users

{
  "success": true,
  "message": "Registration success",
  "status": 1,
  "create_status": true
}

Invalid Users
    
   Email id already exits
{
  "success": false,
  "message": "Email id already exits",
  "status": 0,
  "create_status": false
}

 Password missmatched
{
  "success": false,
  "message": "password missmatched",
  "status": 0,
  "create_status": false
}


### Forgot Password link sending Page
Most websites that require a user to log in provide a link titled forgot password or another similar phrase feature. This link allows users who have forgotten their password to unlock, retrieve, or reset it, usually by answering account security questions or sending them an E-mail.

User input fiels 
1. Employee E-mail address

### Forgot Password link sending  API

While Form submission Hit the Below API 

Request hit (http://localhost:5000/reset-password_link)

Method - POST(axios)

Request Body Content in JSON Format
 {
"email_id": "sekar.saravanan@gmail.com"
}



 Response Output JSON Format


 
  In jWT(Json web token) it decypet  the token and user id and link expire code in a single api hit.

decrypttt {
  email: 'sekar.saravanan@hogarth.com',
  user: 1,
  iat: 1667812025,
  exp: 1667812625
}


valid users

{
  "success": true,
  "error": null,
  "status": 1,
  "message": "Reset link  Sent to user_mailID",
  "mail-from": "code.ghoster@gmail.com",
  "mail-to": "sekar.saravanan@hogarth.com"
}

Invalid Users
{
  "success": false,
  "error": null,
  "status": 0,
  "message": "Email not Registered"
}


### Reset password page
The Password Reset Page provides your applications' users with a way to change their passwords if they cannot log in.


User input field

1. password
2. Confirm Password

### Reset password API



While Form submission Hit the Below API 

Request hit (`http://localhost:5000/reset-password/${user_id}/${token}`)

Method - PUT(axios)

Request Body Content in JSON Format
<!-- encrypted request -->

{
      "password": "password123" ,
     "confirm_password":"passwor23",
      "userid": "1",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNla2FyLnNhcmF2YW5hbkBob2dhcnRoLmNvbSIsInVzZXIiOjEsImlhdCI6MTY2NzgxMDQ0NiwiZXhwIjoxNjY3ODExMDQ2fQ.4hapEoHp192vWMg5fFL4d6wj9XGxEQDXv6G-gudlm9g"
}
  

Responce Json

    valid user and success responece

{
 'success': true,
 'error':err,
 'status': 1,
 'message':'password updated'
 }


    Invalid User 

{
  "success": false,
  "error": null,
  "status": 0,
  "message": "Email not Registered"
}

    Password missmatch


{
     'success': false,
 'error':err,
 'status': 0,
 'message':
 'password missmatch'
 }





 

## Wings

This module deals with creations of Wings with number of tables and Seats are Auto Generated while wings is created.

### Wings Creation Page

In this page admin can create new wing and view all wings details
Create wing form Consists of Following fields and constrains

1. Wing Name - String
2. Total number of Tables - Integer
3. Created By - Integer

### Wings Creation API

Request hit (http://localhost:5000/wings)

Method - POST

Request Body Content in JSON Format
{
"wing_name": "Informations",
"wing_total_table": 3,
"created_by": 1
}

### Response Output JSON Format

#### Success JSON

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

#### Failed JSON

    {
        "success": false,
       "message":"Something Went Wrong. Try Again Later."
    }

### Wings Update Page

Wing Update Page ##
In this page admin can Update Existing wing and view all wings details
Update wing form Consists of Following fields and constrains

1. Wing Name - String
2. Wing ID - Integer

### Wings Update API

Request hit (http://localhost:5000/wings/1)

Method - POST

Request Body Content in JSON Format
{
"wing_id":1,
"wing_name":"Informations"
}

### Response Output JSON Format

#### Success JSON

    {
        "success": true,
        "message": "Successfully Updated",
    }

#### Failed Output JSON

    {
        "success": false,
       "message":"Something Went Wrong. Try Again Later."
    }

### Wing Delete Page

In this page admin can Delete Existing wing and view all wings details
Delete wing form Consists of Following fields and constrains

1. Wing ID - Integer

### Wings Delete API

Request hit (http://localhost:5000/wings/1)

Method - DELETE

Request Body Content in JSON Format
{
"wing_id":1,
}

### Response Output JSON Format

#### Success JSON

    {
        "success": true,
        "message": "Successfully Deleted",
    }

#### Failed JSON

    {
        "success": false,
       "message":"Something Went Wrong. Try Again Later."
    }

### Wing Add Tables Page

In this page admin can Add Table in the Existing wing and view all wings Tables details
Add Tables form Consists of Following fields and constrains

1. Wing ID - Integer
2. Total no of Table - Integer

### Wings Add Tables API

Request hit (http://localhost:5000/wings/addtable)

Method - POST

Request Body Content in JSON Format
{
"wing_id": 2,
"wing_total_table": 5,
"created_by": 1
}

### Response Output JSON Format

#### Success JSON

    {
        "success": true,
        "message": "Successfully Table is Added",
    }

#### Failed JSON

    {
        "success": false,
       "message":"Something Went Wrong. Try Again Later."
    }

### Wings Update Table Page

Wing Update Table Page ##
In this page admin can Update Existing wing Table and view all wings details
Update wing form Consists of Following fields and constrains

1. Table Id - Integer
2. Table Name - String

### Update Table API

Request hit (http://localhost:5000/wings/updateTable)

Method - POST

Request Body Content in JSON Format
{
"wing_id": 1,
"table_id": 1,
"table_name": "WS_Digital_Tables"
}

### Response Output JSON Format

#### Success JSON

    {
        "success": true,
        "message": "Successfully Updated",
    }

#### Failed Output JSON

    {
        "success": false,
        "message":"Something Went Wrong. Try Again Later."
    }

### Wing Delete Tables Page

In this page admin can Delete Table in the Existing wing and view all wings Tables details
Delete Table form Consists of Following fields and constrains

1. Wing ID - Integer
2. Table ID - Integer
3. Total no of Table - Integer

### Wings Delete Tables API

Request hit (http://localhost:5000/wings/deletetable/:wing_id/:table_id)

Method - DELETE

Request URL Content (Example)
wing_id = 1
table_id = 1

### Response Output JSON Format

#### Success JSON

    {
        "success": true,
        "message": "Successfully Table is Deleted",
    }

#### Failed JSON

    {
        "success": false,
        "message":"Something Went Wrong. Try Again Later."
    }

### Wing Add Seat Page

In this page admin can Add Seats in the Existing wing Table and view all wings Seat details
Add Seats form Consists of Following fields and constrains

1. Table ID - Integer
2. Total no of Seats - Integer

### Wings Add Seat API

Request hit (http://localhost:5000/wings/addseat)

Method - PUT

Request Body Content in JSON Format
{
"table_id": 2,
"total_no_seats": 5,
"created_by": 1
}

### Response Output JSON Format

#### Success JSON

    {
        "success": true,
        "message": "Successfully Seats Added",
    }

#### Failed JSON

    {
        "success":false,
        "message":"Something Went Wrong"
    }

### Wings Update Seat API

Wing Seat Table Page ##
In this page admin can Update Existing wing Seat and view all wings details
Update wing form Consists of Following fields and constrains

1. Seat Id - Integer
2. Seat Name - String
3. Table ID - Integer

### Update Table

Request hit (http://localhost:5000/wings/updateSeat)

Method - POST

Request Body Content in JSON Format
{
"table_id": 1,
"seat_id":1,
"seat_name": "Digital_seat"
}

### Response Output JSON Format

#### Success JSON

    {
        "Success": true,
        "message": "Successfully Seat is Updated"
    }

#### Failed Output JSON

    {
        "success": false,
        "message":"Something Went Wrong. Try Again Later."
    }

### Wing Delete Seat Page

In this page admin can Delete Seats in the Existing wing Table and view all wings Seat details
Delete Seat form Consists of Following fields and constrains

1. Table ID - Integer
2. Seat ID - Integer

### Wings Delete Seat API

Request hit (http://localhost:5000/wings/deleteSeat)

Method - DELETE

Request Body Content in JSON Format
{
"table_id": 2,
"seat_id": 7,
"created_by": 1
}

### Response Output JSON Format

#### Success JSON

    {
        "success": true,
        "message": "Successfully Seats Deleted",
    }

#### Failed JSON

    {
        "success":false,
        "message":"Something Went Wrong"
    }

### View All Wings Page

In this page admin can View Wings in the Existing wing and view all wings details.

### View All Wings API

Request hit (http://localhost:5000/wings)

Method - GET

### Response Output JSON Format

#### Success JSON

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

#### Failed JSON

    {
        "success": false,
        "message":"Something Went Wrong. Try Again Later."
    }

## Seat Booking

This is the main module for Seat Booking, this module have two types of Bookings.

Below lists of logics are added for this module.

1. User cannot Book more than one seat for the day.
2. User cannot Book more than one shift for the day.

- Regular Booking.
- Advance Booking.

#### Regular Booking

1. User can Book Seats before 48 hours and before 6 hours of actual shift.
2. User can Book seats for next Two days.

#### Advance Booking

1.User can Book only 3 Seats for a Week, Week will be calculate from the current date.

### Booking Page

Request hit (http://localhost:5000/booking)

User can select wing, date and particular shift, we will show the available seat in the particular wing, user can click the green color available seats and fill the employee id and Book the seat.

### My Booking Page

Request hit (http://localhost:5000/my-booking)

In this page User will see all the Seats Booked by the him.

Every booked Seats will contain two buttons mentioned below.

1. Cancel Seat.
2. Check-in.

#### Cancel Seat

When User clicks the Cancel button confirmation pop-up will be shown "Do you really want to cancel the seat" after clicking the Ok button seat will be cancelled.

#### Check-in

When User clicks the CheckIn button it will check whether the User check in the
Seat after the Shift start time and maximum 30 minutes, otherwise it throws error like Unable to check-in this seat.

### Booking API

Request hit (http://localhost:5000/booking)

Method - POST

#### Request

    {
        "desk_id": 1,
        "emp_id": 1,
        "date": 2022-10-30,
        "shift": 1,
        "booked_by": 1,
        "booking_type": 0
    }

#### Success Response

    {
        "success": true,
        "message": "Seat #1 Booked Successfully",
    }

#### Failed Response

    {
        "success": false,
        "message": "Unable to make booking for this day. Please try a different day",
    }

### View Booking API

Request hit (http://localhost:5000/booking/:id)

- ID - Employee ID
- Method - GET

#### Success Response

    {
        "success": true,
        "message": "Booking data fetched successfully",
        "data":[]
    }

#### Failed Response

    {
        "success": false,
        "message": "No data available",
    }

### Cancel Booking API

Request hit (http://localhost:5000/booking/:id)

- ID - Booking ID
- Method - PUT

#### Success Response

    {
        "success": true,
        "message": "Booking Id #1 cancelled successfully",
    }

#### Failed Response

    {
        "success": false,
        "message": "No Booking Available",
    }

### Get User Names API

Request hit (http://localhost:5000/booking/user/name)

- Method - GET

#### Success Response

    {
        "success": true,
        "message": "User data fetched successfully",
        "data":[]
    }

#### Failed Response

    {
        "success": false,
        "message": "Error Connection",
    }

### Check-in API

Request hit (http://localhost:5000/checkin/:id)

- ID - Booking ID
- Method - PUT

#### Request

    {
        "emp_id": 1,
    }

#### Success Response

    {
        "success": true,
        "message": "Booking Id #1, check-in successfully",
    }

#### Failed Response

    {

    "success": false,
    "message": "Timing Problem",
    }

Method - GET

#### Sucess Response

    {
    "success": true,
    "message": "User Cancelled successfully",
    "data":[]
    }

#### Failed Response

    {
    "success": false,
    "message": "Error Connection",
    }

### Check-in API

Request hit (http://localhost:5000/checkin/:id)

ID- Booking ID
Method - PUT

#### Request

    {
    "emp_id": 1,
    }

#### Sucess Response

    {
    "success": true,
    "message": "Chek-in successfully",
    }

#### Failed Response

    {
    "success": false,
    "message": "Timing Problem",
    }

## Seat Availability

This module deal with see all seat available and based on each booking an seats.

### Seat Availabilities Page

In this page users can see, how many seats are available and used to booking a seats.
Users can see the all available seats belong to wings, date and shift.

1. Select a valuable wing
2. Select a booking date
3. Select a valuable shift

### Seat Availability API

Get all wings name
{http://localhost:5000/availability/wings}
Method : GET

### Response output

#### Sucess output JSON

```
{
  "success": true,
  "message": "Successfully get seats availability data"
}
```

#### Failed output JSON

```
{
  "success": false,
  "message": "No data available"
}
```

Get all wings name
{http://localhost:5000/availability/shifts}
Method : GET

### Response output

#### Sucess output JSON

```
{
  "success": true,
  "message": "Successfully get seats availability data"
}
```

#### Failed output JSON

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

### Response output

#### Sucess output JSON

```
{
  "success": true,
  "message": "Successfully get seats availability data"
}
```

#### Failed output JSON

```
{
  "success": false,
  "message": "No data available"
}
```
