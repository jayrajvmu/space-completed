

document.getElementById("submit").onclick = function()


{
    //do something
    // alert('askdjsa')
   
    var email = document.getElementById("email").value;
    console.log('email',email)

    var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email=='')
    {
        document.getElementById("email_error").innerHTML='Enter Employee Id or Email Id';
        return;
    }
    if(!filter.test(email))
    {
 
        document.getElementById("email_error").innerHTML='Enter valid Email id';
        return;


         
    }
    


//axious api  calling to fetch the data


const postUrl = "reset-password_link";
// let email = document.getElementById('email').value;
// let pass = document.getElementById('password').value;

const input = {
  'email_id': `${email}`,
  
}
console.log('inpt',input)

axios.post(postUrl, input)
  .then(response => {

    console.log(response);

    if(response.data.success == false && response.data.message == 'Email not Registered' && response.data.status == 0)
    {
        
        // document.getElementById("backend_error").innerHTML=response.data.message;

        // document.getElementById("email").value="";
       
        window.location.href = "/invalid_user";


    }
    if(response.data.success == true && response.data.message == 'Reset link  Sent to user_mailID' && response.data.status == 1)
    {
        
        window.location.href = "/info_about_resetpass";
       
    }
  
  })
  .catch(error => {
    console.log(error);
  })

}





