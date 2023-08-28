"use strict";
const productNameInput = document.getElementById("productNameInput");
const productCategoryInput = document.getElementById("productCategoryInput");
const productPriceInput = document.getElementById("productPriceInput");
const productDescriptionInput = document.getElementById("productDescription");
const productCountInput = document.getElementById("productCountInput");
const addProductBtnt = document.getElementById("addProductBtn");
const searchInput = document.getElementById("searchInput");
const updateProductBtn = document.getElementById("updateProductBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let allProducts = [];

if (localStorage.getItem("Products") != null) {
  allProducts = JSON.parse(localStorage.getItem("Products"));
  DisplayData();
}
//?==================================================CreateData...
function createData() {
  if (
    validationName() &&
    validationPrice() &&
    validationDesc() &&
    validationCateg()
  ) {
    let product = {
      productName: productNameInput.value,
      productCategory: productCategoryInput.value,
      productPrice: productPriceInput.value,
      productDesc: productDescriptionInput.value,
    };
    let productCountValue = productCountInput.value;
    for (let i = 0; i < productCountValue; i++) {
      allProducts.push(product);
      localStorage.setItem("Products", JSON.stringify(allProducts));
    }
  }
}
addProductBtnt.addEventListener("click", function () {
  createData();
  DisplayData();
  claerData();
  clearClass();
});
//?==================================================DisplayData...
function DisplayData() {
  let productContainer = "";
  for (let i = 0; i < allProducts.length; i++) {
    productContainer += `
                        <tr>
                      <td scope="row">${i}</td>
                      <td>${allProducts[i].productName}</td>
                      <td>${allProducts[i].productPrice}</td>
                      <td>${allProducts[i].productCategory}</td>
                      <td>${allProducts[i].productDesc}</td>
                      <td>
                        <button
                          type="button"
                          id="deleteBtn"
                          class="btn btn-danger btn-sm"
                          onclick="deleteProduct(${i})"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          id="updateBtn"
                          class="btn btn-warning btn-sm"
                           onclick="updateProducts(${i})"
                        >
                          Update
                        </button>
                      </td>
                    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = productContainer;
  if (allProducts.length > 0) {
    document.getElementById("delAllBtn").classList.remove("d-none");
  } else {
    document.getElementById("delAllBtn").classList.add("d-none");
  }
}
//?==================================================ClearData...
function claerData() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productCountInput.value = "";
  productDescriptionInput.value = "";
  searchInput.value = "";
}
//?==================================================deleteProducts...
function deleteProduct(elementNumber) {
  allProducts.splice(elementNumber, 1);
  localStorage.setItem("Products", JSON.stringify(allProducts));
  DisplayData();
}
//?==================================================searchProducts...
searchInput.addEventListener("input", function () {
  searchproducts();
});
function searchproducts() {
  let searchProductValue = searchInput.value;
  let productContainer = "";

  for (let i = 0; i < allProducts.length; i++) {
    if (
      allProducts[i].productName
        .toLowerCase()
        .includes(searchProductValue.toLowerCase())
    ) {
      productContainer += `
                        <tr>
                      <td scope="row">${i}</td>
                      <td>${allProducts[i].productName}</td>
                      <td>${allProducts[i].productPrice}</td>
                      <td>${allProducts[i].productCategory}</td>
                      <td>${allProducts[i].productDesc}</td>
                      <td>
                        <button
                          type="button"
                          id="deleteBtn"
                          class="btn btn-danger btn-sm"
                          onclick="deleteProduct(${i})"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          id="updateBtn"
                          class="btn btn-warning btn-sm"
                        >
                          Update
                        </button>
                      </td>
                    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = productContainer;
  }
}
//?==================================================updateProducts...
let indexOfElelement = 0;
function updateProducts(elementNumber) {
  indexOfElelement = elementNumber;
  productNameInput.value = allProducts[elementNumber].productName;
  productPriceInput.value = allProducts[elementNumber].productPrice;
  productCategoryInput.value = allProducts[elementNumber].productCategory;
  productDescriptionInput.value = allProducts[elementNumber].productDesc;
  updateProductBtn.classList.remove("d-none");
  addProductBtnt.classList.add("d-none");
}
updateProductBtn.addEventListener("click", function () {
  updateProductBtn.classList.add("d-none");
  addProductBtnt.classList.remove("d-none");
  let product = {
    productName: productNameInput.value,
    productCategory: productCategoryInput.value,
    productPrice: productPriceInput.value,
    productDesc: productDescriptionInput.value,
    productCount: productCountInput.value,
  };
  localStorage.setItem("Products", JSON.stringify(allProducts));
  allProducts.splice(indexOfElelement, 1, product);
  DisplayData();
  claerData();
});
//?==================================================DElete All Products...
deleteAllBtn.addEventListener("click", function () {
  deleteAllProducts();
});
function deleteAllProducts() {
  allProducts.splice(0);
  localStorage.setItem("Products", JSON.stringify(allProducts));
  DisplayData();
  claerData();
}
//?=======================================================Validate All Inputs...
//!================================================
function validationName() {
  let regexpattern = /^[a-zA-Z\-\s?]+$/;
  let text = productNameInput.value;
  if (regexpattern.test(text)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    document.getElementById("pargaraphName").classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.remove("is-valid");
    productNameInput.classList.add("is-invalid");
    document.getElementById("pargaraphName").classList.remove("d-none");
    return false;
  }
}
productNameInput.addEventListener("input", function () {
  validationName();
});
//!================================================
function validationPrice() {
  let regexpattern = /^[1-9]{2,5}$/;
  let text = productPriceInput.value;
  if (regexpattern.test(text)) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    document.getElementById("pargaraphPrice").classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.remove("is-valid");
    productPriceInput.classList.add("is-invalid");
    document.getElementById("pargaraphPrice").classList.remove("d-none");
    return false;
  }
}
productPriceInput.addEventListener("input", function () {
  validationPrice();
});
//!================================================
function validationDesc() {
  let regexpattern = /^[a-zA-Z\-\s?]+$/;
  let text = productDescriptionInput.value;
  if (regexpattern.test(text)) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    document.getElementById("pargaraphDesc").classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.remove("is-valid");
    productDescriptionInput.classList.add("is-invalid");
    document.getElementById("pargaraphDesc").classList.remove("d-none");
    return false;
  }
}
productDescriptionInput.addEventListener("input", function () {
  validationDesc();
});
//!================================================
function validationCateg() {
  let regexpattern = /^[a-zA-Z\-\s?]+$/;
  let text = productCategoryInput.value;
  if (regexpattern.test(text)) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    // document.getElementById("pargaraphCateg").classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.remove("is-valid");
    productCategoryInput.classList.add("is-invalid");
    // document.getElementById("pargaraphCateg").classList.remove("d-none");
    return false;
  }
}
productCategoryInput.addEventListener("input", function () {
  validationCateg();
});
//!================================

function validationCount() {
  let regexpattern = /^[1-9]{1,5}$/;
  let text = productCountInput.value;
  if (regexpattern.test(text)) {
    productCountInput.classList.add("is-valid");
    productCountInput.classList.remove("is-invalid");
    return true;
  } else {
    productCountInput.classList.remove("is-valid");
    productCountInput.classList.add("is-invalid");
    return false;
  }
}
productCountInput.addEventListener("input", function () {
  validationCount();
});
//?=======
function clearClass() {
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productCountInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
}
