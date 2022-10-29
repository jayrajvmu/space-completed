let fetchUrl = "http://127.0.0.1:5000/availability/dates";

let grid = document.querySelector("#cont");
let filterByWing = document.getElementById("wing");
let filterByDate = document.getElementById("wdate");

fetch(fetchUrl)
  .then((res) => res.json())
  .then((json) => {
    let data = json.availability;
    //console.log(data);

    // iterating products
    data.forEach((value, index) => {
      //console.log(value);
      addElement(grid, value, index);
    });
  });

//filterInput.addEventListener("keyup", filterProducts);
filterByWing.addEventListener("change", filterProducts);
filterByDate.addEventListener("change", filterProducts);

//callback function
function filterProducts() {
  let wingFilter = filterByWing.value.toLowerCase();
  let dateFilter = filterByDate.value.toLowerCase();

  console.log(wingFilter);
  console.log(dateFilter);

  let wings = grid.querySelectorAll(".wing");
  console.log(wings);

  for (let i = 0; i < wings.length; i++) {
    //* filter by wing name
    // if (wings[i].classList.contains(`${wingFilter}`)) {
    //   wings[i].style.display = "initial";
    // } else {
    //   wings[i].style.display = "none";
    // }

    //* filter by Date
    let wingTable = document.querySelectorAll(".wing-table");
    for (let j = 0; j < wingTable.length; j++) {
      let dateItem = document.querySelectorAll(`${dateFilter}`);
      console.log(dateItem);

      // if (wingTable[j].classList.contains(`${dateFilter}`)) {
      //   wingTable[j].style.display = "initial";
      // } else {
      //   wingTable[j].style.display = "none";
      // }

      // console.log(wingTable[j]);
    }
    console.log(wings[i]);
  }
}

// get value from the api create dynamic element
function addElement(appendIn, value, index) {
  let { wings: wings } = value;
  //console.log(wings);

  wings.map((wing) => {
    let { wingname: wingName, tables: tables } = wing;

    let wingDiv = document.createElement("div");
    wingDiv.className = `wing ${wingName.toLowerCase()}`;
    appendIn.appendChild(wingDiv);

    tables.forEach((table, tableIndex) => {
      let { tableName: tableName, seats: seats } = table;

      let tableDiv = document.createElement("div");
      tableDiv.className = `table wing-table`;
      tableDiv.innerHTML = `
      <h2 class='table-name'> ${tableName} </h2>
      <div class='table-col table-${tableName}-${tableIndex}'></div>
      `;
      wingDiv.appendChild(tableDiv);

      seats.forEach((seat, seatIndex) => {
        console.log(seat);
        let {
          seatname: seatName,
          date: date,
          shiftname: shiftName,
          availability: availability,
        } = seat;

        let tableColumn = document.querySelector(
          `.table-${tableName}-${tableIndex}`
        );
        let seatDiv = document.createElement("div");
        seatDiv.className = `chair seat-row-${seatIndex}`;
        seatDiv.innerHTML = `
          <div class='seat-col'>
          <div class='seat-name ${seatName}'>${seatName}</div>
          <div class='seat-date-${date}'>${date}</div>
          <div class='seat-shift ${shiftName}'>${shiftName}</div>
          <div class='seat-availability'>${availability}</div>
          </div>`;
        tableColumn.appendChild(seatDiv);
      });
    });
  });
}
