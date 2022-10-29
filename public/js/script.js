let show = document.getElementById("cont");
$("#cont").empty();
let select = document.querySelector("#wing").value;

axios
  .post("http://localhost:5000/availability/wing/2", {
    date: document.getElementById("wdate").value,
    shiftname: "APAC",
  })
  .then((res) => {
    let response = res.data.availability[0].wings[0].tables[0].seats;
    let colTable = res.data.availability[0].wings[0].tables;
    console.log(colTable);
    colTable.map((item) => {
      let tableCol =
        (show.innerHTML += `<div class ="table" id="table-${item.tableid}"></div>`);
      item.seats.map((seat) => {
        if (document.querySelector(`#table-${item.tableid}`)) {
          document.querySelector(
            `#table-${item.tableid}`
          ).innerHTML += `<div class="chair" id=${seat.seatsId} ></div>`;
        }
        var list = document.getElementById(`${seat.seatsId}`);
        if (seat.availability == "1") {
          list.classList.add("booked");
        } else if (seat.availability == "2") {
          list.classList.add("danger");
        }
      });
    });
  });
var date = new Date();
var currentDate = date.toISOString().slice(0, 10);
document.getElementById("wdate").value = currentDate;
