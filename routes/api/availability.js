const express = require('express');
const { isDate } = require('moment/moment');
const router = express.Router();
const connection = require('../../database/mysql');


// request belongs to aavailability
router.post('/wing', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, tables.name AS tname,
			   seats.id AS sid, booking.status AS bstatus, booking.shift_id AS bshift, booking.date AS bdate,
			   DATE_FORMAT(booking.date,'%Y-%m-%d') AS date, shift.shift_name AS sname
			   From wings  
			   LEFT JOIN tables ON wings.id=tables.wing_id
			   RIGHT JOIN seats ON tables.id=seats.table_id
			   LEFT JOIN booking ON seats.id=booking.seat_id
			   LEFT JOIN shift ON shift.id=booking.shift_id`;
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
		let booking_data = [];
		
		//Mapping Elements
		let tables = [];
		let seats = [];
		let wings = [];
		
		for(let j = 0 ; j<result.length; j++) { 
			wing_id.push(result[j].wid);
			wing_data.push({"wingid":result[j].wid,"wingname":result[j].wname});
			tables_id.push(result[j].tid);
			seats_id.push(result[j].stable);
			tables_data.push({"tableId" :result[j].tid, "tablename":result[j].tname, "tableswings":result[j].twings});
			seats_data.push({"date":result[j].date,"seatsId":result[j].stable, "seatname": result[j].seatname,
			"availability":result[j].bstatus, "Ename":result[j].Ename});
			booking_data.push({"date":result[j].bdate});
			console.log(result[j].wid);
		}
		// for(let i=0;i<result.length; i++){
		// 	wings.push({"wingId":result[i].wid, "tables":[{"tableId":result[i].tid,
		//  	"seats":[{"date":result[i].date,"seatid":result[i].sid, "availability":result[i].bstatus, 
		//  	"shiftid":result[i].bshift, "shiftname":result[i].sname}]}]});
		// }
		for(let k=0;k<wing_id.length;k++) {
			for(let l=0;l<tables_id.length;l++) {
				for(let h=0;h<seats_id.length;h++) {
					if(tables_data[l].tableId == seats_data[h].tableId) {
						seats.push({"date":(seats_data[h].date!=null?seats_data[h].date:''),"seatsId":seats_data[h].seatsId, "seatname": seats_data[h].seatname,
						"availability":(seats_data[h].availability!=null?seats_data[h].availability:0), 
						"shift_id":seats_data[h].bshift, "shiftname":seats_data[h].shift, "EmpName":seats_data[h].empname});
					}
				}
				if(tables_data[l].wingid == wing_data[k].wingid){
					console.log(wing_data[k].wingid);
					tables.push({"tableid":tables_data[l].tableId, "tableName":tables_data[l].tablename,"seats":seats}); 
					seats = [];
				}
			}
			wings.push({"wingid":wing_data[k].wingid,"wingname":wing_data[k].wingname,"tables":tables});
			// tables = [];
		}

		wing_id = wing_id.filter((item,index) => wing_id.indexOf(item) === index);
		wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);
		// console.log(wing_data);
		console.log(wings);

		tables_id = tables_id.filter((item,index) => tables_id.indexOf(item) === index);
		tables_data = tables_data.filter((item,index) => tables_data.indexOf(item) === index);


		seats_id = seats_id.filter((item,index) => seats_id.indexOf(item) === index);
		seats_data = seats_data.filter((item,index) => seats_data.indexOf(item) === index);

		let jsonData = '{"availability":[]}';
        obj = JSON.parse(jsonData);
        obj['availability'].push({sucess:true ,message : "sucessfully fetch a data","wings":wings});
        jsonData = JSON.stringify(obj);
		response.status(200).send(jsonData);
		response.send();

		// res.send(result);
        // console.log(result.data);
	});
});
// work in this api route

router.post('/wing/:id', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, DATE_FORMAT(booking.date,'%Y-%m-%d') AS date, booking.id AS bid,
			   booking.seat_id AS bseat, booking.status AS bstatus, shift.shift_name AS sname, users.emp_id AS empname
			   From wings  
			   LEFT JOIN tables ON wings.id=tables.wing_id
			   RIGHT JOIN seats ON tables.id=seats.table_id
			   LEFT JOIN booking ON seats.id=booking.seat_id 
			   RIGHT JOIN shift ON shift.id=booking.shift_id 
			   RIGHT JOIN users ON booking.emp_id=users.id 
			   WHERE wings.id=${request.params.id}`; 
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

	});
});

router.post('/wing/:id/:date', (request, response) => {
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
			   booking.date IN (SELECT booking.date FROM booking WHERE date="${request.body.date}")`;
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

router.post('/wing/:id/:date/:shift', (request, response) => {
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

module.exports = router;
