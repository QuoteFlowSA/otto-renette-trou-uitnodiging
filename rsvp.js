const form = document.querySelector('#rsvp-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const details = new FormData(form);
  const name = details.get('guest-name').trim();
  const attendance = details.get('attendance');
  const dietary = details.get('dietary').trim();
  const message = details.get('message').trim();

  const lines = [
    'Hallo Otto en Renette,',
    '',
    `RSVP van: ${name}`,
    `Bywoning: ${attendance}`,
  ];

  if (dietary) lines.push(`Dieetvereistes/allergiee: ${dietary}`);
  if (message) lines.push(`Boodskap: ${message}`);
  lines.push('', 'Groete');
  window.location.href = `https://wa.me/27832746865?text=${encodeURIComponent(lines.join('\n'))}`;
});
