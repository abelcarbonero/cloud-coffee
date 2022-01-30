const mainNav = document.querySelector(".main-nav");
const hamburgerBtn = document.querySelector(".menu-btn");
const body = document.querySelector('body')

//***** SHOW NAV MENU AND NO-SCROLL
const showMenu = () => {
  mainNav.classList.toggle("active");
  hamburgerBtn.classList.toggle("active");
  body.classList.toggle("no-scroll");
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".menu-btn")){
    showMenu();
  }

  if(e.target.matches('.main-nav__link')){
    mainNav.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    body.classList.remove("no-scroll");
  }
});

// //*****SHOPPING CART****//

const cards = document.querySelector(".final-products");
const templateCard = document.querySelector(".card").content;
const cartItems = document.querySelector(".cart-items");
const templateCartItem = document.querySelector(".cart-item-template").content;
const cartFooter = document.querySelector(".cart-footer");
const templateCartFooter = document.querySelector(
  ".cart-footer-template"
).content;
const fragment = document.createDocumentFragment();
const cartMenuIcon = document.querySelector(".cart-icon__quantity");

let cart = {};



document.addEventListener("DOMContentLoaded", () => {
 if(localStorage.getItem('storagedCart')){
    cart = JSON.parse(localStorage.getItem('storagedCart'))
    renderCart()
  }
});

//Data json access
const products = fetch("../../dist/data.json")
  .then((response) => response.json())
  //.then((data) => console.log(data))
  .then((data) => renderProducts(data))
  .catch((error) => console.error(error));

//Render products
const renderProducts = (data) => {
  data.forEach((product) => {
    //console.log(product)
    templateCard.querySelector(".card__img").src = product.imgSrc;
    templateCard.querySelector(".card__img").setAttribute("alt", product.title);
    templateCard.querySelector(".card__title").textContent = product.title;
    templateCard.querySelector(".card__country").textContent = product.country;
    templateCard.querySelector(".card__price").textContent = product.price;
    templateCard.querySelector(".btn--add").dataset.id = product.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

cards.addEventListener("click", (e) => {
  addItemToCart(e);
});

const addItemToCart = (e) => {
  //console.log(e.target)
  //console.log(e.target.classList.contains('btn--add'))
  if (e.target.classList.contains("btn--add")) {
    //console.log(e.target.parentElement)
    setCart(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCart = (object) => {
  //console.log(object)
  const product = {
    id: object.querySelector(".btn--add").dataset.id,
    title: object.querySelector(".card__title").textContent,
    country: object.querySelector(".card__country").textContent,
    price: object.querySelector(".card__price").textContent,
    img: object.querySelector(".card__img").src,
    quantity: 1,
  };

  if (cart.hasOwnProperty(product.id)) {
    product.quantity = cart[product.id].quantity + 1;
  }

  cart[product.id] = { ...product };
  //console.log(cart)
  renderCart();
};

const renderCart = () => {
  //console.log(cart)
  cartItems.innerHTML = ""; //Para limpiar el carro cada vez y que un mismo producto se sume y no se acumule al pintar los items
  Object.values(cart).forEach((product) => {
    templateCartItem.querySelector(".cart-item__img").src = product.img;
    templateCartItem.querySelector(".cart-item__title").textContent =
      product.title;
    templateCartItem.querySelector(".cart-item__price").textContent =
      product.price;
    templateCartItem.querySelector(".cart-item__quantity").textContent =
      product.quantity;
    templateCartItem.querySelector(".btn--plus").dataset.id = product.id;
    templateCartItem.querySelector(".btn--minus").dataset.id = product.id;
    templateCartItem.querySelector(".btn--remove").dataset.id = product.id;

    const clone = templateCartItem.cloneNode(true);
    fragment.appendChild(clone);
  });

  cartItems.appendChild(fragment);
  
  
  renderCartFooter();

  localStorage.setItem('storagedCart', JSON.stringify(cart))
};




const renderCartFooter = () => {
  cartFooter.innerHTML = "";
  if (Object.keys(cart) === 0) {
    cartFooter.innerHTML = `
    <p>El carrito está vacío - Comience a comprar</p>
    `;

    return; //Si no hay nada sale y no sigue operando más hacia abajo
  }

  const totalQuantity = Object.values(cart).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  const totalPrice = Object.values(cart).reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );

  //console.log(totalPrice, totalQuantity)
  templateCartFooter.querySelector(".cart-footer__quantity").textContent =
    totalQuantity;
  templateCartFooter.querySelector(".cart-footer__total").textContent =
    Math.round((totalPrice + Number.EPSILON) * 100) / 100;

  const clone = templateCartFooter.cloneNode(true);
  fragment.appendChild(clone);

  cartFooter.appendChild(fragment);
  
};



cartItems.addEventListener("click", (e) => {
  btnAction(e);
});

const btnAction = (e) => {
  //Aumentar cantidad
  if (e.target.matches(".btn--plus")) {
    //console.log(cart[e.target.dataset.id])
    const product = cart[e.target.dataset.id];
    // product.quantity = cart[e.target.dataset.id].quantity + 1
    product.quantity++;
    cart[e.target.dataset.id] = { ...product };
    renderCart();
  }
  //Disminuir cantidad
  if (e.target.matches(".btn--minus")) {
    const product = cart[e.target.dataset.id];
    product.quantity--;
    if (product.quantity === 0) {
      delete cart[e.target.dataset.id];
    }
    renderCart();
  }
  //Btn eliminar item
  if (e.target.matches(".btn--remove")) {
    delete cart[e.target.dataset.id];
    renderCart();
  }

  e.stopPropagation();
};





