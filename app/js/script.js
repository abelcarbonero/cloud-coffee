const body = document.querySelector("body");
const header = document.querySelector(".header");
const mainNav = document.querySelector(".main-nav");
const hamburgerBtn = document.querySelector(".menu-btn");

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

stopResponsiveTransition();
