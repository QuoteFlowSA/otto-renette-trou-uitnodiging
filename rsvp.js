const form = document.querySelector('#rsvp-form');
const googleFormEndpoint = 'https://docs.google.com/forms/d/e/1FAIpQLSeBqYd4I555VQzrUDKACt1eE6qWdHZwemK_V3iee8t-jjWC-A/formResponse';
const rsvpDialog = document.querySelector('#rsvp-dialog');
const openRsvp = document.querySelector('#open-rsvp');
const closeRsvp = document.querySelector('#close-rsvp');

openRsvp?.addEventListener('click', () => rsvpDialog?.showModal());
closeRsvp?.addEventListener('click', () => rsvpDialog?.close());
rsvpDialog?.addEventListener('click', (event) => {
  if (event.target === rsvpDialog) rsvpDialog.close();
});

form?.addEventListener('submit', (event) => {
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

  const sheetResponse = new URLSearchParams({
    'entry.2130879815': name,
    'entry.1473269708': attendance,
    'entry.1043739622': dietary,
    'entry.933605355': message,
  });

  fetch(googleFormEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    body: sheetResponse,
    keepalive: true,
  }).catch(() => undefined);

  const whatsappUrl = `https://wa.me/27832746865?text=${encodeURIComponent(lines.join('\n'))}`;
  window.setTimeout(() => { window.location.href = whatsappUrl; }, 500);
});
