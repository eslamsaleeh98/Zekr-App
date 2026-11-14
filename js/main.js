// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close menu when clicking link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
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
  const audioSample = document.getElementById('audioSample');
  const progressBar = document.getElementById('audioProgressBar');
  const progressArea = document.getElementById('audioProgressArea');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');

  if (playBtn && audioSample) {
    playBtn.addEventListener('click', () => {
      if (audioSample.paused) {
        audioSample.play();
        if (playIcon) playIcon.style.display = 'none';
        if (pauseIcon) pauseIcon.style.display = 'block';
      } else {
        audioSample.pause();
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
      }
    });

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
    });

    if (progressArea) {
      progressArea.addEventListener('click', (e) => {
        const rect = progressArea.getBoundingClientRect();
        // Calculate progress considering RTL (right is 0, left is 100%)
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
