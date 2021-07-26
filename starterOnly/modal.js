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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
document.getElementById('close').addEventListener('click', function() {
  modalbg.style.display = 'none';
});



// const minLength = 2;

// function stringLength(inputText, errorMessage) {
  // if(inputText < minLength) {
  //   errorMessage.innerHTML = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
  //   e.preventDefault();
//   }
// }

let reserveForm = document.getElementById('reserveForm');

reserveForm.addEventListener('submit', function(e) {
  console.log('ok')
  let firstNameInput = document.getElementById('first-name');
  // let lastNameInput = document.getElementById('last-name');
  let nameMessageError = document.getElementsByClassName('name');
  // stringLength(firstNameInput, nameMessageError);
  // stringLength(lastNameInput, nameMessageError);
  if(firstNameInput < '2') {
    console.log('Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    // e.preventDefault();
  }
})




