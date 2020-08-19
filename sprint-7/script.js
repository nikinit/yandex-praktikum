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

const errorMessages = {
  required: 'Это обязательное поле',
  fromTo: 'Должно быть от 2 до 30 символов',
  requiredLink: 'Здесь должна быть ссылка'
};

const places = document.querySelector('.places-list');
const editForm = document.forms.edit;
const editPopup = document.getElementById('editPopup');
const openEditButton = document.querySelector('.user-info__edit-button');
const editButton = document.getElementById('editButton');
const closeEditFormButton = document.getElementById('editClose');
const addForm = document.forms.add;
const addPopup = document.getElementById('addPopup');
const openAddButton = document.querySelector('.user-info__add-button');
const addButton = document.getElementById('addButton');
const closeAddFormButton = document.getElementById('addClose');

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
    const place = addForm.elements.name;
    const picture = addForm.elements.link;
    const card = createCard(place.value, picture.value);

    places.appendChild(card);
    addForm.reset();
    closeAddForm();
}

function openAddForm(event){
  const placeError = document.getElementById('placeError');
  const pictureError = document.getElementById('pictureError');
  const place = addForm.elements.name;
  const picture = addForm.elements.link;
  addPopup.classList.add('popup_is-opened');
  addButton.setAttribute('disabled', true);
  placeError.textContent = '';
  pictureError.textContent = '';
  place.setAttribute('style', 'border-color: none');
  picture.setAttribute('style', 'border-color: none');
}

function closeAddForm(event){
    addPopup.classList.remove('popup_is-opened');
    addForm.reset();
}

function openEditForm(event){
  const currentName = document.querySelector('.user-info__name').textContent;
  const currentAbout = document.querySelector('.user-info__job').textContent;
  const name = editForm.elements.name;
  const about = editForm.elements.about;
  const nameError = document.getElementById('nameError');
  const aboutError = document.getElementById('aboutError');
  editPopup.classList.add('popup_is-opened');
  name.setAttribute('style', 'border-botom-color: none');
  about.setAttribute('style', 'border-botom-color: none');
  nameError.textContent = '';
  aboutError.textContent = '';
  editButton.setAttribute('disabled', true);
  name.value = currentName;
  about.value = currentAbout;
}

function editAuthor(event){
  event.preventDefault();
  const name = editForm.elements.name.value;
  const about = editForm.elements.about.value;
  const newName = document.querySelector('.user-info__name');
  const newAbout = document.querySelector('.user-info__job');
  newName.textContent = name;
  newAbout.textContent = about;
  closeEditForm();
}

function closeEditForm(event){
  editPopup.classList.remove('popup_is-opened');
  editForm.reset();
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

function openImage(event){
  if(event.target.classList.contains('place-card__image')){

    const popupBox = document.createElement('div');
    const imageBox = document.createElement('div');
    const image = document.createElement('img');
    const imageAddress = event.target.style.backgroundImage;
    const closeButton = document.createElement('div');

    popupBox.classList.add('popup', 'popup_is-opened');
    imageBox.style.background = imageAddress;
    imageBox.style.position = 'relative';
    imageBox.style.backgroundSize = 'cover';
    image.classList.add('place-card__image_popup');
    image.src = imageAddress.slice(5, -2);
    image.alt = 'cool image';
    closeButton.classList.add('popup__close');
    closeButton.id = 'imageClose';

    imageBox.appendChild(image);
    imageBox.appendChild(closeButton);
    popupBox.appendChild(imageBox);
    document.body.appendChild(popupBox);

    popupBox.addEventListener('click', closeImage);
  }
  


}

function closeImage(event){
  if(event.target.id === 'imageClose'){
    const popupBox = document.querySelector('.popup_is-opened');
    document.body.removeChild(popupBox);
  }
}

function checkInputValidity(element, errorMessage = ''){

  if(element.value.match(/\S/g) === null){
    errorMessage.textContent = errorMessages.required;
    element.setAttribute('style', 'border-bottom-color: red;');
    if(element.name === 'name'){
      element.setAttribute('style', 'margin-bottom: 0;');
    }
  }

  else if(element.name === 'link'){  //url required
    const img = new Image();
    try{
      const url = new URL(element.value);
      img.src = url.href;
      img.onerror = function(){
        element.setAttribute('style', 'border-bottom-color: red;');
        errorMessage.textContent = errorMessages.requiredLink;
        }
      img.onload = function(){
        errorMessage.textContent = '';
        element.removeAttribute('style', 'border-bottom-color: red;');
      }
  } catch(error){
    errorMessage.textContent = errorMessages.requiredLink;
    }
  }

  else if((element.value.match(/\S/g).length < 2) || (element.value.match(/\S/g).length > 30)){
    errorMessage.textContent = errorMessages.fromTo;
    element.setAttribute('style', 'border-bottom-color: red; margin-bottom: 0');
  }

  else{
    errorMessage.textContent = '';
    element.removeAttribute('style', 'border-bottom-color: red;');
    
  }
}

function setSubmitButtonState(button, ...theFields){
  let isDisabled = undefined;
  for(let i = 0; i < theFields.length; i++){
    if(theFields[i].name === 'link'){
      const img = new Image();
      try{
        const url = new URL(theFields[i].value);
        img.src = url.href;
        img.onerror = function(){
          isDisabled = true;
          button.setAttribute('disabled', isDisabled);
          }
        img.onload = function(){
          isDisabled = false;
        }
    } catch(error){
        isDisabled = true;
        button.setAttribute('disabled', isDisabled);
        }
    }
    else if ((theFields[i].value.match(/\S/g) === null) || (theFields[i].value.match(/\S/g).length < 2) || (theFields[i].value.match(/\S/g).length > 30)){
      isDisabled = true;
      button.setAttribute('disabled', isDisabled);
      
    }
    else{
      if(isDisabled === true){
        button.setAttribute('disabled', isDisabled);
      }
      else{
        button.removeAttribute('disabled');
      }
    }
  }
}

function setEventListeners(event){
  const name = editForm.elements.name; //element
  const nameError = document.getElementById('nameError'); //errorMessage
  const about = editForm.elements.about;
  const aboutError = document.getElementById('aboutError');
  const place = addForm.elements.name;
  const placeError = document.getElementById('placeError');
  const picture = addForm.elements.link;
  const pictureError = document.getElementById('pictureError');
  setSubmitButtonState(editButton, name, about);
  checkInputValidity(name, nameError);
  checkInputValidity(about, aboutError);
  setSubmitButtonState(addButton, place, picture);
  checkInputValidity(place, placeError);
  checkInputValidity(picture, pictureError);
}

for(let i = 0; i < initialCards.length; i++){
    const card = createCard(initialCards[i].name, initialCards[i].link);
    places.appendChild(card);
}

openAddButton.addEventListener('click', openAddForm);
addForm.addEventListener('input', setEventListeners);
addForm.addEventListener('submit', addCard);
closeAddFormButton.addEventListener('click', closeAddForm);
openEditButton.addEventListener('click', openEditForm);
editForm.addEventListener('submit', editAuthor);
editForm.addEventListener('input', setEventListeners);
closeEditFormButton.addEventListener('click', closeEditForm);
places.addEventListener('click', likeCard);
places.addEventListener('click', deleteCard);
places.addEventListener('click', openImage);