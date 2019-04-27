const checkButton = document.getElementsByClassName(`do`)[0];
let checkButtonState = 'undone';

function imageChange() {
    if (checkButtonState === 'undone') {
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

/*function deleteTask(id) {
    fetch(`http://localhost:3000/api/tasks/status/${id}/`, {
        method: "DELETE",
    })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
        });
}

const checkButton = document.querySelector('.bin_b');
checkButton.addEventListener('click', deleteTask);*/

const button = document.querySelector('.add_b');
const form = document.querySelector('.add_form');
const formButtonB = document.querySelector('.back');
const formButtonS = document.querySelector('.save');

button.addEventListener('click', function (event) {
  
    event.preventDefault();
        
    form.style.display = 'flex';
    
});

formButtonB.addEventListener('click', function (event) {

    event.preventDefault();

    form.style.display = 'none';

});

formButtonS.addEventListener('click', function (event) {

    event.preventDefault();

    form.style.display = 'none';

});