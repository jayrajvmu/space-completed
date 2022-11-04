



// let decodedCookie = decodeURIComponent(document.cookie);
decodedCookie =document.cookie.split("=")[1],
// 
// console.log('decodedC',document.cookie'); // => 'value'

console.log('document.cookie',decodedCookie)
// alert('decodedCookie',decodedCookie)
// const id=decodedCookie;

const input = {
    'user_id': decodedCookie,
  'valid_user':'true or false'
  }

axios.get("http://localhost:5000/profileNames/").then((response)=>{
    console.log(response)
    let data = response.data;
    let profileName = document.querySelector(".your-profile");
    let empId = document.querySelector(".profile-name");
    profileName.textContent=data.name;
    empId.textContent=data.empId;
})
