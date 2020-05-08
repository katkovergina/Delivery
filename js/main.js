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




//второй день 

const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

//функция которая генерирует карточку 

function createCardRestaurant(restaurant) {

  const { 
    image,
    kitchen, 
    name, 
    price, 
    stars, 
    products, 
    time_of_delivery: timeOfDelivery
  } = restaurant;

    const card = `
        <a class="card card-restaurant" data-products="${products}">
          <img src="${image}" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title">${name}</h3>
              <span class="card-tag tag">${timeOfDelivery} мин</span>
            </div>
            <div class="card-info">
              <div class="rating">
                ${stars}
              </div>
              <div class="price">От ${price} ₽</div>
              <div class="category">${kitchen}</div>
            </div>
          </div>
        </a>
      `;

      cardsRestaurants.insertAdjacentHTML('beforeend', card);

}



function createCardGood(goods) {

  const {
    description,
    id,
    image,
    name,
    price
  } = goods;

  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
    
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
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
          <strong class="card-price-bold">${price} ₽</strong>
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

      getData(`./db/${restaurant.dataset.products}`).then(function(data) {
        data.forEach(createCardGood);
      });
      
   }

   
}


cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');

});

// day3 

// data base

const getData = async function(url) {
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error (`Error URL ${url}, status ${response.status}!`); 
  }

  return await response.json();

    
}; 



function init() {
  getData('./db/partners.json').then(function(data) {
    data.forEach(createCardRestaurant);
  });


  checkAuth();



}

init();



         


