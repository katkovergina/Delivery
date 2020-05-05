// const cartButton = document.querySelector("#cart-button");
// const modal = document.querySelector(".modal");
// const closeBtn = document.querySelector(".close");

// cartButton.addEventListener("click", toggleModal);
// closeBtn.addEventListener("click", toggleModal);

// function toggleModal() {
//   modal.classList.toggle("is-open");
// }


//день 1

//авторизация 


const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const buttonLogIn = document.querySelector('.button-login');
//передаем сохранненый логин чрез ключ(очевидно, что в localstorage сохраняется по типу объекта - ключ-значение)
let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
}

function authorized() {

  function logOut() {
    login = '';
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }
  console.log('авторизован');
  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);

}

function notAuthorized() {
    console.log('не авторизован');

    function logIn(event) {
        event.preventDefault();

        if (loginInput.value) {
          login = loginInput.value;
        //записываем введеные данные, чтобы при перезагрузке данные со тсраницы не стирались 
        localStorage.setItem('gloDelivery', login);

        toggleModalAuth();
        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);
        logInForm.reset();
        checkAuth();
        } else 
        {
          loginInput.style.borderColor = 'red';
        }

        

        
      
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);


    

}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();
console.log(loginInput.value);