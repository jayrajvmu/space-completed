const express = require('express');
const router = express.Router();
const db = require('../../db/mysql');



router.put('/:id', (req, res) => {


    let slectSqlfromBooking = `SELECT * FROM booking WHERE emp_id='${req.body.emp_id}' AND status='1' AND id='${req.params.id}';`;
    db.query(slectSqlfromBooking, (errbook, resultbook) => {
        if (errbook) {
            throw errbook;
        }
let now=new Date();
let userDate=new Date(resultbook[0].date);

console.log(userDate.toLocaleDateString());
console.log(now.toLocaleDateString());


if(userDate.toLocaleDateString()==now.toLocaleDateString()){

        let slectSqlfromShift = `SELECT * FROM shift WHERE id='${resultbook[0].shift_id}';`;
        db.query(slectSqlfromShift, (err, result) => {
            if (err) {
                throw err;
            }
            let shift_start_time = result[0].start_time.split(":");


            if(shift_start_time[0]<=now.getHours()){
                console.log('hi');
                let shiftStartTime = new Date(`${resultbook[0].date}`);
                shiftStartTime.setHours(`${shift_start_time[0]}`);
                shiftStartTime.setMinutes(0);

                let GraceTime = new Date(`${resultbook[0].date}`);
                GraceTime.setHours(`${shift_start_time[0]}`);
                GraceTime.setMinutes(30);

                if(GraceTime>now){
   let updateSqlfromBooking = `UPDATE booking SET status = '2' WHERE id = '${req.params.id}' AND emp_id='${req.body.emp_id}' AND status='1'`;
        db.query(updateSqlfromBooking, (errupdate, resultupdate) => {
            if (errupdate) {
                throw errupdate;
            }
            res.json({ 'sucess': true, 'message': `Booking Id #${req.params.id}, check-in successfully`});
        });
                }
                else{
                    res.send({'success':false, 'message':'Unable to check-in this seat. Please try again later'})

                }


                // res.send({'actual shift start':shiftStartTime.toLocaleString(), 'Grace':GraceTime.toLocaleString(), 'data':(GraceTime>now)})

            }
        });
}else{
    res.send({'success':false, 'message':'Unable to check-in this seat. Please try again later'})
}

     
    });
});
module.exports = router;