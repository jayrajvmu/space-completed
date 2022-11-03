var date = new Date();
var currentDate = date.toISOString().slice(0, 10);
document.getElementById("date").value;
//Id Selection
let ename = document.getElementById("emp");
let show = document.getElementById("cont");
let cdate = document.getElementById("date");
let cwing = document.getElementById("wing");
let cshift = document.getElementById("shift");
let cButton = document.getElementById("check");
//Global Variable Declaration
let nd;
let nid;
let nsd;
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
            ).innerHTML += `<div class="chair" id=${seat.seatid} >${seat.seatid}</div>`;
          }
          var list = document.getElementById(`${seat.seatid}`);
          if (seat.availability == "1") {
            list.classList.add("booked");
          }
          if (seat.availability == "2") {
            list.classList.add("danger");
          }
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
//Changing DropDown Dynamically
function dropDown(){
  axios.get("http://localhost:5000/wings")
  .then(res =>{
    let response = res.data.wing_name;
    let length;
     response.map(drop =>{
      cwing.innerHTML +=
      `<option value=${drop.id}>${drop.name}</option>`
     })
    })
}
function dropShift(){
  axios.get("http://localhost:5000/availability/shifts")
  .then(res =>{
    let response = res.data.shifts;
    response.map(shift =>{
      cshift.innerHTML +=
      `<option value=${shift.id}>${shift.shiftname}</option>`
     })
    })
}
//Function Calling
dropDown();
dropShift();