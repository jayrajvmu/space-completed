const express = require('express');
const router = express.Router();
const db = require('../../db/mysql')


//create new booking

router.post('/', (req, res) => {
    //fetch data from shift table
    if (!(req.body.emp_id)) {
        res.json({ "success": false, "message": "Please Enter a Valid Employee ID" });
    }
    else if ((req.body.desk_id) && (req.body.date) && (req.body.shift) && (req.body.booked_by)) {

        let slectSqlfromShift = `SELECT * FROM shift WHERE id='${req.body.shift}';`;
        db.query(slectSqlfromShift, (err, result) => {
            if (err) {
                res.json({ 'success': false, 'message': `${err}` });
            }
            //fetch data from booking table
            if (req.body.booking_type == 0) {
                let slectSqlfromRules = `SELECT * FROM booking_rules WHERE type='regular';`;
                db.query(slectSqlfromRules, (errRules, resultRules) => {
                    if (errRules) {
                        res.json({ 'success': false, 'message': `${errRules}` });
                    }

                    let shift_start_time = result[0].start_time.split(":");

                    let shiftStartTime = new Date(`${req.body.date}`);
                    shiftStartTime.setHours(`${shift_start_time[0]}`);
                    shiftStartTime.setMinutes(`${shift_start_time[1]}`);

                    let maximumtimetobook = new Date(`${req.body.date}`);
                    maximumtimetobook.setHours(`${shift_start_time[0] - resultRules[0].maximum_booking_time}`);
                    maximumtimetobook.setMinutes(`${shift_start_time[1]}`);

                    let minimumtimetobook = new Date(`${req.body.date}`);
                    minimumtimetobook.setHours(`${shift_start_time[0] - resultRules[0].minimum_booking_time}`);
                    minimumtimetobook.setMinutes(`${shift_start_time[1]}`);

                    let now = new Date();

                    // res.json({ 'start': `${shiftStartTime.toLocaleString()}`, 'maximun':`${maximumtimetobook.toLocaleString()}`, 'minimum':`${minimumtimetobook.toLocaleString()}`});
                    //check booking time is not less than 6 and more than 48 hrs.
                    if ((now > minimumtimetobook) && (now < maximumtimetobook)) {
                        let slectSqlfromBooking = `SELECT * FROM booking WHERE date='${req.body.date}' AND status='1';`;
                        db.query(slectSqlfromBooking, (errbook, resultbook) => {
                            if (errbook) {
                                res.json({ 'success': false, 'message': `${errbook}` });
                            }
                            let userDataisSame = 0;
                            let sameSlot = 0
                            //check each already booked date is inside a week
                            resultbook.forEach((element, index) => {
                                if (req.body.emp_id == element.emp_id) {
                                    userDataisSame = 1;
                                }
                                else if ((req.body.desk_id == element.seat_id)) {
                                    if (req.body.shift == element.shift_id) {
                                        sameSlot = 1
                                    }
                                }
                            });
                            //check user apply seat for same day
                            if (userDataisSame === 1) {
                                res.json({ 'success': false, 'message': 'You already booked for the day' });
                            }
                            else if (sameSlot === 1) {
                                res.json({ 'success': false, 'message': `Unable to make booking for #${req.body.desk_id} Slot, Please try a different slot` });
                            }


                            //check user apply only 3 days in a week this is for advace booking
                            else {
                                console.log();
                                let userData = { emp_id: `${req.body.emp_id}`, seat_id: `${req.body.desk_id}`, date: `${req.body.date}`, shift_id: `${req.body.shift}`, status: `1`, booked_by: `${req.body.booked_by}`, booking_type: `${req.body.booking_type}` };
                                let sql = 'INSERT INTO booking SET ?';
                                db.query(sql, userData, (errinsert, resultinsert, fields) => {
                                    if (errinsert) {
                                        res.json({ 'success': false, 'message': `${errinsert}` });
                                    }
                                    res.json({ 'success': true, 'message': `Seat #${req.body.desk_id} Booked Successfully` });
                                });

                            }
                            // res.send('ok')
                        });
                    }
                    else {
                        res.json({ 'success': false, 'message': 'Unable to make booking for this day. Please try a different day' });
                    }
                });
            }
            else {
                let slectSqlfromRules = `SELECT * FROM booking_rules WHERE type='advance';`;
                db.query(slectSqlfromRules, (errRules, resultRules) => {
                    if (errRules) {
                        res.json({ 'success': false, 'message': `${errRules}` });
                    }
                    let minimumtimetobookadvance = new Date();
                    let advanceBookngDate = new Date(`${req.body.date}`);
                    minimumtimetobookadvance.setHours(resultRules[0].minimum_booking_time);
                    minimumtimetobookadvance.setMinutes(0);
                    minimumtimetobookadvance.setSeconds(0);


                    let maximumtimetobookadvance = new Date();
                    maximumtimetobookadvance.setHours(resultRules[0].maximum_booking_time);
                    maximumtimetobookadvance.setMinutes(0);
                    maximumtimetobookadvance.setSeconds(0);

                    // res.json({ 'userDate': advanceBookngDate.toLocaleString(), 'maximum': maximumtimetobookadvance.toLocaleString(), 'minimum': minimumtimetobookadvance.toLocaleString() });
                    //check booking time is not less than 6 and more than 48 hrs.

                    if ((advanceBookngDate > minimumtimetobookadvance) && (advanceBookngDate < maximumtimetobookadvance)) {


                        let slectSqlfromBooking = `SELECT * FROM booking WHERE  status='1';`;
                        db.query(slectSqlfromBooking, (errbook, resultbook) => {
                            if (errbook) {
                                res.json({ 'success': false, 'message': `${errbook}` });
                            }
                            let bookingcount = 0;
                            let userDataisSame = 0;
                            let sameSlot = 0

                            //check each already booked date is inside a week
                            resultbook.forEach((element) => {

                                let userBookedDate = new Date(`${element.date}`);
                                let userBookingDate = new Date(`${req.body.date}`);
                                if (userBookingDate.toLocaleDateString() == userBookedDate.toLocaleDateString()) {
                                    if (req.body.emp_id == element.emp_id) {
                                        userDataisSame = 1;
                                    }
                                    else if ((req.body.desk_id == element.seat_id)) {
                                        if (req.body.shift == element.shift_id) {
                                            sameSlot = 1
                                        }
                                    }
                                }
                                if (element.booking_type == 1) {
                                    bookingcount++

                                }
                            });
                            //check user apply seat for same day
                            if (userDataisSame === 1) {
                                res.json({ 'success': false, 'message': 'You already booked for the day' });
                            }
                            else if (sameSlot === 1) {
                                res.json({ 'success': false, 'message': `Unable to make booking for #${req.body.desk_id} Slot, Please try a different slot` });
                            }
                            else {
                                //check user apply only 3 days in a week this is for advace booking

                                if (bookingcount < resultRules[0].maximum_slot) {
                                    let userData = { emp_id: `${req.body.emp_id}`, seat_id: `${req.body.desk_id}`, date: `${req.body.date}`, shift_id: `${1}`, status: `1`, booked_by: `${req.body.booked_by}`, booking_type: `${req.body.booking_type}` };
                                    let sql = 'INSERT INTO booking SET ?';
                                    db.query(sql, userData, (errinsert, resultinsert, fields) => {
                                        if (errinsert) {
                                            res.json({ 'success': false, 'message': `${errinsert}` });
                                        }
                                        res.json({ 'success': true, 'message': `Seat #${req.body.desk_id} Booked Successfully` });
                                    });



                                } else {
                                    res.json({ 'success': false, 'message': 'Unable to make booking, Only 3 bookings in a week' });
                                }
                            }
                        });

                    }

                    else {
                        res.json({ 'success': false, 'message': 'Unable to make booking for this day. Please try a different day' });
                    }
                });

            }
        });
    }
    else {
        res.send({ 'success': false, 'message': 'fill the all fieleds' })
    }
});


//fetch data from booking table for booked status view
router.get('/:id', (req, res) => {

    console.log(req.params.id);

    let slectSqlfromTable = `SELECT booking.id, users.emp_id AS emp_id, booking.emp_id AS emp_id_primary, seat_id, date, shift_id, shift_name, seats.name AS seat_name, booking.status FROM booking
INNER JOIN shift ON shift.id=booking.shift_id
INNER JOIN seats ON seats.id=booking.seat_id 
INNER JOIN users ON users.id=booking.emp_id WHERE booking.emp_id='${req.params.id}'AND booking.status='1'`;

    // res.send()
    // let slectSqlfromBooking = `SELECT * FROM booking WHERE emp_id='${req.params.id}'AND status='1'`;
    db.query(slectSqlfromTable, (errfetch, resultfetch) => {
        if (errfetch) {
            res.json({ 'success': false, 'message': `${errfetch}` });
        }

        res.json({ 'success': true, 'message': 'Booking data fetched successfully', 'data': resultfetch });
    });
});


//cancel booking

router.put('/:id', (req, res) => {
    let updateSqlfromBooking = `UPDATE booking SET status = '3' WHERE id = '${req.params.id}' AND emp_id='${req.body.emp_id}'`;
    db.query(updateSqlfromBooking, (errupdate, resultupdate) => {
        if (errupdate) {
            res.json({ 'success': false, 'message': `${errupdate}` });
        }
        if (resultupdate.affectedRows != 0) {
            res.json({ 'success': true, 'message': `Booking Id # ${req.params.id} cancelled successfully` });

        } else {
            res.json({ 'success': false, 'message': 'No Booking Available' });
        }
    });
});


router.get('/user/name', (req, res) => {

    let slectSqlfromRules = `SELECT * FROM users`;
    db.query(slectSqlfromRules, (errUser, resultUser) => {
        if (errUser) {
            res.json({ 'success': false, 'message': `${errUser}` });
        }
        let userArray = [];

        resultUser.forEach((element) => {

            userArray.push({ id: `${element.id}`, emp_id: `${element.emp_id}` });
        });
        res.json({ 'success': true, 'message': `User data fetched successfuly`, 'data': userArray });

    });

});
module.exports = router;