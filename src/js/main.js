const axios = require('axios');

window.addEventListener('load', function() {
    const registerButton = document.getElementById('lets_notes_b');
    if (registerButton) {
        registerButton.addEventListener('click', (e) => register(e));
    }

    const loginButton = document.getElementById('log_in_b');

    if (loginButton) {
        loginButton.addEventListener('click', (e) => login(e));
    }
});


// **********************************pobieranie taskow******************
window.onload = () => {
    console.log('load');
    if (document.querySelector('.mainSite')) {
        allTasks();
        console.log('onload');
        const tasksList = document.querySelector('.tasksList')
        document.querySelector(`#work_b`).addEventListener('click', () => {
            tasksList.innerHTML = '';
            setCategory('work')
        })
        document.querySelector(`#home_b`).addEventListener('click', () => {
            tasksList.innerHTML = '';
            setCategory('home')
        })
        document.querySelector(`#personal_b`).addEventListener('click', () => {
            tasksList.innerHTML = '';
            setCategory('personal')
        })
        document.querySelector(`#all_tasks_b`).addEventListener('click', () => {
            tasksList.innerHTML = '';
            allTasks()
        })
    }

    //login page

    if (document.querySelector('#sing_up_b')) {
        const signUpButton = document.querySelector('#sing_up_b');

        signUpButton.addEventListener('click', () => {
            document.location.href = './public/register.html';
        })
    };
    if (document.querySelector('#log_in_b2')) {
        const loginButton = document.querySelector('#log_in_b2');

        loginButton.addEventListener('click', () => {
            document.location.href = '../index.html';
        });
    };

    //seeyousoon page
    if (document.querySelector('#log_in_again_b')) {
        const seeYouButton = document.querySelector('#log_in_again_b');
        //console.log(seeYouButton);

        seeYouButton.addEventListener('click', () => {
            document.location.href = '../index.html';
        })
    };

    //tasks page
    if (document.querySelector('#log_out_b')) {
        const logoutButton = document.querySelector('#log_out_b');

        function logout() {
            localStorage.removeItem('Id_token')
            document.location.href = './logout.html'
        }

        logoutButton.addEventListener('click', logout);
    };


    //add tasks

    const button = document.querySelector('.add_b');
    const form = document.querySelector('.add_form');
    const formButtonB = document.querySelector('.back');
    const formButtonS = document.querySelector('.save');

    if (button) {
        button.addEventListener('click', function(event) {

            event.preventDefault();

            form.style.display = 'flex';

        });
    }

    if (formButtonB) {
        formButtonB.addEventListener('click', function(event) {

            event.preventDefault();

            form.style.display = 'none';

        });
    }

    if (formButtonS) {
        formButtonS.addEventListener('click', function(event) {

            event.preventDefault();

            form.style.display = 'none';

            const add_select = document.querySelector(`.add_select`).value;
            const add_input = document.querySelector(`.add_input`).value;

            const task_data = {
                name: add_input,
                category: add_select,
            }
            axios.post(
                `https://obscure-cove-88913.herokuapp.com/api/tasks/?token=${localStorage.Id_token}`, task_data
            )

            .then(response => {
                console.log(response);
                document.querySelector(`.add_input`).value = '';
            })

            .then(response => {
                document.querySelector('.tasksList').innerHTML = '';
                allTasks();
            })
        });
    }
}

const allTasks = function() {
    axios({
            method: 'get',
            url: `https://obscure-cove-88913.herokuapp.com/api/tasks?token=${localStorage.Id_token}`,
            // responseType:'json',
        })
        .then(function(response) {
            for (let i = 0; i < response.data.length; i++) {
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

                const id = response.data[i]._id;
                const status = response.data[i].status;
                const imgDo = document.createElement('img');
                if (status === false) {
                    imgDo.setAttribute('class', `do`);
                    imgDo.setAttribute('src', "./img/do.png");
                    imgDo.addEventListener('click', () => updateTaskStatus(id, true));
                } else {
                    imgDo.setAttribute('class', `done`);
                    imgDo.setAttribute('src', "./img/done.png");
                    imgDo.addEventListener('click', () => updateTaskStatus(id, false));
                }
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



function setCategory(cat) {

    axios({
            method: 'get',
            url: `https://obscure-cove-88913.herokuapp.com/api/tasks/category?category=${cat}&token=${localStorage.Id_token}`,
        })
        .then(function(response) {
            for (let i = 0; i < response.data.length; i++) {
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

function reply_click(clicked_id) {
    axios.delete('https://obscure-cove-88913.herokuapp.com/api/tasks/', { params: { _id: `${clicked_id}` } });
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
    axios.post("https://obscure-cove-88913.herokuapp.com/api/register", registrationBody)
        .then(res => {
            console.log("Registration successful!")
        })
        .then(() => {
            document.location.href = '../index.html';
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
    axios.post("https://obscure-cove-88913.herokuapp.com/api/login", loginBody)
        .then(res => {
            console.log("Login successful!");
            console.log(res);
            localStorage.setItem("Id_token", res.data);
        })
        .then(() => {
            document.location.href = './public/main.html';
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

}


function updateTaskStatus(id, status) {
    const url = `https://obscure-cove-88913.herokuapp.com/api/tasks/status/${id}/?token=${localStorage.Id_token}`;
    const data = {
        status: status
    }
    axios.put(url, data)
        .then(resp => {
            const tasksList = document.querySelector('.tasksList');
            tasksList.innerHTML = '';
            allTasks();
        })
        .catch(err => {
            console.log(err);
        });
}
