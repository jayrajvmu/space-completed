
 $('.alert').addClass("hide")
document.getElementById("submit").onclick = function()


{//do something
    // alert('askdjsa')
   
    var employee_id = document.getElementById("employee_id").value;
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("password").value;
    var cnfm_pwd = document.getElementById("cnfm_password").value;
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(employee_id=='')
    {
        document.getElementById("empid_error").innerHTML='Please enter Employee Id';
        return;
    }
    if(email=='')
    {
        document.getElementById("email_error").innerHTML='Please enter email id';
        return;
    }
    
  if(pwd=='')
    {
        
        
        document.getElementById("pass_error").innerHTML='Enter the password';
        return;
    }
 
  

    if(cnfm_pwd=='')
    {
        // document.getElementById("email_error").remove()
        
        document.getElementById("cnfm-pass_error").innerHTML='Enter the password';
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
        
        document.getElementById("backend_error").innerHTML=response.data.message;
        document.getElementById("employee_id").value="";
        document.getElementById("email").value="";
        document.getElementById("password").value="";
        document.getElementById("cnfm_password").value="";
        return;
    }

       
    if(response.data.success == false && response.data.message == 'password missmatched' && response.data.status== 0)
    {
        
        document.getElementById("backend_error").innerHTML=response.data.message;
        document.getElementById("employee_id").value="";
        document.getElementById("email").value="";
        document.getElementById("password").value="";
        document.getElementById("cnfm_password").value="";
        return;
    }

    
    if(response.data.success == true && response.data.message == 'Registration success' && response.data.status ==1)
    {
        window.location.href = "/login";

//      $('.alert').removeClass("hide")
    
//      $('.alert').addClass("show")
//      $('.alert').addClass("showAlert")
// setTimeout(function(){

//   $('.alert').addClass("hide")
//   $('.alert').removeClass("show")


// },5000);
     
    }
  

  })
  .catch(error => {
    console.log(error);
  })




}


document.getElementByClass("color-btn").onclick = function(){


alert('sdlfmd')
     $('.alert').addClass("hide")
     $('.alert').removeClass("show")


}



