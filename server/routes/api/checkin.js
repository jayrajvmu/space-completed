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



if((userDate.getFullYear()==now.getFullYear())&&(userDate.getMonth()==now.getMonth())&&(userDate.getDate()==now.getDate())){

        let slectSqlfromShift = `SELECT * FROM shift WHERE id='${resultbook[0].shift_id}';`;
        db.query(slectSqlfromShift, (err, result) => {
            if (err) {
                throw err;
            }
            let shift_start_time = result[0].start_time.split(":");


            if(shift_start_time[0]<=now.getHours()){
              
                let shiftStartTime = new Date(`${resultbook[0].date}`);
                shiftStartTime.setHours(`${shift_start_time[0]}`);
                shiftStartTime.setMinutes(0);

                let graceTime = new Date(`${resultbook[0].date}`);
                graceTime.setHours(`${shift_start_time[0]}`);
                let graceTimeMinute= +shift_start_time[1]+30;
                graceTime.setMinutes(graceTimeMinute);
                if(graceTime>now){
   let updateSqlfromBooking = `UPDATE booking SET status = '2' WHERE id = '${req.params.id}' AND emp_id='${req.body.emp_id}' AND status='1'`;
        db.query(updateSqlfromBooking, (errupdate, resultupdate) => {
            if (errupdate) {
                throw errupdate;
            }
            if(resultupdate.affectedRows!=0){
                res.json({ 'sucess': true, 'message': `Booking Id #${req.params.id}, check-in successfully`});
    
            }else{
                res.json({ 'success': false, 'message': 'No Booking Available' });
            }
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