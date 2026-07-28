const envelopeLink = document.querySelector('.envelope-link');
const envelopeImage = envelopeLink.querySelector('img');
const tapNote = document.querySelector('.tap-note');
const openingDuration = 4500;
let isOpening = false;

envelopeLink.addEventListener('click', (event) => {
  event.preventDefault();
  if (isOpening) return;

  isOpening = true;
  envelopeLink.classList.add('is-opening');
  tapNote.textContent = 'Koevert maak oop...';

  const source = envelopeImage.getAttribute('src').split('?')[0];
  envelopeImage.src = `${source}?opening=${Date.now()}`;

  window.setTimeout(() => {
    window.location.href = envelopeLink.href;
  }, openingDuration);
});
