
// let email = document.getElementById("email");
// let password = document.getElementById("password");

// console.log(email,password)


document.getElementById("submit").onclick = function()


{//do something

    var email = document.getElementById("email").value;
    var pwd = document.getElementById("password").value;
    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email=='')
    {
        document.getElementById("email_error").innerHTML='Please enter email id';
        return;
    }
    else if(!filter.test(email))
    {
 
        document.getElementById("email_error").innerHTML='Enter valid email id';
        return;
    }
    else if(pwd=='')
    {
        document.getElementById("email_error").remove()
        
        document.getElementById("pass_error").innerHTML='Enter the password';
        return;
    }
 
    else if(pwd.length < 6|| pwd.length > 16)
    {
        // document.getElementById("email_error").remove()
        // document.getElementById("email_error").innerHTML()
   
        document.getElementById("pass_error").innerHTML='Password min and max length is 6';
        return;
    }
//     else
//     {
//         document.getElementById("pass_error").remove()
//         // document.getElementById("email_error").remove()
//     //     document.getElementById("email").value="";
//     // document.getElementById("password").value="";

// //    window.location = "http://localhost:5000/";

//         }


//axious api  calling to fetch the data


const postUrl = "auth/login";
// let email = document.getElementById('email').value;
// let pass = document.getElementById('password').value;
//s
const input = {
  'email_id': `${email}`,
  'password': `${pwd}`,
'valid_user':'true or false'
}
console.log('inpt',input)

axios.post(postUrl, input)
  .then(response => {

    
    console.log(response);
    if(response.data.success == true)
    {
        window.location.href = "/home";
    }
    if(response.data.success == false && response.data.status == 'invalid_Email-id')
    {
        
        document.getElementById("backend_error").innerHTML='User Not Registered';
        document.getElementById("email").value="";
        document.getElementById("password").value="";

        document.getElementById("email_error").innerHTML=''
        
        document.getElementById("pass_error").innerHTML='';
    }
    if(response.data.success == false && response.data.status == 'password not matched')
    {
        
        document.getElementById("backend_error").innerHTML='Password not matched';
        document.getElementById("email").value="";
        document.getElementById("password").value="";

        document.getElementById("email_error").innerHTML=''
        
        document.getElementById("pass_error").innerHTML='';
    }
  

    
  })
  .catch(error => {
    console.log(error);
  })




}







// function login()
// {
    
// }
//Reset Inputfield code.
// function clearFunc()
// {
//     document.getElementById("email").value="";
//     document.getElementById("pwd1").value="";
// }	

