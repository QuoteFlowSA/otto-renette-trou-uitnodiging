const envelopeLink = document.querySelector('.envelope-link');
const envelopeImage = envelopeLink.querySelector('img');
const tapNote = document.querySelector('.tap-note');
const guestName = new URLSearchParams(window.location.search).get('aan') || document.body.dataset.guestName;
const guestNameLabel = document.querySelector('.guest-envelope-name');
const invitationPath = document.body.dataset.invitationPath || 'kaartjie.html';
const openingDuration = 4500;
let isOpening = false;

if (guestName && guestNameLabel) {
  guestNameLabel.textContent = guestName;
  envelopeImage.alt = `Koevert aan ${guestName}`;
  envelopeLink.setAttribute('aria-label', `Maak ${guestName} se troukaartjie oop`);
  envelopeLink.href = `${invitationPath}?aan=${encodeURIComponent(guestName)}`;
}

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
