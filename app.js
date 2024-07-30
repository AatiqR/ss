// Get elements
let getbtn = document.getElementById("add-btn");
let productCard = document.getElementById("Product-card");

// Add event listener to the add button
getbtn.addEventListener("click", function() {
  // Get input values
  let productName = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let price = document.getElementById("price").value;
  let categories = document.getElementById("categories").value;
  let picture = document.getElementById("pic").files[0];

  // Validate input fields
  if (productName === "" || description === "" || price === "" || picture === undefined) {
    alert("All fields must be filled out.");
    return;
  }

  // Create a product object
  var productObject = {
    name: productName,
    description: description,
    price: price,
    picture: URL.createObjectURL(picture),
    categories: categories
  }

  // Get existing products from localStorage
  var productArray = JSON.parse(localStorage.getItem("Product")) || [];

  // Add new product to the array
  productArray.push(productObject);

  // Save the updated array to localStorage
  localStorage.setItem("Product", JSON.stringify(productArray));

  // Add product to the screen
  addProductToScreen(productObject);
});

// Function to add product to the screen
function addProductToScreen(product) {
  // Create a new div for the product
  let productDiv = document.createElement("div");
  productDiv.innerHTML = `
    <div class="container">
      <div class="wrapper">
        <div class="banner-image"> 
          <img src="${product.picture}" alt="Product Image">
        </div>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
      </div>
      <div class="button-wrapper"> 
        <button class="btn outline">DETAILS</button>
        <button class="btn fill">BUY NOW</button>
      </div>
    </div>
  `;

  // Append the new div to the product card
  productCard.appendChild(productDiv);
}

// Load existing products from localStorage
var existingProducts = JSON.parse(localStorage.getItem("Product"));
if (existingProducts !== null) {
  existingProducts.forEach(function(product) {
    addProductToScreen(product);
  });
} else {
  console.log("No products found in localStorage.");
}