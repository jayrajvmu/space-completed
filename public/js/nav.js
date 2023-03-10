let dropDownListItems = document.querySelectorAll(".dropdown-list-item");
let dropDownMenuItems = document.querySelectorAll(".dropdown-menu-list-item");

dropDownListItems.forEach((dropDownListItem) => {
  dropDownListItem.addEventListener("click", () => {
    let menuItem = dropDownListItem.querySelector(".dropdown-menu-list-item");
    menuItem.classList.toggle("active");
  });
});

//navbar hide and show
const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
menuIconButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

axios.get("http://localhost:5000/profileNames/").then((response)=>{
    let data = response.data;
    let profileName = document.querySelector(".your-profile");
    let profilePic= document.querySelector(".profile-logo");
    let empId = document.querySelector(".profile-name");
    profileName.textContent=data.employee_name;
    empId.textContent=data.employee_id;
    profilePic.innerHTML=`${data.employee_name.split("")[0]}`;
    //can be delete after, adding image tale;
})
