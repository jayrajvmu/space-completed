
axios.get("http://localhost:5000/profileNames").then((response)=>{
    let data = response.data;
    let profileName = document.querySelector(".your-profile");
    let empId = document.querySelector(".profile-name");
    profileName.textContent=data.name;
    empId.textContent=data.empId;
})