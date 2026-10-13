document.querySelectorAll('.nav-menu a').forEach(link=>link.addEventListener('click',()=>link.closest('details').removeAttribute('open')));
const filter=document.querySelector('#press-year');
if(filter)filter.addEventListener('change',()=>document.querySelectorAll('[data-year]').forEach(group=>group.hidden=filter.value!=='all'&&group.dataset.year!==filter.value));
const form = document.querySelector('#inquiry');
if (form) {
  const subject = form.elements.subject;
  const supplied = new URLSearchParams(location.search).get('subject');
  if (supplied) subject.value = supplied;
  document.querySelectorAll('[data-subject]').forEach(link => link.addEventListener('click', () => { subject.value = link.dataset.subject; }));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const status = document.querySelector('#inquiry-status');
    if (button.disabled) return;
    button.disabled = true;
    button.textContent = 'Sending…';
    status.hidden = true;
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Message not accepted');
      form.reset();
      status.textContent = 'Thank you for your message. I’ll be in touch soon.';
    } catch {
      status.textContent = 'Your message could not be sent. Please try again. Your message is still in the form.';
    } finally {
      button.disabled = false;
      button.textContent = 'Send message ↗';
      status.hidden = false;
      status.focus();
    }
  });
}
