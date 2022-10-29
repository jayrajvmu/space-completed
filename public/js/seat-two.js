let fetchUrl = "http://127.0.0.1:5000/availability/wing/1";

let grid = document.querySelector(".cont");
//let filterInput = document.getElementById("filterInput");
let filterDropdown = document.getElementById("wing");

fetch(fetchUrl)
  .then((res) => res.json())
  .then((json) => {
    let data = json.availability[0].wings;
    // iterating products
    for (let value of data) {
      console.log(value);
      //addElement(grid, value);
    }
  });

// add event listener
//filterInput.addEventListener("keyup", filterProducts);
//filterDropdown.addEventListener("change", filterProducts);

// callback function
function filterProducts() {
  let filterValue = filterDropdown.value.toUpperCase();
  let item = grid.querySelectorAll(".item");

  for (let i = 0; i < item.length; i++) {
    let span = item[i].querySelector(".category");
    if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
}

// get value from the api create dynamic element
function addElement(appendIn, value) {
  let div = document.createElement("div");
  div.className = "item justify-self-center";

  let { image, title, category, price } = value;

  div.innerHTML = `
      <img src="${image}" class="bg-cover img mx-auto" alt="img1">
      <div class="text-center py-3 font-poppins">
          <h1 class="text-lg title">${title}</h1>
          <a href="#" class="block"><span class="text-sm text-red-400 category">${category}</span></a>
          <span class="block py-3">$<span class="text-md">${price}</span></span>
          <button class="border-2 px-8 py-1 bg-yellow-400 border rounded-md">Buy Now</button>
      </div>
`;
  appendIn.appendChild(div);
}
