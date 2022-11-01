




document.getElementById("submit").onclick = function()


{//do something
    // alert('askdjsa')
   

    var pwd = document.getElementById("password").value;
    var cnfm_pwd = document.getElementById("cnfm_password").value;

    if(pwd=='')
    {
         document.getElementById("pass_error").innerHTML='Enter the password';
         return;
    }
 
  

    if(cnfm_pwd=='')
    {       
         document.getElementById("cnfm-pass_error").innerHTML='Enter the confirm password';
         return;
    }
    
    if(cnfm_pwd!=pwd)
    {
        
        document.getElementById("cnfm-pass_error").innerHTML='Password missmatch';
        return;
    }





    
    queryString='//urldefense.com/v3/__http:/localhost:5000/reset-password/1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNla2FyLnNhcmF2YW5hbkBob2dhcnRoLmNvbSIsInVzZXIiOjEsImlhdCI6MTY2NzA1MjQzNywiZXhwIjoxNjY3MDUzMDM3fQ.RSGxpROxfRcGNIY5o93sRW8XHQinNVJQS84wTSTQRqw__;!!JboVxjCXSME!OxJaLp1AR0UMjEwOoItLL9NEJfotfKO0YsIWPZMRlHSqYqkS2oGLkCwiMZXe318U81yk2ytmQMUmLaVr9KM2mfe8NQY$'
    console.log('queryString',queryString)
    queryString = queryString.split('/')[7];

const user_id = queryString.split('/')[7];
const token = queryString.split('/')[8];
console.log('queryStringuser_id',user_id)
console.log('queryStringtoken',token)
   




//axious api  calling to fetch the data

// const link=`http://localhost:5000/reset-password/${user_id}/${token}
const postUrl = `http://localhost:5000/reset-password/${user_id}/${token}`
console.log('postUrl',postUrl)

// let email = document.getElementById('email').value;
// let pass = document.getElementById('password').value;

const input = {
  'password': `${pwd}`,
  'confirm_password': `${cnfm_pwd}`,

  'create_status':'true or false',
  'status':''
}

axios.put(postUrl, input)
  .then(response => {

    
    console.log(response);
   
    
  })
  .catch(error => {
    console.log(error);
  })



}