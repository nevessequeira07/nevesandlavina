(() => {
  const audio = new Audio('assets/leberch-invitation-wedding-375839.mp3');
  audio.preload = 'metadata';
  audio.loop = true;
  audio.volume = 0.35;

  const button = document.createElement('button');
  button.className = 'music-toggle';
  button.type = 'button';
  button.hidden = true;
  button.setAttribute('aria-label', 'Background music');
  document.body.append(button);

  function update() {
    const playing = !audio.paused && !audio.error;
    button.textContent = playing ? '♫ Music on' : '♫ Music off';
    button.setAttribute('aria-pressed', String(playing));
  }

  function play() {
    audio.play().catch(update);
  }

  audio.addEventListener('playing', update);
  audio.addEventListener('pause', update);
  audio.addEventListener('error', update);

  button.addEventListener('click', () => {
    if (audio.paused) play();
    else audio.pause();
  });

  document.getElementById('open-invitation').addEventListener('click', () => {
    button.hidden = false;
    update();
    play();
  }, { once: true });

  let resumeOnVisible = false;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      resumeOnVisible = !audio.paused;
      audio.pause();
    } else if (resumeOnVisible) {
      resumeOnVisible = false;
      play();
    }
  });
})();
