import {test} from './example';

test();


const checkButton = document.getElementsByClassName(`do`);
let checkButtonState = 'done';

function zmianaObrazka() {
    if(checkButtonState = 'done'){
        checkButton.style.src = '../public/img/done.png';
        checkButtonState = 'done';
    }else{
        checkButton.style.src = '../public/img/do.png';
        checkButtonState = 'undone'
    };
};

checkButton.addEventListener('mouseup', zmianaObrazka);