/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if( productNumbers ) {
        document.querySelector('.cart sup').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    

    productNumbers = parseInt(productNumbers);
    
    if( productNumbers ) {

        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart sup').textContent = productNumbers + 1;
        
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart sup').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if( cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div>
            <div class="cartitem">
                <div class="product bt">
                    <img src="${item.imge}" class="img-product">
                    <span class="product-name">${item.pName}</span>
                </div>
            

                <div class="product-price">
                    <span class="">Đơn giá : ${item.price}đ</span>
                </div>

                <div class="chitietgia">
                    <span class="soluong">Số lượng : </span>
                    <span class="dc"><button onclick="decrease(this)" class="quantity-dc">-</button></span>
                    <span class="product-quantity">${item.inCart}</span>
                    <span class="ic"><button onclick="increase(this)" class="quantity-ic">+</button></span>
                </div>

                <div>
                    <span class="product-total">Thành tiền : ${item.inCart * item.price}đ</span>
                </div>

                <div class="buttonDelete">
                    <span><button class="btn btn-danger bt-delete" data-toggle="modal" data-target="#modal-delete" onclick="getThis(this)" ><i class="far fa-trash-alt"></i></button>
                    </span>
                </div>
            </div>
            <hr style="padding-bottom: 20px;width: 83%;" class="hr">
            </div>
            `

        });

        productContainer.innerHTML += `
            <div class="sum">
                <h4 class="tongcong">Tổng tiền : </h4>
                <h4 class="totalprice">${cartCost}đ</h4>
            </div>
            
            <div class="dat-hang">
                <button class="btn btn-success btn-pay">Thanh toán</button>
            </div>

            <div class="xoatatca">
                <button class="btn btn-danger" data-toggle="modal" data-target="#modal-delete-all" >Xóa tất cả</button>
            </div>

        `

    }
}

function getThis(e) {
    var buttonDelete = e.parentElement.parentElement.parentElement.parentElement;
    var x = document.getElementById('button-delete');
    x.onclick = function() {
        Delete(buttonDelete);
    }
}

function DeleteAll() {
    let productContainer = document.querySelector(".products");
    productContainer.innerHTML = '';

    localStorage.removeItem('productsInCart');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartNumbers');

    var cart = document.getElementsByClassName('count-item')[0];
    cart.innerText = 0;

}

function Delete(e) {
    var totalPrice =  e.getElementsByClassName('product-total')[0];
    e.remove();
    
    updateCost(totalPrice);
    updateCart(e);
}

function updateCost(e) {
    var price = parseInt(e.innerText.replace('Thành tiền : ', ''));
    var totalElement = document.getElementsByClassName('totalprice')[0];
    var total = parseInt(totalElement.innerText.replace('đ', ''));
    total = total - price;
    document.getElementsByClassName('totalprice')[0].innerText = total + "đ";
}

function increase(e) {
    var cart = e.parentElement.parentElement.parentElement;
    var quantityElement = cart.getElementsByClassName('product-quantity')[0];
    var quantity = parseInt(quantityElement.innerText);
    quantity += 1;
    quantityElement.innerText = quantity;
    
    var cartNumbers = document.getElementsByClassName('count-item')[0];
    var carts = parseInt(cartNumbers.innerText);
    carts = carts + 1;
    document.getElementsByClassName('count-item')[0].innerText = carts;

    var totalPriceElement = cart.getElementsByClassName('product-total')[0];
    var totalPrice = parseInt(totalPriceElement.innerText.replace('Thành tiền : ', ''));
    
    var priceElement = cart.getElementsByClassName('product-price')[0];
    var price = parseInt(priceElement.innerText.replace('Đơn giá : ', ''));

    var newTotalPrice = totalPrice + price;
    totalPriceElement.innerText = "Thành tiền : " + newTotalPrice + "đ";

    var sumElement = document.getElementsByClassName('totalprice')[0];
    var sum = parseInt(sumElement.innerText.replace('đ',''));
    var newSum = sum + price;
    sumElement.innerText = newSum + 'đ';

}

function decrease(e) {
    var cart = e.parentElement.parentElement.parentElement;
    var quantityElement = cart.getElementsByClassName('product-quantity')[0];
    var quantity = parseInt(quantityElement.innerText);
    quantity = quantity - 1;
    quantityElement.innerText = quantity;

    if(quantity > 0) {

        var cartNumbers = document.getElementsByClassName('count-item')[0];
        var carts = parseInt(cartNumbers.innerText);
        carts = carts - 1;
        document.getElementsByClassName('count-item')[0].innerText = carts;

        var totalPriceElement = cart.getElementsByClassName('product-total')[0];
        var totalPrice = parseInt(totalPriceElement.innerText.replace('Thành tiền : ', ''));
        
        var priceElement = cart.getElementsByClassName('product-price')[0];
        var price = parseInt(priceElement.innerText.replace('Đơn giá : ', ''));

        var newTotalPrice = totalPrice - price;
        totalPriceElement.innerText = "Thành tiền : " + newTotalPrice + "đ";

        var sumElement = document.getElementsByClassName('totalprice')[0];
        var sum = parseInt(sumElement.innerText.replace('đ',''));
        var newSum = sum - price;
        sumElement.innerText = newSum + 'đ';

    } else {
        var quantityElements = cart.getElementsByClassName('product-quantity')[0];
        var quantity = parseInt(quantityElements.innerText);
        quantityElements.innerText = 1;
    }

}

function updateCart(e) {
    var productQuantity = e.getElementsByClassName('product-quantity')[0];
    var quantity = parseInt(productQuantity.innerText);
    var cartNumbers = document.getElementsByClassName('count-item')[0];
    var cart = parseInt(cartNumbers.innerText);
    cart = cart - quantity;
    document.getElementsByClassName('count-item')[0].innerText = cart;
}

onLoadCartNumbers();
displayCart();



