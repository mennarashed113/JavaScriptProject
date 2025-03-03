let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("catgory");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
let searchMood = "title";

// calculate price

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

//create product

let dataproducts;
if (localStorage.product != null) {
  dataproducts = JSON.parse(localStorage.product);
} else {
  dataproducts = [];
}

submit.onclick = function () {
  let newproduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    newproduct.count < 100
  ) {
    if (mood == "create") {
      if (newproduct.count > 1) {
        for (let i = 0; i < newproduct.count; i++) {
          dataproducts.push(newproduct);
        }
      } else {
        dataproducts.push(newproduct);
      }
    } else {
      dataproducts[tmp] = newproduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  }

  localStorage.setItem("product", JSON.stringify(dataproducts));

  clearData();
  showData();
};

//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// read data in table
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataproducts.length; i++) {
    table += `
    <tr>
     <td>${i+1}</td>
     <td>${dataproducts[i].title}</td>
     <td>${dataproducts[i].price}</td>
     <td>${dataproducts[i].taxes}</td>
     <td>${dataproducts[i].ads}</td>
     <td>${dataproducts[i].discount}</td>
     <td>${dataproducts[i].total}</td>
     <td>${dataproducts[i].category}</td>
     <td><button onclick="updateData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (dataproducts.length > 0) {
    btnDelete.innerHTML = `
     <button onclick="deleteAll()" id="deleteAll">Delete All</button>
     `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//Delete data

function deleteData(i) {
  dataproducts.splice(i, 1);
  localStorage.product = JSON.stringify(dataproducts);
  showData();
}

//delete all data
function deleteAll() {
  localStorage.clear();
  dataproducts.splice(0);
  showData();
}

//update data
function updateData(i) {
  title.value = dataproducts[i].title;
  price.value = dataproducts[i].price;
  taxes.value = dataproducts[i].taxes;
  ads.value = dataproducts[i].ads;
  discount.value = dataproducts[i].discount;
  category.value = dataproducts[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
function getsearchmood(id) {
  let search = document.getElementById("search");
  search.focus();
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.value = "";
  showData();
}

function search(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataproducts.length; i++) {
      if (dataproducts[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
     <td>${i}</td>
     <td>${dataproducts[i].title}</td>
     <td>${dataproducts[i].price}</td>
     <td>${dataproducts[i].taxes}</td>
     <td>${dataproducts[i].ads}</td>
     <td>${dataproducts[i].discount}</td>
     <td>${dataproducts[i].total}</td>
     <td>${dataproducts[i].category}</td>
     <td><button onclick="updateData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataproducts.length; i++) {
      if (dataproducts[i].category.includes(value.toLowerCase())) {
        table += `
            <tr>
             <td>${i}</td>
             <td>${dataproducts[i].title}</td>
             <td>${dataproducts[i].price}</td>
             <td>${dataproducts[i].taxes}</td>
             <td>${dataproducts[i].ads}</td>
             <td>${dataproducts[i].discount}</td>
             <td>${dataproducts[i].total}</td>
             <td>${dataproducts[i].category}</td>
             <td><button onclick="updateData(${i})" id="update">update</button></td>
             <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>
            `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//clean data
