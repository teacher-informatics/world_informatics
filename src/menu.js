

let toggle = document.querySelector('.toggle');
let close = document.querySelector('.close');
let burger_menu = document.querySelector('nav');
let header = document.querySelector('header');
toggle.addEventListener('click', showMenu);
close.addEventListener('click', hideMenu);
function showMenu(){
  burger_menu.style.display='block';
  close.style.display='block';
  toggle.style.display='none';
  header.style.borderBottomColor='white';
  header.style.borderBottomStyle='solid';


}

function hideMenu(){
  burger_menu.style.display='none';
  toggle.style.display='block';
  close.style.display='none';
  header.style.border='none';
}