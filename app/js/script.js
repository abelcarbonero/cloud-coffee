const mainNav = document.querySelector('.main-nav')
const hamburgerBtn = document.querySelector('.menu-btn')


//***** SHOW NAV MENU - BLUR & PREVENT BODY SCROLL
const showMenu = () => {
    mainNav.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");
    // body.classList.toggle("blurOverflow");
  };
  
  document.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.matches(".menu-btn")) {
      showMenu();
    }
  });