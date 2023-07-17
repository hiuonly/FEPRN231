
var user = decodeJWTToken(localStorage.getItem('token'));
document.addEventListener("DOMContentLoaded", function () {
    ShowAllCart();
    function ShowAllCart() {
        let total = 0;

        fetch('https://localhost:7180/api/cart/cartUser?id=' + user.userId)
            .then(response => response.json())
            .then(data => {
                const Element = document.getElementById('apiTablec');
                const row = data.map(data =>
                    `
                <tr>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">${data.cartId} 
                        </h5>
                    </td>
                    <td style="width: 200px">
                        <img src="image/${data.products.pImg}" alt="" style="width: 50px; height: 50px; border-radius: 50%;" />
                    </td>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">${data.products.productName}</h5>
                    </td>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">$${data.products.price}</h5>
                    </td>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">${data.quantity}</h5>
                    </td> 
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">$${data.quantity * data.products.price}</h5>
                    </td>
                    <td style="width: 100px;">
                        <button class="delete" onclick="handleClick(${data.cartId})">Delete</button>
                    </td>
                </tr>
                `)
                Element.innerHTML = row.join('');
                data.forEach(data => {
                    const subTotal = data.quantity * data.products.price;
                    total += subTotal;
                });
                const totalPriceElement = document.querySelector('.totalprice h2 span');
                totalPriceElement.textContent = '$' + total;
                const checkoutButton = document.querySelector('.totalprice button');
                checkoutButton.addEventListener('click', () => {
                    alert('Total Price: $' + total);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    var createBtn = document.querySelector("#pay");
    createBtn.onclick = function () {
        fetch('https://localhost:7180/api/cart/cartUser?id=' + user.userId)
            .then(response => response.json())
            .then(data => {
                const updatedData = data.map(item => {
                    return {
                        'cartId': item.cartId,
                        'productId': item.productId,
                        'userId': item.userId,
                        'quantity': item.quantity,
                        'status': 1
                    };
                });
                fetch("https://localhost:7180/api/cart", {
                    method: "PUT",
                    body: JSON.stringify(updatedData),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        window.location.href = "/product.html";
                    })
                    .catch((error) => console.log(error));
            })
            .catch(err => {
                console.log(err);
            });
    };

})


function handleClick(id) {
    console.log("test" + id);
    // const id = e.target.id;
    fetch('https://localhost:7180/api/cart?id=' + id, {
        method: "DELETE",
    })
        .then(function (response) {
            ShowAllCart();
            window.location.href = "/cart.html";
        })
        .catch(function (error) {
            console.log(error);
        });
};

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

const getUser = decodeJWTToken(localStorage.getItem('token'));

if (!getUser) {
    window.location.href = "/login.html";
} else {
    function handleCreateForm() {
        var createBtn = document.querySelector("#create");
        createBtn.onclick = function () {
            var productid = document.querySelector("#product-id").value;
            var quantity = document.querySelector("#quantity").value;
            var userId = getUser.userId;
            console.log(productid, quantity, userId);
            var formdata = {
                productId: productid,
                userId: userId,
                quantity: quantity
            };
            fetch("https://localhost:7180/api/cart",
                {
                    method: "POST",
                    body: JSON.stringify(formdata),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
                    } else {
                        alert("Product added to cart successfully!");
                        window.location.href = "/product.html";
                    }
                })
                .catch(error => {
                    console.error(error.message);
                });
        };
    }
}

ShowMyOrder();
function ShowMyOrder() {
    let total = 0;

    fetch('https://localhost:7180/api/cart/myorderuser?id=' + user.userId)
        .then(response => response.json())
        .then(data => {
            const Element = document.getElementById('myorder');
            const row = data.map(data =>
                `
                <tr>
                    <td style="width: 200px">
                        <img src="image/${data.products.pImg}" alt="" style="width: 200px" />
                    </td>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">${data.quantity}</h5>
                    </td>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">${data.products.productName}</h5>
                    </td>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">$${data.products.price}</h5>
                    </td>
                    <td style="width: 100px;">
                        <h5 class="product-titles" style="text-align: center;">$${data.products.price * data.quantity}</h5>
                    </td>
                    ${data.status === 1 ?
                    `<td class="shoping__cart__status">
                        Đợi phê duyệt
                    </td>
                    <td style="width: 100px;">
                        <button type="button" onclick="checkpay(${data.cartId})" style="text-align: center;">
                            <span class="btn btn-sm btn-danger">
                                Cancel
                            </span>
                        </button>
                    </td>` : ''}
                    ${data.status === 2 ?
                    `<td class="shoping__cart__status" style="color: red">
                        Canceled
                    </td>` : ''}
                    ${data.status === 3 ?
                    `<td class="shoping__cart__status" style="color: blue">
                        Transported
                    </td>` : ''}
                    ${data.status === 4 ?
                    `<td class="shoping__cart__status" style="color: greenyellow">
                        Done
                    </td>` : ''}
                    
                </tr>
                `)
            Element.innerHTML = row.join('');
            data.forEach(data => {
                const subTotal = data.quantity * data.products.price;
                total += subTotal;
            });
            const totalPriceElement = document.querySelector('.totalprice h2 span');
            totalPriceElement.textContent = '$' + total;
            const checkoutButton = document.querySelector('.totalprice button');
            checkoutButton.addEventListener('click', () => {
                alert('Total Price: $' + total);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function checkpay(id) {
    console.log(id);
    fetch('https://localhost:7180/api/cart/cartDetail?id=' + id)
        .then(response => response.json())
        .then(data => {
            const updatedData = {
                'cartId': data.cartId,
                'productId': data.productId,
                'userId': data.userId,
                'quantity': data.quantity,
                'status': 2
            }
            fetch("https://localhost:7180/api/cart", {
                method: "PUT",
                body: JSON.stringify(updatedData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then(function (response) {
                ShowMyOrder();
              })
        })
        .catch(err => {
            console.log(err);
        })
}