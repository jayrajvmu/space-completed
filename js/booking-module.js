
let seatItems = document.querySelectorAll(".seat-item");
let modalContainer = document.querySelector("#modal-section");
let closeBtn = document.querySelector("#close-btn");
let submitBtn = document.querySelector("#submit-btn");
let cancelBookingBtn = document.querySelector("#cancel-booking");
const overlay = document.getElementById("overlay");
let message = document.querySelector("#message");


seatItems.forEach((item) => {
  item.onclick = ()=> setModal(item);
});

function setModal(seatItem) {
    console.log(seatItem);
  // open the modal
  modalContainer.classList.add("show");
  overlay.classList.add("active");
  //  insert desk id
  let deskInput = document.querySelector("#desk-id");
  let deskValue = seatItem.textContent;
  deskInput.value = deskValue;
  // form submit function
  submitBtn.onclick =  ()=>{
    postData(seatItem);
  };
}
function postData(seat) {
    console.log(seat);
  const postUrl = "http://localhost:5000/booking";
  let desk_id = document.getElementById('desk-id').value;
  let emp_id = document.getElementById('emp-id').value;
  let date = document.getElementById('date').value;
  let shift = document.getElementById('time').value;
  const payload = {
      'desk_id': `${desk_id}`,
      'emp_id': `${emp_id}`,
      'date': `${date}`,
      'shift': `${shift}`,
      'booked_by':1,
      'booking_type':0
  }
  axios.post(postUrl, payload)
  .then(response => {
    console.log(response);
    console.log(response.data);
    if(response.status === 200){
      message.innerHTML =`<p class='${response.data.success}'>${response.data.message}</p>` ;
      if(response.data.success){
        setTimeout(()=>{
          seatBooking(seat)
        },2000);
      }
    }
  })
  .catch(error=>{
    console.log(error);
  })
}

//close the modal
closeBtn.addEventListener("click", closeModal);
function closeModal() {
  modalContainer.classList.remove("show");
  overlay.classList.remove("active");
  //reset the input values
  document.getElementById('desk-id').value="";
  document.getElementById('emp-id').value="";
  document.getElementById('date').value="";
  document.getElementById('time').value="";
  message.innerHTML ="" ;
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

function userName(){
  console.log('jo');
  axios.get(`http://localhost:5000/booking/user/empname`)
    .then((response) =>{
        console.log(response.data);
    } );
}

