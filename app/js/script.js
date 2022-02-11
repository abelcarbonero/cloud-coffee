const mainNav = document.querySelector(".main-nav");
const hamburgerBtn = document.querySelector(".menu-btn");
const body = document.querySelector("body");
const menuCart = document.querySelector(".cart");

//***** SHOW NAV MENU - NO-SCROLL WHEN NAV ACTIVE
const showMenu = () => {
  mainNav.classList.toggle("active");
  hamburgerBtn.classList.toggle("active");
  body.classList.toggle("no-scroll");
};

document.addEventListener("click", (e) => {
  console.log(e.target);

  if (e.target.matches(".menu-btn")) {
    showMenu();
  }

  if (e.target.matches(".main-nav__link")) {
    mainNav.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    body.classList.remove("no-scroll");
  }

  //* SHOW - CLOSE CART MENU
  if (e.target.matches(".cart__close-btn")) {
    menuCart.classList.remove("show-cart");
  }

  if (e.target.matches(".cart-btn")) {
    menuCart.classList.add("show-cart");
  }
});

// //***** SHOW TO TOP BTN WHEN SCROLL DOWN *****
const scrollMenu = () => {
  const scrollTop = document.querySelector(".scroll-top");

  window.scrollY > 200
    ? scrollTop.classList.add("show-top-btn")
    : scrollTop.classList.remove("show-top-btn");
};

window.addEventListener("scroll", scrollMenu);

//***** SHOW/HIDE HEADER WHEN SCROLL *****
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  }
  if (currentScroll < lastScroll && header.classList.contains("scroll-down")) {
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

//***** STOP RESPONSIVE TRANSITION EFFECT WHEN RESIZE****//
stopResponsiveTransition();

function stopResponsiveTransition() {
  const classes = document.body.classList;
  let timer = null;
  window.addEventListener("resize", function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else {
      classes.add("stop-transition");
    }
    timer = setTimeout(() => {
      classes.remove("stop-transition");
      timer = null;
    }, 100);
  });
}

//***** SHOPPING CART ****//

const productItems = document.getElementById("products__container");
const templateProductItem = document.getElementById("template-product").content;
const cartItems = document.getElementById("cart__items");
const templateCartItem = document.getElementById("template-cart__item").content;
const cartFooter = document.getElementById("cart__footer");
const templateCartFooter = document.getElementById(
  "template-cart__footer"
).content;
const fragment = document.createDocumentFragment();
let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    renderCart();
  }
});

//Data json access
const fetchData = () => {
  fetch("../../dist/data.json")
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then((data) => renderProducts(data))
    .catch((error) => console.error(error));
};

//Render products
const renderProducts = (data) => {
  //console.log(data)
  data.forEach((product) => {
    //console.log(product);

    templateProductItem
      .querySelector("img")
      .setAttribute("src", product.imgSrc);
    templateProductItem.querySelector(".product__name").textContent =
      product.title;
    templateProductItem.querySelector(".product__description").textContent =
      product.description;
    templateProductItem.querySelector(".product__price").textContent =
      product.price;
    templateProductItem.querySelector(".product__add-btn").dataset.id =
      product.id;

    const clone = templateProductItem.cloneNode(true);
    fragment.appendChild(clone);
  });

  productItems.appendChild(fragment);
};

//Add event in every single product, after renderProducts()
productItems.addEventListener("click", (e) => {
  
  addItemToCart(e);
});

const addItemToCart = (e) => {
  //console.log(e.target)
  if (e.target.matches(".product__add-btn")) {
    //console.log(e.target.parentElement.parentElement)
    //*show cart menu
    menuCart.classList.add("show-cart");

    setCart(e.target.parentElement.parentElement);
  }
  e.stopPropagation();
};

const setCart = (object) => {
  //console.log(object);
  const cartProduct = {
    imgSrc: object.querySelector(".product__img").src,
    id: object.querySelector(".product__add-btn").dataset.id,
    title: object.querySelector(".product__name").textContent,
    price: object.querySelector(".product__price").textContent,
    quantity: 1,
  };
  //console.log(cartProduct);
  if (cart.hasOwnProperty(cartProduct.id)) {
    cartProduct.quantity = cart[cartProduct.id].quantity + 1;
  }

  cart[cartProduct.id] = { ...cartProduct };
  //console.log(cart);
  renderCart();
};

const renderCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartItems.innerHTML = "";
  //console.log(cart);
  Object.values(cart).forEach((cartProduct) => {
    templateCartItem
      .querySelector(".cart__item-img")
      .setAttribute("src", cartProduct.imgSrc);
    templateCartItem.querySelector(".cart__item-title").textContent =
      cartProduct.title;
    templateCartItem.querySelector(".cart__item-price").textContent =
      cartProduct.price;
    templateCartItem.querySelector(".cart__item-remove-btn").dataset.id =
      cartProduct.id;
    templateCartItem.querySelector(".cart__item-plus-btn").dataset.id =
      cartProduct.id;
    templateCartItem.querySelector(".cart__item-minus-btn").dataset.id =
      cartProduct.id;
    templateCartItem.querySelector(".cart__item-quantity").textContent =
      cartProduct.quantity;

    const clone = templateCartItem.cloneNode(true);
    fragment.appendChild(clone);
  });

  cartItems.appendChild(fragment);

  renderFooter();
};

const renderFooter = () => {
  //console.log(cart);
  cartFooter.innerHTML = "";
  if (Object.keys(cart).length === 0) {
    cartFooter.innerHTML = `
    <p>Cesta vacía, comience a comprar</p>
    `;

    return; //Así sale y no sigue hacia abajo pintando parte del footer
  }

  const totalQuantity = Object.values(cart).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  const totalPrice = Object.values(cart).reduce(
    (acc, { quantity, price }) => acc + price * quantity,
    0
  );
  //console.log(totalQuantity)
  //console.log(totalPrice)

  templateCartFooter.querySelector(".cart__footer-quantity").textContent =
    totalQuantity;
  templateCartFooter.querySelector(".cart__footer-price").textContent =
   ( Math.round((totalPrice + Number.EPSILON) * 100) / 100).toFixed(2);

  const clone = templateCartFooter.cloneNode(true);
  fragment.appendChild(clone);

  cartFooter.appendChild(fragment);

  const clearCartBtn = document.querySelector(".cart__footer-clear-btn");
  clearCartBtn.addEventListener("click", () => {
    cart = {};
    renderCart();
  });
};

cartItems.addEventListener("click", (e) => {
  btnAction(e);
});

const btnAction = (e) => {
  //Aumentar cantidad
  if (e.target.matches(".cart__item-plus-btn")) {
    const item = cart[e.target.dataset.id];
    // item.quantity = cart[e.target.dataset.id].quantity + 1;
    item.quantity++;
    cart[e.target.dataset.id] = { ...item };
    renderCart();
  }
  //Disminuir cantidad
  if (e.target.matches(".cart__item-minus-btn")) {
    const item = cart[e.target.dataset.id];
    // item.quantity = cart[e.target.dataset.id].quantity - 1;
    item.quantity--;
    if (item.quantity === 0) {
      delete cart[e.target.dataset.id];
    }
    renderCart();
  }
  //Eliminar item de la cesta
  if (e.target.matches(".cart__item-remove-btn")) {
    delete cart[e.target.dataset.id];
    renderCart();
  }

  e.stopPropagation();
};
