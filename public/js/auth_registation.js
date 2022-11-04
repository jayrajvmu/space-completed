
 $('.alert').addClass("hide")




 document.getElementById("submit").onclick = function()
 
 
 {//do something
     // alert('askdjsa')

     document.getElementById("empname_error").innerHTML='';
     document.getElementById("empid_error").innerHTML='';
     document.getElementById("email_error").innerHTML='';
     document.getElementById("pass_error").innerHTML='';
     document.getElementById("cnfm-pass_error").innerHTML='';


    
     var employee_name = document.getElementById("employee_name").value;
     var employee_id = document.getElementById("employee_id").value;
     var email = document.getElementById("email").value;
     var pwd = document.getElementById("password").value;
     var cnfm_pwd = document.getElementById("cnfm_password").value;
     var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
     if(employee_name=='' && employee_id=='' && email=='' && pwd=='' && cnfm_pwd==''){
       document.getElementById("empname_error").innerHTML='Enter Employee Name';
       document.getElementById("empid_error").innerHTML='Enter Employee Id';
       document.getElementById("email_error").innerHTML='Enter Email id';
       document.getElementById("pass_error").innerHTML='Enter Password';
       document.getElementById("cnfm-pass_error").innerHTML='Enter Confirm Password';
       return;
     }
 
     if(employee_name=='')
     {
       document.getElementById("empname_error").innerHTML='Enter Employee Name';
      
     }
 
     if(employee_id=='')
     {
         document.getElementById("empid_error").innerHTML='Enter Employee Id';
      
     }
     if(email=='')
     {
         document.getElementById("email_error").innerHTML='Enter mail id';
       
     }
     
   if(pwd=='')
     {
         
         
         document.getElementById("pass_error").innerHTML='Enter Password';

     }
  
   
 
     if(cnfm_pwd=='')
     {
         // document.getElementById("email_error").remove()
         document.getElementById("cnfm-pass_error").innerHTML='Enter Confirm Password';
      
 
     }

     if(cnfm_pwd !=pwd )
     {
      document.getElementById("cnfm-pass_error").innerHTML='Password Missmatch';
return;
     }
 
     // else if(!filter.test(email))
     // {
  
     //     document.getElementById("email_error").innerHTML='Enter valid email id';
     // } 
 
 
 //axious api  calling to fetch the data
 
 const postUrl = "auth/register";
 // let email = document.getElementById('email').value;
 // let pass = document.getElementById('password').value;
 
 const input = {
 
   'employee_name':`${employee_name}`,
   'employee_id': `${employee_id}`,
   'email_id': `${email}`,
   'password': `${pwd}`,
   'confirm_password': `${cnfm_pwd}`,
   'create_status':'true or false',
   'status':''
 }
 
  
 
 console.log('inpt',input)
 
 axios.post(postUrl, input)
   .then(response => {
 
     
     console.log(response);
     
     if(response.data.success == false && response.data.message == 'Email id already exits')
     {
         
         document.getElementById("backend_error").innerHTML='Email Id Already Exits';
         document.getElementById("employee_id").value="";
         document.getElementById("email").value="";
         document.getElementById("password").value="";
         document.getElementById("cnfm_password").value="";
         return;
     }
 
        
     if(response.data.success == false && response.data.message == 'password missmatched' && response.data.status== 0)
     {
         
         document.getElementById("backend_error").innerHTML="Password Missmatched";
         document.getElementById("employee_id").value="";
         document.getElementById("email").value="";
         document.getElementById("password").value="";
         document.getElementById("cnfm_password").value="";
         return;
     }
 
     
     if(response.data.success == true && response.data.message == 'Registration success' && response.data.status ==1)
     {
         window.location.href = "/login?isredirect=true";
 
//       $('.alert').removeClass("hide")
     
//       $('.alert').addClass("show")
//       $('.alert').addClass("showAlert")
//  setTimeout(function(){
 
//    $('.alert').addClass("hide")
//    $('.alert').removeClass("showAlert")
//    $('.alert').removeClass("show")
 
 
//  },5000);
// // alert('sd')

//  $('.alert').removeClass("hide")
//  $('.alert').removeClass("showAlert")
      
     }
   
 
   })
   .catch(error => {
     console.log(error);
   })
 
 
 
 
 }
 
 
//  document.getElementByClass("color-btn").onclick = function(){
 
 
//  alert('sdlfmd')
//       $('.alert').addClass("hide")
//       $('.alert').removeClass("show")
 
 
//  }
 
 
 