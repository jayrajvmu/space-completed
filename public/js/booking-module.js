var date = new Date();
var currentDate = date.toISOString().slice(0, 10);
document.getElementById("date").value;
let ename = document.getElementById("emp");
let show = document.getElementById("cont");
let cdate = document.getElementById("date");
let cwing = document.getElementById("wing");
let cshift = document.getElementById("shift");
let cButton = document.getElementById("check");
let nd;
let nid;
let nsd;
let shiftText;

//Changing DropDown Dynamically
function dropDown() {
  axios.get("http://localhost:5000/wings").then((res) => {
    let response = res.data.wing_name;
    let length;
    response.map((drop) => {
      cwing.innerHTML += `<option value=${drop.id}>${drop.name}</option>`;
    });
  });
}

function dropShift() {
  axios.get("http://localhost:5000/availability/shifts").then((res) => {
    let response = res.data.shifts;
    response.map((shift) => {
      cshift.innerHTML += `<option value=${shift.id} data-shift-name="${shift.shiftname}">${shift.shiftname}</option>`;
    });
  });
}

/* list of userName */
let userDetails;
function userName() {
  axios
    .get(`http://localhost:5000/booking/user/name`)
    .then((response) => {
      let userLists = response.data.data;
      userDetails = userLists;
    })
    .catch((error) => {
      return error;
    });
}

//Function Calling
dropDown();
dropShift();
userName();

cdate.addEventListener("change", (event) => {
  let dd = event.target.value;
  nd = dd;
  console.log(nd);
});

cwing.addEventListener("change", (event) => {
  let id = event.target.value;
  nid = id;
  console.log(nid);
});

cshift.addEventListener("change", (event) => {
  let sd = event.target.value;
  nsd = sd;
  console.log(nsd);
  shiftText = cshift.options[cshift.selectedIndex].dataset.shiftName;
  console.log(shiftText);
});

cButton.addEventListener("click", () => {
  display(nd, nid, nsd);
});

//Requesting response from the api and populating the UI
function display(nd, nid, nsd) {
  axios
    .post(`http://localhost:5000/availability/`, {
      wing: nid,
      date: nd,
      shift: nsd,
    })
    .then((res) => {
      console.log(res);
      $("#cont").empty();
      let colTable = res.data.wings;
      console.log(colTable);
      colTable.map((item) => {
        let tableCol =
          (show.innerHTML += `<div class ="table" id="table-${item.tableid}"></div>`);
        item.seats.map((seat) => {
          if (document.querySelector(`#table-${item.tableid}`)) {
            document.querySelector(
              `#table-${item.tableid}`
            ).innerHTML += `<div class="chair " id="${seat.seatid}" data-chair-id ="seat-${seat.seatid}" >${seat.seatid}</div>`;
          }
          let list = document.getElementById(`${seat.seatid}`);
          if (seat.availability == "1") {
            list.classList.add("booked");
          } else if (seat.availability == "2") {
            list.classList.add("occupied");
          } else {
            list.classList.add("available");
          }
        });
      });
      // calling the booking module function
      bookingModule();
    })
    .catch((error) => {
      console.log(error);
    });
}

// booking module functionality
let availableModal = document.querySelector("#modal-section");
let closeBtnAvailable = document.querySelector("#close-btn");
let overlayAvailable = document.querySelector("#overlay");
let message = document.querySelector("#message");

function bookingModule() {
  /* available chairs starts*/
  let availableSeatItems = document.querySelectorAll(".chair.available");
  availableSeatItems.forEach((item) => {
    item.onclick = () => setAvailableModal(item);
  });
  /* available chairs ends*/

  /* booked chairs starts*/
  let bookedSeatItems = document.querySelectorAll(".chair.booked");
  bookedSeatItems.forEach((item) => {
    item.onclick = () => setAvailableModal(item);
  });
  /* booked chairs ends*/

  /* occupied chairs starts*/
  let occupiedSeatItems = document.querySelectorAll(".chair.occupied");
  occupiedSeatItems.forEach((item) => {
    item.onclick = () => setOccupiedModal(item);
  });
  /* occupied chairs ends*/
}

function setAvailableModal(seatItem) {
  let deskName;
  let deskId = seatItem.getAttribute("id");
  let deskSlotId = nsd;
  let deskSlotName = shiftText;
  let deskDate = nd;
  // console.log(deskId, deskSlotId, deskDate);

  /* modal title starts */
  let modalTitle = document.querySelector("#modal-title");
  modalTitle.textContent = "Book the Seat";
  /* modal title ends */

  /* modal body starts */
  let modalBody = document.querySelector("#modal-body");
  modalBody.innerHTML = `
  <div class="seatbooking-form">
  <div class="form-input">
    <div class="form-input-radio-btns">
      <div class="form-radio-btn">
        <input type="radio" name="bookingType" value="0" checked />
        Normal
      </div>
      <div class="form-radio-btn">
        <input type="radio" name="bookingType" value="1" />
        Advanced
      </div>
    </div>
  </div>
  <div class="form-input">
    <label for="desk-id"> Desk Id </label>
    <input type="text" id="desk-id"  readonly value="${deskId}"/>
  </div>
  <div class="form-input">
    <label for="emp-id"> Emp Id <span>*</span></label>
    <input type="text" list="empIds"  id="emp-id" placeholder="HS12042"
      data-emp-ref-id />
    <datalist id="empIds">

    </datalist>
  </div>
  <div class="form-input">
    <label for="date"> Date  </label>
    <input type="text" id="popupDate" readonly value="${deskDate}"/>
  </div>
  <div class="form-input">
    <label for="time"> Shift </label>
    <input type="text" id="time"  readonly  value = "${deskSlotName}" />
  </div>
  <div class="form-submit">
    <button type="button" id="submit-btn" onclick ='postData("${deskId}","${deskDate}","${deskSlotId}")'>Book Now</button>
  </div>
</div>`;

  /* inserting emp id using api */
  let employeeIds = document.querySelector("#empIds");
  userDetails.map((user) => {
    employeeIds.innerHTML += `
  <option value = ${user.emp_id} employeeId = ${user.id}></option>
  `;
  });

  // opening modal
  availableModal.classList.add("show");
  overlayAvailable.classList.add("active");

  /* getting empId using datalist starts */
  const dataList = document.querySelector("#empIds");
  const dataListInput = document.querySelector("#emp-id");

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
      dataListInput.dataset.empRefId = 0;
      console.log("option not included in the datalist");
    } else {
      let dataListEmpId = selectedOption.getAttribute("employeeId");
      dataListInput.dataset.empRefId = dataListEmpId;
    }
  });
}

function postData(desk_id, desk_date, desk_slot) {
  //post endpoint
  const postUrl = "http://localhost:5000/booking";
  let emp_id = document.getElementById("emp-id").dataset.empRefId;
  let bookingType = document.querySelector(
    'input[name="bookingType"]:checked'
  ).value;

  const payload = {
    desk_id: +`${desk_id}`,
    emp_id: +`${emp_id}`,
    date: `${desk_date}`,
    shift: +`${desk_slot}`,
    booked_by: 1,
    booking_type: +`${bookingType}`,
  };

  console.log(payload);

  axios
    .post(postUrl, payload)
    .then((response) => {
      if (response.status === 200) {
        message.innerHTML = `<p class='${response.data.success}'>${response.data.message}</p>`;
        if (response.data.success) {
          setTimeout(() => {
            seatBooking(desk_id);
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
  message.innerHTML = "";
}

// close the modal when the response is sent
function seatBooking(seatId) {
  availableModal.classList.remove("show");
  overlayAvailable.classList.remove("active");
  message.innerHTML = "";
  let seatItems = document.querySelector(`[data-chair-id="seat-${seatId}"]`);
  seatItems.classList.add("booked");
}

/* occupied modal*/
function setOccupiedModal() {
  /* modal title starts */
  let modalTitle = document.querySelector("#modal-title");
  modalTitle.textContent = "Book the Seat";
  /* modal title ends */

  /* modal body starts */
  let modalBody = document.querySelector("#modal-body");
  modalBody.innerHTML = `
   <p>This seat is already occupied</p>
   `;

  // opening modal
  availableModal.classList.add("show");
  overlayAvailable.classList.add("active");
}
