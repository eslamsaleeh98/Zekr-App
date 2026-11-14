document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.classList.remove('open');
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'فتح القائمة');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
  });
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const tabs = [...document.querySelectorAll('.experience-tab')];
  const panels = [...document.querySelectorAll('.experience-panel')];
  function selectTab(selected) {
    const target = selected.dataset.panel;
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.id === `panel-${target}`;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? -1 : 1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('button');
    const icon = button.querySelector('i');
    button.addEventListener('click', () => {
      const wasOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('active');
        other.querySelector('button').setAttribute('aria-expanded', 'false');
        other.querySelector('button i').textContent = '+';
      });
      if (!wasOpen) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        icon.textContent = '−';
      }
    });
  });

  const audio = document.getElementById('audioSample');
  const playButton = document.getElementById('playButton');
  const playIcon = document.getElementById('playIcon');
  const timeline = document.getElementById('timeline');
  const progress = document.getElementById('progress');
  const currentTime = document.getElementById('currentTime');
  const duration = document.getElementById('duration');
  const arabicDigits = (value) => String(value).replace(/\d/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[digit]);
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '٠:٠٠';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return arabicDigits(`${mins}:${secs}`);
  };
  const updateAudio = () => {
    if (!audio) return;
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.style.width = `${percent}%`;
    timeline.setAttribute('aria-valuenow', String(Math.round(percent)));
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  };
  playButton?.addEventListener('click', async () => {
    if (audio.paused) { try { await audio.play(); } catch (_) { return; } }
    else audio.pause();
  });
  audio?.addEventListener('play', () => {
    playIcon.textContent = 'Ⅱ';
    playButton.setAttribute('aria-label', 'إيقاف التلاوة مؤقتًا');
    document.querySelector('.sound-wave')?.classList.add('playing');
  });
  audio?.addEventListener('pause', () => {
    playIcon.textContent = '▶';
    playButton.setAttribute('aria-label', 'تشغيل التلاوة');
    document.querySelector('.sound-wave')?.classList.remove('playing');
  });
  audio?.addEventListener('loadedmetadata', updateAudio);
  audio?.addEventListener('timeupdate', updateAudio);
  audio?.addEventListener('ended', updateAudio);

  const seek = (clientX) => {
    if (!audio?.duration) return;
    const rect = timeline.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (rect.right - clientX) / rect.width));
    audio.currentTime = percent * audio.duration;
  };
  timeline?.addEventListener('click', (event) => seek(event.clientX));
  timeline?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || !audio?.duration) return;
    event.preventDefault();
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + (event.key === 'ArrowLeft' ? 5 : -5)));
  });

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 }) : null;
  document.querySelectorAll('.reveal').forEach((element) => observer ? observer.observe(element) : element.classList.add('visible'));
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
