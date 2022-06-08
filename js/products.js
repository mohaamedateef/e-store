import { products, folderName, goTop } from "./database.js";
let categoryDiv = document.querySelector(".category-buttons"),
  productsDivs = document.querySelector(".category-products"),
  cartPrice = 0,
  categories = [];

/*loop through products to get their categories */
for (let i = 0; i < products.length; i++) {
  if (!categories.includes(products[i].category)) {
    categories.push(products[i].category);
  }
}

/*self invoke function to create all buttons and show all elements */
(function () {
  let categoryInner = `<button class='btn btn-primary me-2 my-2 fs-5'>All</button>`;
  for (let i = 0; i < categories.length; i++) {
    categoryInner += `<button class='btn btn-primary me-2 my-2 fs-5'>${categories[i]}</button>`;
  }
  categoryDiv.innerHTML = categoryInner;
  showProducts("All");
})();

/*add click event to all buttons to show products */
let categoryButtons = document.querySelectorAll(".category-buttons .btn");
for (let i = 0; i < categoryButtons.length; i++) {
  categoryButtons[i].addEventListener("click", showProducts);
}

/*loop all over products to create divs for products then show */
function showProducts(e) {
  let productsInner = ``;
  for (let i = 0; i < products.length; i++) {
    if (
      e == "All" ||
      e.target.innerHTML == "All" ||
      products[i].category == e.target.innerHTML
    ) {
      productsInner += `<div class="col-md-6 col-lg-4">
        <div class="product-image position-relative">
          <img src="${folderName}${products[i].src}" class="img-fluid" />
          <button class="btn btn-success position-absolute end-0 bottom-0">Add ${products[i].price}$</button>
        </div>
        <div class="product-info bg-color text-center">
          <h2>${products[i].title}</h2>
          <h4>${products[i].description}</h4>
        </div>
      </div>
          `;
    }
  }
  productsDivs.innerHTML = productsInner;
  addEventTobuttons();
}

/*add click event on add buttons to get the price to the cart */
function addEventTobuttons() {
  let addButtons = document.querySelectorAll(".product-image .btn-success");
  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", addToCart);
  }
}
function addToCart(e) {
  for (let i = 0; i < products.length; i++) {
    if (e.target.previousElementSibling.src.includes(products[i].src)) {
      cartPrice += products[i].price;
    }
  }
  document.querySelector(".price").innerHTML = cartPrice + "$";
}

/*add go top function to the button */
document.querySelector(".go-top").addEventListener("click", goTop);
