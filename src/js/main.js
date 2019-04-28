const axios = require('axios');

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



function addTodoStatusChangeListener() {
    const checkButton = document.getElementById('done_button1');
    let checkButtonState = 'undone';
    let taskId = 1;
  

    function imageChange(id) {
        if (checkButtonState === 'undone') {
            checkButton.src = '../public/img/done.png';
            checkButtonState = 'done';
        } else {
            checkButton.src = '../public/img/do.png';
            checkButtonState = 'undone'
        }
        updateTaskStatus(id, checkButtonState === 'done');
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
        checkButton.addEventListener('click', () => imageChange(taskId));
    }


// const button = document.querySelector('.add_b');
// const form = document.querySelector('.add_form');
// const formButtonB = document.querySelector('.back');
// const formButtonS = document.querySelector('.save');

// button.addEventListener('click', function (event) {

//     event.preventDefault();

//     form.style.display = 'flex';

// });

// formButtonB.addEventListener('click', function (event) {

//     event.preventDefault();

//     form.style.display = 'none';

// });

// formButtonS.addEventListener('click', function (event) {

//     event.preventDefault();

//     form.style.display = 'none';


// });

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
    url:`http://localhost:3000/api/tasks?token=${localStorage.Id_token}`,
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
            newTagSpan.innerHTML = response.data[i].name;

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



function setCategory (cat) {
  
axios({
    method:'get',
    url:`http://localhost:3000/api/tasks/category?category=${cat}&token=${localStorage.Id_token}`,
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
            newTagSpan.innerHTML = response.data[i].name;

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

function getUserLoginInputData() {

    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    return {
        email: email,
        password: password,
    };

}

function getUserRegisterInputData() {

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

function register(e) {
    e.preventDefault();
    const userInputData = getUserRegisterInputData();

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

    console.log(otherParam);
    axios.post("http://localhost:3000/api/register", registrationBody)
    .then(res => {
        console.log("Registration successful!")
    })
    .catch(error => {
        console.log(error)
    })
    // fetch("http://localhost:3000/api/register", otherParam)
    //     .then(res => {
    //         console.log("Registration successful!")
    //     }).catch(error => {
    //         console.log(error)
    //     })
  
    document.location.href = 'index.html';
}


function login(e) {
    e.preventDefault();
    const userInputData = getUserLoginInputData();

    const loginBody = {
        email: userInputData.email,
        password: userInputData.password
    }

    // const otherParam = {
    //     headers: {
    //         "content-type": "application/json; charset=UTF-8"
    //     },
    //     body: loginBody,
    //     method: "POST",
    // }
    axios.post("http://localhost:3000/api/login", loginBody)
    .then(res => {
        console.log("Login successful!");
        console.log(res);
        localStorage.setItem("Id_token", res.data);
    })
    .catch(error => {
        console.log(error);
    })
    // fetch("http://localhost:3000/api/login", otherParam)
    //     .then(res => {
    //         console.log("Login successful!");
    //         console.log(res);
    //         localStorage.setItem("Id_token", res);
    //     }).catch(error => {
    //         console.log(error)
    //     })
  
    document.location.href = 'main.html';
}

//login page
window.onload = () => {
    if(document.querySelector('#sing_up_b')){
        const signUpButton = document.querySelector('#sing_up_b');

        signUpButton.addEventListener('click', ()=>{
            document.location.href = 'register.html';
        })
    };
    if(document.querySelector('#log_in_b2')){
        const loginButton = document.querySelector('#log_in_b2');

        loginButton.addEventListener('click', ()=>{
            document.location.href = 'index.html';
        });
    };

//seeyousoon page
    if(document.querySelector('#log_in_again_b')){
        const seeYouButton = document.querySelector('#log_in_again_b');
        //console.log(seeYouButton);

        seeYouButton.addEventListener('click', () => {
            document.location.href = 'index.html';
        })
    };

//tasks page
    if(document.querySelector('#log_out_b')){
        const logoutButton = document.querySelector('#log_out_b');

        function logout(){
            localStorage.removeItem('Id_token') 
            document.location.href = 'logout.html'
        }

        logoutButton.addEventListener('click', logout);
    };
};