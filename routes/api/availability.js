const express = require('express');
const router = express.Router();
const connection = require('../../database/mysql');

// request belongs to aavailability
router.get('/wing', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, booking.date AS date,
			   booking.seat_id AS bseat, booking.status AS bstatus, booking.shift_id AS sname, 
			   booking.emp_id AS ename, tables.wing_id AS twings, seats.table_id AS stable, DATE_FORMAT(booking.date,'%Y-%m-%d') AS date
			   From wings 
			   LEFT JOIN tables ON wings.id=tables.wing_id
			   LEFT JOIN seats ON seats.id=seats.table_id
			   LEFT JOIN booking ON seats.id=booking.seat_id`;

	let query = connection.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}
		console.log(result.length);

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
			console.log(result[j].wid);
			wing_data.push({"wingid":result[j].wid,"wingname":result[j].wname});
			tables_id.push(result[j].tid);
			seats_id.push(result[j].stable);
			tables_data.push({"tableId" :result[j].tid, "tablename":result[j].tname, "tableswings":result[j].twings});
			seats_data.push({"date":result[j].date,"seatsId":result[j].stable, "seatname": result[j].seatname,
			"availability":result[j].bstatus, "Ename":result[j].Ename});
			booking_data.push({"date":result[j].date});

		}

		wing_id = wing_id.filter((item,index) => wing_id.indexOf(item) === index);
		wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);


		tables_id = tables_id.filter((item,index) => tables_id.indexOf(item) === index);
		tables_data = tables_data.filter((item,index) => tables_data.indexOf(item) === index);


		seats_id = seats_id.filter((item,index) => seats_id.indexOf(item) === index);
		seats_data = seats_data.filter((item,index) => seats_data.indexOf(item) === index);

		booking_data = booking_data.filter((item,index) => {
			console.log(item);
		});
		
		for(let i=0; i<result.length;i++){
			// wings.push({"wing"})
		}
		
		
        let jsonData = '{"availability":[]}';
        obj = JSON.parse(jsonData);
        obj['availability'].push({"wings":wings});
        jsonData = JSON.stringify(obj);
		response.status(200).send(result);
		response.send();

		// res.send(result);
        // console.log(result.data);
	});
});

router.post('/wing/:id', (request, response) => {
	let sql = `SELECT wings.id AS wid, wings.name AS wname, tables.id AS tid, 
			   tables.name AS tname, seats.id AS seatid, seats.name AS seatname, 
			   booking.shift_id AS bkshift, DATE_FORMAT(booking.date,'%Y-%m-%d') AS date,
			   booking.seat_id AS bseat, booking.status AS bstatus, shift.shift_name AS sname
			   From wings  
			   LEFT JOIN tables ON wings.id=tables.wing_id
			   RIGHT JOIN seats ON tables.id=seats.table_id
			   LEFT JOIN booking ON seats.id=booking.seat_id 
			   RIGHT JOIN shift ON shift.id=booking.shift_id WHERE wings.id=${request.params.id}`;
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
			seats_id.push(result[j].seatid);

			
			tables_data.push({"tableId" :result[j].tid, "tablename":result[j].tname});
			seats_data.push({"date":result[j].date,"seatsId":result[j].seatid, "seatname": result[j].seatname, "bshift":result[j].bkshift,
			"availability":result[j].bstatus, "shift":result[j].sname, "empname":result[j].empname});
			booking_data.push({"date":result[j].date});
		}

		let com_seat_id = [];
		let com_seat_status = [];
		let comavail = [];
		
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

		console.log(com_seat_id);
		console.log(com_seat_status);
		console.log(comavail);

		

		wing_id = wing_id.filter((item,index) => wing_id.indexOf(item) === index);
		wing_data = wing_data.filter((item,index) => wing_data.indexOf(item) === index);


		tables_id = tables_id.filter((item,index) => tables_id.indexOf(item) === index);
		tables_data = tables_data.filter((item,index) => tables_data.indexOf(item) === index);


		seats_id = seats_id.filter((item,index) => seats_id.indexOf(item) === index);
		seats_data = seats_data.filter((item,index) => seats_data.indexOf(item) === index);

		for(let k=0;k<wing_id.length;k++) {
			for(let l=0;l<tables_id.length;l++) {
				for(let h=0;h<seats_id.length;h++) {
					seats.push({"date":(seats_data[h].date!=null?seats_data[h].date:''),"seatsId":seats_data[h].seatsId, "seatname": seats_data[h].seatname,
					"availability":(seats_data[h].availability!=null?seats_data[h].availability:0), 
					"shift_id":seats_data[h].bshift, "shiftname":seats_data[h].shift, "EmpName":seats_data[h].empname});
				}
				tables.push({"tableid":tables_data[l].tableId, "tableName":tables_data[l].tablename,"seats":seats}); 
				seats = [];
			}
			wings.push({"wingid":wing_data[k].wingid,"wingname":wing_data[k].wingname,"tables":tables});
			// tables = [];
		}
		booking_data = booking_data.filter((item,index) => {
			console.log(item);
		});

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
