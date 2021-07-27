function editNav() {
  var topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const firstName = document.getElementById("first-name");
const firstNameError = document.getElementById("first-name-error");
const firstNameText = 'prénom';
const lastName = document.getElementById('last-name');
const lastNameError = document.getElementById('last-name-error');
const lastNameText = 'nom';
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const birthDate = document.getElementById('birthdate');
const birthDateError = document.getElementById('birthdate-error');
const quantity = document.getElementById('quantity');
const quantityError = document.getElementById('quantity-error');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
document.getElementById("close").addEventListener("click", function () {
  modalbg.style.display = "none";
});

// Check names input
function stringLength(inputName, inputValue, errorMessage) {
  if (inputValue.length == 1) {
    errorMessage.innerHTML = '<p>Veuillez entrer 2 caractères ou plus pour le champ du nom<p/>';
    return true;
  } else if (inputValue.length == 0) {
    errorMessage.innerHTML = `<p>Veuillez entrer votre ${inputName}</p>`;
    return true;
  }
}

// check email address input
function validateEmail(inputValue, errorMessage) {
  const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!regexEmail.test(inputValue)) {
    errorMessage.innerHTML = `<p>Veuillez entrer une adresse email valide.</p>`;
    return true;
  }
}

// check date format
function validateBirthDate(inputValue, errorMessage) {
  const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!regexDate.test(inputValue)) {
    errorMessage.innerHTML = `<p>La date doit correspondre au format JJ/MM/AAAA</p>`;
    return true;
  }
}

// check quantity is a number
function validateQuantity(inputValue, errorMessage) {
  if (isNaN(inputValue) || inputValue < 0 || inputValue > 999) {
    errorMessage.innerHTML = '<p>Veuillez entrer un nombre compris entre 0 et 999</p>';
    return true;
  }
}

// check location input
function validateLocation() {
  if (
    !document.getElementById('newYorkLocation').checked
    && !document.getElementById('sanFranciscoLocation').checked
    && !document.getElementById('seattleLocation').checked
    && !document.getElementById('chicagoLocation').checked
    && !document.getElementById('bostonLocation').checked
    && !document.getElementById('portlandLocation').checked
  ) {
    const locationError = document.getElementById('location-error');
    locationError.innerHTML = '<p>Veuillez sélectionner une ville</p>';
    return true;
  }
}

const reserveForm = document.getElementById("reserveForm");

reserveForm.addEventListener("submit", function validate(e) {

  console.log("ok");

  const firstNameInput = firstName.value;
  stringLength(firstNameText, firstNameInput, firstNameError);

  const lastNameInput = lastName.value;
  stringLength(lastNameText, lastNameInput, lastNameError);

  const emailInput = email.value;
  validateEmail(emailInput, emailError);

  const birthDateInput = birthDate.value;
  validateBirthDate(birthDateInput,birthDateError);

  const quantityInput = quantity.value;
  validateQuantity(quantityInput, quantityError);

  validateLocation();

  if (
    stringLength(firstName, firstNameInput, firstNameError)
    || stringLength(lastName, lastNameInput, lastNameError)
    || validateEmail(emailInput, emailError)
    || validateBirthDate(birthDateInput,birthDateError)
    || validateQuantity(quantityInput, quantityError)
    || validateLocation()
  ) {
    e.preventDefault();
  }
});


