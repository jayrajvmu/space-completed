# HSMS (Hogarth Seat Management Systems) #
This Project Deals with the web applications for empyolee and admin can book and pre-book seat for the day/shift job timing basics work in office. 

Agenda of this project is to avoid seats availability issues in office for all employee's


## TOC ##


## Modules ##
The applications is split into the following modules
1. Authentication
2. Wings
3. Seat availability
4. Bookings

## Authentication ##  
This module deals with User/Admin Authentication proccess to access the web application further with user Active Directory Details

### Login Page  ###
In this Page Existing User can able to login using there Cerdentials like Username and Password 
Page Form Consist of follwing fields and constrains
1. Username - Varchar
2. Password - Varchar

### Forgot Password Page ###


### Registraion Page ###

### Login API ###

### Forgot Password API ###

### Registration API ###

## Wings  ##
This module deals with creations of Wings with number of tables and Seats are Auto Generated while wings is created. 

### Wings Creation Page ###
In this page admin can create new wing and view all wings details
Create wing form Consists of Follwing fields and constrains 
1. Wing Name - String
2. Total number of Tables - Integer
3. Created By - Integer

## Wings Creation API ##
Request hit (http://localhost:8000/wings) 
Method - POST
Request Body Content in Json Format 
    {
    "wing_name":"Informations",
    "wing_total_table": 3,
    "created_by": 1
    } 

### Response Output Json Format ###
#### Success Json ####
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

#### Falied Output Json ####
{
    "success":false,
    "message":"Somthing Went Worng"
}

## Wing Update Page ##
In this page admin can Update Existing wing and view all wings details
Update wing form Consists of Follwing fields and constrains 
1. Wing Name - String
2. Wing ID - Integer

### Wings Update API ###
Request hit (http://localhost:8000/wings/1)
Method - POST 
Request Body Content in Json Format 
    {
        "wing_id":1,
        "wing_name":"Informations"
    } 

### Response Output Json Format ###
#### Success Json ####
    {
        "success": true,
        "message": "Successfully Updated",
        "data": 
            {
                "name": "Informations",
            }
    }

#### Falied Output Json ####
{
    "success":false,
    "message":"Somthing Went Worng"
}



## Wing Delete Page ##
In this page admin can Delete Existing wing and view all wings details
Delete wing form Consists of Follwing fields and constrains 
1. Wing ID - Integer

### Wings Update API ###
Request hit (http://localhost:8000/wings/1)
Method - DELETE 
Request Body Content in Json Format 
    {
        "wing_id":1,
    } 

### Response Output Json Format ###
#### Success Json ####
    {
        "success": true,
        "message": "Successfully Deleted",
    }

#### Falied Output Json ####
{
    "success":false,
    "message":"Somthing Went Worng"
}


## Wing Add Tables Page ##
In this page admin can Add Table in the  Existing wing and view all wings Tables details
Add Tables form Consists of Follwing fields and constrains 
1. Wing ID - Integer
3. Total no of Table - Integer

### Wings Add Tables API ###
Request hit (http://localhost:8000/wings/addtable)
Method - POST 
Request Body Content in Json Format 
    {
        "wing_id":2,
        "wing_total_table": 5,
        "created_by": 1
    }
### Response Output Json Format ###
#### Success Json ####
    {
        "success": true,
        "message": "Successfully Table is Added",
    }

#### Falied Output Json ####
{
    "success":false,
    "message":"Somthing Went Worng"
}

## Wing Delete Tables Page ##
In this page admin can Delete Table in the Existing wing and view all wings Tables details
Delete Table form Consists of Follwing fields and constrains 
1. Wing ID - Integer
2. Table ID - Integer
3. Total no of Table - Integer

### Wings Delete Tables API ###
Request hit (http://localhost:8000/wings/deletetable)
Method - DELETE 
Request Body Content in Json Format 
    {
        "wing_id":2,
        "table_id": 7,
        "created_by": 1
    }
### Response Output Json Format ###
#### Success Json ####
    {
        "success": true,
        "message": "Successfully Table is Deleted",
    }

#### Falied Output Json ####
{
    "success":false,
    "message":"Somthing Went Worng"
}


## Wing Add Seat Page ##
In this page admin can Add Seats in the Existing wing Table and view all wings Seat details
Add Seats form Consists of Follwing fields and constrains 
1. Table ID - Integer
2. Total no of Seats - Integer

### Wings Add Seat API ###
Request hit (http://localhost:8000/wings/addseat)
Method - POST 
Request Body Content in Json Format 
    {
        "table_id":2,
        "total_no_seats": 5,
        "created_by": 1
    }
### Response Output Json Format ###
#### Success Json ####
    {
        "success": true,
        "message": "Successfully Seats Added",
    }

#### Falied Output Json ####
{
    "success":false,
    "message":"Somthing Went Worng"
}


## Wing Delete Seat Page ##
In this page admin can Delete Seats in the Existing wing Table and view all wings Seat details
Delete Seat form Consists of Follwing fields and constrains 
1. Table ID - Integer
2. Seat ID - Integer

### Wings Delete Seat API ###
Request hit (http://localhost:8000/wings/deleteSeat)
Method - DELETE 
Request Body Content in Json Format 
    {
        "table_id":2,
        "seat_id": 7,
        "created_by": 1
    }
### Response Output Json Format ###
#### Success Json ####
    {
        "success": true,
        "message": "Successfully Seats Deleted",
    }

#### Falied Output Json ####
{
    "success":false,
    "message":"Somthing Went Worng"
}



## View All Wings Page ##
In this page admin can View Wings in the Existing wing and view all wings details.

### View All Wings API ###
Request hit (http://localhost:8000/wings)
Method - GET 

### Response Output Json Format ###
#### Success Json ####
    {
        "wing_name": [
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

#### Falied Output Json ####
    {
        "success":false,
        "message":"Somthing Went Worng"
    }

