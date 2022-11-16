const { application } = require("express");
const express = require("express");
const router = express.Router(); //for mentioning express route module
//use the controller to manage the routes and middleware
const userController = require("../../controllers/users");
// const cors = require('cors');
//  const axios = require('axios');
const path = require("path");

//initial landing page

router.get(`^/login(.html)?`, (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "heropage.html"));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "heropage.html"));
});

//route for render the register page
router.get("/register", (req, res) => {
  // hbs engine
  // res.render("register");

  // normal html engine

  res.sendFile(path.join(__dirname, "../../", "views", "register.html"));
});

//route for dashboard
router.get("/dash", userController.isLoggedIn, (req, res) => {
  if (req.user) {
    //check the user value is vailable or not
    // res.render("dashboard")
    
    res.sendFile(path.join(__dirname, "../../", "views", "dashboard.html"));
  } else {
    // alert('sd')
    //if not available redirect again loign  page
    // res.redirect('/login')

    res.sendFile(path.join(__dirname, "../../", "views", "login.html"));
  }
});

//route for home and use thr controller for middleware
//userController.isLoggedIn middleware
router.get("/home", userController.isLoggedIn, (req, res) => {
  // console.log(req.name)
  // res.render("home")

  if (req.user) {
    //check the user value is vailable or not
    //if available render the home
    // res.render('home',{user :req.user});
    res.sendFile(path.join(__dirname, "../../", "views", "wing.html"));
  } else {
    //if not available redirect again loign  page
    res.redirect("/login");
  }
});

router.get("/logout", userController.logout, (req, res) => {
  console.log("somethig");
});

//forgot password link sending

router.get("/forgot_password", (req, res) => {
  // res.send('email askkg')
  // hbs view enginr
  // res.render('forgotlink_inupt');
  // res.sendFile('forgotlink_inupt.html');
  // res.sendFile(path+'/forgotlink_inupt.html');
  // res.sendFile(path.join('views/forgotlink_inupt.html'));

  res.sendFile(
    path.join(__dirname, "../../", "views", "forgotlink_inupt.html")
  );
});

router.post("/reset-password_link", userController.passwordlink, (req, res) => {
  console.log("routeded");
  // res.render('info_about_resetpass')
  // res.sendFile(path.join(__dirname,"../../","views","info_about_resetpass.html"));
});

router.get("/info_about_resetpass", (req, res) => {
  console.log("info_about_resetpass");
  // res.render('info_about_resetpass')
  res.sendFile(
    path.join(__dirname, "../../", "views", "info_about_resetpass.html")
  );
});

router.get("/invalid_user", (req, res) => {
  console.log("invalid_user");
  // res.render('info_about_resetpass')
  res.sendFile(path.join(__dirname, "../../", "views", "usernotfound.html"));
});

router.get("/forgotpassword_page", (req, res) => {
  console.log("forgotpassword_page");
  // res.render('info_about_resetpass')
  res.sendFile(path.join(__dirname, "../../", "views", "forgotpassword.html"));
});

router.get(
  "/reset-password/:id/:token",
  userController.identifyuser,
  (req, res) => {
    const user_id = req.params.id;
    const user_token = req.params.token;
    // console.log("user_idcheck", user_id);
    // console.log("user_tokencheck", user_token);

    // res.render('forgotpassword')
  }
);

router.put(
  "/reset-password/:id/:token",
  userController.updateuser_pass,
  (req, res) => {
    // console.log('posr')
    //     const user_id=req.params.id;
    //     const user_token=req.params.token;
    // console.log("user_id",req)
    // console.log("user_token",user_token)
    // res.redirect('/login')
  }
);



router.get("/profileNames",userController.profile, (req, res) => {
  // console.log("routeded",req);


  // res.render('info_about_resetpass')
  // res.sendFile(path.join(__dirname,"../../","views","info_about_resetpass.html"));
});





router.get("/seat", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "seat.html"));
});

router.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "booking.html"));
});

router.get("/userBooking", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "userBooking.html"));
});

router.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "booking.html"));
});
router.get("/wingStructure", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "wingStructure.html"));
});

router.get("/my-booking", (req, res) => {
  res.sendFile(path.join(__dirname, "../../", "views", "cancel.html"));
});

module.exports = router; //export the module
