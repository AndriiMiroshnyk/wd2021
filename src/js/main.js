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

function cartNum(product) {
    let goodsNumbers = localStorage.getItem('cartNumbers');
    goodsNumbers = parseInt(goodsNumbers);
    if (goodsNumbers) {
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
        if (cartItems[product.title] == undefined) {
            cartItems = {
                ...cartItems,
                [product.title]: product
            }
        }
        cartItems[product.title].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.title]: product
        }
    }
    localStorage.setItem("goodsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("goodsInCart");
    cartItems = JSON.parse(cartItems);
    let goodsContainer = document.querySelector(".products");
    if (cartItems && goodsContainer) {
        goodsContainer.innerHTML = '';
        Object.values(cartItems).map((item) => {
            goodsContainer.innerHTML += `
            <div class="product_container">
            <p>${item.number}</p>
               <div class = "product">
                   <div class="product_name">
                   <img src="${item.img}"></img>
                   <span>${item.title} Strip</span>
                   </div>
               </div>
               <div class = "price">${item.price}</div>
               <div class = "quantity">
                   <i class='bx bxs-left-arrow'></i>
                   <span>${item.inCart}</span>
                   <i class='bx bxs-right-arrow'></i>
               </div>
               <div class="total">
                   ${item.inCart * item.price}
               </div>
               <div class="remove-product">
                    <i class='bx bxs-minus-circle bx-sm'></i>
               </div>
               `
        });
    }
}

onLoadCartNum();
displayCart();