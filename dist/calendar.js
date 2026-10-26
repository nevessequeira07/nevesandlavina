// Keep event creation explicit: visitors review the details and press Save.
(() => {
  const trigger = document.getElementById('calendar');
  const picker = document.getElementById('calendar-picker');
  const google = document.getElementById('calendar-google');
  const webFallback = document.getElementById('calendar-web');
  const help = document.getElementById('calendar-help');
  const originalUrl = new URL(trigger.href);
  const webUrl = new URL('https://www.google.com/calendar/render');
  webUrl.search = originalUrl.search;
  const android = /Android/i.test(navigator.userAgent);
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  google.href = originalUrl.href;
  webFallback.href = webUrl.href;
  if (android) {
    // A plain Google Calendar URL can be intercepted by the Calendar app,
    // which may discard the template fields. Explicitly address the browser.
    google.href = `intent://${webUrl.host}${webUrl.pathname}${webUrl.search}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(webUrl.href)};end`;
    google.removeAttribute('target');
    help.textContent = 'Google Calendar opens in Chrome. Choose your Google account, review the event, then tap Save. If you came from WhatsApp or Instagram, open this invitation in Chrome first.';
  } else if (ios) {
    help.textContent = 'For Apple Calendar, open this invitation in Safari, choose Apple Calendar, then tap Add. If your browser only downloads the file, open it as an attachment in Apple Mail, or use Google Calendar instead.';
    document.getElementById('calendar-apple').classList.add('recommended');
  }
  trigger.addEventListener('click', event => {
    if (!picker.showModal) return;
    event.preventDefault();
    picker.showModal();
  });
  document.getElementById('calendar-close').addEventListener('click', () => picker.close());
  picker.addEventListener('click', event => {
    if (event.target === picker) {
      const box = picker.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right ||
          event.clientY < box.top || event.clientY > box.bottom) picker.close();
    }
  });
})();
