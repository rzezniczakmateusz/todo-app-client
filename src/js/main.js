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

function getUserInputData() {

    const name = document.querySelector(".name").value;
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;
    const confirmPassword = document.querySelector('.confirmPassword').value;

    return {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

}

function register() {
    const userInputData = getUserInputData();

    if (userInputData.password !== userInputData.confirmPassword) {
        console.log("Passwords don't match, please try again!")
    }

    const registrationBody = {
        name: userInputData.name,
        email: userInputData.email,
        password: userInputData.password,

    }

    const otherParam = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: registrationBody,
        method: "POST",
    };


    fetch("/api/register", otherParam)
        .then(res => {
            console.log("Registration successful!")
        }).catch(error => {
            console.log(error)
        })
}

const registerButton = document.getElementById('lets_notes_b');
registerButton.addEventListener('click', (e) => register(e));

function login() {
    const userInputData = getUserInputData();

    const loginBody = {
        email: userInputData.email,
        password: userInputData.password
    }

    const otherParam = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: loginBody,
        method: "POST",
    }

    fetch("/api/login", otherParam)
        .then(res => {
            console.log("Login successful!");
            console.log(res);
            localStorage.setItem("Id_token", res);
        }).catch(error => {
            console.log(error)
        })

}

const loginButton = document.getElementById('log_in_b');
loginButton.addEventListener('click', (e) => login(e));