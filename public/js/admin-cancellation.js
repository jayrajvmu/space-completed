let employeeId;
let userId;
//Id Selection
let ename = document.getElementById("emp");
let tableBody = document.querySelector(".table-body");
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
  //console.log(dateValue, wingValue, shiftValue);
  display(nd, nid, nsd);
};
initialLoad();

/* list of userName */
let shiftText;
let userDetails;

const userName = async () => {
  await axios
    .get(`http://localhost:5000/booking/user/name`)
    .then((response) => {
      let userLists = response.data.data;
      userDetails = userLists;
    })
    .catch((error) => {
      return error;
    });
};
//Function Calling
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
      //$("#cont").empty();
      let colTable = res.data.wings;
      let serialNo = 0;
      console.log(colTable);
      colTable.map((item) => {
        item.seats.map((seat) => {
          tableBody.innerHTML += `
            <tr class="table-no-${item.tableid}">
            <td class="table-data"> ${++serialNo} </td>
            <td class="table-data"> ${seat.seatname} </td>
            <td class="table-data"> ${seat.seatid} </td>
            <td class="table-data"> ${seat.availability} </td>
            <td class="table-data"> <i class="fa-solid fa-pen-to-square"></i> </td>
            </tr>
            `;
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
