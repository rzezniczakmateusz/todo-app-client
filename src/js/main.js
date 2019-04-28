window.addEventListener('load', function () {
    const registerButton = document.getElementById('lets_notes_b');
    if (registerButton) {
        registerButton.addEventListener('click', (e) => register(e));
    }
    const loginButton = document.getElementById('log_in_b');

    if (loginButton) {
        loginButton.addEventListener('click', (e) => login(e));
    }
})


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

// **********************************pobieranie taskow******************
window.onload = () => {
    if(document.querySelector('.mainSite')) {
        allTasks();

        const tasksList = document.querySelector('.tasksList')
        document.querySelector(`#work_b`).addEventListener('click', () => {tasksList.innerHTML=''; setCategory('work')})
        document.querySelector(`#home_b`).addEventListener('click', () => {tasksList.innerHTML=''; setCategory('home')})
        document.querySelector(`#personal_b`).addEventListener('click', () => {tasksList.innerHTML=''; setCategory('personal')})
        document.querySelector(`#all_tasks_b`).addEventListener('click', () => {tasksList.innerHTML=''; allTasks()})
    }
}

const allTasks = function () {
axios({
    method:'get',
    url:'http://localhost:3000/api/tasks',
    // responseType:'json',
  })
    .then(function(response) {
        for (let i = 0; i<response.data.length;i++){
            const newParagraph = document.createElement('li');
            newParagraph.setAttribute("id", `task${i}`);
            newParagraph.setAttribute("class", `${response.data[i].category}`);
            document.querySelector('.tasksList').appendChild(newParagraph);

            const newTagA = document.createElement('a')
            document.querySelector(`#task${i}`).appendChild(newTagA);

            const newTagSpan = document.createElement('span')
            document.querySelector(`#task${i}`).firstElementChild.appendChild(newTagSpan);
            newTagSpan.innerHTML = response.data[i].describe;

            const firstTagButton = document.createElement('button')
            document.querySelector(`#task${i}`).appendChild(firstTagButton);

            const imgDo = document.createElement('img');
            imgDo.setAttribute('class', `do`);
            imgDo.setAttribute('src', "./img/do.png")
            document.querySelector(`#task${i}`).querySelector('button').appendChild(imgDo);

            const secondTagButton = document.createElement('button')
            document.querySelector(`#task${i}`).appendChild(secondTagButton);

            const imgBin = document.createElement('img');
            imgBin.setAttribute('class', `bin`);
            imgBin.setAttribute('src', "./img/bin.png")
            document.querySelector(`#task${i}`).lastElementChild.appendChild(imgBin);
            document.querySelector(`#task${i}`).lastElementChild.querySelector('img').addEventListener('click', () => {
                reply_click(`${response.data[i]._id}`);
                document.querySelector(`#task${i}`).parentNode.removeChild(document.querySelector(`#task${i}`));
            })
        }
  });
}



async function setCategory (cat) {
  
axios({
    method:'get',
    url:`http://localhost:3000/api/tasks/category?category=${cat}`,
  })
    .then(function(response) {
        for (let i = 0; i<response.data.length;i++){
            const newParagraph = document.createElement('li');
            newParagraph.setAttribute("id", `task${i}`);
            newParagraph.setAttribute("class", `${response.data[i].category}`);
            document.querySelector('.tasksList').appendChild(newParagraph);

            const newTagA = document.createElement('a')
            document.querySelector(`#task${i}`).appendChild(newTagA);

            const newTagSpan = document.createElement('span')
            document.querySelector(`#task${i}`).firstElementChild.appendChild(newTagSpan);
            newTagSpan.innerHTML = response.data[i].describe;

            const firstTagButton = document.createElement('button')
            document.querySelector(`#task${i}`).appendChild(firstTagButton);

            const imgDo = document.createElement('img');
            imgDo.setAttribute('class', `do`);
            imgDo.setAttribute('src', "./img/do.png")
            document.querySelector(`#task${i}`).querySelector('button').appendChild(imgDo);

            const secondTagButton = document.createElement('button')
            document.querySelector(`#task${i}`).appendChild(secondTagButton);

            const imgBin = document.createElement('img');
            imgBin.setAttribute('class', `bin`);
            imgBin.setAttribute('src', "./img/bin.png")
            document.querySelector(`#task${i}`).lastElementChild.appendChild(imgBin);
            document.querySelector(`#task${i}`).lastElementChild.querySelector('img').addEventListener('click', () => {
                reply_click(`${response.data[i]._id}`);
                document.querySelector(`#task${i}`).parentNode.removeChild(document.querySelector(`#task${i}`));
            })
        }
  });
}

function reply_click(clicked_id)
{
  axios.delete('http://localhost:3000/api/tasks/', { params: { _id: `${clicked_id}` } });
}

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
