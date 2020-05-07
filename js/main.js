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

'use strict';

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


//второй день 

const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

//функция которая генерирует карточку 

function createCardRestaurant() {
    const card = `
        <a class="card card-restaurant">
          <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title">Пицца плюс</h3>
              <span class="card-tag tag">50 мин</span>
            </div>
            <div class="card-info">
              <div class="rating">
                4.5
              </div>
              <div class="price">От 900 ₽</div>
              <div class="category">Пицца</div>
            </div>
          </div>
        </a>
      `;

      cardsRestaurants.insertAdjacentHTML('beforeend', card);

}

createCardRestaurant();

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
    
      <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Везувий</h3>
        </div>
  
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
            «Халапенье», соус «Тобаско», томаты.
          </div>
        </div>
    
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">545 ₽</strong>
        </div>
      </div>
     
  `);

  cardsMenu.insertAdjacentElement('beforeend' ,card);

  

}

function openGoods(event) { 
   const target = event.target;
   const restaurant = target.closest('.card-restaurant');

   if (restaurant) {

      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      

      createCardGood();
      createCardGood();
      createCardGood();
   }

   
}


cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');

});




         


