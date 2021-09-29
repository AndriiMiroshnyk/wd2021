import "boxicons/css/boxicons.min.css"
import "../scss/style.scss"
import {
    arsenal,
    barcelona,
    bayern,
    juventus,
    psg,
    realmadrid,
} from '../img/*.png';

let additem = document.querySelectorAll('.add__item');

let listGoods = [
    {
        number: 1,
        title: 'arsenal',
        img: arsenal,
        price: 80,
        inCart: 0,
    },
    {
        number: 2,
        title: 'barcelona',
        img: barcelona,
        price: 90,
        inCart: 0,
    },
    {
        number: 3,
        title: 'realmadrid',
        img: realmadrid,
        price: 100,
        inCart: 0,
    },
    {
        number: 4,
        title: 'bayern',
        img: bayern,
        price: 80,
        inCart: 0,
    },
    {
        number: 5,
        title: 'juventus',
        img: juventus,
        price: 110,
        inCart: 0,
    },
    { number: 6, title: 'psg', img: psg, price: 120, inCart: 0 },
];

for (let i = 0; i < additem.length; i++) {
    additem[i].addEventListener('click', () => {
        cartNum(listGoods[i]);
        totalCost(listGoods[i]);
    })
}

function onLoadCartNum() {
    let goodsNumbers = localStorage.getItem('cartNumbers');
    if (goodsNumbers) {
        document.getElementsByClassName('.cart .num').textContent = goodsNumbers;
    }
}

function cartNum(product, action) {
    let goodsNumbers = localStorage.getItem('cartNumbers');
    goodsNumbers = parseInt(goodsNumbers);
    let cartItems = localStorage.getItem('goodsInCart');
    cartItems = JSON.parse(cartItems);

    if (action){
        localStorage.setItem("cartNumbers", goodsNumbers - 1);
        document.querySelector('.cart .num').textContent = goodsNumbers - 1;
    } else if (goodsNumbers) {
        localStorage.setItem('cartNumbers', goodsNumbers + 1);
        document.querySelector('.cart .num').textContent = goodsNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart .num').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('goodsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.title;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.title]: product
        }
    }
    localStorage.setItem("goodsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
    let cartCost = localStorage.getItem('totalCost');

    if (action) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - product.price);
    } else if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("goodsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    let goodsContainer = document.querySelector(".products");

    if (cartItems && goodsContainer) {
        goodsContainer.innerHTML = '';
        Object.values(cartItems).map((item, index) => {
            goodsContainer.innerHTML += `
            <div class="product_container">
            <p>${item.number}</p>
               <div class = "product">
                   <div class="product_name">
                   <img src="${item.img}"></img>
                   <span>${item.title}</span>
                   </div>
               </div>
               <div class = "price">${item.price}</div>
               <div class = "quantity">
                    <i class='bx bxs-left-arrow'></i>
                    <span class="inCartItems">${item.inCart}</span>
                    <i class='bx bxs-right-arrow'></i>
               </div>
               <div class="total">
                   ${item.inCart * item.price}
               </div>
               <div class="remove-button">
                    <i class='bx bxs-checkbox-minus bx-sm'></i>
               </div>
               `
        });
        goodsContainer.innerHTML += `
        <div class="cartTotalContainer">
            <h3 class="cartTotalTitle">Cart Total</h3>
            <h3 class="cartTotal">${cartCost}</h3>
        </div>
        `

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.bxs-left-arrow');
    let increaseButtons = document.querySelectorAll('.bxs-right-arrow');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('goodsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems, 'bla');
            currentQuantity = +decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity, 'asda');
            let currentProductElement = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span')
            currentProduct = currentProductElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct, 'asd');
            console.log(cartItems[currentProduct], 'qwe')

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNum(cartItems[currentProduct], "decrease", currentProductElement);
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('goodsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            let currentProdcutElement = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span')
            currentProduct = currentProdcutElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNum(cartItems[currentProduct], null, currentProdcutElement);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('goodsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.bxs-checkbox-minus');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('goodsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('goodsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNum();
        })
    }
}

onLoadCartNum();
displayCart();