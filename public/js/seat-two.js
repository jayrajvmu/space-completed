let fetchUrl = "http://127.0.0.1:5000/availability/dates";

let grid = document.querySelector("#cont");
let filterByWing = document.getElementById("wing");
let filterByDate = document.getElementById("filter-date");

fetch(fetchUrl)
  .then((res) => res.json())
  .then((json) => {
    let data = json.availability;

    // iterating products
    data.forEach((value, index) => {
      addElement(grid, value, index);
    });
  });

filterByWing.addEventListener("change", filterProducts);
filterByDate.addEventListener("change", filterDate);

// filter seat by date
function filterDate() {
  let dateFilter = filterByDate.value;
  let tableItems = document.querySelectorAll(".wing-table");

  for (let tableItem of tableItems) {
    let dateItem = tableItem.querySelector(`.date-${dateFilter}`);
    if (dateItem != null) {
      tableItem.style.display = "block";
    } else {
      tableItem.style.display = "none";
    }
  }
}

// filter seat by wings
function filterProducts() {
  let wingFilter = filterByWing.value.toLowerCase();

  console.log(wingFilter);

  let wings = grid.querySelectorAll(".wing");
  console.log(wings);

  //* filter by wing name
  for (let i = 0; i < wings.length; i++) {
    if (wings[i].classList.contains(`${wingFilter}`)) {
      wings[i].style.display = "initial";
    } else {
      wings[i].style.display = "none";
    }
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
      tableDiv.className = `table wing-table table-${tableName}`;
      tableDiv.innerHTML = `
        <h2 class='table-name'> ${tableName} </h2>
        <div class='table-row table-${tableName}-${tableIndex}'></div>
        `;
      wingDiv.appendChild(tableDiv);

      seats.forEach((seat, seatIndex) => {
        //console.log(seat);
        let {
          date: date,
          seatname: seatName,
          seatsId: seatId,
          EmpName: empName,
          empId: empId,
          shiftname: shiftName,
          shift_id: shiftId,
          availability: availability,
        } = seat;

        //console.log(seat);
        // manipultae seat availability class

        let availabilityClass;

        availability == 3
          ? (availabilityClass = "occupied")
          : availability == 2
            ? (availabilityClass = "booked")
            : (availabilityClass = "available");

        let tableColumn = document.querySelector(
          `.table-${tableName}-${tableIndex}`
        );

        let seatDiv = document.createElement("div");
        seatDiv.className = `chair seat-row-${seatIndex} ${availabilityClass}`;
        seatDiv.innerHTML = `
            <div class='seat-col'>
            <div class='emp-name ${seatName}' data-emp-id='${empId}' data-emp-name='${empName}'>${empName}</div>
            <div class='seat-name ${seatName}' data-seat-id='${seatId}' data-seat-name='${seatName}'>${seatName}</div>
            <div class='seat-date date-${date}'>${date}</div>
            <div class='seat-shift ${shiftName}' data-shift-id='${shiftId}' data-shift-name='${shiftName}'>${shiftName}</div>
            <div class='seat-availability' data-availability='${availability}'>${availability}</div>
            </div>`;
        tableColumn.appendChild(seatDiv);
      });
    });
  });

  //booking moudle starts
  bookingModule();
}

let availableModal = document.getElementById("modal-section-available");
let occupiedModal = document.getElementById("modal-section-occupied");

let closeBtnAvailable = document.querySelector("#close-btn");
let closeBtnOccupied = document.querySelector("#close-btn-occupied");

let overlayAvailable = document.getElementById("overlay");
let overlayOccupied = document.getElementById("overlay-occupied");

let message = document.querySelector("#message");

function bookingModule() {
  let availableSeatItems = document.querySelectorAll(".chair.available");
  let occupiedSeatItems = document.querySelectorAll(".chair.occupied");

  availableSeatItems.forEach((item) => {
    item.onclick = () => setAvailableModal(item);
  });

  occupiedSeatItems.forEach((item) => {
    item.onclick = () => setOccupiedModal();
  });
}

function setAvailableModal(seatItem) {
  let submitBtn = document.querySelector("#submit-btn");
  // open the modal
  availableModal.classList.add("show");
  overlayAvailable.classList.add("active");

  let userEmpName = seatItem.querySelector(".emp-name");
  let userSeatName = seatItem.querySelector(".seat-name");

  let dataSeatName = userSeatName.dataset.seatName;
  let dataSeatId = userSeatName.dataset.seatId;

  //  insert desk id
  let deskInput = document.querySelector("#desk-id");
  deskInput.value = dataSeatName;
  deskInput.dataset.seatId = dataSeatId;

  //  insert Emp id
  let deskEmployee = document.querySelector("#emp-id");

  /* getting empId using datalist starts */
  const dataList = document.getElementById("empIds");
  const dataListInput = document.getElementById("emp-id");

  const getSelecteOptionLocation = () => {
    for (let i = 0; i < dataList.options.length; i++) {
      if (dataList.options[i].value === dataListInput.value) {
        return dataList.options[i];
      }
    }
  };

  dataListInput.addEventListener("change", () => {
    const selectedOption = getSelecteOptionLocation();
    if (selectedOption == undefined) {
      console.log("option not included in the datalist");
    } else {
      let dataListEmpId = selectedOption.getAttribute("employeeId");
      deskEmployee.dataset.empRefId = dataListEmpId;
    }
  });

  /* getting empId using datalist ends */

  // form submit function
  submitBtn.onclick = () => {
    postData(seatItem);
  };
}

function postData(seat) {
  //post endpoint
  const postUrl = "http://localhost:5000/booking";
  let desk_id = document.getElementById("desk-id").dataset.seatId;
  let emp_id = document.getElementById("emp-id").dataset.empRefId;
  let date = document.getElementById("date").value;
  let shift = document.getElementById("time").value;
  let bookingType = +(document.querySelector('input[name="bookingType"]:checked').value);

  const payload = {
    desk_id: `${desk_id}`,
    emp_id: `${emp_id}`,
    date: `${date}`,
    shift: `${shift}`,
    booked_by: 1,
    booking_type: `${bookingType}`,
  };

  console.log(payload);

  axios
    .post(postUrl, payload)
    .then((response) => {
      // console.log(response);
      // console.log(response.data);
      if (response.status === 200) {
        message.innerHTML = `<p class='${response.data.success}'>${response.data.message}</p>`;
        if (response.data.success) {
          setTimeout(() => {
            seatBooking(seat);
          }, 1500);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//close the modal
closeBtnAvailable.addEventListener("click", closeAvailableModal);
function closeAvailableModal() {
  availableModal.classList.remove("show");
  overlayAvailable.classList.remove("active");
  //reset the input values
  document.getElementById("desk-id").value = "";
  document.getElementById("emp-id").value = "";
  document.getElementById("time").value = "select";
  message.innerHTML = "";
}

function seatBooking(seat) {
  // close the modal when the response is sent
  availableModal.classList.remove("show");
  overlayAvailable.classList.remove("active");
  message.innerHTML = "";

  // availableSeatItems.forEach((item) => {
  //   item.classList.remove("booked");
  // });

  seat.classList.add("booked");
}

function userName() {
  axios.get(`http://localhost:5000/booking/user/name`).then((response) => {
    console.log(response.data);
  });
}

userName();

/* occupied modal starts */
function setOccupiedModal() {
  // open the modal
  occupiedModal.classList.add("show");
  overlayOccupied.classList.add("active");
}
//close the modal
closeBtnOccupied.addEventListener("click", closeOccupiedModal);
function closeOccupiedModal() {
  occupiedModal.classList.remove("show");
  overlayOccupied.classList.remove("active");
}
/* occupied modal starts */

// Display current Date
var date = new Date();
var currentDate = date.toISOString().slice(0, 10);
document.getElementById("date").value = currentDate;
document.getElementById("filter-date").value = currentDate;
