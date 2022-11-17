//Id Selection
let ename = document.getElementById("emp");
let show = document.getElementById("cont");
let cdate = document.getElementById("date");
let cwing = document.getElementById("wing");
let cshift = document.getElementById("shift");
let cButton = document.getElementById("check");
let closeBtnAvailable = document.querySelector(".close-button");
let modShow = document.getElementById("modal");
let overlayAvailable = document.querySelector("#overlay");
let bookDetails = document.querySelector("#book");
let deskDetails = document.querySelector("#did");
let empDetails = document.querySelector("#eid");
let machineType = document.querySelector("#mt");

//inserting current date
let date = new Date();
let currentDate = date.toISOString().slice(0, 10);
cdate.value = currentDate;

//Global Variable Declaration
let nid;
let nsd;
let nd = cdate.value;
let seatDetails;
let colTable;
let EmployeeName;
let EmployeeId;
let seatId;
let machine;

// let popup;

//Changing DropDown Dynamically
const initialLoad = async () => {
  await axios
    .get("http://localhost:5000/wings")
    .then((res) => {
      if (res.status === 200) {
        let response = res.data.wing_name;
        let length;
        response.map((drop) => {
          cwing.innerHTML += `<option value=${drop.id}>${drop.name}</option>`;
        });
        let wingDefaultOption = cwing.querySelector("option:nth-child(2)");
        wingDefaultOption.setAttribute("selected", "selected");
        nid = cwing.value;
      } else {
        throw Error;
      }
    })
    .catch((error) => {
      return error;
    });

  await axios
    .get("http://localhost:5000/availability/shifts")
    .then((res) => {
      if (res.status === 200) {
        let response = res.data.shifts;
        response.map((shift) => {
          cshift.innerHTML += `<option value=${shift.id} data-shift-name="${shift.shiftname}">${shift.shiftname}</option>`;
        });
        let shfitDefaultOption = cshift.querySelector("option:nth-child(2)");
        shfitDefaultOption.setAttribute("selected", "selected");
        nsd = cshift.value;
      } else {
        throw Error;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //console.log(nd, nid, nsd);
  display(nd, nid, nsd);
};

initialLoad();

//Event Function Methods
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

//Requesting response from the api and populating the UI
const display = async (nd, nid, nsd) => {
  await axios
    .post(`http://localhost:5000/availability/`, {
      wing: nid,
      date: nd,
      shift: nsd,
    })
    .then((res) => {
      // console.log(res);
      $("#cont").empty();
      let result = res.data.wings;
      colTable = result;
      // console.log(colTable);
      colTable.map((item) => {
        let tableCol =
          (show.innerHTML += `<div class ="table" id="table-${item.tableid}"></div>`);

        seatDetails = item.seats.map((seat,row) => {
          if (document.querySelector(`#table-${item.tableid}`)) {
            document.querySelector(
              `#table-${item.tableid}`
            ).innerHTML += `<div class="chair " id="${seat.seatid}" data-chair-id ="seat-${seat.seatid}">${++row}</div>`;
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
      calling(colTable);
    })
    .catch((error) => {
      console.log(error);
    });
};

const calling = async (colTable) => {
  let available = document.querySelectorAll(".chair.available");
  available.forEach((item) => {
    item.onmouseover = () => modifyPopup(colTable);
  });

  let booked = document.querySelectorAll(".chair.booked");
  booked.forEach((item) => {
    item.onmouseover = () => popup(colTable);
  });
  let occupied = document.querySelectorAll(".chair.occupied");
  occupied.forEach((item) => {
    item.onmouseover = () => popup(colTable);
  });
};
function popup(colTable) {
  let result = colTable.map((item) => {
    item.seats.map((seat) => {
      let chair = document
        .getElementById(`${seat.seatid}`)
        .addEventListener("click", () => {
          bookDetails.value = `${seat.Empname}`;
          empDetails.value = `${seat.EmpId}`;
          deskDetails.value = `${seat.seatid}`;
          if (seat.seatType == 0) {
            seat.seatType = "Laptop";
          } else if (seat.seatType == 1) {
            seat.seatType = "Window";
          } else if (seat.seatType == 2) {
            seat.seatType = "Mac";
          }
          machineType.value = `${seat.seatType}`;
          modShow.classList.add("show");
          overlayAvailable.classList.add("active");
        });
    });
  });
}

function modifyPopup(colTable) {
  let result = colTable.map((item) => {
    item.seats.map((seat) => {
      let chair = document
        .getElementById(`${seat.seatid}`)
        .addEventListener("click", () => {
          bookDetails.value = `Desk is Available`;
          empDetails.value = "Desk is Available";
          deskDetails.value = `${seat.seatid}`;
          machineType.value = "Windows";
          modShow.classList.add("show");
          overlayAvailable.classList.add("active");
        });
    });
  });
}

closeBtnAvailable.onclick = () => remove();

function remove() {
  modShow.classList.remove("show");
  overlayAvailable.classList.remove("active");
}
