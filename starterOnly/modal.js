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
const modalBody = document.getElementsByClassName('modal-body');
const validateMessage = document.getElementById("validate-message");
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

birthDate.min = getDateLimit(100);
birthDate.max = getDateLimit(18);

function dateValidateOnChange() {
  birthDate.onchange = function dateValidate() {
    if (!birthDate.checkValidity()) {
      birthDateError.innerHTML = `Veuillez entrez une date de naissance valide`;
      return false;
    } else {
      birthDateError.innerHTML = '';
      return true;
    }  
  }
}

dateValidateOnChange();

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

window.addEventListener('click', function(e) {
  if (e.target == modalbg) {
    modalbg.style.display = 'none';
  }
})

// Check names input
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
      return false;
    } else if (regexEmail.test(input.value)) {
      errorMessage.innerHTML = '';
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
/**
 * permet de savoir si un bouton radio est coché
 *
 * @return  {Boolean}  vrai si un bouton radio est coché sinon faux
 */
 function validateLocation(){
 
  const list = document.querySelectorAll("input[type='radio']");
  list.onchange = function locationChecked() {
    for (let i = 0; i < list.length; i++) {
      if(list[i].checked) {
        locationError.innerHTML = '';
        return true;
      } else {
        locationError.innerHTML = 'Veuillez sélectionner une ville';
        return false;
      }
    }  
  }
} 


validateLocation();

// check CGV
function acceptCgv() {
  if (!checkCgv.checked) {
    checkCgvError.innerHTML = '<p>Vous devez accepter les conditions générales</p>';
    return false;
  } else if (checkCgv.checked) {
    checkCgvError.innerHTML = '';
    return true;
  }
} 


acceptCgv();



reserveForm.addEventListener("submit", function validate(e) {
  console.log('validate');
  e.preventdefault();
  e.stopPropagation();
  if (stringLengthOnChange(firstName, firstNameError)
    || stringLengthOnChange(lastName, lastNameError)
    || validateEmailOnChange(email, emailError)
    || validateQuantityOnChange(quantity, quantityError)
    || validateLocation()
    || acceptCgv()
    || dateValidateOnChange()
  ) {
    modalBody.innerHTML = `<p>Nous vous remercions pour votre participation !</p>`;
    return true;
  } else {
    return false;
  }
});

function getDateLimit(gap){
  const targetDate = new Date(Date.now());
  targetDate.setFullYear(targetDate.getFullYear()-gap);
  const day = targetDate.getDate();
  const month = targetDate.getMonth();

  return `${targetDate.getFullYear()}-${month >9 ? month : "0"+month}-${day >9 ? day : "0"+day}`;
}