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
filterByDate.addEventListener("change", () => {
  let dateFilter = filterByDate.value;
  console.log(dateFilter);

  let tableItems = document.querySelectorAll(".wing-table");

  for (let tableItem of tableItems) {
    //console.log(tableItem);
    let dateItems = document.querySelectorAll(`.seat-date-${dateFilter}`);
    for (let dateItem of dateItems) {
      if (tableItem.contains(dateItem)) {
        console.log(tableItem);
      }
    }
  }
});

//callback function
function filterProducts() {
  let wingFilter = filterByWing.value.toLowerCase();

  console.log(wingFilter);

  let wings = grid.querySelectorAll(".wing");
  console.log(wings);

  //* filter by wing name
  // for (let i = 0; i < wings.length; i++) {
  //   if (wings[i].classList.contains(`${wingFilter}`)) {
  //     wings[i].style.display = "initial";
  //   } else {
  //     wings[i].style.display = "none";
  //   }
  // }
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
      tableDiv.className = `table wing-table table-${tableName}`;
      tableDiv.innerHTML = `
      <h2 class='table-name'> ${tableName} </h2>
      <div class='table-row table-${tableName}-${tableIndex}'></div>
      `;
      wingDiv.appendChild(tableDiv);

      seats.forEach((seat, seatIndex) => {
        //console.log(seat);
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

let seatItems = document.querySelectorAll(".chair");
let modalContainer = document.querySelector("#modal-section");
let closeBtn = document.querySelector("#close-btn");
let submitBtn = document.querySelector("#submit-btn");
let cancelBookingBtn = document.querySelector("#cancel-booking");
const overlay = document.getElementById("overlay");
let message = document.querySelector("#message");

seatItems.forEach((item) => {
  item.onclick = () => setModal(item);
});

function setModal(seatItem) {
  // open the modal
  modalContainer.classList.add("show");
  overlay.classList.add("active");

  //  insert desk id
  let deskInput = document.querySelector("#desk-id");

  //getting the value of the seat name
  let seatChildren = seatItem.children;
  for (let node of seatChildren) {
    let seatChlid = node.children;
    for (let seatNextChild of seatChlid) {
      if (seatNextChild.classList.contains("seat-name")) {
        deskInput.value = seatNextChild.textContent;
      }
    }
  }

  // form submit function
  submitBtn.onclick = () => {
    postData(seatItem);
  };
}

function postData(seat) {
  //post endpoint
  const postUrl = "http://localhost:5000/booking";
  let desk_id = document.getElementById("desk-id").value;
  let emp_id = document.getElementById("emp-id").value;
  let date = document.getElementById("date").value;
  let shift = document.getElementById("time").value;
  const payload = {
    desk_id: `${desk_id}`,
    emp_id: `${emp_id}`,
    date: `${date}`,
    shift: `${shift}`,
    booked_by: 1,
    booking_type: 0,
  };

  axios
    .post(postUrl, payload)
    .then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.status === 200) {
        message.innerHTML = `<p class='${response.data.success}'>${response.data.message}</p>`;
        if (response.data.success) {
          seatBooking(seat);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//close the modal
closeBtn.addEventListener("click", closeModal);
function closeModal() {
  modalContainer.classList.remove("show");
  overlay.classList.remove("active");
  //reset the input values
  document.getElementById("desk-id").value = "";
  document.getElementById("emp-id").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
  message.innerHTML = "";
}

function seatBooking(seat) {
  // close the modal when the response is sent
  modalContainer.classList.remove("show");
  overlay.classList.remove("active");
  message.innerHTML = "";

  // seatItems.forEach((item) => {
  //   item.classList.remove("booked");
  // });

  seat.classList.add("booked");
}

function userName() {
  axios.get(`http://localhost:5000/booking/user/name`).then((response) => {
    console.log(response.data);
  });
}
