let blogRow = document.querySelector(".booked-seats_row");
let message = document.querySelector("#message");
const bookedSeatsUrl = "http://localhost:5000/booking/1";

const bookedSeats = async () => {
  try {
    const response = await axios(bookedSeatsUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(response.data.data);
    let blogDatas = response.data.data;
    let html ;
    if (blogDatas.length === 0) {
      html = 'No Seats Booking'
  } else{
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
          <div class="booked-seats_value">${new Date(blog.date).toISOString().split('T')[0]}</div>
        </div>
        <div class="booked-seats_details">
          <div class="booked-seats_input">Shift :</div>
          <div class="booked-seats_value">${blog.shift_id}</div>
        </div>
        <div class="form-submit">
          


        <button type="submit" class="button123" bookingid='${blog.id}'   >Cancel Seat</button>
          

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











        



      
 <button type="submit" class="button1234"  onclick="checkinUser('${blog.id}')">Check-in</button>
        </div>
      </div>
    </div>
      `;
    })
    .join("");

  }
   
    
    blogRow.insertAdjacentHTML("afterbegin", html);

    //cancellation module starts//
    let cancelItems = document.querySelectorAll(".button123");
    let modalContainer = document.querySelector(".modal-section1");
    let closeBtn = document.querySelector("#close-btn");

    cancelItems.forEach((item) => {
      item.addEventListener("click", () => setModal(item));
      
    });

    function setModal(item) {
      cancelBookedSeat(item.getAttribute("bookingid"))
      
      modalContainer.classList.add("show");
      overlay.classList.add("active");

      
    }


    //close the modal
    closeBtn.addEventListener("click", closeModal);
    function closeModal() {
      modalContainer.classList.remove("show");
      overlay.classList.remove("active");

    }
    
    //cancellation module ends //


  } catch (error) {
    console.log(error);
  }
};
bookedSeats();

function checkinUser(id){
  axios.put(`http://localhost:5000/checkin/${id}`, {'emp_id':1})
    .then((response) =>{
        console.log(response.data);
        alert(response.data.message)
    } );
  }

  function cancelBookedSeat(id) {
    axios.put(`http://localhost:5000/booking/${id}`,{'emp_id':1} )
        .then((response) =>{
            console.log(response.data);
        } );
    }