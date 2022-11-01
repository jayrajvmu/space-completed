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

let popupDate = document.getElementById("popupDate");
popupDate.value = currentDate;

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
  console.log(nid);
});

cButton.addEventListener("click", () => {
  display(nd, nid, nsd);
});

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
            ).innerHTML += `<div class="chair" id=${seat.seatid} ></div>`;
          }
          var list = document.getElementById(`${seat.seatsId}`);
          if (seat.availability == "1") {
            list.classList.add("booked");
          } else if (seat.availability == "2") {
            list.classList.add("danger");
          }
        });
      });
    })
    .then(bookingModule)
    .catch((error) => {
      console.log(error);
    });

  //booking moudle starts
}

// booking module functinality
let availableModal = document.getElementById("modal-section-available");
let occupiedModal = document.getElementById("modal-section-occupied");

let closeBtnAvailable = document.querySelector("#close-btn");
let closeBtnOccupied = document.querySelector("#close-btn-occupied");

let overlayAvailable = document.getElementById("overlay");
let overlayOccupied = document.getElementById("overlay-occupied");

let message = document.querySelector("#message");

function bookingModule() {
  let availableSeatItems = document.querySelectorAll(".chair");
  // let occupiedSeatItems = document.querySelectorAll(".chair.occupied");

  availableSeatItems.forEach((item) => {
    item.onclick = () => setAvailableModal(item);
  });

  //occupiedSeatItems.forEach((item) => {
  //   item.onclick = () => setOccupiedModal();
  // });
}

function setAvailableModal(seatItem) {
  console.log(seatItem);
  let submitBtn = document.querySelector("#submit-btn");
  // open the modal
  availableModal.classList.add("show");
  overlayAvailable.classList.add("active");

  // let userEmpName = seatItem.querySelector(".emp-name");
  // let userSeatName = seatItem.querySelector(".seat-name");
  let userSeatId = seatItem.getAttribute("id");
  console.log(userSeatId);

  // let dataSeatName = userSeatName.dataset.seatName;
  // let dataSeatId = userSeatName.dataset.seatId;

  //  insert desk id
  let deskInput = document.querySelector("#desk-id");
  deskInput.value = userSeatId;
  //deskInput.dataset.seatId = dataSeatId;

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
  let desk_id = document.getElementById("desk-id").value;
  let emp_id = document.getElementById("emp-id").dataset.empRefId;
  let date = document.getElementById("date").value;
  let shift = document.getElementById("time").value;
  let bookingType = +document.querySelector('input[name="bookingType"]:checked')
    .value;

  console.log(desk_id, emp_id, date, shift, bookingType);

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
