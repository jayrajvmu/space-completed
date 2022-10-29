let fetchUrl = "http://127.0.0.1:5000/availability/dates";

let grid = document.querySelector("#cont");
//let filterInput = document.getElementById("filterInput");
let filterDropdown = document.getElementById("wing");

fetch(fetchUrl)
  .then((res) => res.json())
  .then((json) => {
    let data = json.dates;

    console.log(data);
    // iterating products
    data.forEach((value, index) => {
      addElement(grid, value, index);
    });
  });

// add event listener
//filterInput.addEventListener("keyup", filterProducts);
//filterDropdown.addEventListener("change", filterProducts);

// callback function
// function filterProducts() {
//   let filterValue = filterDropdown.value.toUpperCase();
//   let item = grid.querySelectorAll(".item");

//   for (let i = 0; i < item.length; i++) {
//     let span = item[i].querySelector(".category");
//     if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
//       item[i].style.display = "initial";
//     } else {
//       item[i].style.display = "none";
//     }
//   }
// }

// get value from the api create dynamic element
function addElement(appendIn, value, index) {
  let { date: date, wings: wings } = value;

  //date element
  let dateDiv = document.createElement("div");
  dateDiv.className = `date-row `;
  dateDiv.innerHTML = `
    <h2 class='date-name'> ${date} </h2>
    <div class='date-col-${index}'></div>
    `;
  appendIn.appendChild(dateDiv);

  let dateColumn = document.querySelector(`.date-col-${index}`);
  wings.map((wing) => {
    let { wingname: wingName, tables: tables } = wing;
    // console.log(wingName);
    // console.log(tables);
    let wingDiv = document.createElement("div");
    wingDiv.className = `wing ${wingName}`;
    dateColumn.appendChild(wingDiv);
    tables.map((table) => {
      let { tableName: tableName, seats: seats } = table;
      let tableDiv = document.createElement("div");
      tableDiv.className = `table table-row `;
      tableDiv.innerHTML = `
    <h2 class='table-name'> ${tableName} </h2>
    <div class='table-col-${index}'></div>
    `;
      wingDiv.appendChild(tableDiv);

      let tableColumn = document.querySelector(`.table-col-${index}`);
      seats.map((seat) => {
        let {
          seatname: seatName,
          shiftname: shift,
          availability: availability,
        } = seat;
        let seatDiv = document.createElement("div");
        seatDiv.className = "chair seat-row";
        seatDiv.innerHTML = `
      <div class='seat-col'>
      <div class='seat-name'>${seatName}</div>
      <div class='seat-shift'>${shift}</div>
      <div class='seat-availability'>${availability}</div>
      </div>`;
        tableColumn.appendChild(seatDiv);
      });
    });
  });
}
