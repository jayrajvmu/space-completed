const express = require("express");
const { isDate } = require("moment/moment");
const router = express.Router();
const connection = require("../../db/mysql");

// response data on seats availability
router.post("/", (req, res) => {
  // fetching a data from wings, tables and seats in database use joins to get the data
  let slectSqlfromTable = `SELECT seats.id, wings.name AS wingName, tables.id AS tableID, 
  tables.name AS tableName, wing_id, seats.name AS seatName, seats.table_id AS tseats
  FROM wings
  INNER JOIN tables ON wings.id=tables.wing_id
  INNER JOIN seats ON tables.id=seats.table_id WHERE wing_id='${req.body.wing}' AND tables.is_active=0 AND seats.is_active=0`;

  connection.query(slectSqlfromTable, (errtable, resulttable) => {
    if (errtable) {
      res.json({ success: false, message: `${errtable}` });
    }
    let shiftName;
    // fetching a data from shift tables.
    let slectSqlfromShift = ` SELECT * FROM shift WHERE id='${req.body.shift}';`;
    connection.query(slectSqlfromShift, (errshift, resultshift) => {
      if (errtable) {
        res.json({ success: false, message: `${errtable}` });
      }
      for (i = 0; i < resultshift.length; i++) {
        shiftName = resultshift[i].shift_name;
      }
      console.log(shiftName);
    });
    
    // fetching a data from booking tabels and users tables.
    let slectSqlfromBooking = `SELECT *, users.emp_id AS EmpId, users.email_id AS EmpEmail 
    FROM booking LEFT JOIN users ON users.id=booking.emp_id
    WHERE date='${req.body.date}' AND shift_id='${req.body.shift}' AND (status=1 OR status=2)`;
    connection.query(slectSqlfromBooking, (errbook, resultbook) => {
      if (errbook) {
        res.json({ success: false, message: `${errbook}` });
      }
      let table_data = []; 
      let table_id = [];
      let seat_data = [];
      let checkData = 0;
      let tableid;
      let tabledata;
      let wings = [];
      let tables = [];
      let seats = [];
      resulttable.forEach((element) => {
        table_id.push(element.tableID);
        if (element.tableID == element.tseats) {
          resultbook.forEach((elementbook) => {
            console.log(elementbook.EmpId);
            if (elementbook.seat_id == element.id) {
              table_data.push({ TableID: `${element.tableID}` });
              seat_data.push({seatid: `${element.id}`, seatable: `${element.tseats}`, Availablity: `${elementbook.status}`, SeatName: `${element.seatName}`,
                              Date: `${req.body.date}`, ShiftID: `${req.body.shift}`, ShiftName: `${shiftName}`,
                              EmpId: `${elementbook.EmpId}`, Empname: `${elementbook.EmpEmail}`});
              
              wings.push({id: `${element.id}`, TableName: `${element.tableName}`, TableID: `${element.tableID}`, Availablity: `${elementbook.status}`,
                          SeatName: `${element.seatName}`,Date: `${req.body.date}`, ShiftID: `${req.body.shift}`,
                          ShiftName: `${shiftName}`});
              checkData = 1;
            }
          });
          if (checkData != 1) {
            wings.push({id: `${element.id}`, TableName: `${element.tableName}`, TableID: `${element.tableID}`, Availablity: 0, SeatName: `${element.seatName}`,
                        Date: `${req.body.date}`, ShiftID: `${req.body.shift}`, ShiftName: `${shiftName}`});
            table_data.push({ TableID: `${element.tableID}` });
            seat_data.push({seatid: `${element.id}`, seatable: `${element.tseats}`, Availablity: 0, SeatName: `${element.seatName}`, Date: `${req.body.date}`,
              ShiftID: `${req.body.shift}`, ShiftName: `${shiftName}`, EmpId: '', Empname: ''});
          }
          checkData = 0;
        }
      });
      tableid = table_id.filter(
        (item, index) => table_id.indexOf(item) === index
      );
      tabledata = table_data.filter(
        (item, index) => table_data.indexOf(item) === index
      );
      console.log(tabledata);
      console.log(tableid);
      for (i = 0; i < tableid.length; i++) {
        for (j = 0; j < seat_data.length; j++) {
          if (tableid[i] == seat_data[j].seatable) {
            seats.push({seatid: seat_data[j].seatid, seatname: seat_data[j].SeatName, availability: seat_data[j].Availablity, date: seat_data[j].Date,
              shiftID: seat_data[j].shiftID, shiftname: seat_data[j].ShiftName, EmpId: seat_data[j].EmpId, Empname: seat_data[j]. Empname,});
          }
        }
        tables.push({ tableid: tableid[i], seats: seats });
        seats = [];
      }
      res.send({sucess: true, message: `Successfully get seats availability data`, wings: tables,
      });
    });
  });
});
// Get all wings data
router.get('/wings', (req, res) => {
  //fetching a wings tables data from database
    let slectSqlfromWings = `SELECT * FROM wings`;
    connection.query(slectSqlfromWings, (err, resultWing) => {
        if (err) {
            res.json({ 'success': false, 'message': `${err}` });
        }
        let wingsArray = []; // store the all response data in this array.

        resultWing.forEach((element) => {
			wingsArray.push({ id: `${element.id}`, wingname: `${element.name}` });
        });

        res.json({success: true, message:"Get a wings data successfully" , "wings" : wingsArray});
    });

});
// Get all shift data
router.get('/shifts', (req, res) => {
    //fetching a shift tables data from database
    let slectSqlfromShift = `SELECT * FROM shift`;
    connection.query(slectSqlfromShift, (err, resultShift) => {
        if (err) {
            res.json({ 'success': false, 'message': `${err}` });
        }
        let shiftArray = []; // store the all response data in this array.

        resultShift.forEach((element) => {
			    shiftArray.push({ id: `${element.id}`, shiftname: `${element.shift_name}` });
        });

        res.json({success: true, message:"Get a shift data successfully" , "shifts" : shiftArray});
	});
});	

module.exports = router;
