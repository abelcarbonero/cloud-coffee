"use strict";function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach((function(e){_defineProperty(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function _defineProperty(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var mainNav=document.querySelector(".main-nav"),hamburgerBtn=document.querySelector(".menu-btn"),body=document.querySelector("body"),menuCart=document.querySelector(".cart"),showMenu=function(){mainNav.classList.toggle("active"),hamburgerBtn.classList.toggle("active"),body.classList.toggle("no-scroll")};document.addEventListener("click",(function(t){t.target.matches(".menu-btn")&&showMenu(),t.target.matches(".main-nav__link")&&(mainNav.classList.remove("active"),hamburgerBtn.classList.remove("active"),body.classList.remove("no-scroll"))}));var scrollMenu=function(){var t=document.querySelector(".scroll-top");window.scrollY>200?t.classList.add("show-top-btn"):t.classList.remove("show-top-btn")};window.addEventListener("scroll",scrollMenu);var header=document.querySelector(".header"),lastScroll=0;function stopResponsiveTransition(){var t=document.body.classList,e=null;window.addEventListener("resize",(function(){e?(clearTimeout(e),e=null):t.add("stop-transition"),e=setTimeout((function(){t.remove("stop-transition"),e=null}),100)}))}window.addEventListener("scroll",(function(){var t=window.scrollY;t<=0&&header.classList.remove("scroll-up"),t>lastScroll&&!header.classList.contains("scroll-down")&&(header.classList.remove("scroll-up"),header.classList.add("scroll-down")),t<lastScroll&&header.classList.contains("scroll-down")&&(header.classList.remove("scroll-down"),header.classList.add("scroll-up")),lastScroll=t})),stopResponsiveTransition();var productItems=document.getElementById("products__container"),templateProductItem=document.getElementById("template-product").content,cartItems=document.getElementById("cart__items"),templateCartItem=document.getElementById("template-cart__item").content,cartFooter=document.getElementById("cart__footer"),templateCartFooter=document.getElementById("template-cart__footer").content,fragment=document.createDocumentFragment(),cart={};document.addEventListener("DOMContentLoaded",(function(){fetchData(),localStorage.getItem("cart")&&(cart=JSON.parse(localStorage.getItem("cart")),renderCart())}));var fetchData=function(){fetch("../../dist/data.json").then((function(t){return t.json()})).then((function(t){return renderProducts(t)})).catch((function(t){return console.error(t)}))},renderProducts=function(t){t.forEach((function(t){templateProductItem.querySelector("img").setAttribute("src",t.imgSrc),templateProductItem.querySelector(".product__name").textContent=t.title,templateProductItem.querySelector(".product__description").textContent=t.description,templateProductItem.querySelector(".product__price").textContent=t.price,templateProductItem.querySelector(".product__add-btn").dataset.id=t.id;var e=templateProductItem.cloneNode(!0);fragment.appendChild(e)})),productItems.appendChild(fragment)};productItems.addEventListener("click",(function(t){addItemToCart(t)}));var addItemToCart=function(t){t.target.matches(".product__add-btn")&&setCart(t.target.parentElement.parentElement),t.stopPropagation()},setCart=function(t){var e={imgSrc:t.querySelector(".product__img").src,id:t.querySelector(".product__add-btn").dataset.id,title:t.querySelector(".product__name").textContent,price:t.querySelector(".product__price").textContent,quantity:1};cart.hasOwnProperty(e.id)&&(e.quantity=cart[e.id].quantity+1),cart[e.id]=_objectSpread({},e),renderCart()},renderCart=function(){localStorage.setItem("cart",JSON.stringify(cart)),cartItems.innerHTML="",Object.values(cart).forEach((function(t){templateCartItem.querySelector(".cart__item-img").setAttribute("src",t.imgSrc),templateCartItem.querySelector(".cart__item-title").textContent=t.title,templateCartItem.querySelector(".cart__item-price").textContent=t.price,templateCartItem.querySelector(".cart__item-remove-btn").dataset.id=t.id,templateCartItem.querySelector(".cart__item-plus-btn").dataset.id=t.id,templateCartItem.querySelector(".cart__item-minus-btn").dataset.id=t.id,templateCartItem.querySelector(".cart__item-quantity").textContent=t.quantity;var e=templateCartItem.cloneNode(!0);fragment.appendChild(e)})),cartItems.appendChild(fragment),renderFooter()},renderFooter=function(){if(cartFooter.innerHTML="",0!==Object.keys(cart).length){var t=Object.values(cart).reduce((function(t,e){return t+e.quantity}),0),e=Object.values(cart).reduce((function(t,e){var r=e.quantity;return t+e.price*r}),0);templateCartFooter.querySelector(".cart__footer-quantity").textContent=t,templateCartFooter.querySelector(".cart__footer-price").textContent=e;var r=templateCartFooter.cloneNode(!0);fragment.appendChild(r),cartFooter.appendChild(fragment),document.querySelector(".cart__footer-clear-btn").addEventListener("click",(function(){cart={},renderCart()}))}else cartFooter.innerHTML="\n    <p>Cesta vacía, comience a comprar</p>\n    "};cartItems.addEventListener("click",(function(t){btnAction(t)}));var btnAction=function(t){if(t.target.matches(".cart__item-plus-btn")){var e=cart[t.target.dataset.id];e.quantity++,cart[t.target.dataset.id]=_objectSpread({},e),renderCart()}if(t.target.matches(".cart__item-minus-btn")){var r=cart[t.target.dataset.id];r.quantity--,0===r.quantity&&delete cart[t.target.dataset.id],renderCart()}t.target.matches(".cart__item-remove-btn")&&(delete cart[t.target.dataset.id],renderCart()),t.stopPropagation()};
//# sourceMappingURL=script.js.map