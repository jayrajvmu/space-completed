const express = require('express');
const moment = require('moment');
const db = require("./db/mysql");
const app = express();
const axios = require('axios');
const { json } = require('express');
var cors = require('cors')
const port = 8000;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
	//console.log(`Example app listening on port ${port}`);
	//console.log(port);
});

app.get('/',(req,res) => {
	res.send("Hello World");
});

//Tables Settings From
 


//Wings Delete it will change all the tables values and Seats is_active to 1;
app.delete('/wings/:id',(req,res) => {
	var table_id = [];

	var wings_is_active = `UPDATE wings 
					   SET is_active = 1
					   WHERE id = ${req.params.id} AND is_active = 0`;

	var tables_is_active = `UPDATE tables 
					   SET is_active = 1 
					   WHERE wing_id = ${req.params.id} AND is_active = 0`;


	var select_tables_id = `SELECT id FROM tables WHERE wing_id = ${req.params.id}`;

		  
	let query = db.query(wings_is_active, (err, result, fields) => {
		if (err) {
			throw err;
		}
		let query_table = db.query(select_tables_id, (err, result_id, fields) => {
			if (err) {
				throw err;
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
							throw err;
						}
					});
				}
				else {
					res.send({success : false,message:"Wing is not Active"});
				}
			});
		});
			res.send({success : true,message:"Wing Deleted Successfully"});
	});
});

//Wings Master it will Return all the wings name
app.get('/wings',(req,res) => {
	let getWings = 'SELECT id,name FROM wings WHERE is_active = 0';
	let query = db.query(getWings, (err, result, fields) => {
		if (err) {
			throw err;
		} 
		if(result != '') {
			res.json(result);
		}
		else {
    		res.send({success : false,message:"Wings not Active"});
		}
	});	
});

//View Wings Based on Id
app.get('/wings/:id',(req,res) => {
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
				WHERE wings.id = ${req.params.id} AND wings.is_active = 0 GROUP BY tables.id  ORDER BY tables.id ASC`;

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
						table_id AS Table_id
						FROM
						seats
						WHERE table_id IN (${tables_id}) AND is_active = 0			
					`;

			let query1 = db.query(sql1,(err, result1, fields) => {
				if (err) {
					throw err;
				}
				
				for(i = 0;i<result.length;i++) {
					for(k=0;k<result1.length;k++) {
						if(result[i].table_ID == result1[k].Table_id) {
							seats.push({"id":result1[k].Seat_id,"name":result1[k].Seat_name,"table_id":result1[k].Table_id});
						}
					}
					tables.push({"id":result[i].table_ID,"name":result[i].table_name,"seats":seats});
					seats = [];
				}
				
				
				var jsonData = '{"wings":[]}';
				obj = JSON.parse(jsonData);
				obj['wings'].push({"id":result[0].wing_ID,"Name":result[0].wing_Name,"Total_Tables":result[0].Total_table,"Total_Seats":result[0].Total_Seat,"tables":tables});
				jsonData = JSON.stringify(obj);
				res.send(jsonData);

			});
		}
		else {
    		res.send({success : false,message:"Wing View is not Active"});
		}
	});
});

let incre = 1;
//Seats Creations
// 1 table consist of 4 seats(Chairs)
async function seatCreate(table_id,created_by,wing_name) {
	const is_active = 0;
	const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	const seat_count = 4;
	for(let i = 1;i<=seat_count;i++) {
		let wings_seats = {
			name :"WS-Seat "+ incre,
			table_id: table_id,
			created_by:created_by,
			created_at:created_at,
			is_active:is_active,
		};
		let sql = 'INSERT INTO seats SET ?';
		let query = db.query(sql, wings_seats, (err, result, fields) => {
			if (err) {
				throw err;
			}
		});
		incre = incre + 1;

	}

}

//Table Creations
async function tableCreate(table_number,wing_id,created_by,wing_name,seat_count) {
	const is_active = 0;
	const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	
	for(let i = 1;i<=table_number;i++) {
		
		let wings_tables = {
			name : "WS "+i,
			wing_id: wing_id,
			created_by:created_by,
			created_at:created_at,
			is_active:is_active,
		};
		let sql = 'INSERT INTO tables SET ?';
		let query = db.query(sql, wings_tables, (err, result, fields) => {
			if (err) {
				throw err;
			}
			var names = wings_tables.name;
			seatCreate(result.insertId,wings_tables.created_by,names);
		});
	}
}; 

//Add Rows to the table
// 1 table consist of 4 Chairs(seats)
app.post('/wings',(req,res) => {
     const is_active = 0;
	 const created_at =  moment().format('YYYY/MM/DD h:mm:ss a');
	 const tot_seats = req.body.wing_total_table * 4;

     let wings = { 
			name: `${req.body.wing_name}`, 
			total_tables: `${req.body.wing_total_table}`,
			//wing_total_seat: `${req.body.wing_total_seat}`,
			total_seats: tot_seats,
			is_active:is_active,
			created_at:created_at,
			created_by:`${req.body.created_by}`,
		};
	 let sql = 'INSERT INTO wings SET ?';
	 let query = db.query(sql, wings, (err, result, fields) => {
	 	if (err) {
        	res.status(400).send(err);
			throw err;
	 	}
		//Primary Id of Wing Master Table(db)
		const wing_master_id = result.insertId;
	 	res.status(200).send({success : true,message:"Successfully Added "+ result.insertId,data:wings});
		 tableCreate(wings.total_tables,wing_master_id,wings.created_by,wings.name,tot_seats);
	 });
});
