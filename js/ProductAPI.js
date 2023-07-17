function ShowProductDetail() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    fetch('https://localhost:7180/api/product/productId?id=' + id, {
        method: "GET",
    })
        .then(response => response.json())

        .then(data => {
            const Element = document.getElementById('dproduct');
            const row = `
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div style="margin-left: 300px; margin-top: 100px; ">
            <img src="./image/${data.pImg}" alt="" style="border-radius: 10%;">
            </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 product-text">
                    <h1>Name Product: ${data.productName}</h1>
                    <h3>Description: ${data.productDescription}</h3>
                    <h5>Price: $${data.price}</h5>
                    <div class="start">
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                    <div class="size">
                    <h2>Quantity</h2>
                    <input type="number" id="quantity" name="quantity" value="1" min="1">
                    <input type="text" id="product-id" name="productId" value="${data.productId}" hidden>
                        <div class="cart">
                            <button type="submit"
                            onclick="handleCreateForm()"
                            class="btn btn-sm btn primary"
                            id="create" style="padding: 10px 40px;border: none;margin: 30px 0px;">Add To Cart</button>
                        </div>
                    </div>
                    <h5>Category: ${data.brands.brandName}</h5>
                </div>
            `;
            Element.innerHTML = row
        })
        .catch(err => {
            console.log(err);
        })
}

ShowProductDetail();

const pageSizeOptions = [6, 12, 24];

function paginateData(data, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}

function showProductBrand(currentPage, pageSize) {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    fetch('https://localhost:7180/api/product/brandId?id=' + id, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            const totalPages = Math.ceil(data.length / pageSize);
            const paginatedData = paginateData(data, currentPage, pageSize);
            const Element = document.getElementById('lproduct');
            const row = paginatedData.map(data => `
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 product-left-1" >
          <img src="./image/${data.pImg}" alt="" style="height: 200px; width: 100%; border-radius: 10%;">
          <div class="product-left-text">
            <h5>$${data.price}</h5>
            <div>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
            </div>
            <h4>${data.productName}</h4>
          </div>
          <button><a href="productDetail.html?id=${data.productId}">PRODUCT DETAIL</a></button>
        </div>
      `);
            Element.innerHTML = row.join('');
            const pagination = document.getElementById('pagination');
            const buttons = [];
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(`<button class="${i === currentPage ? 'active' : ''}" onclick="showProductBrand(${i}, ${pageSize})">${i}</button>`);
            }
            pagination.innerHTML = buttons.join('');
            const pageInfo = document.getElementById('pageInfo');
            pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        })
        .catch(err => {
            console.log(err);
        });
}

function SearchProduct() {
    const idSearch = document.getElementById('idSearch');
    const id = idSearch.value;
    console.log(id);
    if (!id) {
        window.location.href = "/product.html";
    } else {
        fetch('https://localhost:7180/api/product/name?name=' + id, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                const Element = document.getElementById('lproduct');
                const row = data.map(data => `
            <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 product-left-1" >
              <img src="./image/${data.pImg}" alt="" style="height: 60%; width: 100%; border-radius: 10%;">
              <div class="product-left-text">
                <h5>$${data.price}</h5>
                <div>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                </div>
                <h4>${data.productName}</h4>
              </div>
              <button><a href="productDetail.html?id=${data.productId}">PRODUCT DETAIL</a></button>
            </div>
          `);
                Element.innerHTML = row.join('')
            })
            .catch(err => {
                console.log(err);
            });
    }
}

function showDataWithPagination(currentPage, pageSize) {
    fetch('https://localhost:7180/api/product')
        .then(response => response.json())
        .then(data => {
            const totalPages = Math.ceil(data.length / pageSize);
            const paginatedData = paginateData(data, currentPage, pageSize);
            const Element = document.getElementById('lproduct');
            const row = paginatedData.map(data => `
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 product-left-1" >
          <img src="./image/${data.pImg}" alt="" style="height: 60%; width: 100%; border-radius: 10%;">
          <div class="product-left-text">
            <h5>$${data.price}</h5>
            <div>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
            </div>
            <h4>${data.productName}</h4>
          </div>
          <button><a href="productDetail.html?id=${data.productId}">PRODUCT DETAIL</a></button>
        </div>
      `);
            Element.innerHTML = row.join('');
            const pagination = document.getElementById('pagination');
            const buttons = [];
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(`<button class="${i === currentPage ? 'active' : ''}" onclick="showDataWithPagination(${i}, ${pageSize})">${i}</button>`);
            }
            pagination.innerHTML = buttons.join('');
            const pageInfo = document.getElementById('pageInfo');
            pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        })
        .catch(err => {
            console.log(err);
        });
}

function pageSizeChanged() {
    const select = document.getElementById('pageSizeSelect');
    const pageSize = parseInt(select.value);
    showDataWithPagination(1, pageSize);
    showProductBrand(1, pageSize);
}

function init() {
    const currentPage = 1;
    const pageSize = 6;
    showDataWithPagination(currentPage, pageSize);
    showProductBrand(currentPage, pageSize);
    const pageSizeSelect = document.getElementById('pageSizeSelect');
    pageSizeOptions.forEach(option => {
        const element = document.createElement('option');
        element.value = option;
        element.textContent = option;
        if (option === pageSize) {
            element.selected = true;
        }
        pageSizeSelect.appendChild(element);
    });
    pageSizeSelect.addEventListener('change', pageSizeChanged);
}

init();



function ShowAllBrand() {
    fetch('https://localhost:7180/api/brand')
        .then(response => response.json())

        .then(data => {
            const Element = document.getElementById('lbrand');
            const row = data.map(data => `
            <li class="list-group-item text-white"><a href="product.html?id=${data.brandId}">${data.brandName}</a></li>
            `)
            Element.innerHTML = row.join('')
        })
        .catch(err => {
            console.log(err);
        })
}
ShowAllBrand();

function showAllBrands() {
    fetch('https://localhost:7180/api/brand')
        .then(response => response.json())
        .then(data => {
            const Element = document.getElementById('labrand');
            const row = data.map(data => `
            <li class="list-group-item text-white"><a href="#" onclick="showProductsByBrand(${data.brandId})">${data.brandName}</a></li>
            `)
            Element.innerHTML = row.join('')
        })
        .catch(err => {
            console.log(err);
        })
}

showAllBrands();

function ShownNewProduct() {
    fetch('https://localhost:7180/api/product/top3')
        .then(response => response.json())

        .then(data => {
            const Element = document.getElementById('nproduct');
            const row = data.map(data => `
            <a href="productDetail.html?id=${data.productId}">
    <div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5" >
        <img src="./image/${data.pImg}" alt="" style="height: 60%; width: 100%; border-radius: 10%;">
    </div>
    <div class="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
        <h4>${data.productName}</h4>
        <div>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>
        <h5>$${data.price}</h5>
    </div>
</a>
            `)
            Element.innerHTML = row.join('')
        })
        .catch(err => {
            console.log(err);
        })
}
ShownNewProduct();

function ShownLNewProduct() {
    fetch('https://localhost:7180/api/product/top3')
        .then(response => response.json())

        .then(data => {
            const Element = document.getElementById('nlproduct');
            const row = data.map(data => `
            <a href="productDetail.html?id=${data.productId}">
            <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 product-left-1">
            <img src="image/${data.pImg}" alt="" style="height: 60%; width: 100%; border-radius: 10%;">
            <div class="product-left-text">
                <h5>$${data.price}</h5>
                <div>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <h4>${data.productName}</h4>
            </div>
            <button><a href="ShowProductToCart?pID=${data.productId}">ADD TO CART</a></button>
        </div>
        </a>
            `)
            Element.innerHTML = row.join('')
        })
        .catch(err => {
            console.log(err);
        })
}
ShownLNewProduct();



let apiData = [];
let pageSize = 6;
let currentPage = 1;
let totalPages = 0;

function paginateData(data, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
}

function displayDataWithPagination(currentPage, pageSize) {
    const paginatedData = paginateData(apiData, currentPage, pageSize);
    const Element = document.querySelector('#apiTable tbody');
    const row = paginatedData.map(data => `
    <tr>
      <td>${data.productId}</td>
      <td>${data.productName}</td>
      <td><img src="image/${data.pImg}" alt="" style="width: 50px; height: 50px; border-radius: 50%;"></td>
      <td>${data.quantity}</td>
      <td>$${data.price}</td>
      <td>
        <button><a href="updateProduct.html?id=${data.productId}">Edit</a></button>
        <button class="delete" onclick="handleClick(${data.productId})">Delete</button>
      </td>
    </tr>
  `);
    Element.innerHTML = row.join('');
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const pagination = document.getElementById('pagination');
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
        buttons.push(`<button class="${i === currentPage ? 'active' : ''}" onclick="displayDataWithPagination(${i}, ${pageSize})">${i}</button>`);
    }
    pagination.innerHTML = buttons.join('');
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function pageSizeChanged() {
    const select = document.getElementById('pageSizeSelect');
    const newPageSize = parseInt(select.value);
    const newTotalPages = Math.ceil(apiData.length / newPageSize);
    const newCurrentPage = currentPage > newTotalPages ? newTotalPages : currentPage;
    pageSize = newPageSize;
    totalPages = newTotalPages;
    currentPage = newCurrentPage;
    displayDataWithPagination(currentPage, pageSize);
}

function showProductsByBrand(brandId) {
    const pageSizeOptions = [6, 12, 24];
    fetch(`https://localhost:7180/api/product/brandId?id=${brandId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            // Lọc danh sách sản phẩm theo mã brand
            const filteredData = data.filter(item => item.brandId === brandId);
            apiData = filteredData;
            totalPages = Math.ceil(apiData.length / pageSize);
            displayDataWithPagination(currentPage, pageSize);

            // Hiển thị tên của brand
            const brandName = filteredData[0].brandName;
            const brandHeading = document.getElementById('brandHeading');
            brandHeading.innerText = `Danh sách sản phẩm của ${brandName}`;

            // Hiển thị số lượng sản phẩm tìm thấy
            const totalProducts = document.getElementById('totalProducts');
            totalProducts.innerText = `Tìm thấy ${filteredData.length} sản phẩm`;

            // Thêm các lựa chọn kích thước trang vào dropdown
            const pageSizeSelect = document.getElementById('pageSizeSelect');
            pageSizeOptions.forEach(option => {
                const element = document.createElement('option');
                element.value = option;
                element.textContent = option;
                if (option === pageSize) {
                    element.selected = true;
                }
                pageSizeSelect.appendChild(element);
            });
            pageSizeSelect.addEventListener('change', pageSizeChanged);
        })
        .catch(err => {
            console.log(err);
        });
}

function ShowAdminProduct() {
    const pageSizeOptions = [6, 12, 24];

    fetch('https://localhost:7180/api/product')
        .then(response => response.json())
        .then(data => {
            apiData = data;
            totalPages = Math.ceil(apiData.length / pageSize);
            displayDataWithPagination(currentPage, pageSize);
            const pageSizeSelect = document.getElementById('pageSizeSelect');
            pageSizeOptions.forEach(option => {
                const element = document.createElement('option');
                element.value = option;
                element.textContent = option;
                if (option === pageSize) {
                    element.selected = true;
                }
                pageSizeSelect.appendChild(element);
            });
            pageSizeSelect.addEventListener('change', pageSizeChanged);
        })
        .catch(err => {
            console.log(err);
        });
}

ShowAdminProduct();

function handleClick(id) {
    console.log("test" + id);
    // const id = e.target.id;
    fetch('https://localhost:7180/api/product?id=' + id, {
        method: "DELETE",
    })
        .then(function (response) {
            ShowAdminProduct();
            window.location.href = "/sellProduct.html";
        })
        .catch(function (error) {
            console.log(error);
        });
};

document.addEventListener("DOMContentLoaded", function () {
    GetResercation();
    function GetResercation() {
        let params = new URL(document.location).searchParams;
        let id = params.get("id");
        fetch("https://localhost:7180/api/product/productId?id=" + id, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                const pid = document.getElementById("pid");
                pid.setAttribute("value", data.productId);
                const pname = document.getElementById("pname");
                pname.setAttribute("value", data.productName);
                const img =
                    document.getElementById("img");
                img.setAttribute("value", data.pImg);
                const quantity = document.getElementById("quantity");
                quantity.setAttribute("value", data.quantity);
                const pd = document.getElementById("pd");
                pd.setAttribute("value", data.productDescription);
                const price = document.getElementById("price");
                price.setAttribute("value", data.price);
                const brand = document.getElementById("brand-select");
                brand.setAttribute("value", data.brandId);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    var createBtn = document.querySelector("#UpdateButton");
    createBtn.onclick = function () {
        var pid = document.querySelector("#pid").value;
        var pname = document.querySelector("#pname").value;
        var img = document.querySelector("#img").value;
        var quantity = document.querySelector("#quantity").value;
        var pd = document.querySelector("#pd").value;
        var price = document.querySelector("#price").value;
        var brand = document.querySelector("#brand").value;
        console.log(pid, pname, img, quantity, pd, price, brand);
        var formdata = {
            productId: pid,
            pImg: img,
            productName: pname,
            productDescription: pd,
            brandId: brand,
            price: price,
            quantity: quantity,
        };
        fetch("https://localhost:7180/api/product", {
            method: "PUT",
            body: JSON.stringify(formdata),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.href = "/sellProduct.html";
            })
            .catch((error) => console.log(error));
    };
});


function decodeJWTToken(token) {
    // Split the token into its three parts: header, payload, and signature
    const parts = token.split('.');

    // Decode the payload part using base64 decoding
    const payload = JSON.parse(atob(parts[1]));

    // Extract the data from the payload object
    const userId = payload.Id;
    const name = payload.UserName;
    const iat = payload.iat;
    const email = payload.email;
    const role = payload.role;

    // Create an object with the extracted data
    const decodedToken = {
        userId: userId,
        name: name,
        email: email,
        role: role,
        issuedAt: new Date(iat * 1000)
    };

    return decodedToken;
}
