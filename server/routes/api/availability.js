const express = require('express');
const { isDate } = require('moment/moment');
const router = express.Router();
const connection = require('../../db/mysql');


// request belongs to aavailability

router.post('/', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, tables.wing_id AS twing,
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, DATE_FORMAT(booking.date,'%Y-%m-%d') AS date, booking.id AS bid,
			   booking.seat_id AS bseat, booking.status AS bstatus
			   From wings  
			   INNER JOIN tables ON wings.id=tables.wing_id
			   INNER JOIN seats ON tables.id=seats.table_id 
			   LEFT JOIN booking ON seats.id=booking.seat_id`; 
			   console.log(request.body.date);
	let query = connection.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}

		let wing_id = [];
		let wing_data = [];

		let tables_id =[];
		let tables_data = [];

		let seats_id = [];
		let seats_data = [];

		let booking_id = [];
		let booking_data = [];
		//Mapping Elements
		let tables = [];
		let seats = [];
		let wings = [];
		
		for(let j = 0 ; j<result.length; j++) {
			wing_id.push(result[j].wid);
			wing_data.push({"wingid":result[j].wid,"wingname":result[j].wname});

			tables_id.push(result[j].tid);
			seats_id.push(result[j].seatid);

			tables_data.push({"tableId" :result[j].tid, "tablename":result[j].tname ,"twing":result[j].twing});
			seats_data.push({"date":result[j].date,"seatsId":result[j].seatid, "seatname": result[j].seatname, "bshift":result[j].bkshift,
			"availability":result[j].bstatus, "shift":result[j].sname, "empname":result[j].empname,"tableId" :result[j].tid});
			
			booking_id.push({"bookid":result[j].bid});
			booking_data.push({"bookseat":result[j].bseat, "bookid":result[j].bid});

		}

		let com_seat_id = [];
		let com_seat_status = [];
		let comavail = [];
		let dates = new Date();
		let currdate = dates.toISOString().substring(0,10);
		console.log(currdate);
		
		// for(a=0;a<result.length;a++){
		// 	com_seat_id.push(result[a].bseat);
		// 	com_seat_status.push(result[a].bstatus);
		// 	console.log(result[a].bseat);
		// 	console.log(result[a].bstatus);
		// }
		// for(b=0;b<com_seat_id.length;b++){
		// 	if(com_seat_status[b] == 1){
		// 		comavail.push(1);
		// 		console.log("amber" + 1);

		// 	}
			
		// 	if(com_seat_status[b] == 2){
		// 		console.log("red" + 2);
		// 		comavail.push(2);
		// 	}
			
		// 	// console.log(com_seat_status[b]);
		// }

		//console.log(com_seat_id);
		//console.log(com_seat_status);
		//console.log(comavail);
		wing_id = wing_id.filter((item,index) => wing_id.indexOf(item) === index);
		wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);


		tables_id = tables_id.filter((item,index) => tables_id.indexOf(item) === index);
		tables_data = tables_data.filter((item,index) => tables_data.indexOf(item) === index);


		seats_id = seats_id.filter((item,index) => seats_id.indexOf(item) === index);
		seats_data = seats_data.filter((item,index) => seats_data.indexOf(item) === index);

		booking_id = booking_id.filter((item,index) => booking_id.indexOf(item) === index);
		booking_data = booking_data.filter((item,index) => booking_data.indexOf(item) === index);
		console.log(booking_data);
		console.log(wing_data);
		console.log(result.length);
			
		for(let k=0;k<wing_id.length;k++) {
			for(let l=0;l<tables_id.length;l++) {
				if(wing_data[k].wingid == tables_data[l].twing) {
				for(let h=0;h<seats_id.length;h++) {
					if(tables_data[l].tableId == seats_data[h].tableId) {
										
						seats.push({"date":(seats_data[h].date!=null?seats_data[h].date:`${currdate}`),"seatsId":seats_data[h].seatsId, "seatname": seats_data[h].seatname,
						"availability":(seats_data[h].availability!=null?seats_data[h].availability:0), 
						"shift_id":seats_data[h].bshift, "shiftname":seats_data[h].shift, "EmpName":seats_data[h].empname});
					}
				}
				tables.push({"tableid":tables_data[l].tableId, "tableName":tables_data[l].tablename,"seats":seats}); 
				seats = [];
			}
			}
			wings.push({"wingid":wing_data[k].wingid,"wingname":wing_data[k].wingname,"tables":tables});
			tables = [];
		}

		
		let jsonData = '{"availability":[]}';
        obj = JSON.parse(jsonData);
        obj['availability'].push({"wings":wings});
        jsonData = JSON.stringify(obj);
		response.status(200).send(jsonData);
		response.send();

	});
});


// work in this api route completed
router.post('/wings', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, seats.table_id AS tseat, 
			   booking.shift_id AS bkshift, DATE_FORMAT(booking.date,'%Y-%m-%d') AS date, booking.id AS bid,
			   booking.seat_id AS bseat, booking.status AS bstatus, shift.shift_name AS sname, users.emp_id AS empname
			   From wings  
			   INNER JOIN tables ON wings.id=tables.wing_id
			   INNER JOIN seats ON tables.id=seats.table_id
			   LEFT JOIN booking ON seats.id=booking.seat_id 
			   LEFT JOIN shift ON shift.id=booking.shift_id 
			   LEFT JOIN users ON users.id=booking.emp_id 
			   WHERE wings.id=${request.body.wing}`;
			   console.log(request.body.date);
	let query = connection.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}

		let wing_id = [];
		let wing_data = [];

		let tables_id =[];
		let tables_data = [];

		let seats_id = [];
		let seats_data = [];

		let booking_id = [];
		let booking_data = [];
		//Mapping Elements
		let tables = [];
		let seats = [];
		let wings = [];
		
		for(let j = 0 ; j<result.length; j++) {
			wing_id.push(result[j].wid);
			wing_data.push({"wingid":result[j].wid,"wingname":result[j].wname});

			tables_id.push(result[j].tid);
			seats_id.push(result[j].seatid);

			tables_data.push({"tableId" :result[j].tid, "tablename":result[j].tname});
			seats_data.push({"date":result[j].date,"seatsId":result[j].seatid, "seatname": result[j].seatname, "bshift":result[j].bkshift,
			"availability":result[j].bstatus, "shift":result[j].sname, "empname":result[j].empname,
			"tableId" :result[j].tid, "tseat":result[j].tseat});
			
			booking_id.push({"bookid":result[j].bid});
			booking_data.push({"bookseat":result[j].bseat,});
	}

		let com_seat_id = [];
		let com_seat_status = [];
		let comavail = [];
		let dates = new Date();
		let currdate = dates.toISOString().substring(0,10);
		console.log(currdate);
	
		wing_id = wing_id.filter((item,index) => wing_id.indexOf(item) === index);
		wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);
		console.log(wing_id);

		tables_id = tables_id.filter((item,index) => tables_id.indexOf(item) === index);
		tables_data = tables_data.filter((item,index) => tables_data.indexOf(item) === index);


		seats_id = seats_id.filter((item,index) => seats_id.indexOf(item) === index);
		seats_data = seats_data.filter((item,index) => seats_data.indexOf(item) === index);

		booking_id = booking_id.filter((item,index) => booking_id.indexOf(item) === index);
		booking_data = booking_data.filter((item,index) => booking_data.indexOf(item) === index);
		console.log(booking_data);
		console.log(booking_id);
		

		for(let k=0;k<wing_id.length;k++) {
			for(let l=0;l<tables_id.length;l++) {
				for(let h=0;h<seats_id.length;h++) {
					if(tables_data[l].tableId == seats_data[h].tseat) {
						
						console.log(tables_data[l].tableId);
						console.log(seats_data[h].tseat);
						seats.push({"date":(seats_data[h].date!=null?seats_data[h].date:''),"seatsId":seats_data[h].seatsId, "seatname": seats_data[h].seatname,
						"availability":(seats_data[h].availability!=null?seats_data[h].availability:0), 
						"shift_id":seats_data[h].bshift, "shiftname":seats_data[h].shift, "EmpName":seats_data[h].empname});
					}
				}
				tables.push({"tableid":tables_data[l].tableId, "tableName":tables_data[l].tablename,"seats":seats}); 
				seats = [];
			}
			wings.push({"wingid":wing_data[k].wingid,"wingname":wing_data[k].wingname,"tables":tables});
			tables = [];
		}
		
		let jsonData = '{"availability":[]}';
        obj = JSON.parse(jsonData);
        obj['availability'].push({"wings":wings});
        jsonData = JSON.stringify(obj);
		response.status(200).send(jsonData);
		response.send();

	});
});
// work in this api route completed

router.post('/wings/date', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, DATE_FORMAT(booking.date,'%Y-%m-%d') AS date, booking.id AS bid,
			   booking.seat_id AS bseat, booking.status AS bstatus, shift.shift_name AS sname, users.emp_id AS empname
			   From wings  
			   INNER JOIN tables ON wings.id=tables.wing_id
			   INNER JOIN seats ON tables.id=seats.table_id
			   LEFT JOIN booking ON seats.id=booking.seat_id 
			   LEFT JOIN shift ON shift.id=booking.shift_id 
			   LEFT JOIN users ON users.id=booking.emp_id
			   WHERE wings.id=${request.body.wing} AND
			   booking.date IN (SELECT date FROM booking WHERE date="${request.body.date}")`;
			   console.log(request.body.date);
	let query = connection.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}

		let wing_id = [];
		let wing_data = [];

		let tables_id =[];
		let tables_data = [];

		let seats_id = [];
		let seats_data = [];

		let booking_id = [];
		let booking_data = [];
		//Mapping Elements
		let tables = [];
		let seats = [];
		let wings = [];
		
		for(let j = 0 ; j<result.length; j++) {
			wing_id.push(result[j].wid);
			wing_data.push({"wingid":result[j].wid,"wingname":result[j].wname});

			tables_id.push(result[j].tid);
			seats_id.push(result[j].seatid);

			tables_data.push({"tableId" :result[j].tid, "tablename":result[j].tname});
			seats_data.push({"date":result[j].date,"seatsId":result[j].seatid, "seatname": result[j].seatname, "bshift":result[j].bkshift,
			"availability":result[j].bstatus, "shift":result[j].sname, "empname":result[j].empname,"tableId" :result[j].tid});
			
			booking_id.push({"bookid":result[j].bid});
			booking_data.push({"bookseat":result[j].bseat});

		}
		let com_seat_id = [];
		let com_seat_status = [];
		let comavail = [];
		let dates = new Date();
		let currdate = dates.toISOString().substring(0,10);
		console.log(currdate);

		//console.log(com_seat_id);
		//console.log(com_seat_status);
		//console.log(comavail);

		

		wing_id = wing_id.filter((item,index) => wing_id.indexOf(item) === index);
		wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);


		tables_id = tables_id.filter((item,index) => tables_id.indexOf(item) === index);
		tables_data = tables_data.filter((item,index) => tables_data.indexOf(item) === index);


		seats_id = seats_id.filter((item,index) => seats_id.indexOf(item) === index);
		seats_data = seats_data.filter((item,index) => seats_data.indexOf(item) === index);

		booking_id = booking_id.filter((item,index) => booking_id.indexOf(item) === index);
		console.log(booking_id);

		for(let k=0;k<wing_id.length;k++) {
			for(let l=0;l<tables_id.length;l++) {
				for(let h=0;h<seats_id.length;h++) {
					if(tables_data[l].tableId == seats_data[h].tableId) {
						
						seats.push({"date":(seats_data[h].date!=null?seats_data[h].date:`${currdate}`),"seatsId":seats_data[h].seatsId, "seatname": seats_data[h].seatname,
						"availability":(seats_data[h].availability!=null?seats_data[h].availability:0), 
						"shift_id":seats_data[h].bshift, "shiftname":seats_data[h].shift, "EmpName":seats_data[h].empname});
					}
				}
				tables.push({"tableid":tables_data[l].tableId, "tableName":tables_data[l].tablename,"seats":seats}); 
				seats = [];
			}
			wings.push({"wingid":wing_data[k].wingid,"wingname":wing_data[k].wingname,"tables":tables});
			tables = [];
		}
		

        let jsonData = '{"availability":[]}';
        obj = JSON.parse(jsonData);
        obj['availability'].push({"wings":wings});
        jsonData = JSON.stringify(obj);
		response.status(200).send(jsonData);
		response.send();

		// res.send(result);
        // console.log(result.data);
	});
});

router.post('/wing/:id/:shift', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, DATE_FORMAT(booking.date,'%Y-%m-%d') AS date, booking.id AS bid,
			   booking.seat_id AS bseat, booking.status AS bstatus, shift.shift_name AS sname, users.emp_id AS empname
			   From wings  
			   LEFT JOIN tables ON wings.id=tables.wing_id
			   RIGHT JOIN seats ON tables.id=seats.table_id
			   RIGHT JOIN booking ON seats.id=booking.seat_id 
			   RIGHT JOIN shift ON shift.id=booking.shift_id 
			   RIGHT JOIN users ON booking.emp_id=users.id 
			   WHERE wings.id=${request.params.id} AND
			   booking.date IN (SELECT booking.date FROM booking WHERE date="${request.body.date}") AND
			   shift.shift_name IN (SELECT shift.shift_name FROM shift WHERE shift_name="${request.body.shift}")`;
	let query = connection.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}

		let wing_id = [];
		let wing_data = [];

		let tables_id =[];
		let tables_data = [];

		let seats_id = [];
		let seats_data = [];

		let booking_id = [];
		let booking_data = [];
		//Mapping Elements
		let tables = [];
		let seats = [];
		let wings = [];
		
		for(let j = 0 ; j<result.length; j++) {
			wing_id.push(result[j].wid);
			wing_data.push({"wingid":result[j].wid,"wingname":result[j].wname});

			tables_id.push(result[j].tid);
			seats_id.push(result[j].seatid);

			tables_data.push({"tableId" :result[j].tid, "tablename":result[j].tname});
			seats_data.push({"date":result[j].date,"seatsId":result[j].seatid, "seatname": result[j].seatname, "bshift":result[j].bkshift,
			"availability":result[j].bstatus, "shift":result[j].sname, "empname":result[j].empname,"tableId" :result[j].tid});
			
			booking_id.push({"bookid":result[j].bid});
			booking_data.push({"bookseat":result[j].bseat});

		}
		let com_seat_id = [];
		let com_seat_status = [];
		let comavail = [];
		let dates = new Date();
		let currdate = dates.toISOString().substring(0,10);
		console.log(currdate);
		
		for(a=0;a<result.length;a++){
			com_seat_id.push(result[a].bseat);
			com_seat_status.push(result[a].bstatus);
			console.log(result[a].bseat);
			console.log(result[a].bstatus);
		}
		for(b=0;b<com_seat_id.length;b++){
			if(com_seat_status[b] == 1){
				comavail.push(1);
				console.log("amber" + 1);

			}
			
			if(com_seat_status[b] == 2){
				console.log("red" + 2);
				comavail.push(2);
			}
			
			// console.log(com_seat_status[b]);
		}

		//console.log(com_seat_id);
		//console.log(com_seat_status);
		//console.log(comavail);

		

		wing_id = wing_id.filter((item,index) => wing_id.indexOf(item) === index);
		wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);


		tables_id = tables_id.filter((item,index) => tables_id.indexOf(item) === index);
		tables_data = tables_data.filter((item,index) => tables_data.indexOf(item) === index);


		seats_id = seats_id.filter((item,index) => seats_id.indexOf(item) === index);
		seats_data = seats_data.filter((item,index) => seats_data.indexOf(item) === index);

		booking_id = booking_id.filter((item,index) => booking_id.indexOf(item) === index);
		console.log(booking_id);

		for(let k=0;k<wing_id.length;k++) {
			for(let l=0;l<tables_id.length;l++) {
				for(let h=0;h<seats_id.length;h++) {
					if(tables_data[l].tableId == seats_data[h].tableId) {
						
						seats.push({"date":(seats_data[h].date!=null?seats_data[h].date:`${currdate}`),"seatsId":seats_data[h].seatsId, "seatname": seats_data[h].seatname,
						"availability":(seats_data[h].availability!=null?seats_data[h].availability:0), 
						"shift_id":seats_data[h].bshift, "shiftname":seats_data[h].shift, "EmpName":seats_data[h].empname});
					}
				}
				tables.push({"tableid":tables_data[l].tableId, "tableName":tables_data[l].tablename,"seats":seats}); 
				seats = [];
			}
			wings.push({"wingid":wing_data[k].wingid,"wingname":wing_data[k].wingname,"tables":tables});
			tables = [];
		}
		

        let jsonData = '{"availability":[]}';
        obj = JSON.parse(jsonData);
        obj['availability'].push({"wings":wings});
        jsonData = JSON.stringify(obj);
		response.status(200).send(jsonData);
		response.send();

		// res.send(result);
        // console.log(result.data);
	});
});

router.post('/shift', (req, res) => {

	let slectSqlfromTable = `SELECT seats.id, wings.name AS wingName, tables.id AS tableID, 
	tables.name AS tableName, wing_id, seats.name AS seatName 
	FROM wings
    INNER JOIN tables ON wings.id=tables.wing_id
    INNER JOIN seats ON tables.id=seats.table_id WHERE wing_id='${req.body.wing}'`;
    connection.query(slectSqlfromTable, (errtable, resulttable) => {
        if (errtable) {
            res.json({ 'success': false, 'message': `${errtable}` });
        }
let shiftName;
        let slectSqlfromShift = ` SELECT * FROM shift WHERE id='${req.body.shift}';`;
    connection.query(slectSqlfromShift, (errshift, resultshift) => {
        if (errtable) {
            res.json({ 'success': false, 'message': `${errtable}` });
        }
		for(i=0; i<resultshift.length;i++){
        shiftName=resultshift[i].shift_name;
		}
		console.log(shiftName);
    });
        let slectSqlfromBooking = ` SELECT * FROM booking         
        WHERE date='${req.body.date}' AND shift_id='${req.body.shift}' AND status=1 OR status=2`;
    connection.query(slectSqlfromBooking, (errbook, resultbook) => {
        if (errtable) {
            res.json({ 'success': false, 'message': `${errtable}` });
        }
        let result=[];
        let checkData=0;
        resulttable.forEach((element)=>{
            resultbook.forEach((elementbook)=>{
if(elementbook.seat_id==element.id){
               result.push({ id: `${element.id}`, TableName: `${element.tableName}`, TableID: `${element.tableID}`, Availablity: `${elementbook.status}`,SeatName: `${element.seatName}`, Date: `${req.body.date}`, ShiftID:`${req.body.shift}`, ShiftName:`${shiftName}` });
checkData=1;
}
            });
            if(checkData!=1){
                result.push({ id: `${element.id}`, TableName: `${element.tableName}`, TableID: `${element.tableID}` , Availablity: 0, SeatName: `${element.seatName}`, Date: `${req.body.date}`, ShiftID:`${req.body.shift}`,ShiftName:`${shiftName}`});
            }
            checkData=0;   
        })
        res.send(result)
    });  
    });
});	

router.post('/', (req, res) => {
	
	let slectSqlfromTable = `SELECT seats.id, wings.name AS wingName, tables.id AS tableID, tables.name AS tableName, 
	wing_id, seats.name AS seatName, booking.status AS availablity FROM wings
    LEFT JOIN tables ON wings.id=tables.wing_id
    RIGHT JOIN seats ON tables.id=seats.table_id
    LEFT JOIN booking ON seats.id=booking.seat_id WHERE wing_id='${req.body.wing}'`;
    connection.query(slectSqlfromTable, (errtable, resulttable) => {
        if (errtable) {
            res.json({ 'success': false, 'message': `${errtable}` });
        }
		let wingid = [];
		let wing_data =[];
		let tableid = [];
		let table_data = [];
		let wings =[];
		let tables =[];


    resulttable.forEach((element)=>{
    if(element.availablity==null){
      element.availablity=0;
	}
	wingid.push({"wingid":element.wing_id});
	wing_data.push({"wingid":`${element.wing_id}`, "wingname":`${element.wingName}`});
	tableid.push({"tableid":element.tableID});
	table_data.push({"tableid":element.tableID ,"tablename": element.tableName,})
	

});
    
	console.log(wing_data);
	console.log(tableid);
	wingid = wingid.filter((item,index) => wingid.indexOf(item) === index);
	wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);
	console.log(wingid);
		for(let i=0; i<wingid.length; i++){
			for(let j=0; j<tableid.length; j++){
				tables.push({"tableid": table_data[j].tableid});
				tables = [];
			}
			wings.push({"wingid": wing_data[i].wingid, "tables" : tables});
			
		}



      	res.send({"sucess": true, "wings": wings});
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
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APEX",
					  EmpName: "H150",
					},
					{
					  date: "2022-10-30",
					  seatsId: 2,
					  seatname: "WS-Seat2",
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APAC",
					  EmpName: "H151",
					},
				  ],
				},
				{
				  tableid: 1,
				  tableName: "WS2",
				  seats: [
					{
					  date: "2022-10-29",
					  seatsId: 1,
					  seatname: "WS-Seat1",
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APEX",
					  EmpName: "H150",
					},
					{
					  date: "2022-10-30",
					  seatsId: 2,
					  seatname: "WS-Seat2",
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APAC",
					  EmpName: "H151",
					},
				  ],
				},
				{
				  tableid: 1,
				  tableName: "WS3",
				  seats: [
					{
					  date: "2022-10-29",
					  seatsId: 1,
					  seatname: "WS-Seat1",
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APEX",
					  EmpName: "H150",
					},
					{
					  date: "2022-10-30",
					  seatsId: 2,
					  seatname: "WS-Seat2",
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APAC",
					  EmpName: "H151",
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
					  seatsId: 1,
					  seatname: "WS-Seat1",
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APAC",
					  EmpName: "H150",
					},
					{
					  date: "2022-10-31",
					  seatsId: 2,
					  seatname: "WS-Seat2",
					  availability: 1,
					  shift_id: 1,
					  shiftname: "APEX",
					  EmpName: "H151",
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
