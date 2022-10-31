const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

// request belongs to aavailability
router.post("/wing/date", (request, response) => {
  let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, booking.status AS status,
			   shift.shift_name AS shiftname 
			   From wings  
			   LEFT	JOIN tables ON tables.id=tables.wing_id
			   RIGHT JOIN seats ON seats.table_id=seats.id
			   RIGHT JOIN booking ON booking.seat_id=seats.id
			   LEFT JOIN shift ON shift.id=booking.shift_id WHERE booking.date=${request.params.date}`;
  let query = connection.query(sql, (err, result, fields) => {
    if (err) {
      throw err;
    }
    console.log(result.length);

    let wing_id = [];
    let wing_data = [];

    let tables_id = [];
    let tables_data = [];

    let seats_id = [];
    let seats_data = [];

    //Mapping Elements
    let tables = [];
    let seats = [];
    let wings = [];

    for (let j = 0; j < result.length; j++) {
      wing_id.push(result[j].wid);
      wing_data.push({ wingid: result[j].wid, wingname: result[j].wname });

      tables_id.push(result[j].tid);
      seats_id.push(result[j].seatid);

      tables_data.push({ tableId: result[j].tid, tablename: result[j].tname });
      seats_data.push({
        date: result[j].date,
        seatsId: result[j].seatid,
        seatname: result[j].seatname,
        availability: result[j].status,
        shift: result[j].shiftname,
      });
    }

    wing_id = wing_id.filter((item, index) => wing_id.indexOf(item) === index);
    wing_data = wing_data.filter(
      (item, index) => wing_data.indexOf(item) === index
    );

    tables_id = tables_id.filter(
      (item, index) => tables_id.indexOf(item) === index
    );
    tables_data = tables_data.filter(
      (item, index) => tables_data.indexOf(item) === index
    );

    seats_id = seats_id.filter(
      (item, index) => seats_id.indexOf(item) === index
    );
    seats_data = seats_data.filter(
      (item, index) => seats_data.indexOf(item) === index
    );

    for (k = 0; k < wing_id.length; k++) {
      for (l = 0; l < tables_id.length; l++) {
        for (h = 0; h < seats_id.length; h++) {
          seats.push({
            date: seats_data[h].date,
            seatsId: seats_data[h].seatsId,
            seatname: seats_data[h].seatname,
            availability: seats_data[h].availability,
            shift: seats_data[h].shift,
          });
        }
        tables.push({
          tableid: tables_data[l].tableId,
          tableName: tables_data[l].tablename,
        });
        seats = [];
      }
      wings.push({
        wingid: wing_data[k].wingid,
        wingname: wing_data[k].wingname,
        tables: tables,
      });
      tables = [];
    }

    let jsonData = '{"availability":[]}';
    obj = JSON.parse(jsonData);
    obj["availability"].push({ wings: wings });
    jsonData = JSON.stringify(obj);
    response.status(200).send(result);
    response.send();

    // res.send(result);
    // console.log(result.data);
  });
});

router.get("/wing/:id", (request, response) => {
  let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, seats.booked_status AS status, booking.date AS date,
			   shift.shift_name AS shiftname, booking.seat_id AS bseat, booking.status AS bstatus
			   From wings  
			   LEFT JOIN tables ON wings.id=tables.wing_id
			   RIGHT JOIN seats ON tables.id=seats.table_id
			   RIGHT JOIN booking ON seats.id=booking.seat_id
			   LEFT JOIN shift ON shift.id=booking.shift_id WHERE wings.id=${request.params.id}`;
  let query = connection.query(sql, (err, result, fields) => {
    if (err) {
      throw err;
    }

    let wing_id = [];
    let wing_data = [];

    let tables_id = [];
    let tables_data = [];

    let seats_id = [];
    let seats_data = [];

    let com_seat_id = [];
    let com_seat_status = [];
    //Mapping Elements
    let tables = [];
    let seats = [];
    let wings = [];

    for (let j = 0; j < result.length; j++) {
      wing_id.push(result[j].wid);
      wing_data.push({ wingid: result[j].wid, wingname: result[j].wname });

      tables_id.push(result[j].tid);
      seats_id.push(result[j].seatid);

      com_seat_id.push(result[j].bseat);
      console.log(result[j].bseat);
      com_seat_status.push(result[j].status);
      console.log(result[j].bstatus);
      tables_data.push({ tableId: result[j].tid, tablename: result[j].tname });
      seats_data.push({
        date: result[j].date,
        seatsId: result[j].seatid,
        seatname: result[j].seatname,
        availability: result[j].status,
        shift: result[j].shiftname,
      });
    }

    wing_id = wing_id.filter((item, index) => wing_id.indexOf(item) === index);
    wing_data = wing_data.filter(
      (item, index) => wing_data.indexOf(item) === index
    );

    tables_id = tables_id.filter(
      (item, index) => tables_id.indexOf(item) === index
    );
    tables_data = tables_data.filter(
      (item, index) => tables_data.indexOf(item) === index
    );

    seats_id = seats_id.filter(
      (item, index) => seats_id.indexOf(item) === index
    );
    seats_data = seats_data.filter(
      (item, index) => seats_data.indexOf(item) === index
    );

    for (k = 0; k < wing_id.length; k++) {
      for (l = 0; l < tables_id.length; l++) {
        for (h = 0; h < seats_id.length; h++) {
          seats.push({
            date: seats_data[h].date,
            seatsId: seats_data[h].seatsId,
            seatname: seats_data[h].seatname,
            availability: seats_data[h].availability,
            shift: seats_data[h].shift,
          });
        }
        tables.push({
          tableid: tables_data[l].tableId,
          tableName: tables_data[l].tablename,
          seats: seats,
        });
        //seats = [];
      }
      wings.push({
        wingid: wing_data[k].wingid,
        wingname: wing_data[k].wingname,
        tables: tables,
      });
      //tables = [];
    }

    let jsonData = '{"availability":[]}';
    obj = JSON.parse(jsonData);
    obj["availability"].push({ wings: wings });
    jsonData = JSON.stringify(obj);
    response.status(200).send(jsonData);
    // response.send();

    // res.send(result);
    // console.log(result.data);
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

module.exports = router;
