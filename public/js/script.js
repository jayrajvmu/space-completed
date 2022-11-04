//Id Selection
let ename = document.getElementById("emp");
let show = document.getElementById("cont");
let cdate = document.getElementById("date");
let cwing = document.getElementById("wing");
let cshift = document.getElementById("shift");
let cButton = document.getElementById("check");

//inserting current date
let date = new Date();
let currentDate = date.toISOString().slice(0, 10);
cdate.value = currentDate;

//Global Variable Declaration
let nid;
let nsd;
let nd = cdate.value;

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
function display(nd, nid, nsd) {
  axios
    .post(`http://localhost:5000/availability/`, {
      wing: nid,
      date: nd,
      shift: nsd,
    })
    .then((res) => {
      // console.log(res);
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
    })
    .catch((error) => {
      console.log(error);
    });
}
