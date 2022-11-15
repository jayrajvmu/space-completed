
const mysql=require("mysql");  //creating  object for database

const bcrypt=require("bcryptjs")  //initialize the bcrypt js for passwod hashing 
const jwt=require('jsonwebtoken')  //initialize the jwt 
const {promisify}=require('util') //decode the cookies  promisify is a util object
const mailler = require('nodemailer'); //mailler 
const { connected } = require("process");
const path =require('path') //use this npm default package for maintaing the folder structure
// const location =path.join(__dirname);  //join function used to join the 2 paths   
const axios = require('axios');
// app.use(express.static(location)); //


// CommonJS
// const Swal = require('sweetalert2')


var db = mysql.createConnection({

    
    
      //WITH ENV  
    
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASS,
        database:process.env.DATABASE,
    
      });
    

//registration controller

exports.register=(req,res)=>
{
    // res.send("form submitted")

    const employee=req.body.employee_id;
    const email=req.body.email_id;
    const password=req.body.password;
    const cnfm_password=req.body.confirm_password;
    const employee_name=req.body.employee_name




if(employee_name=='')
{
    res.json({ 'success': false , 'message':'employee-name_missing','status':0});

}
    if(employee=='')
    {

        // return res.render('register',{msg:'Please enter all field',msg_type:"error"})
        // res.sendFile(path.join(__dirname,"../","views","register.html"));
        res.json({ 'success': false , 'message':'employee-id_missing','status':0});
        

    }

    if(email=='')
        {

            // return res.render('register',{msg:'Please enter all field',msg_type:"error"})
            // res.sendFile(path.join(__dirname,"../","views","register.html"));
            res.json({ 'success': false , 'message':'email-id_missing','status':0});
            

        }
        if(password=='')
        {

            // return res.render('register',{msg:'Please enter all field',msg_type:"error"})

            // res.sendFile(path.join(__dirname,"../","views","register.html"));
            res.json({ 'success': false , 'message':'password_missing','status':0});

        }
        if(cnfm_password=='')
        {

            // return res.render('register',{msg:'Please enter all field',msg_type:"error"})
            // res.sendFile(path.join(__dirname,"../","views","register.html"));
            res.json({ 'success': false , 'message':'confirm-password_missing','status':0});

        }




    // };

    //alternative way to get a individual values
    // const {name,email,password,cnfm_password}=req.body

   

//here we checking the getting data are available in bd or not for before inserting
//? is used to prevent sql enjection 

    db.query(
        "select email_id from users where email_id=?",[email],
      async (error,result)=> {
            if(error)
            {
                confirm.log(error);
            }

            if(result.length>0)
            {

                // return res.render('register',{msg:'Email id already exits',msg_type:"error"})

                // res.sendFile(path.join(__dirname,"../","views","register.html"));
                res.json({ 'success': false , 'message':'Email id already exits','status':0,'create_status':false});
                
            }
            else if(password!==cnfm_password)
            {
                // return res.render('register',{msg:'password missmatch',msg_type:"error"})
                // res.sendFile(path.join(__dirname,"../","views","register.html"));
                res.json({ 'success': false , 'message':'password missmatched','status':0,'create_status':false});

            }
           else if(result.length==0)
            {

                
            
            let  hashedpassword= await bcrypt.hash(password,8);  //converting the hash password


            //inserting the values to user table 
            db.query("insert into users set ?",{emp_id:employee,email_id:email,password:password,confirm_password:hashedpassword,employee_name:employee_name,is_status:1},(error,result)=>{
                if(error)
                {
                 res.json(error);
                        }
                else{
                    // return res.render('heropage',{msg:'Registration success',msg_type:"good"})

           
                    res.json({ 'success': true , 'message':'Registration success','status':1,'create_status':true});
                  
                }
            
            })
                
            }


        }
    )

}

//login controller

exports.login=async (req,res)=>
{

try {
// const {email ,password}=req.body;
const email=req.body.email_id;
const employee_id=req.body.email_id;
const password=req.body.password;

if(!email || !password)
{ 
    // if(email=='' ||password=='') {

    //     return res.status(400).render("heropage",{msg:"Please enter your email and password",msg_type :"error"})
    // }


    // bhs
    // return res.status(400).render("heropage",{msg:"Please enter your email and password",msg_type :"error"})



    res.json({ 'success': false, 'message':'Please send Email and password'});
   
    // res.sendFile(path.join(__dirname,"../","views","heropage.html"));
  
}


//authendicatinf the user name  and password
db.query("select * from users where email_id=? OR emp_id=? ",[email,employee_id],async (error,result)=>{
    if(result<=0){

        // return res.status(401).render("heropage",{
        //     msg: "please enter your email and password",
        //     msg_type:"error",});


        // res.sendFile(path.join(__dirname,"../","views","heropage.html"));
        res.json({ 'success': false, 'message':error,'status': 'invalid_Email-id'});





    }
    else{

        


        if(!(await bcrypt.compare(password,result[0].confirm_password)))

        {
          
            
            // return res.status(401).render("heropage",{
            //     msg: "please enter your email and password",
            //     msg_type:"error",});


            // res.sendFile(path.join(__dirname,"../","views","heropage.html"));
            res.json({ 'success': false, 'message':error,'status': 'password not matched'});

        }

        else
        {
            // res.send("good")
            const id=result[0].id; //getting the responce data ,like id from user table
            //generting the token  for session setup
             const token =jwt.sign({id :id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
             //use the cookies to expire date for the  user name and password
            const  cookies={

            expires:new Date(
                Date.now()+process.env.JWT_COOKIE_EXPIRES *24*60*60*1000//h-m-s-mil
            ) ,
            httpOnly:true, //only works in http
            loginuser_id:result[0].id,
        

            }  ;

   
            const usercookie={
'token':token,
'cookies':cookies

            }

            const users_id=result[0].id;
          
            res.cookie("cook",token,cookies);

            // return res
            // .cookie("access_token",token)
            // .status(200)
            // .json({ 'success': true, 'message':'valid user','token':token,'cookies':cookies,});

            // res.cookie('cookies', token, { usercookie: cookies, httpOnly: true });
            // document.cookie = "username=John Doe";
            res.json({ 'success': true, 'message':'valid user','token':token,'cookies':cookies,});

            // http 200 means responce is perfect
            // res.status(200).redirect("/home");

        }
    }
})

}
catch(error)
{
    res.json(error)
}

};


//loggedin controller
exports.isLoggedIn = async(req,res,next)=>
{

    // req.name="Check Login....";
      


    //what need to do next render thr value to the corresspondace route

    // next() 

    if(req.cookies.cook){

 //if any cookie is available we need to fetch the user data ,so here we nee to use the utile object it is available in npm 
//decode the cookies -usen utill object promise
//verifyb the jwt token


try{
const decode=await promisify(jwt.verify)(

    req.cookies.cook,process.env.JWT_SECRET
); //decodes the jwt token and return the user values and login to homepage


res.cookie("uservalue",decode.id);

//decodes the jwt token and return the user values and login to homepage after verifycation while user login into our app

db.query('select * from users where id=?',[decode.id],(err,results ) =>{

if(!results){
    return next(); //again to routing page.js
}
req.user=results[0];
return next();//again to routing page.js
        
}); 
}
catch(error)
{

    return next();//again to routing page.js
}
    }

else
{

    next()//again to routing page.js
}

}

//logout function e
exports.logout = async function(req,res)
{

// res.cookies('cook',"logout",{

//     expires :new Date(Date.now()+2 *1000),
//     httpOnly:true,
// });
res.clearCookie('cook'); //clears the cookie and the cookie name is cook
res.clearCookie('uservalue');
// hbs engine
// res.status(200).redirect("/logout")
res.redirect("/login")

};


//sending forgot password link creation 

exports.passwordlink = async function(req,res)
{

    // getting form inputs

const user_credencial = req.body.email_id; //it can be either user id or email id

//first we need to check the form email is available in our our table

db.query('select * from users where email_id=?',[user_credencial],(err,results ) =>{


//if any data is not available in table for user given emailid ,it will be undefined
if(results[0]== undefined){

    res.json({ 'success': false, 'error':err,'status': 0,'message':'Email not Registered'});
}
    if(results[0]!== undefined){


        const userpass=results[0].confirm_password;
        const useremail=results[0].email_id;
        const user_id=results[0].id;
        
        
        //if email is available in users table
        // if(results[0].email_id=='')
        // {
        
        
        // res.send('akjsndjkabsdkj')
        // }


        //user exsits and now create a one time link valid for  10 minutes

        const secretlink = process.env.JWT_SECRET + userpass
        const userinfo ={

            email :   results[0].email_id,
            user :  results[0].id

        }

        const token = jwt.sign(userinfo,secretlink,{expiresIn:'10m'})


        const link=`http://localhost:5000/reset-password/${user_id}/${token}`
        const sender= mailler.createTransport({


            service:'gmail',
            auth:{
                user:'code.ghoster@gmail.com',
                pass :'ojhuhaevubvuoirt' 
            }
           
        });

//composing message 
        const composemail = {
            

            from :'  code.ghoster@gmail.com' ,
            to : user_credencial , 
            subject:'Recover Password With Hogarth Portal',
            // html: '<h1>click the link</h1><a href="' + link + '">click</a>'  
            html:'<head><title>Reset Password Email Template</title><style type="text/css">a:hover {text-decoration: underline !important;}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family:sans-serif;"><tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpaddin cellspacing="0"><tr><td style="height:80px;">&nbsp;</td> </tr><tr><td style="text-align:center;"><a href="https://rakeshmandal.com" title="logo" target="_blank"><img width="60" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNd6L3e7ef52rMr5jqox5Bps4NKievwEnJnjMv4fvb9cq5orT6t6L5a7-Fc5Q88fbvzA&usqp=CAU" title="logo" alt="logo"></a></td></tr><tr><td style="height:20px;"nbsp;</td> </tr><tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"><tr> <td style="height:40px;">&nbsp;</td> </tr> <tr> <td style="padding:0 35px;"><h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;">You have requested to reset your password</h><span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style="color:#455056; font-size:15px;line-height:24px; margin:0;"> Please click the Below link to Change your password with Hogarth security portal.<br> A unique link to reset your password </p><br><a href="' + link + '" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Now</a></td></tr><tr><td style="height:40px;">&nbsp;</td> </tr> </table></td> <tr> <td style="height:20px;">&nbsp;</td></tr><tr><td style="text-align:center;"><p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.Admin.HogarthWings.com</strong></p> </td></tr> <tr><td style="height:80px;">&nbsp;</td></tr></table></td></tr></table> </body></html>'
         }

      

        sender.sendMail(composemail,function(error,info){


            if(error)
            {
                res.json(error)
            }
            else{

                res.json(info.response)
            }

        })
        // return res.render('info_about_resetpass')

        // res.sendFile(path.join(__dirname,"../","views","info_about_resetpass.html"));
        res.json({ 'success': true, 'error':err,'status': 1,'message':'Reset link  Sent to user_mailID','mail-from':sender.options.auth.user,'mail-to':user_credencial});


    }



})

};


exports.identifyuser = async function(req,res)
{


const user_id=req.params.id;
const user_token=req.params.token;

db.query('select * from users where id=?',[user_id],(err,results ) =>{


    const db_user_id=results[0].id
    const db_email=results[0].email_id;
    const confirm_password= results[0].confirm_password;


    if(db_user_id != user_id)
    {

        res.send('invalid user')
    }

    const encrypt_secret = process.env.JWT_SECRET + confirm_password;

    try{

        const decrypt = jwt.verify(user_token,encrypt_secret)

        
        // return res.render('forgotpassword',)
        // return res.render('forgotpassword',{id:user_id,token:user_token,email:db_email})
        // window.location.href = `http://localhost:5000/reset-password/${user_id}/${user_token}`
        // res.json({ 'success': true, 'error':err,'status': 1,'msg':'user verified','id':user_id,'token':token,'email':db_email});
        res.sendFile(path.join(__dirname,"../","views","forgotpassword.html"));

    }
    catch(error){

             res.send('page loading error');

    }
    





})




};






exports.profile = async function(req,res)
{


    const user_id=req.cookies.uservalue;
    
    
    
    db.query('select * from users where id=?',[user_id],async (err,results ) =>{
    
    
      const db_user_id=results[0].id;
      const  db_employee_id=results[0].emp_id;
      const  db_employee_name=results[0].employee_name;
      const  is_status=results[0].is_status;
      res.json({ 'success': true,'valid_user':true,'user_id':db_user_id,'employee_id':db_employee_id,'employee_name':db_employee_name,'is_status':is_status})

    });

}




exports.updateuser_pass = async function(req,res)
{



    const pass =req.body.password;
    const cnfm_pass =req.body.confirm_password;
    // const email =req.body.email;


    
const user_id=req.params.id;
const user_token=req.params.token;

db.query('select * from users where id=?',[user_id],async (err,results ) =>{


    const db_user_id=results[0].id

   const confirm_password= results[0].confirm_password;

    if(db_user_id != user_id)
    {

        res.send('invalid user')
        return;
    }

    const encrypt_secret = process.env.JWT_SECRET + confirm_password;

    try{
        const decrypt = jwt.verify(user_token,encrypt_secret)
        //need to compare the passwords are same or not


        if(pass!==cnfm_pass)
        {
            // return res.render('forgotpassword',{errors: 'Password missmatch'})
            res.json({ 'success': false, 'error':err,'status': 0,'message':'password missmatch'});

        }

    


        let  hashedpassword= await bcrypt.hash(pass,8);  //converting the hash password



         //inserting the values to user table 
         db.query("UPDATE users SET password = ? ,confirm_password=?,is_status=?  WHERE id = ?",[hashedpassword,hashedpassword,1,user_id],(error,result)=>{
            if(error){
                res.send('error')
            }
            else{
                // return res.render('heropage',{msg:'password changed successfully',msg_type:'good'})
                // res.sendFile(path.join(__dirname,"../","views","heropage.html"));
                
                res.json({ 'success': true, 'error':err,'status': 1,'message':'password updated'});
            }
        
        })

        // updating the values to user table 
        // var sql = "UPDATE users SET password = ? ,confirm_password=?,status=1  WHERE id = ? and email_id=?";
        // db.query(sql, function (err, result) {
        //   if (err) throw err;
        // });
      
        


        // res.redirect('/login')







    }
catch(error)
{
    res.send(error.message)
}
})


    // res.redirect('/login')
};




