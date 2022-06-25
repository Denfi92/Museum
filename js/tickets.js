const buyForm = document.querySelector('.buy-tickets-form');
const bookDate = document.querySelector('.book-date');
const bookTime = document.querySelector('.book-time');
const bookName = document.querySelector('.book-input.name');
const bookEmail = document.querySelector('.book-input.email');
const bookTel = document.querySelector('.book-input.tel');
const cardNumber = document.querySelector('.card-number');
const cardCvv = document.querySelector('.card-cvv');
const cardMonth = document.querySelector('.card-month');
const cardYear = document.querySelector('.card-year');
const payDate = document.querySelector('.pay-date');
const payTime = document.querySelector('.pay-time');
const payType = document.querySelector('.pay-type');
let today = new Date();
let min = today.toISOString().split('T')[0];
let day = today;
let weekDay;
let date;
let month;


const customSelectDiv = document.querySelector(".custom-select");
const customSelect = document.querySelector(".custom-select select");
const selectLength = customSelect.length;
let currentType = 'Permanent exhibition';
let selectedItem;


const buyBtn = document.querySelector('.ticket-buy-btn');
const overlay = document.querySelector('.buy-container-overlay');
const buyContainer = document.querySelector('.buy-container');
const buyContainerForm = document.querySelector('.buy-container-form');
const closeBtn = document.querySelector('.buy-close-button');


const basicPricePermanent = 20;
const basicPriceTemporary = 25;
const basicPriceCombined = 40;
const seniorPricePermanent = 10;
const seniorPriceTemporary = 12.5;
const seniorPriceCombined = 20;
const basic = document.querySelectorAll('.basic');
const senior = document.querySelectorAll('.senior');
const total = document.querySelectorAll('.total-sum');
const types = document.querySelectorAll('.ticket-type-item');
const btnBasicMinus = document.querySelectorAll('.btn-basic-minus');
const btnBasicPlus = document.querySelectorAll('.btn-basic-plus');
const btnSeniorMinus = document.querySelectorAll('.btn-senior-minus');
const btnSeniorPlus = document.querySelectorAll('.btn-senior-plus');
const payBasicAmount = document.querySelector('.pay-basic-amount');
const paySeniorAmount = document.querySelector('.pay-senior-amount');
const payBasicCost = document.querySelectorAll('.pay-basic-cost');
const paySeniorCost = document.querySelectorAll('.pay-senior-cost');
const payBasicSum = document.querySelector('.pay-basic-sum');
const paySeniorSum = document.querySelector('.pay-senior-sum');
const ticketTypeInputs = document.querySelectorAll('.ticket-type-input')
let basicAmount = 0;
let seniorAmount = 0;
let basicSum = 0;
let seniorSum = 0;
let sum = 0;


// custom select 

function createCustomSelect() {
    selectedItem = document.createElement("div");
    selectedItem.setAttribute("class", "select-selected");
    selectedItem.innerHTML = currentType;
    customSelectDiv.appendChild(selectedItem);
    optionList = document.createElement("div");
    optionList.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selectLength; j++) {
        optionItem = document.createElement("div");
        optionItem.innerHTML = customSelect.options[j].innerHTML;
        optionItem.addEventListener("click", function(e) {
            for (i = 0; i < selectLength; i++) {
                if (customSelect.options[i].innerHTML == this.innerHTML) {
                    customSelect.selectedIndex = i;
                    currentType = this.innerHTML;
                    selectedItem.innerHTML = currentType;
                    payType.innerText = currentType;
                    changePrices();
                    ticketCounter();
                    recordData();
                    break;
                }
            }
        });
        optionList.appendChild(optionItem);
    }
    customSelectDiv.appendChild(optionList);
    
    selectedItem.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

createCustomSelect();

function closeAllSelect(element) {
    let x, y, i, xl, yl, arrNo = [];
    x = document.querySelectorAll(".select-items");
    y = document.querySelectorAll(".select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (element == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);





function setMinDate() {
    bookDate.setAttribute('min', min);
    bookDate.setAttribute('value', min);
}

function formatDate() {
    weekDay = day.toLocaleString('en', { weekday: 'long' });
    date = day.toLocaleString('en', {day: 'numeric'});
    month = day.toLocaleString('en', { month: 'long' });
    payDate.innerText = weekDay + ', ' + month + ' ' + date;
}

formatDate()

function updateDay() {
    day = bookDate.valueAsDate;
    formatDate();
}

function updateTime() {
    payTime.innerText = bookTime.value.slice(0, 2) + ' : ' + bookTime.value.slice(3, 5);
}

function colorInvalid(el) {
    if (el.nextElementSibling.innerText !== '') {
        el.classList.add('invalid-input');
    } else {
        el.classList.remove('invalid-input');
    }
}

function dateValidation() {
    if (bookDate.value < min) {
        bookDate.nextElementSibling.innerText = "Please choose a date in the future";
    } else {
        bookDate.nextElementSibling.innerText = "";
    }
    colorInvalid(bookDate);
}

function timeValidation() {
    let minutes = bookTime.value.substr(3);
    let min = bookTime.getAttribute('min');
    let max = bookTime.getAttribute('max');
    if (bookTime.value < min || bookTime.value > max || minutes !== '30' && minutes !== '00') {
        bookTime.nextElementSibling.nextElementSibling.innerText = "Please choose time from the list";
    } else {
        bookTime.nextElementSibling.nextElementSibling.innerText = "";
    }

    colorInvalid(bookDate);
}

function nameValidation() {
    const re = /^[A-Za-zA-zА-яЁё\s]+$/;
    if (re.test(bookName.value)) {
        if (bookName.value.length < 3 || bookName.value.trim().length < 3) {
            bookName.nextElementSibling.innerText = "Username must be at least 3 chars";
        } else if (bookName.value.length > 15) {
            bookName.nextElementSibling.innerText = "Name can't be longer then 15 chars";
        } else if (bookName.value.trim().length == 0) {
            bookName.nextElementSibling.innerText = "Please enter your name";
        } else {
            bookName.nextElementSibling.innerText = '';
        }
    } else if (bookName.value.length === 0) {
        bookName.nextElementSibling.innerText = "Please enter your name";
    } else {
        bookName.nextElementSibling.innerText = "Only latin and cyrillic chars";
    }

    colorInvalid(bookName);
}    

function emailValidation() {
    const re = /^([\w\.\-\_\@]+)$/;
    const re2 = /^([\w\.\-\_]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
    if (bookEmail.value.length === 0) {
        bookEmail.nextElementSibling.innerText = "Please enter your e-mail";
    } else if (!re.test(bookEmail.value)) {
        bookEmail.nextElementSibling.innerText = 'Only latin chars, numbers, _ , ‒ and @';
    } else if (!re2.test(bookEmail.value)) {
        bookEmail.nextElementSibling.innerText = 'Please follow format user@example.com';
    } else {
        if (bookEmail.value.match(re2)[1].length < 3) {
            bookEmail.nextElementSibling.innerText = "First part must be at least 3 chars";
        } else if (bookEmail.value.match(re2)[1].length > 15) {
            bookEmail.nextElementSibling.innerText = "First part can't be longer then 15 chars";
        } else if (bookEmail.value.match(re2)[2].length < 4) {
            bookEmail.nextElementSibling.innerText = 'Second part must be at least 4 chars';
        } else if (bookEmail.value.match(re2)[3].length < 2) {
            bookEmail.nextElementSibling.innerText = 'Last part must be at least 2 chars';
        } else {
            bookEmail.nextElementSibling.innerText = '';
        }
    }

    colorInvalid(bookEmail);
}

function telValidation() {
    const re = /^[\d -]*$/;
    const re2 = /[-| ]/;
    const re3 = /\b\d{1}\b/;
    const re4 = /\b\d{4,}\b/;
    
    if (bookTel.value.length === 0) {
        bookTel.nextElementSibling.innerText = "Please enter your phone number";
    } else if (!bookTel.value.match(re)) {
        bookTel.nextElementSibling.innerText = "Please use only numbers, ‒ and space";
    } else if (bookTel.value.match(/\d/g).length > 10) {
        bookTel.nextElementSibling.innerText = "Number can't be longer then 10 chars"
    } else if (bookTel.value.match(re2)) {
        if (bookTel.value.match(re3) || bookTel.value.match(re4)) {
            bookTel.nextElementSibling.innerText = "Please group only 2 or 3 numbers";
        } else {
                bookTel.nextElementSibling.innerText = "";
        }
    } else {
        bookTel.nextElementSibling.innerText = "";
    }

    colorInvalid(bookTel);
}

function cardNumberValidation() {
    if (cardNumber.value.length > 16) cardNumber.value = cardNumber.value.substr(0, 16);
}

function cardCvvValidation() {
    if (cardCvv.value.length > 4) cardCvv.value = cardCvv.value.substr(0, 4);
}

function cardMonthValidation() {
    if (cardMonth.value.length > 2) cardMonth.value = cardMonth.value.substr(0, 2);
}

function cardYearValidation() {
    if (cardYear.value.length > 4) cardYear.value = cardYear.value.substr(0, 4);
}

setMinDate();
bookDate.addEventListener('keyup', dateValidation);
bookDate.addEventListener('input', dateValidation);
bookTime.addEventListener('keyup', timeValidation);
bookTime.addEventListener('input', timeValidation);
bookName.addEventListener('keyup', nameValidation);
bookEmail.addEventListener('keyup', emailValidation);
bookTel.addEventListener('keyup', telValidation);
cardNumber.addEventListener('keyup', cardNumberValidation);
cardCvv.addEventListener('keyup', cardCvvValidation);
cardMonth.addEventListener('keyup', cardMonthValidation);
cardYear.addEventListener('keyup', cardYearValidation);



// button book effect

const buttonBook = document.querySelector('.book-submit');

function rippleEffect(e) {
    const x = e.clientX;
    const y = e.clientY;

    const buttonLeft = e.target.getBoundingClientRect().x;
    const buttonTop = e.target.getBoundingClientRect().y;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
}

buttonBook.addEventListener('click', rippleEffect);


// appereance of book form

function showOverlay() {
    overlay.style.opacity = "1";
    buyContainer.style.pointerEvents = "all";
    setTimeout(showForm, 100);
}

function showForm() {
    buyContainerForm.classList.add("buy-container-form-shown");
    buyContainer.style.overflowY = "overlay";
}

function hideOverlay() {
    overlay.style.opacity = "0";
    buyContainer.style.pointerEvents = "none";
}

function hideForm() {
    buyContainerForm.classList.remove("buy-container-form-shown");
    setTimeout(hideOverlay, 300);
    buyContainer.style.overflowY = "hidden";
}

overlay.addEventListener('click', hideForm);
buyBtn.addEventListener('click', showOverlay);
closeBtn.addEventListener('click', hideForm);


// cost

getData();
ticketCounter();

function changeType() {
    currentType = this.firstElementChild.value;
    payType.innerText = currentType;
    selectedItem.innerHTML = currentType;
    changePrices();
    ticketCounter();
}

function changePrices() {
    if (currentType === 'Permanent exhibition') {
        payBasicCost.forEach(el => {
            el.innerText = basicPricePermanent;
        });
        paySeniorCost.forEach(el => {
            el.innerText = seniorPricePermanent;
        });
    } else if (currentType === 'Temporary exhibition') {
        payBasicCost.forEach(el => {
            el.innerText = basicPriceTemporary;
        });
        paySeniorCost.forEach(el => {
            el.innerText = seniorPriceTemporary;
        });
    } else if (currentType === 'Combined Admission') {
        payBasicCost.forEach(el => {
            el.innerText = basicPriceCombined;
        });
        paySeniorCost.forEach(el => {
            el.innerText = seniorPriceCombined;
        });
    }
}

function ticketCounter() {
    basicAmount = basic[0].value;
    seniorAmount = senior[1].value;
    if (currentType === 'Permanent exhibition') {
        basicSum = basicPricePermanent * basicAmount;
        seniorSum = seniorPricePermanent * seniorAmount;
        payBasicSum.innerText = basicSum;
        paySeniorSum.innerText = seniorSum;
        sum = basicSum + seniorSum;
    } else if (currentType === 'Temporary exhibition') {
        basicSum = basicPriceTemporary * basicAmount
        seniorSum = seniorPriceTemporary * seniorAmount;
        payBasicSum.innerText = basicSum;
        paySeniorSum.innerText = seniorSum;
        sum = basicSum + seniorSum;
    } else if (currentType === 'Combined Admission') {
        basicSum = basicPriceCombined * basicAmount
        seniorSum = seniorPriceCombined * seniorAmount;
        payBasicSum.innerText = basicSum;
        paySeniorSum.innerText = seniorSum;
        sum = basicSum + seniorSum;
    }

    total.forEach(el => {
        el.innerHTML = sum;
    });
    recordData();
}

types.forEach(type => {
    type.addEventListener('change', changeType);
});


function basicMinus() {
    basic.forEach(el => {
        el.value = +el.value > 0 ? +el.value - 1 : 0;
        payBasicAmount.innerText = el.value;
    });
    ticketCounter();
    recordData();
}

function basicPlus() {
    basic.forEach(el => {
        el.value = +el.value < 20 ? +el.value + 1 : 20;
        payBasicAmount.innerText = el.value;
    });
    ticketCounter();
    recordData();
}

function seniorMinus() {
    senior.forEach(el => {
        el.value = +el.value > 0 ? +el.value - 1 : 0;
        paySeniorAmount.innerText = el.value;
    });
    ticketCounter();
    recordData();
}

function seniorPlus() {
    senior.forEach(el => {
        el.value = +el.value < 20 ? +el.value + 1 : 20;
        paySeniorAmount.innerText = el.value;
    });
    ticketCounter();
    recordData();
}


btnBasicMinus.forEach(btn => {
    btn.addEventListener('click', basicMinus);
});

btnBasicPlus.forEach(btn => {
    btn.addEventListener('click', basicPlus);
});

btnSeniorMinus.forEach(btn => {
    btn.addEventListener('click', seniorMinus);
});

btnSeniorPlus.forEach(btn => {
    btn.addEventListener('click', seniorPlus);
});



//local storage

function recordData() {
    localStorage.setItem('basicAmount', basicAmount);
    localStorage.setItem('seniorAmount', seniorAmount);
    localStorage.setItem('sum', sum);
    localStorage.setItem('currentType', currentType);
}


function getData() {
  if (localStorage.getItem('basicAmount') || localStorage.getItem('seniorAmount')) {
        basicAmount = localStorage.getItem('basicAmount');
        seniorAmount = localStorage.getItem('seniorAmount');
        currentType = localStorage.getItem('currentType');
        sum = localStorage.getItem('sum');
        payBasicAmount.innerText = basicAmount;
        paySeniorAmount.innerText = seniorAmount;
        basic.forEach(el => {
            el.value = basicAmount;
        })
        senior.forEach(el => {
            el.value = seniorAmount;
        })
        total.forEach(el => {
            el.innerHTML = sum;
        });
        ticketTypeInputs.forEach(el => {
            if (el.value === currentType) {
                el.setAttribute('checked', 'checked')
            }
        })
        payType.innerText = currentType;
        selectedItem.innerHTML = currentType;
    } else {
        ticketTypeInputs[0].setAttribute('checked', 'checked');
    }
    changePrices();
}