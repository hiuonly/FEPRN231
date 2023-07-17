function showAllBrands() {
  const selectElement = document.getElementById('brand-select');

  fetch('https://localhost:7180/api/brand')
    .then(response => response.json())
    .then(data => {
      selectElement.innerHTML = data.map(brand => `
          <option value="${brand.brandId}">${brand.brandName}</option>
        `).join('');
    })
    .catch(error => {
      console.error(error);
      selectElement.innerHTML = '<option value="">Error loading brands</option>';
    });
}

showAllBrands();

function handleCreateProduct() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    var img = document.querySelector('#imageFile').files[0].name;
    var name = document.querySelector("#pName").value;
    var number = parseInt(document.querySelector("#number").value);
    var price = parseFloat(document.querySelector("#price").value);
    var brand = parseInt(document.querySelector('#brand-select').value);
    var pd = document.querySelector('#pd').value;

    var formdata = {
      "pImg": img,
      "productName": name,
      "productDescription": pd,
      "brandId": brand,
      "price": price,
      "quantity": number
    };

    fetch("https://localhost:7180/api/product",
      {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(function (response) {
        alert("Product created successfully.");
        window.location.href = "/sellProduct.html";
    })
  };
}

// Call the handleCreateProduct function when the page loads
handleCreateProduct();


