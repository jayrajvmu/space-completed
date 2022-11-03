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
