// ========================================
// Content Refresher - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  initMobileMenu();
  
  // Scroll Animations
  initScrollAnimations();
  
  // Transform Card Animation
  initTransformAnimation();
  
  // Smooth Scroll for Anchor Links
  initSmoothScroll();
});

// ----------------------------------------
// Mobile Menu
// ----------------------------------------
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = menuBtn.querySelector('.menu-icon');
  const closeIcon = menuBtn.querySelector('.close-icon');
  
  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });
  
  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
}

// ----------------------------------------
// Scroll Animations
// ----------------------------------------
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// ----------------------------------------
// Transform Card Animation
// ----------------------------------------
function initTransformAnimation() {
  const oldContent = document.getElementById('oldContent');
  const freshContent = document.getElementById('freshContent');
  const syncIndicator = document.getElementById('syncIndicator');
  const indicators = document.querySelectorAll('.phase-indicators .indicator');
  const syncText = syncIndicator.querySelector('.sync-text');
  
  let phase = 0;
  
  function updatePhase() {
    // Reset all states
    oldContent.classList.remove('active');
    freshContent.classList.remove('active');
    syncIndicator.classList.remove('active');
    
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === phase);
    });
    
    switch (phase) {
      case 0:
        oldContent.classList.add('active');
        syncText.textContent = 'Ready';
        break;
      case 1:
        syncIndicator.classList.add('active');
        syncText.textContent = 'Syncing...';
        break;
      case 2:
        freshContent.classList.add('active');
        syncText.textContent = 'Ready';
        break;
    }
    
    phase = (phase + 1) % 3;
  }
  
  // Initial state
  updatePhase();
  
  // Start animation loop
  setInterval(updatePhase, 2500);
}

// ----------------------------------------
// Smooth Scroll
// ----------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
