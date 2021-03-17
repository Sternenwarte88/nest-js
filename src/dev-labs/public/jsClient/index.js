/* ------------------------------- Newsletter ------------------------------- */

window.REQUIRED_CODE_ERROR_MESSAGE =
	'Wählen Sie bitte einen Ländervorwahl aus.';

window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
	'Die eingegebenen Informationen sind nicht gültig. Bitte überprüfen Sie das Feldformat und versuchen Sie es erneut.';

window.REQUIRED_ERROR_MESSAGE = 'Dieses Feld darf nicht leer sein. ';

window.GENERIC_INVALID_MESSAGE =
	'Die eingegebenen Informationen sind nicht gültig. Bitte überprüfen Sie das Feldformat und versuchen Sie es erneut.';

window.translation = {
  common: {
    selectedList: '{quantity} Liste ausgewählt',
    selectedLists: '{quantity} Listen ausgewählt'
  }
};

const AUTOHIDE = Boolean(0);

/* ----------------------------- Newslette Modal ---------------------------- */

const newsletterBox = document.querySelector('.newsletter_box');

const showNewsletter = () => {
  newsletterBox.classList.toggle('visible');
};

const modalHide = () => {
  newsletterBox.classList.remove('visible');
};

/* -------------------------------- Slideshow ------------------------------- */

let slideIndex = 1;
showSlides(slideIndex);

function pictureSwitch (amount) {
  showSlides((slideIndex += amount));
}

function currentSlide (amount) {
  showSlides((slideIndex = amount));
}

function showSlides (amount) {
  const slides = document.getElementsByClassName('preview_item');
  if (amount > slides.length) {
    slideIndex = 1;
  }
  if (amount < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[slideIndex - 1].style.display = 'block';
}
