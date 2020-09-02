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

const popupClasses = {
  popupOpened: 'popup_is-opened',
}
const places = document.querySelector('.places-list');
const editPopup = document.getElementById('editPopup');
const openEditButton = document.querySelector('.user-info__edit-button');
const editButton = document.getElementById('editButton');
const closeEditFormButton = document.getElementById('editClose');
const addPopup = document.getElementById('addPopup');
const openAddButton = document.querySelector('.user-info__add-button');
const addButton = document.getElementById('addButton');
const closeAddFormButton = document.getElementById('addClose');
const imagePopup = document.getElementById('imagePopup');
const forms = [...document.forms];
const addForm = document.forms.add;
const editForm = document.forms.edit;
const popups = [...document.querySelectorAll('.popup')];

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
  card.addEventListener('click', likeCard);
  card.addEventListener('click', deleteCard);
  card.addEventListener('click', openImage);
  return card;
}

function addCard(event){
  event.preventDefault();
  const place = addForm.elements.name;
  const picture = addForm.elements.link;
  const card = createCard(place.value, picture.value);
  places.appendChild(card);
  addForm.reset();
  addPopup.classList.remove(popupClasses.popupOpened);
}

function openAddForm(){
  const nameInput = addForm.querySelector('.popup__input_type_name');
  const urlInput = addForm.querySelector('.popup__input_type_link-url');
  const placeError = document.getElementById('placeError');
  const pictureError = document.getElementById('pictureError');
  addPopup.classList.add(popupClasses.popupOpened);
  addButton.setAttribute('disabled', true);
  placeError.textContent = '';
  pictureError.textContent = '';
  nameInput.value = '';
  urlInput.value = '';
}

function openEditForm(){
  const currentName = document.querySelector('.user-info__name').textContent;
  const currentAbout = document.querySelector('.user-info__job').textContent;
  const name = editForm.elements.name;
  const about = editForm.elements.about;
  const nameError = document.getElementById('nameError');
  const aboutError = document.getElementById('aboutError');
  editPopup.classList.add(popupClasses.popupOpened);
  nameError.textContent = '';
  aboutError.textContent = '';
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
  editPopup.classList.remove(popupClasses.popupOpened);
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
    const imageAddress = event.target.style.backgroundImage;
    const imageBox = imagePopup.children[0]; //fix
    const image = imageBox.children[0]; //fix
    imagePopup.classList.add(popupClasses.popupOpened);
    imageBox.style.backgroundImage = imageAddress;
    image.src = imageAddress.slice(5, -2);
  }
}

function closePopup(event){
  if(event.target.id === event.target.id.split('Close')[0] + 'Close'){
    const popup = event.target.closest('.popup');
    popup.classList.remove(popupClasses.popupOpened);
  }
}

function checkInputValidity(element, errorMessage = ''){
  if(element.value.match(/\S/g) === null){
    errorMessage.textContent = errorMessages.required;
    element.setAttribute('style', 'border-bottom-color: red;');
    
  }

  else if(element.name === 'link'){  //url required
    const img = new Image();
    try{
      const url = new URL(element.value);
      img.src = url.href;
      img.onerror = function(){
        errorMessage.textContent = errorMessages.requiredLink;
        element.setAttribute('style', 'border-bottom-color: red;');
        }
      img.onload = function(){
        errorMessage.textContent = '';
        element.removeAttribute('style', 'border-bottom-color: red;');
      }
  } catch(error){
    errorMessage.textContent = errorMessages.requiredLink;
    element.setAttribute('style', 'border-bottom-color: red;');
    }
  }

  else if((element.value.match(/\S/g).length < 2) || (element.value.match(/\S/g).length > 30)){
    errorMessage.textContent = errorMessages.fromTo;
    element.setAttribute('style', 'border-bottom-color: red');
  }

  else{
    errorMessage.textContent = '';
    element.removeAttribute('style', 'border-bottom-color: red;');
  }
}

function setSubmitButtonState(button, inputs){
  let isDisabled = undefined;
  for(let i = 0; i < inputs.length; i++){
    if(inputs[i].name === 'link'){
      const img = new Image();
      try{
        const url = new URL(inputs[i].value);
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

    else if ((inputs[i].value.match(/\S/g) === null) || (inputs[i].value.match(/\S/g).length < 2) || (inputs[i].value.match(/\S/g).length > 30)){
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

function checkFormInputs(form){
  const inputs = form.querySelectorAll('.popup__input');
  const errors = form.querySelectorAll('.popup__error');
  const button = form.querySelector('.popup__button');
  setSubmitButtonState(button, inputs);
  for(let i = 0; i < inputs.length; i++){
    checkInputValidity(inputs[i], errors[i]);
  }
}

for(let i = 0; i < initialCards.length; i++){
    const card = createCard(initialCards[i].name, initialCards[i].link);
    places.appendChild(card);
}
forms.forEach(form =>{
  form.addEventListener('input', () => checkFormInputs(form));
})
popups.forEach(popup => {
  popup.addEventListener('click', closePopup);
})
openAddButton.addEventListener('click', openAddForm);
openEditButton.addEventListener('click', openEditForm);
addForm.addEventListener('submit', addCard);
editForm.addEventListener('submit', editAuthor);