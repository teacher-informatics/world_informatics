

let toggle = document.querySelector('.toggle');
let my_nav = document.querySelector('nav');


toggle.addEventListener('click', () => {
  my_nav.classList.toggle('show');
});