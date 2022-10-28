function display() {
  let show = document.getElementById("cont");
  //$("#cont").empty();
  let select = document.querySelector("#wing").value;

  if (select == "WS101") {
    // if(select =)
    axios.get("http://127.0.0.1:5000/availability/wing/1").then((response) => {
      // let res = response.data.availability[0].wings[0].tables[0].seats;
      let res = response.data.availability[0].wings[0].tables[0].seats;

      let colTable = response.data.availability[0].wings[0].tables;
      colTable.map((item) => {
        let tableCol =
          (show.innerHTML += `<div class ="table" id="table-${item.id}"></div>`);
        item.seats.map((seat) => {
          if (document.querySelector(`#table-${item.id}`)) {
            document.querySelector(
              `#table-${item.id}`
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
  }

  // if (select == "WS102") {
  //   axios.get("http://127.0.0.1:5000/availability/wing/2").then((response) => {
  //     // let res = response.data.availability[0].wings[0].tables[0].seats;
  //     let res = response.data.availability[0].wings[0].tables[0].seats;

  //     let colTable = response.data.availability[0].wings[0].tables;
  //     colTable.map((item) => {
  //       let tableCol =
  //         (show.innerHTML += `<div class ="table" id="table-${item.id}"></div>`);
  //       item.seats.map((seat) => {
  //         if (document.querySelector(`#table-${item.id}`)) {
  //           document.querySelector(
  //             `#table-${item.id}`
  //           ).innerHTML += `<div class="chair" id=${seat.seatsId} ></div>`;
  //         }
  //         var list = document.getElementById(`${seat.seatsId}`);
  //         if (seat.availability == "1") {
  //           list.classList.add("booked");
  //         } else if (seat.availability == "2") {
  //           list.classList.add("danger");
  //         }
  //       });
  //     });
  //   });
  // }
}

// function add() {
//   var list = document.getElementById("WS-Seat").classList;
//   list.add("available");
// }

const store = document.querySelector("#wing");
store.addEventListener("change", filter);

function filter() {
  let filterValue = store.value.toLowerCase();
  `${filterValue}`.innerHTML = display();
}

let date = document.querySelector("input").value;
