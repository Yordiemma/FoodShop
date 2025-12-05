const menuNav = document.querySelector(".menu-nav");
const menuContainer = document.querySelector(".menu-container");
const menuSpan = document.querySelector(".menu-span");

menuNav.addEventListener("click", (event) => {
  event.preventDefault();

  menuContainer.classList.toggle("active");
  menuNav.classList.toggle("active");
});

menuSpan.addEventListener("click", (event) => {
  event.preventDefault();
  menuContainer.classList.remove("active");
  menuNav.classList.remove("active");
});
