let blogRow = document.querySelector(".booked-seats_row");
let message = document.querySelector("#cancelMessage");
const bookedSeatsUrl = "http://localhost:5000/booking/2";

let cancellationModal = document.getElementById("modal-section-cancellation");
let overlayCancellation = document.getElementById("overlay-cancellation");

const bookedSeats = async () => {
  try {
    const response = await axios(bookedSeatsUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(response.data.data);
    let blogDatas = response.data.data;
    let html;
    if (blogDatas.length === 0) {
      html = "No Seats Booking";
    } else {
      html = blogDatas
        .map((blog) => {
          console.log(blog);

          return `
      <div class="booked-seats_col">
      <div class="booked-seats_container">
        <div class="booked-seats_details">
          <div class="booked-seats_input">Desk Id :</div>
          <div class="booked-seats_value">${blog.seat_id}</div>
        </div>
        <div class="booked-seats_details">
          <div class="booked-seats_input">Employee Id :</div>
          <div class="booked-seats_value">${blog.emp_id}</div>  
        </div>
        <div class="booked-seats_details">
          <div class="booked-seats_input">Booked Date :</div>
          <div class="booked-seats_value">${
            new Date(blog.date).toLocaleDateString()
          }</div>
        </div>
        <div class="booked-seats_details">
          <div class="booked-seats_input">Shift :</div>
          <div class="booked-seats_value">${blog.shift_id}</div>
        </div>
        <div class="form-submit">
          

<button  class="confirmCancel" onclick="setCancellationModal('${blog.id}','${
            blog.emp_id
          }')">Cancel Seat</button>

        <button  class="button1234"  onclick="checkinUser('${blog.id}','${
            blog.emp_id
          }')">Check-in</button>
        
          <div class="modal-section modal " class="modal-section1">
          <div class="modal-container">
            <div class="modal-header">
              <div class="title">Book the Seat</div>
            </div>
          </div>
          <div class="modal-body">
            <div id="seatbooking-form">
              <div class="form-input">
                <label for="desk-id">To cancel the booking seat </label>
                
                 <button   > OK </button> 
      <button id="close-btn" >no</button>
              </div>
              </div>
            <div id="message"></div>
          </div>
        </div>
        <div id="overlay"></div>


        </div>
      </div>
    </div>
      `;
        })
        .join("");
    }

    blogRow.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.log(error);
  }
};

bookedSeats();

let closeBtnCancellation = document.querySelector("#close-btn-cancellation");
let cancellationSucessBtn = document.querySelector("#confirm-success");
let cancellationFailureBtn = document.querySelector("#confirm-failure");

function setCancellationModal(cancellationId, cancellationEmpId) {
  // open the modal
  cancellationModal.classList.add("show");
  overlayCancellation.classList.add("active");

  cancellationSucessBtn.addEventListener("click", () => {
    cancelBookedSeat(cancellationId, cancellationEmpId);
  });
}

//close the modal
closeBtnCancellation.addEventListener("click", closeCancellationModal);
cancellationFailureBtn.addEventListener("click", closeCancellationModal);

function closeCancellationModal() {
  cancellationModal.classList.remove("show");
  overlayCancellation.classList.remove("active");
}

function cancelBookedSeat(id, empId) {
  console.log(empId);
  axios
    .put(`http://localhost:5000/booking/${id}`, { emp_id: empId })
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        message.innerHTML = `<p class='${response.data.success}'>${response.data.message}</p>`;
        if (response.data.success) {
          setTimeout(() => {
            closeCancellationModal();
          }, 1500);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function checkinUser(id, empId) {
  axios
    .put(`http://localhost:5000/checkin/${id}`, { emp_id: 1 })
    .then((response) => {
      console.log(response.data);
      alert(response.data.message);
    });
}
