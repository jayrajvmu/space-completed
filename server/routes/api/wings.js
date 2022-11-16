const express = require('express');
const router = express.Router();
const db = require('../../db/mysql');
const moment = require('moment');


//Small changes

//Update Wing Details
router.put('/updateWing', (req,res) => {
	let check_values = [];
	let wing_id = req.body.wing_id;
	let wing_name = req.body.wing_name.toLowerCase();
	let updated_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	let updated_by =  1;

	let check_sql = `SELECT name FROM wings WHERE is_active = 0`;
	let query_wing_name = db.query(check_sql,(err, result, fields) => {
		if (err) {
		   res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		}
		
		for( x=0; x<result.length; x++) {
			check_values.push(result[x].name);
		}

		if(check_values.includes(req.body.wing_name.toLowerCase()) == false) {
			var sql = `UPDATE wings SET name = '${wing_name}' , updated_by = ${updated_by} , updated_at = '${updated_at}'  WHERE id = ${wing_id}`;		
			let query = db.query(sql, (err, result, fields) => {
					if (err) {
						res.send({"Success": false,"message":"Something Went Wrong. Try Again Later."});
					}
					res.send({"Success": true,"message":"The Wing is updated successfully."});
				});
		}
		else {
			res.send({"success":false,"message":"Wing Name is Already Exist Try New Name."});
		}
	});
});

//Update Table In Wing Details
router.put('/updateTable', (req,res) => {
	let check_values = [];
	let wing_id = req.body.wing_id;
	let table_id = req.body.table_id;
	let table_name = req.body.table_name;
	let updated_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	let updated_by =  1;

	let check_sql = `SELECT name FROM tables WHERE is_active = 0`;
	let query_table_name = db.query(check_sql,(err, result, fields) => {

		if (err) {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		 }
		 
		 for( x=0; x<result.length; x++) {
			 check_values.push(result[x].name);
		 }

		if(check_values.includes(req.body.table_name.toLowerCase()) == false) {

			var sql = `UPDATE tables SET name = '${table_name}' WHERE id = ${table_id} AND wing_id = ${wing_id}`;		
			let query = db.query(sql, (err, result, fields) => {
					if (err) {
						res.send({"Success": false,"message":"Something Went Wrong. Try Again Later."});
					}
					res.send({"Success": true,"message":"The Table is updated successfully."});
				});
		}
		else {
			res.send({"Success": false,"message":"Table Name Already Exist.Try New Name."});	
		}
	});
});

//Update Seat In Table Details
router.put('/updateSeat', (req,res) => {
	let check_values = [];
	let table_id = req.body.table_id;
	//let seat_name = req.body.seat_name;
	let seat_type = req.body.type
	let seat_id = req.body.seat_id;
	let updated_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	let updated_by =  1;

	let check_sql = `SELECT name FROM seats WHERE is_active = 0`;
	let query_table_name = db.query(check_sql,(err, result, fields) => {
		if (err) {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		 }
		 var sql = `UPDATE seats SET type = '${seat_type}' WHERE id = ${seat_id} AND table_id = ${table_id}`;		
		 let query = db.query(sql, (err, result, fields) => {
			if (err) {
				res.send({"Success": false,"message":"Something Went Wrong. Try Again Later."});
			}
			res.send({"Success": true,"message":"The Seat is updated successfully."});
		});

	});
});

//Add Seat For Table
router.post('/addseat',(req,res) => {
	let incre = 1;
	const is_active = 0;
	const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	let total_no_seats = req.body.total_no_seats;
	let table_id = req.body.table_id;
	let created_by = req.body.created_by;

	for(let i = 1;i<=total_no_seats;i++) {
		let wings_seats = {
			name :"WS-Seat"+ incre,
			table_id: table_id,
			created_by:created_by,
			created_at:created_at,
			is_active:is_active,
		};
		incre = incre + 1;
		let sql = 'INSERT INTO seats SET ?';
		let query = db.query(sql, wings_seats, (err, result, fields) => {
			if (err) {
				res.send({"Success": false,"message":"Something Went Wrong. Try Again Later."});
			}
		});
	}
	res.send({"Success": true,"message":"Seats have been successfully added."});
});

//Delete Seat From Table
router.delete('/deleteSeat/:seat_id',(req,res) => {

	//let table_id= req.body.table_id ;
	let seat_id = req.params.seat_id;
	//let created_by = req.body.created_by;

	var delete_seats_name = `SELECT name FROM seats WHERE id = ${seat_id}`;
	
	var delete_seats = `UPDATE seats 
						SET is_active = 1
						WHERE id = ${seat_id}`;

		let query_seat = db.query(delete_seats, (err, result_seat, fields) => {
			if (err) {
				res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
			}

			let delete_seat = db.query(delete_seats_name, (err, result_seat, fields) => {
				if (err) {
					res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
				}
			res.send({"success":true,"message":`${result_seat[0].name} was deleted successfully.`});
		});
	});
});

//Add Table to  Wings Functionaltiy
router.post('/addtable',(req,res) => {
	const is_active = 0;
	const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	const tot_seats = req.body.add_tables * 4;

	let wing_total_table= req.body.wing_total_table;
	let wing_id = req.body.wing_id;
	let created_by = req.body.created_by;

	var check_value = 0;
	let check_sql = `SELECT id FROM tables`;
	let check_query = db.query(check_sql, (err, result, fields) => {
		if(result.length == 0) {
			check_value = 1;
		}
		else {
			check_value = result.length;
			check_value = check_value + 1;
		}

		for(let i = 1;i<=wing_total_table;i++) {
			let wings_tables = {
			name : "WS" + check_value,
			wing_id: wing_id,
			created_by:created_by,
			created_at:created_at,
			is_active:is_active,
		};
		check_value = check_value + 1;
		let sql = 'INSERT INTO tables SET ?';
		let query = db.query(sql, wings_tables, (err, result, fields) => {
			if (err) {
				res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
			}
			var names = wings_tables.name;
			seatCreate(result.insertId,wings_tables.created_by,names);
		});
		}
});


	//tableCreate(wing_total_table,wing_id,created_by);
	res.send({"success":true,"message":"Table was successfully added."});
});

//Delete Tables in Wing
router.delete('/deletetable/:wing_id/:table_id',(req,res) => {

	let table_id= req.params.table_id;
	let wing_id = req.params.wing_id;

	var select_tables_name = `SELECT name FROM tables WHERE wing_id = ${wing_id} AND id = ${table_id}`;

	var tables_is_active = `UPDATE tables 
							SET is_active = 1
							WHERE wing_id = ${wing_id} AND id = ${table_id} AND is_active = 0`;
	let delete_tables = db.query(tables_is_active, (err, result_seat, fields) => {
		if (err) {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		}
		var delete_seats = `UPDATE seats 
							SET is_active = 1
							WHERE table_id IN (${table_id})`;

		let query_seat = db.query(delete_seats, (err, result_seat, fields) => {
			if (err) {
				res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
			}

			let table_name_query = db.query(select_tables_name, (err, table_name_result, fields) => {
				if(err) {
					res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
				}
				res.send({"success":true,"message":`${table_name_result[0].name} Table was deleted successfully.`});
			});
		});
	});
});

//Tables Settings (Total Count of Seat to be placed in one tables)
router.post('/tableSetting',(req,res) => {
	let tableSet = 'INSERT INTO table_settings SET ?';
	let table_data = {
		table_seat_count: `${req.body.count}`, 
	};
	let query = db.query(tableSet, table_data, (err, result, fields) => {
		if (err) {
			//throw err;
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		}
		res.send({"success":true,"message":"Table Settings were Successfully Added."});
	});
});
 
//Wings Delete it will change all the tables values and Seats is_active to 1;
router.delete('/:id',(req,res) => {
	var table_id = [];

	var wings_is_active = `UPDATE wings 
					   SET is_active = 1
					   WHERE id = ${req.params.id} AND is_active = 0`;

	var tables_is_active = `UPDATE tables 
					   SET is_active = 1 
					   WHERE wing_id = ${req.params.id} AND is_active = 0`;


	var select_tables_id = `SELECT id FROM tables WHERE wing_id = ${req.params.id}`;

	var select_wing_name = `SELECT name FROM wings WHERE id = ${req.params.id}`;


		  
	let query = db.query(wings_is_active, (err, result, fields) => {
		if (err) {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		}
		let query_table = db.query(select_tables_id, (err, result_id, fields) => {
			if (err) {
				res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
			}
			for(x=0;x<result_id.length;x++) {
				table_id.push(result_id[x].id);
			}

			let query = db.query(tables_is_active, (err, result, fields) => {
				if (err) {
					throw err;
				}
				if(table_id) {
					var wing_seat = `UPDATE seats 
							SET is_active = 1
							WHERE table_id IN (${table_id})`;


					let query_seat = db.query(wing_seat, (err, result_seat, fields) => {
						if (err) {
							res.send({"success":false,"message":"Something Went Wrong. Try Again Later."})
						}
					});
				}
				else {
					res.send({"success" : false,"message":"The Wing is not in use."});
				}
			});
		});
		let query_wing_name = db.query(select_wing_name, (err, winganme_result, fields) => {
			if(err) {
				res.send({"success":false,"message":"Something Went Wrong. Try Again Later."})
			}
			res.send({"success" : true,"message":`${winganme_result[0].name} Wing was deleted successfully.`});
		});	
	});
});

//Wings Master it will Return all the wings name
router.get('/',(req,res) => {
	let getWings = 'SELECT id,name FROM wings WHERE is_active = 0';
	let query = db.query(getWings, (err, result, fields) => {
		if (err) {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		} 
		else {
			res.send({"wing_name":result});
		}
	});	
});

//View Wings Based on Id
router.get('/:id',(req,res) => {
	let tables = [];
	let seats = [];
	//let wing = [];
	var sql = `SELECT  
				wings.id AS wing_ID,
				wings.name AS wing_Name,
				wings.total_tables AS Total_table,
				wings.total_seats AS Total_Seat,
				tables.id AS table_ID,
				tables.name AS table_name
				FROM 
				wings
				LEFT JOIN tables ON wings.id = tables.wing_id
				WHERE wings.id = ${req.params.id} AND wings.is_active = 0 AND tables.is_active = 0  ORDER BY tables.id ASC`;

		let query = db.query(sql,(err, result, fields) => {
		if (err) {
			throw err;
		} 
		let tables_id = [];
		let tables_data = [];
		for(let tab = 0; tab < result.length; tab++) {
			tables_id.push(result[tab].table_ID);
			tables_data.push({"id":result[tab].table_ID,"name":result[tab].table_name});
		}

		if(tables_id != '') {
			var sql1 = `SELECT  ALL
						id AS Seat_id,
						name	 AS Seat_name,
						type	 AS type,
						table_id AS Table_id
						FROM
						seats
						WHERE table_id IN (${tables_id}) AND is_active = 0			
					`;

			let query1 = db.query(sql1,(err, result1, fields) => {
				if (err) {
					res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
				}
				
				for(i = 0;i<result.length;i++) {
					for(k=0;k<result1.length;k++) {
						if(result[i].table_ID == result1[k].Table_id) {
							seats.push({"id":result1[k].Seat_id,"name":result1[k].Seat_name,"table_id":result1[k].Table_id,"type":result1[k].type});
						}
					}
					tables.push({"id":result[i].table_ID,"name":result[i].table_name,"seats":seats});
					seats = [];
				}
				var jsonData = [];
				jsonData.push({"id":result[0].wing_ID,"name":result[0].wing_Name,"no_of_tables":tables_id.length,"no_of_seats":result1.length,"tables":tables});
				res.send(jsonData[0]);
			});
		}
		else {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		}
	});
});

let incre = 1;
//Seats Creations
// 1 table consist of 4 seats(Chairs)
async function seatCreate(table_id,created_by) {
	const is_active = 0;
	const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	const seat_count = 4;
	for(let i = 1;i<=seat_count;i++) {
		let wings_seats = {
			name :"ws-seat"+ incre,
			table_id: table_id,
			created_by:created_by,
			created_at:created_at,
			is_active:is_active,
		};
		incre = incre + 1;
		let sql = 'INSERT INTO seats SET ?';
		let query = db.query(sql, wings_seats, (err, result, fields) => {
			if (err) {
				res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
			}
		});
	}
}

//Table Creations
async function tableCreate(table_number,wing_id,created_by) {
	const is_active = 0;
	const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	var check_value = 0;

	let check_sql = `SELECT id FROM tables`;
	let check_query = db.query(check_sql, (err, result, fields) => {
		if(result.length == 0) {
			check_value = 1;
		}
		else {
			check_value = result.length;
			check_value = check_value + 1;
		}

	for(let i = 1;i<=table_number;i++) {

		let wings_tables = {
		name : "ws" + check_value,
		wing_id: wing_id,
		created_by:created_by,
		created_at:created_at,
		is_active:is_active,
	};
	check_value = check_value + 1;
	let sql = 'INSERT INTO tables SET ?';
	let query = db.query(sql, wings_tables, (err, result, fields) => {
		if (err) {
			res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		}
		var names = wings_tables.name;
		seatCreate(result.insertId,wings_tables.created_by);
	});
}
	
});
	
}; 

//Add Rows to the table
// 1 table consist of 4 Chairs(seats)
router.post('/',(req,res) => {
	let check_values = [];
     const is_active = 0;
	 const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	 const tot_seats = req.body.wing_total_table * 4;
	 let check_sql = `SELECT name FROM wings WHERE is_active = 0`;
	 let query_wing_name = db.query(check_sql,(err, result, fields) => {
		if (err) {
		   res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
		}
		for( x=0; x<result.length; x++) {
			check_values.push(result[x].name);
		}
		
		if(check_values.includes(req.body.wing_name.toLowerCase()) == false) {

			let wings = { 
				name: `${req.body.wing_name}`.toLowerCase(), 
				total_tables: `${req.body.wing_total_table}`,
				//wing_total_seat: `${req.body.wing_total_seat}`,
				total_seats: tot_seats,
				is_active:is_active,
				created_at:created_at,
				created_by:1,
				//created_by:`${req.body.created_by}`,
			};
		 let sql = 'INSERT INTO wings SET ?';
		 let query = db.query(sql, wings, (err, result, fields) => {
			 if (err) {
				res.send({"success":false,"message":"Something Went Wrong. Try Again Later."});
			 }
			//Primary Id of Wing Master Table(db)
			const wing_master_id = result.insertId;
			tableCreate(wings.total_tables,wing_master_id,wings.created_by);
			res.status(200).send({success : true,message:`${req.body.wing_name} Wing is created successfully.`}); 
		 });
		}
		else {
			res.send({"success":false,"message":"Wing Name is Already Exist Try New Name."});
		}
	});
});

module.exports = router;
