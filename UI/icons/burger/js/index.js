const btnMenuBurgerLine = document.querySelector('.btn-menu__burger-line'); 
// since there may be more than one burger icon, 
// we select only in a certain parent element
const burgerLine = btnMenuBurgerLine.closest('.burger__line');

btnMenuBurgerLine.onclick = () => burgerLine.classList.toggle('burger__line_active');


