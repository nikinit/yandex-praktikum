const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Нургуш',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
      name: 'Тулиновка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
      name: 'Остров Желтухина',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
      name: 'Владивосток',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
     }
  ];
const places = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const form = document.forms.new;
const openFormButton = document.querySelector('.user-info__button');
const addButton = document.querySelector('.popup__button');
const closeFormButton = document.querySelector('.popup__close');

function createCard(placeValue, pictureValue){
    const card = document.createElement('div');
    const cardImage = document.createElement('div');
    const deleteButton = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeButton = document.createElement('button');

    card.classList.add('place-card');

    cardImage.classList.add('place-card__image');
    cardImage.style.backgroundImage = `url(${pictureValue})`;
    deleteButton.classList.add('place-card__delete-icon');
    cardImage.appendChild(deleteButton);

    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = placeValue;
    likeButton.classList.add('place-card__like-icon');
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeButton);

    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    return card;
}

function addCard(event){
    event.preventDefault();
    const place = form.elements.name;
    const picture = form.elements.link;
    const card = createCard(place.value, picture.value);

    places.appendChild(card);
    form.reset();
    closeForm();
}
    
function inputHandler(event){
    const place = form.elements.name;
    const picture = form.elements.link;
    const img = new Image();
    let validatePlace;
    try{
        const url = new URL(picture.value);
        img.src = url.href;
        img.onerror = function(){
            addButton.setAttribute('disabled', true);
            picture.setAttribute('style', 'border-bottom-color: red;');
            validatePlace = false;
        }
        img.onload = function(){
            validatePlace = true;
        }
    } catch(error){
        validatePlace = false;
    }
    console.log(place.value.length, picture.value.length, validatePlace);
    if(place.value.length === 0 || picture.value.length === 0 || validatePlace === false){
        addButton.setAttribute('disabled', true);
        place.setAttribute('style', 'border-bottom-color: red;');
        picture.setAttribute('style', 'border-bottom-color: red;');
        if (place.value.length !== 0){
          place.removeAttribute('style', 'border-bottom-color: red;');
        }
        if (picture.value.length !== 0 && validatePlace !== false){
          picture.removeAttribute('style', 'border-bottom-color: red;');
        }

    }
    else{
        place.removeAttribute('style', 'border-bottom-color: red;');
        picture.removeAttribute('style', 'border-bottom-color: red;');
        addButton.removeAttribute('disabled');
    }
}


function openForm(event){
    popup.classList.add('popup_is-opened');
    addButton.setAttribute('disabled', true);
}

function closeForm(event){
    popup.classList.remove('popup_is-opened');
    form.reset();
}

function likeCard(event){
    if(event.target.classList.contains('place-card__like-icon')){
        event.target.classList.toggle('place-card__like-icon_liked');
    }
}

function deleteCard(event){
    const card = event.path[2];
    if(event.target.classList.contains('place-card__delete-icon')){
        places.removeChild(card);
    }
}

for(let i = 0; i < initialCards.length; i++){
    const card = createCard(initialCards[i].name, initialCards[i].link);
    places.appendChild(card);
}

openFormButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', closeForm);
places.addEventListener('click', likeCard);
places.addEventListener('click', deleteCard);
form.addEventListener('input', inputHandler);
form.addEventListener('submit', addCard);