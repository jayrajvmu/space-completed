let blogRow = document.querySelector(".booked-seats_row");
let message = document.querySelector("#cancelMessage");
const bookedSeatsUrl = "http://localhost:5000/booking/2";

let cancellationModal = document.getElementById("modal-section-cancellation");
let overlayCancellation = document.getElementById("overlay-cancellation");

let signInMessage = document.querySelector("#signin-message");
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
      blogRow.innerHTML = "<p class='no-booking'>No Seats Booking</p>";
    } else {
      html = blogDatas
        .map((blog) => {
          console.log(blog);
          blogRow.innerHTML += `
            <div class="booked-seats_col" id="blog-${blog.id}">
              <div class="booked-seats_container">
                <div class="booked-seats_details">
                  <div class="booked-seats_input">Desk Id </div>
                  <div class="booked-seats_value">: ${blog.seat_id}</div>
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
                  <div class="booked-seats_value">: ${blog.shift_id}</div>
                </div>
                <div class="form-submit cancellation-btns">         
                  <button  class="confirmCancel" onclick="setCancellationModal('${
                    blog.id
                  }','${blog.emp_id}')">Cancel Seat</button>
                  <button  class="checkInBtn"  onclick="checkinUser('${
                    blog.id
                  }','${blog.emp_id}')">Check-in</button>        
              </div>
            </div> `;
        })
        .join("");
    }
    // blogRow.insertAdjacentHTML("afterbegin", html);
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
  message.innerHTML = "";
  cancellationModal.classList.remove("show");
  overlayCancellation.classList.remove("active");
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
