const exploreRange = document.querySelector('.explore-slider-range');
const exploreBefore = document.querySelector('.explore-slider-before');

function changeExploreRange() {
    exploreBefore.style.width = exploreRange.value + '%';
}

exploreRange.addEventListener('input', changeExploreRange);