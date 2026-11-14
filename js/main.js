// ==========================================================
// Zekr App Landing Page - Interactive Scripts
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close menu when clicking any nav link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      }
    });
  }

  // Interactive Phone Mockup Tabs
  const mockupTabBtns = document.querySelectorAll('.mockup-tab-btn');
  const previewPanes = document.querySelectorAll('.preview-tab-pane');

  mockupTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      mockupTabBtns.forEach(b => b.classList.remove('active'));
      previewPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Interactive Tasbih Demo inside Mockup
  let tasbihCount = 33;
  const tasbihCounter = document.getElementById('tasbihCounter');
  const tasbihBtn = document.getElementById('tasbihBtn');

  function toArabicDigits(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicDigits[d] || d).join('');
  }

  function incrementTasbih() {
    tasbihCount++;
    if (tasbihCounter) {
      tasbihCounter.textContent = toArabicDigits(tasbihCount);
      tasbihCounter.style.transform = 'scale(1.2)';
      setTimeout(() => {
        tasbihCounter.style.transform = 'scale(1)';
      }, 150);
    }
  }

  if (tasbihBtn) tasbihBtn.addEventListener('click', incrementTasbih);
  if (tasbihCounter) {
    tasbihCounter.style.transition = 'transform 0.15s ease';
    tasbihCounter.addEventListener('click', incrementTasbih);
  }

  // Live Countdown Simulation for Next Prayer
  const countdownEl = document.getElementById('liveCountdown');
  if (countdownEl) {
    let totalSeconds = 2 * 3600 + 14 * 60 + 35;
    setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const pad = (n) => n.toString().padStart(2, '0');
        countdownEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      }
    }, 1000);
  }

  // Legal Tabs Toggle (Privacy vs Terms)
  const legalTabBtns = document.querySelectorAll('.legal-tab-btn');
  const legalPanes = document.querySelectorAll('.legal-pane');

  legalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-legal');

      legalTabBtns.forEach(b => b.classList.remove('active'));
      legalPanes.forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const targetPane = document.getElementById(`legal-${target}`);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => {
        i.classList.remove('active');
        const b = i.querySelector('.faq-body');
        if (b) b.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Audio Player Preview
  const playBtn = document.getElementById('audioPlayBtn');
  const phonePlayBtn = document.getElementById('phoneMockupPlayBtn');
  const audioSample = document.getElementById('audioSample');
  const progressBar = document.getElementById('audioProgressBar');
  const progressArea = document.getElementById('audioProgressArea');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  function togglePlay() {
    if (!audioSample) return;
    if (audioSample.paused) {
      audioSample.play().catch(() => {});
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
      if (phonePlayBtn) phonePlayBtn.textContent = '❚❚';
    } else {
      audioSample.pause();
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (phonePlayBtn) phonePlayBtn.textContent = '▶';
    }
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (phonePlayBtn) phonePlayBtn.addEventListener('click', togglePlay);

  if (audioSample) {
    audioSample.addEventListener('timeupdate', () => {
      if (progressBar && audioSample.duration) {
        const percent = (audioSample.currentTime / audioSample.duration) * 100;
        progressBar.style.width = percent + '%';
      }
    });

    audioSample.addEventListener('ended', () => {
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (progressBar) progressBar.style.width = '0%';
      if (phonePlayBtn) phonePlayBtn.textContent = '▶';
    });

    if (progressArea) {
      progressArea.addEventListener('click', (e) => {
        const rect = progressArea.getBoundingClientRect();
        // In RTL, click from right
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = 1 - (clickX / width);
        if (audioSample.duration) {
          audioSample.currentTime = percent * audioSample.duration;
        }
      });
    }
  }

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // Current Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
