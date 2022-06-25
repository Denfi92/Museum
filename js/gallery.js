const pictureList = [
    'assets/img/galery/galery1.jpg',
    'assets/img/galery/galery2.jpg',
    'assets/img/galery/galery3.jpg',
    'assets/img/galery/galery4.jpg',
    'assets/img/galery/galery5.jpg',
    'assets/img/galery/galery6.jpg',
    'assets/img/galery/galery7.jpg',
    'assets/img/galery/galery8.jpg',
    'assets/img/galery/galery9.jpg',
    'assets/img/galery/galery10.jpg',
    'assets/img/galery/galery11.jpg',
    'assets/img/galery/galery12.jpg',
    'assets/img/galery/galery13.jpg',
    'assets/img/galery/galery14.jpg',
    'assets/img/galery/galery15.jpg',
];

const pictureInnerContainer = document.querySelector('.picture-inner-container');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  
function pastePictures() {
    let randomList = shuffle(pictureList);

    for (let i = 0; i < pictureList.length; i++) {
        const img = document.createElement('img');
        img.classList.add('gallery-picture', 'gallery-picture-invisible');
        img.src = `${randomList[i]}`;
        img.alt = `gallery-picture`;
        pictureInnerContainer.append(img);    
    }
}

pastePictures();
const galleryPictures = document.querySelectorAll('.gallery-picture');

function showPictures() {
    galleryPictures.forEach(el => {
        let position = el.getBoundingClientRect();
        let windowHeight = document.documentElement.clientHeight;
        let top = position.top > 0 && position.top < windowHeight;
        let bottom = position.bottom > 0 && position.bottom < windowHeight;
        if (top || bottom) {
            el.classList.remove('gallery-picture-invisible')
        } else {
            el.classList.add('gallery-picture-invisible')
        }  
    })
}

window.addEventListener('load', showPictures);
window.addEventListener('scroll', showPictures);


