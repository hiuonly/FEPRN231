function ShowAllBill() {
    fetch('https://localhost:7180/api/cart/MyOrder')
        .then(response => response.json())
        .then(data => {
            const Element = document.getElementById('apiTablecart');
            const row = data.map(data => `
            ${data.status === 2 ? '' : `
                    <tr>
                        <td>
                            <img src="image/${data.products.pImg}" alt="" style="width: 50px; height: 50px; border-radius: 50%;" />
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">${data.products.productName}</h5>
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">${data.products.brands.brandName}</h5>
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">$${data.products.price}</h5>
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">${data.quantity}</h5>
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">$${data.quantity * data.products.price}</h5>
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">${data.users.firstName} ${data.users.lastName}</h5>
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">${data.users.phoneNumber}</h5>
                        </td>
                        <td>
                            <h5 class="product-titles" style="text-align: center;">${data.users.address}</h5>
                        </td>
                        <td style="width: 100px;">
                            ${data.status === 1 ?
                        `
                    <button onclick="AccpetOrder(${data.cartId}, 3)" type="button" style="text-align: center;">
                        <span class="btn btn-sm btn-danger">
                            Accept
                        </span>
                    </button>` : ''}
                            ${data.status === 3 ?
                        `
                    <button onclick="AccpetOrder(${data.cartId}, 4)" type="button" style="text-align: center;">
                        <span class="btn btn-sm btn-primary">
                            Transported
                        </span>
                    </button>` : ''}
                            ${data.status === 4 ?
                        `<span class="btn btn-sm btn-success">
                        Done
                    </span>` : ''}
                        </td>
                    </tr>`
                }
                
            `)
            Element.innerHTML = row.join('')
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}
ShowAllBill();

function AccpetOrder(id, status) {
    console.log(id);
    fetch('https://localhost:7180/api/cart/cartDetail?id=' + id)
        .then(response => response.json())
        .then(data => {
            const updatedData = {
                'cartId': data.cartId,
                'productId': data.productId,
                'userId': data.userId,
                'quantity': data.quantity,
                'status': status
            }
            fetch("https://localhost:7180/api/cart", {
                method: "PUT",
                body: JSON.stringify(updatedData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then(function (response) {
                    ShowAllBill();
                })
        })
        .catch(err => {
            console.log(err);
        })
}

document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById('brand-select');
    const productPromise = fetchProductById();
    const brandsPromise = fetchAllBrands();

    Promise.all([productPromise, brandsPromise])
        .then(([productData, brandData]) => {
            const pid = document.getElementById("pid");
            pid.setAttribute("value", productData.productId);
            const pname = document.getElementById("pname");
            pname.setAttribute("value", productData.productName);
            const pd =
                document.getElementById("pd");
            pd.setAttribute("value", productData.productDescription);
            const img = document.getElementById("img");
            img.setAttribute("value", productData.pImg);
            const quantity = document.getElementById("quantity");
            quantity.setAttribute("value", productData.quantity);
            const price = document.getElementById("price");
            price.setAttribute("value", productData.price);

            // Lặp qua danh sách nhãn hiệu và tạo các phần tử option cho dropdown
            selectElement.innerHTML = brandData.map(brands => `
                <option value="${brands.brandId}" ${brands.brandId === productData.brandId ? 'selected' : ''}>${brands.brandName}</option>
            `).join('');
        })
        .catch((err) => {
            console.log(err);
        });

    var createBtn = document.querySelector("#UpdateButton");
    createBtn.onclick = function () {
        var pid = document.querySelector("#pid").value;
        var pname = document.querySelector("#pname").value;
        var pd = document.querySelector("#pd").value;
        var img = document.querySelector("#img").files[0].name;
        var quantity = document.querySelector("#quantity").value;
        var price = document.querySelector("#price").value;
        var brand = document.querySelector("#brand-select").value;
        console.log(pid, pname, pd, img, quantity, price, brand);
        var formdata = {
            'productId': pid,
            'pImg': img,
            'productName': pname,
            'productDescription': pd,
            'brandId': brand,
            'price': price,
            'quantity': quantity,
        };
        fetch("https://localhost:7180/api/product", {
            method: "PUT",
            body: JSON.stringify(formdata),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(function (response) {
                alert("Product updated successfully.");
                window.location.href = "/sellProduct.html";
            })
    };
});

function fetchProductById() {
    const params = new URL(document.location).searchParams;
    const id = params.get("id");
    return fetch("https://localhost:7180/api/product/productId?id=" + id, {
        method: "GET",
    })
        .then((response) => response.json())
        .catch((err) => {
            console.log(err);
        });
}

function fetchAllBrands() {
    return fetch('https://localhost:7180/api/brand')
        .then(response => response.json())
        .catch(error => {
            console.error(error);
            return [];
        });
}