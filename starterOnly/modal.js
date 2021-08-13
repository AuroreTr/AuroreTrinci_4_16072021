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
const modalBody = document.getElementById('modal-body');
const validateMessage = document.getElementById("validate-message");
const reserveForm = document.getElementById("reserveForm");
const birthDate = document.getElementById('birthdate');
const birthDateError = document.getElementById('birthdate-error');
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

window.addEventListener('click', function (e) {
  if (e.target == modalbg) {
    modalbg.style.display = 'none';
  }
})

// validate string length for the first name and the last name
function validStringLength(input, errorMessage) {
  // console.log("...",input, input.id, errorMessage)
  if (input.value.length < 2) {
    errorMessage.innerHTML = '<p>Veuillez entrer 2 caractères ou plus pour le champ du nom<p/>';
    // console.log('min 2');
    return false;
  }
  errorMessage.innerHTML = '';
  // console.log('nb of characters ok');
  return true;
}

// validate email
function validEmail(input, errorMessage) {

  const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!regexEmail.test(input.value) || input.value.length < 1) {
    errorMessage.innerHTML = `<p>Veuillez entrer une adresse email valide.</p>`;
    return false;
  } 
  errorMessage.innerHTML = '';
  return true;
}

// validate birth date
console.log(birthDate.value);
function validateBirthDate() {
  if (birthDate.value.length === 10) {
    birthDateError.innerHTML = '';
    return true;
  }
  birthDateError.innerHTML = '<p>Veuillez entrer une date de naissance valide</p>';
  return false;
}


// validate the number of participations in tournaments
function validateQuantity(input, errorMessage) {
  if (isNaN(input.value) || input.value < 0
    || input.value > 999 || input.value.length < 1) {
    errorMessage.innerHTML = '<p>Veuillez entrer un nombre compris entre 0 et 999</p>';
    return false;
  } else if (!isNaN(input.value) || input.value >= 0 || input.value <= 999) {
    errorMessage.innerHTML = '';
    return true;
  }
}

// check location input
function validateLocation() {
  if (
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
  locationError.innerHTML = '<p>Veuillez sélectionner une ville</p>';
  return false;
}

// check CGV
function acceptCgv() {
  if (!checkCgv.checked) {
    checkCgvError.innerHTML = '<p>Vous devez accepter les conditions générales</p>';
    return false;
  }
  checkCgvError.innerHTML = '';
  return true;
}

const inputList = document.querySelectorAll("input");
inputList.forEach(element => {
  const domError = document.getElementById(element.id + "-error");
  switch (element.type) {
    case "text":
      element.addEventListener("input", () => { validStringLength(element, domError) });
      break;
    case "email":
      element.addEventListener("input", () => { validEmail(element, domError) });
      break;
    case "date":
      element.addEventListener('input', () => { validateBirthDate(element, domError) });
      break;
    case'number':
      element.addEventListener('input', () => { validateQuantity(element, domError) });
      break;
    case 'radio':
      element.addEventListener('input', () => { validateLocation(element, domError) });
      break;
    case 'checkbox':
      element.addEventListener('input', () => { acceptCgv(element, domError) });
      break;
  }
});

document.getElementById('btn-submit').addEventListener('click', function (e) {
  // console.log('check2');
  e.preventDefault();
  let domError;
  let erreurs = 0;
  inputList.forEach(element => {
    domError = document.getElementById(element.id + "-error");
    switch (element.type) {
      case "text":
        if (!validStringLength(element, domError)) erreurs++;
        break;
      case "email":
        if (!validEmail(element, domError)) erreurs++;
        break;
      case "date":
        if(!validateBirthDate(element,  domError)) erreurs++;
        break;
      case "number":
        if (!validateQuantity(element, domError)) erreurs++;
        break;
      case "radio":
        if (!validateLocation(element,domError)) erreurs++;
        break;
      case 'checkbox':
        if (!acceptCgv(element, domError)) erreurs++;
        break;
    }
  });
  // console.log(birthDate.value);
  // console.log(birthDate.value.length);
  // console.log(erreurs);
  if (erreurs === 0) {
    modalBody.innerHTML = `<p></p><p id='validation-message'>Nous vous remercions pour votre participation !</p><input id='close2' class='close2' value='Fermer'>`;
    const closeValidateModal = document.getElementById('close2');
    const validationMessage = document.getElementById('validation-message');
    modalBody.style.height = '80vh';
    modalBody.style.display = 'flex';
    modalBody.style.flexDirection = 'column';
    modalBody.style.justifyContent = 'space-between';
    modalBody.style.alignItems = 'center';
    validationMessage.style.fontSize = '2rem';
    validationMessage.style.textAlign = 'center';
    validationMessage.style.width = '75%';
    closeValidateModal.style.textAlign = 'center';
    closeValidateModal.style.width = '180px';
    closeValidateModal.style.padding = '12px 0';

    //close modal form after submit 
    closeValidateModal.addEventListener("click", function () {
      modalbg.style.display = "none";
    });

    return true;
  }
  return false;
});
