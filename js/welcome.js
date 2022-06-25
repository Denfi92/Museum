// welcome slider

let welcomeSlider = new Swiper('.welcome-slider', {
	navigation: {
		nextEl: '.welcome-next',
		prevEl: '.welcome-prev',
	},

	pagination: {
		el: '.welcome-dots',
		clickable: true,
	},

	loop: true,
    grabCursor: true,
});

const welcomeCounterCurrent = document.querySelector('.welcome-counter-current')

welcomeSlider.on('slideChange', function () {
	let current = ++welcomeSlider.realIndex;
	welcomeCounterCurrent.innerHTML = `0${current}`;
})



// button up

const btnUp = document.querySelector('.btn-up');

function trackScroll() {
    let scrolled = window.pageYOffset;

    if (scrolled > 100) {
        btnUp.classList.add('btn-up-shown');
    }
    if (scrolled < 100) {
        btnUp.classList.remove('btn-up-shown');
    }
}

function scrollToTop() {
    if (window.pageYOffset > 0) {
      window.scrollTo(0, 0);
    }
}

window.addEventListener('load', trackScroll);
window.addEventListener('scroll', trackScroll);
btnUp.addEventListener('click', scrollToTop);


// burger menu
const menuBtn = document.querySelector('.header-nav-btn');
const menu = document.querySelector('.header-nav');
const menuItems = document.querySelectorAll('.header-nav > ul > li');
const welcomeContent = document.querySelector('.welcome-content');


function toggleMenu() {
    menuBtn.classList.toggle('menu-btn-on');
    menu.classList.toggle('menu-list-on');
    welcomeContent.classList.toggle('opacity');

}

menuBtn.addEventListener('click', toggleMenu);
menuItems.forEach(el => {
    el.addEventListener('click', toggleMenu);
});

function closeMenuByClickOutside(e) {
    const target = e.target;
    const its_menu = target == menu || menu.contains(target);
    const its_btnMenu = target == menuBtn;
    const menu_is_active = menu.classList.contains('menu-list-on');
    
    if (!its_menu && !its_btnMenu && menu_is_active) {
        toggleMenu();
    }
}

document.addEventListener('click', closeMenuByClickOutside);
