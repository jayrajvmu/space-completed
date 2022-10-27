let blogRow = document.querySelector(".booked-seats_row");
const bookedSeatsUrl = "http://localhost:5000/booking/1";
const bookedSeats = async () => {
  try {
    const response = await axios(bookedSeatsUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(response.data.data);
    let blogDatas =response.data.data;
    let html = blogDatas
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
            <div class="booked-seats_value">${  new Date(blog.date).toISOString().split('T')[0]}</div>
          </div>
          <div class="booked-seats_details">
            <div class="booked-seats_input">Shift :</div>
            <div class="booked-seats_value">${blog.shift_id}</div>
          </div>
          <div class="form-submit">
            <button type="submit" class="button123" onclick="cancelData('${blog.id}')">Cancel Seat</button>
            <button type="submit" class="button123" onclick="checkinUser('${blog.id}')">Check IN</button>

          </div>
        </div>
      </div>
        `;
      })
      .join("");
    blogRow.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    console.log(error);
  }
};
console.log(bookedSeats());

function checkinUser(id){
  axios.put(`http://localhost:5000/checkin/${id}`, {'emp_id':1})
    .then((response) =>{
        console.log(response.data);
    } );
}