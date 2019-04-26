import {test} from './example';

test();

const checkButton = document.getElementsByClassName(`do`)[0];
let checkButtonState = 'undone';

function imageChange() {
    if (checkButtonState === 'undone'){
        checkButton.src = '../public/img/done.png';
        checkButtonState = 'done';
    } else {
        checkButton.src = '../public/img/do.png';
        checkButtonState = 'undone'
    }
    updateTaskStatus(1, checkButtonState === 'done');
};

function updateTaskStatus(id, status) {
    fetch(`http://localhost:3000/api/tasks/status/${id}/`, { 
        method: "PUT",
        body: {
            done: status,
        },
    })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
        });
}

checkButton.addEventListener('click', imageChange);