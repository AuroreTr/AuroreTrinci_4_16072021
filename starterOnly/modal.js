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
const reserveForm = document.getElementById("reserveForm");
const formData = document.querySelectorAll(".formData");
const firstName = document.getElementById("first-name");
const firstNameError = document.getElementById("first-name-error");
const lastName = document.getElementById('last-name');
const lastNameError = document.getElementById('last-name-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const birthDate = document.getElementById('birthdate');
const birthDateError = document.getElementById('birthdate-error');
const quantity = document.getElementById('quantity');
const quantityError = document.getElementById('quantity-error');
const locationError = document.getElementById('location-error');
const checkCgv = document.getElementById('checkCgv');
const checkCgvError = document.getElementById('checkCgv-error');

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
console.log('namevalidate');

function stringLengthOnChange(input, errorMessage) {
  input.onchange = function stringLength() {
    if (input.value.length < 2) {
      errorMessage.innerHTML = '<p>Veuillez entrer 2 caractères ou plus pour le champ du nom<p/>';
      // console.log('min 2');
      return false;
    } else {
      errorMessage.innerHTML = '';
      // console.log('nb of characters ok');
      return true;
    }
  }  
}

stringLengthOnChange(firstName, firstNameError);
stringLengthOnChange(lastName, lastNameError);

// check email address input
function validateEmailOnChange(input, errorMessage) {
  input.onchange = function validateEmail() {
    const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if (!regexEmail.test(input.value)) {
      errorMessage.innerHTML = `<p>Veuillez entrer une adresse email valide.</p>`;
      console.log('email incorrect');
      return false;
    } else if (regexEmail.test(input.value)) {
      errorMessage.innerHTML = '';
      console.log('email ok');
      return true;
    }
  }
}

validateEmailOnChange(email, emailError);


// check quantity is a number
function validateQuantityOnChange(input, errorMessage) {
  input.onchange = function validateQuantity() {
    if (isNaN(input.value) || input.value < 0 || input.value > 999) {
      errorMessage.innerHTML = '<p>Veuillez entrer un nombre compris entre 0 et 999</p>';
      return false;
    } else if (!isNaN(input.value) || input.value >= 0 || input.value <= 999) {
      errorMessage.innerHTML = '';
      return true;
    }
  }
}

validateQuantityOnChange(quantity, quantityError);

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
    locationError.innerHTML = '<p>Veuillez sélectionner une ville</p>';
    return false;
  } else if (
    document.getElementById('newYorkLocation').checked
    || document.getElementById('sanFranciscoLocation').checked
    || document.getElementById('seattleLocation').checked
    || document.getElementById('chicagoLocation').checked
    || document.getElementById('bostonLocation').checked
    || document.getElementById('portlandLocation').checked
  ) {
    locationError.innerHTML = '';
    return true;
  }
}

validateLocation();

// check CGV
function acceptCgvOnChange() {
  checkCgv.onchange = function acceptCgv() {
    if (!checkCgv.checked) {
      checkCgvError.innerHTML = '<p>Vous devez accepter les conditions générales</p>';
      return false;
    } else if (checkCgv.checked) {
      checkCgvError.innerHTML = '';
      return true;
    }
  } 
}

reserveForm.addEventListener("submit", function validate(e) {
  if (
    !stringLengthOnChange(firstName, firstNameError)
    || !stringLengthOnChange(lastName, lastNameError)
    || !validateEmailOnChange(email, emailError)
    || !validateQuantityOnChange(quantity, quantityError)
    || !validateLocation()
  ) {
    e.preventDefault();
  } else if (
    stringLengthOnChange(firstName, firstNameError)
    && stringLengthOnChange(lastName, lastNameError)
    && validateEmailOnChange(email, emailError)
    && validateQuantityOnChange(quantity, quantityError)
    && validateLocation()
  ) {
    console.log('validé');
  }
});