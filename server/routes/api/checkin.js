const express = require('express');
const router = express.Router();
const db = require('../../db/mysql');



router.put('/:id', (req, res) => {

//     res.send(`checkin successful ${req.params.id}`);
// console.log(req.body);
    let slectSqlfromBooking = `SELECT * FROM booking WHERE emp_id='${req.body.emp_id}' AND status='1' AND id='${req.params.id}';`;
    db.query(slectSqlfromBooking, (errbook, resultbook) => {
        if (errbook) {
            throw errbook;
        }
let now=new Date();


console.log();
if(resultbook[0].date.toLocaleDateString()==now.toLocaleDateString()){

        let slectSqlfromShift = `SELECT * FROM shift WHERE id='${resultbook[0].shift_id}';`;
        db.query(slectSqlfromShift, (err, result) => {
            if (err) {
                throw err;
            }

            if(result[0].start_time<=now.getHours()){

                let shiftStartTime = new Date(`${resultbook[0].date}`);
                shiftStartTime.setHours(`${result[0].start_time}`);
                shiftStartTime.setMinutes(0);

                let GraceTime = new Date(`${resultbook[0].date}`);
                GraceTime.setHours(`${result[0].start_time}`);
                GraceTime.setMinutes(30);
console.log(GraceTime.toLocaleDateString());
                if(GraceTime>now){
   let updateSqlfromBooking = `UPDATE booking SET status = '2' WHERE id = '${req.params.id}' AND emp_id='${req.body.emp_id}' AND status='1'`;
        db.query(updateSqlfromBooking, (errupdate, resultupdate) => {
            if (errupdate) {
                throw errupdate;
            }
            res.json({ 'sucess': true, 'message': 'Check in successfully'});
        });
                }


                // res.send({'actual shift start':shiftStartTime.toLocaleString(), 'Grace':GraceTime.toLocaleString(), 'data':(GraceTime>now)})

            }
        });
}else{
    res.send({'success':false, 'message':'Timing Problem'})
}

     
    });
});
module.exports = router;