// Cancellation module functionality
let blogRow = document.querySelector(".booked-seats_row");
let signInMessage = document.querySelector("#signin-message");
let noSeatMessage = document.querySelector("#no-seat");

// cancellation modal
let cancellationModal = document.querySelector("#modal-section");
let closeBtnCancellation = document.querySelector("#close-btn");
let overlayCancellation = document.querySelector("#overlay");
let message = document.querySelector("#message");

const bookedSeatsUrl = "http://localhost:5000/booking/2";

const bookedSeats = async () => {
  try {
    const response = await axios(bookedSeatsUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(response.data.data);
    let blogDatas = response.data.data;
    if (blogDatas.length === 0) {
      noSeatMessage.innerHTML = "<p class='no-booking'>No Seats Booking</p>";
    } else {
      blogDatas.map((blog) => {
        blogRow.innerHTML += `
            <div class="booked-seats_col" id="blog-${blog.id}">
              <div class="booked-seats_container">
                <div class="booked-seats_details">
                  <div class="booked-seats_input">Desk Id </div>
                  <div class="booked-seats_value">: ${blog.seat_name}</div>
                </div>
                <div class="booked-seats_details">
                  <div class="booked-seats_input">Employee Id  </div>
                  <div class="booked-seats_value">: ${blog.emp_id}</div>  
                </div>
                <div class="booked-seats_details">
                  <div class="booked-seats_input">Booked Date  </div>
                  <div class="booked-seats_value">: ${
                    new Date(blog.date).toISOString().split("T")[0]
                  }</div>
                </div>
                <div class="booked-seats_details">
                  <div class="booked-seats_input">Shift  </div>
                  <div class="booked-seats_value">: ${blog.shift_name}</div>
                </div>
                <div class="form-submit cancellation-btns">         
                  <button  class="confirmCancel" onclick="setCancellationModal('${
                    blog.id
                  }','${blog.emp_id_primary}')">Cancel Seat</button>
                  <button  class="checkInBtn"  onclick="checkinUser('${
                    blog.id
                  }','${blog.emp_id_primary}')">Check-in</button>        
              </div>
            </div> `;
      });
    }
  } catch (error) {
    console.log(error);
  }
};

bookedSeats();

function setCancellationModal(cancellationId, cancellationEmpId) {
  /* modal title starts */
  let modalTitle = document.querySelector("#modal-title");
  modalTitle.textContent = "Cancel the Seat";
  /* modal title ends */

  /* modal body starts */
  let modalBody = document.querySelector("#modal-body");
  modalBody.innerHTML = `  
    <p>Do you want to cancel the seat?</p>
    <div class="form-submit confirmation-btns">
      <button id="confirm-success">Yes</button>
      <button id="confirm-failure">No</button>
    </div>
    `;

  cancellationModal.classList.add("show");
  overlayCancellation.classList.add("active");

  let cancellationSucessBtn = document.querySelector("#confirm-success");
  let cancellationFailureBtn = document.querySelector("#confirm-failure");

  cancellationSucessBtn.addEventListener("click", () => {
    cancelBookedSeat(cancellationId, cancellationEmpId);
  });

  //close the modal
  closeBtnCancellation.addEventListener("click", closeCancellationModal);
  cancellationFailureBtn.addEventListener("click", closeCancellationModal);
}

function closeCancellationModal() {
  cancellationModal.classList.remove("show");
  overlayCancellation.classList.remove("active");
  message.innerHTML = "";
}

function cancelBookedSeat(id, empId) {
  let userId = +id;
  let userEmpId = +empId;

  axios
    .put(`http://localhost:5000/booking/${userId}`, { emp_id: userEmpId })
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        message.innerHTML = `<p class='${response.data.success}'>${response.data.message}</p>`;
        if (response.data.success) {
          setTimeout(() => {
            closeCancellationModal();
          }, 1500);
          let blogId = document.querySelector(`#blog-${userId}`);
          blogId.remove();
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function checkinUser(id, empId) {
  let userId = +id;
  let userEmpId = +empId;

  axios
    .put(`http://localhost:5000/checkin/${userId}`, { emp_id: userEmpId })
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        signInMessage.innerHTML = `<p class='signIn-success'>${response.data.message}</p>`;
      } else {
        signInMessage.innerHTML = `<p class='signIn-success'>${response.data.message}</p>`;
      }
    })
    .catch((error) => {
      signInMessage.innerHTML = `<p class='signIn-success'>${error}</p>`;
    });
}
