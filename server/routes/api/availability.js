const express = require("express");
const { isDate } = require("moment/moment");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/", (req, res) => {
  let slectSqlfromTable = `SELECT seats.id, wings.name AS wingName, tables.id AS tableID, 
  tables.name AS tableName, wing_id, seats.name AS seatName, seats.table_id AS tseats
  FROM wings
  INNER JOIN tables ON wings.id=tables.wing_id
  INNER JOIN seats ON tables.id=seats.table_id WHERE wing_id='${req.body.wing}'`;
  connection.query(slectSqlfromTable, (errtable, resulttable) => {
    if (errtable) {
      res.json({ success: false, message: `${errtable}` });
    }
    let shiftName;
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
    console.log(req.body.date);
    let slectSqlfromBooking = ` SELECT * FROM booking         
      WHERE date='${req.body.date}' AND shift_id='${req.body.shift}' AND (status=1 OR status=2)`;
    connection.query(slectSqlfromBooking, (errbook, resultbook) => {
      if (errbook) {
        res.json({ success: false, message: `${errbook}` });
      }
      console.log(resultbook);
      let result = [];
      let table_data = [];
      let table_id = [];
      let seat_data = [];
      let seat_id = [];
      let checkData = 0;
      let tableid;
      let tabledata;
      let wings = [];
      let tables = [];
      let seats = [];
      resulttable.forEach((element) => {
        console.log(element.tseats);
        table_id.push(element.tableID);
        if (element.tableID == element.tseats) {
          resultbook.forEach((elementbook) => {
            if (elementbook.seat_id == element.id) {
              table_data.push({ TableID: `${element.tableID}` });
              seat_data.push({
                seatid: `${element.id}`,
                seatable: `${element.tseats}`,
                Availablity: `${elementbook.status}`,
                SeatName: `${element.seatName}`,
                Date: `${req.body.date}`,
                ShiftID: `${req.body.shift}`,
                ShiftName: `${shiftName}`,
              });
              wings.push({
                id: `${element.id}`,
                TableName: `${element.tableName}`,
                TableID: `${element.tableID}`,
                Availablity: `${elementbook.status}`,
                SeatName: `${element.seatName}`,
                Date: `${req.body.date}`,
                ShiftID: `${req.body.shift}`,
                ShiftName: `${shiftName}`,
              });
              checkData = 1;
            }
          });
          if (checkData != 1) {
            wings.push({
              id: `${element.id}`,
              TableName: `${element.tableName}`,
              TableID: `${element.tableID}`,
              Availablity: 0,
              SeatName: `${element.seatName}`,
              Date: `${req.body.date}`,
              ShiftID: `${req.body.shift}`,
              ShiftName: `${shiftName}`,
            });
            table_data.push({ TableID: `${element.tableID}` });
            seat_data.push({
              seatid: `${element.id}`,
              seatable: `${element.tseats}`,
              Availablity: 0,
              SeatName: `${element.seatName}`,
              Date: `${req.body.date}`,
              ShiftID: `${req.body.shift}`,
              ShiftName: `${shiftName}`,
            });
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
            seats.push({
              seatid: seat_data[j].seatid,
              seatname: seat_data[j].SeatName,
              availability: seat_data[j].Availablity,
              date: seat_data[j].Date,
              shiftID: seat_data[j].shiftID,
              shiftname: seat_data[j].ShiftName,
            });
          }
        }
        tables.push({ tableid: tableid[i], seats: seats });
        seats = [];
      }
      res.send({
        sucess: true,
        message: `Successfully get seats availability data`,
        wings: tables,
      });
    });
  });
});

router.get("/dates", (request, response) => {
  response.json({
    availability: [
      {
        wings: [
          {
            wingid: 1,
            wingname: "Creative",
            tables: [
              {
                tableid: 1,
                tableName: "WS1",
                seats: [
                  {
                    date: "2022-10-29",
                    seatsId: 1,
                    seatname: "WS-Seat1",
                    availability: 2,
                    shift_id: 1,
                    shiftname: "APEX",
                    EmpName: "H150",
                    empId: 8,
                  },
                  {
                    date: "2022-10-30",
                    seatsId: 2,
                    seatname: "WS-Seat2",
                    availability: 1,
                    shift_id: 1,
                    shiftname: "APAC",
                    EmpName: "H151",
                    empId: 7,
                  },
                ],
              },
              {
                tableid: 1,
                tableName: "WS2",
                seats: [
                  {
                    date: "2022-10-29",
                    seatsId: 3,
                    seatname: "WS-Seat1",
                    availability: 2,
                    shift_id: 1,
                    shiftname: "APEX",
                    EmpName: "H150",
                    empId: 6,
                  },
                  {
                    date: "2022-10-30",
                    seatsId: 4,
                    seatname: "WS-Seat2",
                    availability: 3,
                    shift_id: 1,
                    shiftname: "APAC",
                    EmpName: "H151",
                    empId: 5,
                  },
                ],
              },
              {
                tableid: 1,
                tableName: "WS3",
                seats: [
                  {
                    date: "2022-10-29",
                    seatsId: 5,
                    seatname: "WS-Seat1",
                    availability: 1,
                    shift_id: 1,
                    shiftname: "APEX",
                    EmpName: "H150",
                    empId: 4,
                  },
                  {
                    date: "2022-10-30",
                    seatsId: 6,
                    seatname: "WS-Seat2",
                    availability: 3,
                    shift_id: 1,
                    shiftname: "APAC",
                    EmpName: "H151",
                    empId: 3,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        wings: [
          {
            wingid: 2,
            wingname: "Digital",
            tables: [
              {
                tableid: 1,
                tableName: "WS4",
                seats: [
                  {
                    date: "2022-10-30",
                    seatsId: 7,
                    seatname: "WS-Seat1",
                    availability: 1,
                    shift_id: 1,
                    shiftname: "APAC",
                    EmpName: "H150",
                    empId: 1,
                  },
                  {
                    date: "2022-10-31",
                    seatsId: 8,
                    seatname: "WS-Seat2",
                    availability: 1,
                    shift_id: 1,
                    shiftname: "APEX",
                    EmpName: "H151",
                    empId: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
});

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
