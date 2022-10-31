
const mysql=require("mysql");  //creating  object for database
const bcrypt=require("bcryptjs")  //initialize the bcrypt js for passwod hashing 
const jwt=require('jsonwebtoken')  //initialize the jwt 
const {promisify}=require('util') //decode the cookies  promisify is a util object
const mailler = require('nodemailer'); //mailler 
const { connected } = require("process");
const path =require('path') //use this npm default package for maintaing the folder structure
// const location =path.join(__dirname);  //join function used to join the 2 paths   
// app.use(express.static(location)); //


// CommonJS
// const Swal = require('sweetalert2')
console.log('dirname'+__dirname)


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
    console.log(req.body)

    const employee=req.body.employee;
    const email=req.body.email;
    const password=req.body.password;
    const cnfm_password=req.body.cnfm_password;

        if(email=='')
        {

            // return res.render('register',{msg:'Please enter all field',msg_type:"error"})
            res.sendFile(path.join(__dirname,"../","views","register.html"));
            

        }
        if(password=='')
        {

            // return res.render('register',{msg:'Please enter all field',msg_type:"error"})

            console.log('Please enter all field')
            res.sendFile(path.join(__dirname,"../","views","register.html"));

        }
        if(cnfm_password=='')
        {

            // return res.render('register',{msg:'Please enter all field',msg_type:"error"})
            console.log('Please enter all field')
            res.sendFile(path.join(__dirname,"../","views","register.html"));

        }




    // };

    //alternative way to get a individual values
    // const {name,email,password,cnfm_password}=req.body

    // console.log('employee',employee)
    // console.log('email',email)
    // console.log('password',password)
    // console.log('password',cnfm_password)

//here we checking the getting data are available in bd or not for before inserting
//? is used to prevent sql enjection 

    db.query(
        "select email_id from users where email_id=?",[email],
      async (error,result)=> {
console.log('result.length',result.length)
            if(error)
            {
                confirm.log(error);
            }

            if(result.length>0)
            {

                // return res.render('register',{msg:'Email id already exits',msg_type:"error"})

                console.log('Email id already exits')
                res.sendFile(path.join(__dirname,"../","views","register.html"));
                
            }
            else if(password!==cnfm_password)
            {
                // return res.render('register',{msg:'password missmatch',msg_type:"error"})
                console.log('password missmatch')
                res.sendFile(path.join(__dirname,"../","views","register.html"));

            }

            let  hashedpassword= await bcrypt.hash(password,8);  //converting the hash password
            console.log('hashedpassword',hashedpassword)  //hashedpassword $2a$08$8wLTUVEsESSKu3G7nlGwI.8d/D5Auz8RpviTAdVohX24TCQH0e0Ti


            //inserting the values to user table 
            db.query("insert into users set ?",{emp_id:employee,email_id:email,password:password,confirm_password:hashedpassword},(error,result)=>{
                if(error)
                {
                 console.log(error);
                        }
                else{
                    console.log(result);
                    // return res.render('heropage',{msg:'Registration success',msg_type:"good"})

                    console.log('Registration success')
                    console.log('dirname'+__dirname)
                    res.sendFile(path.join(__dirname,"../","views","heropage.html"));
                    // res.sendFile(__dirname,"../../","views","heropage.html");

                    // Swal({
                    //       position: 'top-end',
                    //       icon: 'success',
                    //       title: 'Registered Successfully',
                    //       showConfirmButton: false,
                    //       timer: 2500
                    //     })
                    

                }
            
            })

        }
    )

}

//login controller

exports.login=async (req,res)=>
{
try {
// const {email ,password}=req.body;
const email=req.body.email;
const password=req.body.password;
console.log('emails',email)
if(!email || !password)
{ 
    // if(email=='' ||password=='') {

    //     return res.status(400).render("heropage",{msg:"Please enter your email and password",msg_type :"error"})
    // }


    // bhs
    // return res.status(400).render("heropage",{msg:"Please enter your email and password",msg_type :"error"})


    console.log('Please enter your email and password')
    res.sendFile(path.join(__dirname,"../","views","heropage.html"));
  
}


//authendicatinf the user name  and password
db.query("select * from users where email_id=?",[email],async (error,result)=>{
    console.log(result)
    if(result<=0){

        // return res.status(401).render("heropage",{
        //     msg: "please enter your email and password",
        //     msg_type:"error",});


        console.log('please enter your email and password')
        res.sendFile(path.join(__dirname,"../","views","heropage.html"));


    }
    else{
        if(!(await bcrypt.compare(password,result[0].confirm_password)))

        {
          
            
            // return res.status(401).render("heropage",{
            //     msg: "please enter your email and password",
            //     msg_type:"error",});


            console.log('please enter your email and password')
            res.sendFile(path.join(__dirname,"../","views","heropage.html"));

        }

        else
        {
            // res.send("good")
            const id=result[0].id; //getting the responce data ,like id from user table
            //generting the token  for session setup
             const token =jwt.sign({id :id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN,});
             //use the cookies to expire date for the  user name and password
            const  cookies={

            expires:new Date(
                Date.now()+process.env.JWT_COOKIE_EXPIRES *24*60*60*1000//h-m-s-mil
            ) ,
            httpOnly:true, //only works in http

            }  ;
              //store the cookie by responce //reflect in console->application->sessions->cookie
            res.cookie("cook",token,cookies);

            // http 200 means responce is perfect
            res.status(200).redirect("/home");



console.log('the token',token)

        }
    }
})

}
catch(error)
{
    console.log(error)
}

};


//loggedin controller
exports.isLoggedIn = async(req,res,next)=>
{

    // req.name="Check Login....";
      
    console.log(req.cookies);  //printing the saved cookies in our local machine


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

console.log("decode",decode.id)
//decodes the jwt token and return the user values and login to homepage after verifycation while user login into our app

db.query('select * from users where id=?',[decode.id],(err,results ) =>{

    console.log('results',results) //result returns the  users data from user table by decode.id from cookies
if(!results){
    return next(); //again to routing page.js
}
req.user=results[0];
return next();//again to routing page.js

}); 
}
catch(error)
{

    console.log(error);
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
    console.log('logouts')

// res.cookies('cook',"logout",{

//     expires :new Date(Date.now()+2 *1000),
//     httpOnly:true,
// });
res.clearCookie('cook'); //clears the cookie and the cookie name is cook
// hbs engine
// res.status(200).redirect("/logout")
res.redirect("/login")

};


//sending forgot password link creation 

exports.passwordlink = async function(req,res)
{

    // getting form inputs
console.log('req',req.body.email)

const user_credencial = req.body.email; //it can be either user id or email id

//first we need to check the form email is available in our our table

db.query('select * from users where email_id=?',[user_credencial],(err,results ) =>{

    console.log('resultss',results[0])

//if any data is not available in table for user given emailid ,it will be undefined

    if(results[0]!== undefined){
        console.log('present')

        console.log('id',results[0].id)
        console.log('id',results[0].employee_id)
        console.log('id',results[0].email_id)
        console.log('id',results[0].password)
        console.log('id',results[0].confirm_password)
        console.log('id',results[0].status)

        const userpass=results[0].confirm_password;
        const useremail=results[0].email_id;
        const user_id=results[0].id;
        
        console.log('err',err)
        
        //if email is available in users table
        // if(results[0].email_id=='')
        // {
        
        // console.log('user not available')
        
        // res.send('akjsndjkabsdkj')
        // }

        console.log('process.env.JWT_SECRET',process.env.JWT_SECRET);

        //user exsits and now create a one time link valid for  10 minutes

        const secretlink = process.env.JWT_SECRET + userpass
        console.log('secretlink',secretlink)
        const userinfo ={

            email :   results[0].email_id,
            user :  results[0].id

        }
        console.log('userinfo',userinfo)

        const token = jwt.sign(userinfo,secretlink,{expiresIn:'10m'})
        console.log('userinfo',token)


        const link=`http://localhost:5000/reset-password/${user_id}/${token}`
        console.log('link',link)
        const sender= mailler.createTransport({


            service:'gmail',
            auth:{
                user:'code.ghoster@gmail.com',
                pass :'ojhuhaevubvuoirt' 
            }
           
        });
        console.log('sender',sender)

//composing message 
        const composemail = {
            

            from :'code.ghoster@gmail.com' ,
            to : user_credencial , 
            subject:'Recover Password With Hogarth Portal',
            // html: '<h1>click the link</h1><a href="' + link + '">click</a>'  
            html:'<head><title>Reset Password Email Template</title><style type="text/css">a:hover {text-decoration: underline !important;}</style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"><table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family:sans-serif;"><tr><td><table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpaddin cellspacing="0"><tr><td style="height:80px;">&nbsp;</td> </tr><tr><td style="text-align:center;"><a href="https://rakeshmandal.com" title="logo" target="_blank"><img width="60" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNd6L3e7ef52rMr5jqox5Bps4NKievwEnJnjMv4fvb9cq5orT6t6L5a7-Fc5Q88fbvzA&usqp=CAU" title="logo" alt="logo"></a></td></tr><tr><td style="height:20px;"nbsp;</td> </tr><tr><td><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"><tr> <td style="height:40px;">&nbsp;</td> </tr> <tr> <td style="padding:0 35px;"><h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;">You have requested to reset your password</h><span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span><p style="color:#455056; font-size:15px;line-height:24px; margin:0;"> Please click the Below link to Change your password with Hogarth security portal.<br> A unique link to reset your password </p><br><a href="' + link + '" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Now</a></td></tr><tr><td style="height:40px;">&nbsp;</td> </tr> </table></td> <tr> <td style="height:20px;">&nbsp;</td></tr><tr><td style="text-align:center;"><p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.Admin.HogarthWings.com</strong></p> </td></tr> <tr><td style="height:80px;">&nbsp;</td></tr></table></td></tr></table> </body></html>'
         }

         console.log('composemail',composemail)
      

        sender.sendMail(composemail,function(error,info){


            if(error)
            {
                console.log('error',error)
            }
            else{

                console.log('mail sent' + info.response)
            }

        })
        // return res.render('info_about_resetpass')

        console.log('info_about_resetpass')
        res.sendFile(path.join(__dirname,"../","views","info_about_resetpass.html"));


    }

else
{

    // res.send('user is not registered')
    res.sendFile(path.join(__dirname,"../","views","usernotfound.html"));
}

})

};


exports.identifyuser = async function(req,res)
{

console.log('request.flkdf',req.params)
console.log('request.flkdsdsd',req)
const user_id=req.params.id;
console.log('user_id',user_id)
const user_token=req.params.token;
console.log('user_idd',user_id)

db.query('select * from users where id=?',[user_id],(err,results ) =>{

    console.log('results',results)

    const db_user_id=results[0].id
    const db_email=results[0].email_id;
    const confirm_password= results[0].confirm_password;

    console.log('db_user_id',db_user_id)

    if(db_user_id != user_id)
    {

        res.send('invalid user')
        // console.log('invalid')
    }

    const encrypt_secret = process.env.JWT_SECRET + confirm_password;

    try{

        const decrypt = jwt.verify(user_token,encrypt_secret)
        console.log('decrypt',decrypt)
        console.log('perfect')
        
        // return res.render('forgotpassword',)
        return res.render('forgotpassword',{id:user_id,token:user_token,email:db_email})

    }
    catch(error){

            console.log(error,message);
             res.send('page loading error');

    }
    





})




};





exports.updateuser_pass = async function(req,res)
{


    console.log('hereworking',req.body.password)

    const pass =req.body.password;
    const cnfm_pass =req.body.cnfm_password;
    const email =req.body.email;


    
const user_id=req.params.id;
const user_token=req.params.token;
console.log('user_idd',user_id)

db.query('select * from users where id=?',[user_id],async (err,results ) =>{

    console.log('resultsss',results)

    const db_user_id=results[0].id

   const confirm_password= results[0].confirm_password;
    console.log('db_user_id',db_user_id)

    if(db_user_id != user_id)
    {

        res.send('invalid user')
        return;
        // console.log('invalid')
    }

    const encrypt_secret = process.env.JWT_SECRET + confirm_password;

    try{
        const decrypt = jwt.verify(user_token,encrypt_secret)
        console.log('decrypttt',decrypt)
        //need to compare the passwords are same or not


        if(pass!==cnfm_pass)
        {
            // return res.render('forgotpassword',{errors: 'Password missmatch'})
            

        }

    


        let  hashedpassword= await bcrypt.hash(pass,8);  //converting the hash password
        console.log('hashedpassword',hashedpassword)  //hashedpassword $2a$08$8wLTUVEsESSKu3G7nlGwI.8d/D5Auz8RpviTAdVohX24TCQH0e0Ti



         //inserting the values to user table 
         db.query("UPDATE users SET password = ? ,confirm_password=?,is_status=?  WHERE id = ? and email_id=?",[hashedpassword,hashedpassword,1,user_id,email],(error,result)=>{
            if(error){
                console.log(error);
                res.send('error')
            }
            else{
                console.log(result);
                // return res.render('heropage',{msg:'password changed successfully',msg_type:'good'})
                console.log('password changed successfully')
                res.sendFile(path.join(__dirname,"../","views","heropage.html"));

            }
        
        })

        // updating the values to user table 
        // var sql = "UPDATE users SET password = ? ,confirm_password=?,status=1  WHERE id = ? and email_id=?";
        // db.query(sql, function (err, result) {
        //   if (err) throw err;
        //   console.log(result.affectedRows + " record(s) updated");
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


