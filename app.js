// Global state
let currentTestimonial = 0;
let testimonialInterval;
let currentPhotoData = {};
let currentVideoData = {};
let currentTutorialData = {};

// Data
const photoProjects = [
  {
    id: 1,
    title: 'Fashion Portrait',
    category: 'photo',
    beforeDesc: 'Original shot with natural lighting',
    afterDesc: 'Skin smoothing, color correction, background replacement'
  },
  {
    id: 2,
    title: 'Landscape Enhancement',
    category: 'photo',
    beforeDesc: 'Flat, unprocessed RAW file',
    afterDesc: 'Dynamic range expansion, color grading, sharpening'
  },
  {
    id: 3,
    title: 'Product Shot',
    category: 'photo',
    beforeDesc: 'Standard product photography',
    afterDesc: 'Perfect white background, reflection enhancement, color accuracy'
  }
];

const videoProjects = [
  {
    id: 1,
    title: 'Travel Montage',
    category: 'video',
    changes: [
      'Dynamic cuts synchronized to music',
      'Color grading for cohesive look',
      'Smooth transitions and speed ramps',
      'Audio mixing and sound design'
    ]
  },
  {
    id: 2,
    title: 'Brand Commercial',
    category: 'video',
    changes: [
      'Professional pacing and storytelling',
      'Motion graphics and text animations',
      'Cinematic color grade',
      'VFX additions and cleanup'
    ]
  }
];

const tutorials = [
  {
    id: 1,
    title: 'Creating Cinematic Color Grades',
    summary: 'Learn the fundamentals of color grading to achieve film-quality visuals',
    steps: [
      { title: 'Step 1: Initial Cleanup', desc: 'Correct exposure and white balance' },
      { title: 'Step 2: Color Correction', desc: 'Balance skin tones and neutralize footage' },
      { title: 'Step 3: Creative Grading & Effects', desc: 'Apply cinematic look with curves and LUTs' }
    ]
  },
  {
    id: 2,
    title: 'Mastering Portrait Retouching',
    summary: 'Professional techniques for natural-looking skin retouching',
    steps: [
      { title: 'Step 1: Frequency Separation', desc: 'Separate texture from tone' },
      { title: 'Step 2: Blemish Removal', desc: 'Clean up imperfections' },
      { title: 'Step 3: Final Polish', desc: 'Dodge and burn for dimension' }
    ]
  },
  {
    id: 3,
    title: 'Dynamic Video Transitions',
    summary: 'Create smooth, engaging transitions for social media content',
    steps: [
      { title: 'Step 1: Plan Your Cuts', desc: 'Match action and rhythm' },
      { title: 'Step 2: Add Motion', desc: 'Use keyframes for dynamic movement' },
      { title: 'Step 3: Sound Design', desc: 'Sync audio with visual transitions' }
    ]
  }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Hide preloader after load
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1500);

  // Navigation
  setupNavigation();
  setupMobileMenu();
  setupScrollEffects();
  setupBackToTop();
  
  // Page interactions
  setupFeaturedCards();
  populateProjects();
  setupPhotoGallery();
  setupVideoGallery();
  setupTutorials();
  setupServices();
  setupForm();
  setupTestimonials();
  
  // Modals
  setupPhotoModal();
  setupVideoModal();
  setupBrandVideoModal();
  setupTutorialModal();
  
  // Scroll reveal
  setupScrollReveal();
});

// Navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showPage(targetId);
      
      // Update active nav
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Handle dropdown links
  const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showPage(targetId);
    });
  });
  
  // Handle all other anchor links to page sections (like "Hire Me for Editing" button)
  const pageLinks = document.querySelectorAll('a[href^="#"]');
  pageLinks.forEach(link => {
    // Skip nav-links and mobile-links as they're already handled
    if (!link.classList.contains('nav-link') && !link.classList.contains('mobile-link')) {
      const href = link.getAttribute('href');
      // Check if it's a valid page section
      if (href && href.length > 1) {
        const targetId = href.substring(1);
        const targetPage = document.getElementById(targetId);
        if (targetPage && targetPage.classList.contains('page')) {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(targetId);
            
            // Update active nav if this link corresponds to a nav item
            navLinks.forEach(l => {
              if (l.getAttribute('href') === href) {
                navLinks.forEach(nl => nl.classList.remove('active'));
                l.classList.add('active');
              }
            });
          });
        }
      }
    }
  });
}

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active-page');
    if (page.id === pageId) {
      page.classList.add('active-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  mobileClose.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showPage(targetId);
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

function setupScrollEffects() {
  const nav = document.getElementById('main-nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function setupBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Featured Cards
function setupFeaturedCards() {
  const cards = document.querySelectorAll('.featured-card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      if (category === 'photo') {
        showPage('photo-edits');
      } else if (category === 'video') {
        showPage('video-edits');
      } else if (category === 'color') {
        showPage('color-grading');
      }
    });
  });
}

// Projects
function populateProjects() {
  const grid = document.getElementById('projects-grid');
  const allProjects = [
    ...photoProjects.map(p => ({ ...p, type: 'Photo' })),
    ...videoProjects.map(v => ({ ...v, type: 'Video' })),
    { id: 1, title: 'Moody Portrait', category: 'color', type: 'Color' },
    { id: 2, title: 'Golden Hour', category: 'color', type: 'Color' },
    { id: 3, title: 'Urban Night', category: 'color', type: 'Color' }
  ];
  
  allProjects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.innerHTML = `
      <div class="project-badge">${project.type}</div>
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a1a"/>
        <text x="200" y="160" font-family="Inter" font-size="20" fill="#00F5D4" text-anchor="middle">${project.title}</text>
      </svg>
    `;
    
    card.addEventListener('click', () => {
      if (project.category === 'photo') {
        showPage('photo-edits');
      } else if (project.category === 'video') {
        showPage('video-edits');
      } else if (project.category === 'color') {
        showPage('color-grading');
      }
    });
    
    grid.appendChild(card);
  });
  
  setupFilter();
}

function setupFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Photo Gallery
function setupPhotoGallery() {
  const photoItems = document.querySelectorAll('.photo-item');
  
  photoItems.forEach(item => {
    item.addEventListener('click', function() {
      const photoId = parseInt(this.getAttribute('data-photo'));
      const photo = photoProjects.find(p => p.id === photoId);
      openPhotoModal(photo);
    });
  });
}

function openPhotoModal(photo) {
  currentPhotoData = photo;
  const modal = document.getElementById('photo-modal');
  const title = document.getElementById('modal-title');
  const text = document.getElementById('modal-text');
  
  title.textContent = photo.title;
  text.textContent = photo.afterDesc;
  
  modal.classList.add('active');
  resetSlider();
}

function setupPhotoModal() {
  const modal = document.getElementById('photo-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const handle = document.getElementById('slider-handle');
  const afterImage = document.querySelector('.image-after');
  
  let isDragging = false;
  
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // Slider drag functionality
  handle.addEventListener('mousedown', () => {
    isDragging = true;
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const container = document.querySelector('.slider-container');
      const rect = container.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;
      
      handle.style.left = percent + '%';
      afterImage.style.width = percent + '%';
    }
  });
  
  // Touch support
  handle.addEventListener('touchstart', () => {
    isDragging = true;
  });
  
  document.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      const container = document.querySelector('.slider-container');
      const rect = container.getBoundingClientRect();
      let x = e.touches[0].clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;
      
      handle.style.left = percent + '%';
      afterImage.style.width = percent + '%';
    }
  });
}

function resetSlider() {
  const handle = document.getElementById('slider-handle');
  const afterImage = document.querySelector('.image-after');
  handle.style.left = '50%';
  afterImage.style.width = '50%';
}

// Video Gallery
function setupVideoGallery() {
  const videoItems = document.querySelectorAll('.video-item');
  
  videoItems.forEach(item => {
    item.addEventListener('click', function() {
      const videoId = parseInt(this.getAttribute('data-video'));
      const video = videoProjects.find(v => v.id === videoId);
      if (videoId === 2) {
        openBrandModal(video);
      } else {
        openVideoModal(video);
      }
    });
  });
}

function openVideoModal(video) {
  currentVideoData = video;
  const modal = document.getElementById('video-modal');
  const title = document.getElementById('video-modal-title');
  const list = document.getElementById('video-changes-list');
  
  title.textContent = video.title;
  list.innerHTML = video.changes.map(change => `<li>${change}</li>`).join('');

  // Map each project to its specific before/after sources
  const videoSources = {
    1: { raw: 'before.mp4', final: 'after.mp4' }, // Travel Montage
    2: { raw: 'brand-before.mp4', final: 'brand-after.mp4' } // Brand Commercial
  };

  const pair = videoSources[video.id];
  const rawEl = document.getElementById('video-raw');
  const finalEl = document.getElementById('video-final');

  if (pair && rawEl && finalEl) {
    // Set sources per selection
    if (rawEl.src !== pair.raw) rawEl.src = pair.raw;
    if (finalEl.src !== pair.final) finalEl.src = pair.final;
    // Ensure the browser reloads new sources
    rawEl.load();
    finalEl.load();
  }

  modal.classList.add('active');
}

function openBrandModal(video) {
  currentVideoData = video;
  const modal = document.getElementById('brand-modal');
  const title = document.getElementById('brand-modal-title');
  const list = document.getElementById('brand-changes-list');

  if (title) title.textContent = video.title;
  if (list) list.innerHTML = video.changes.map(change => `<li>${change}</li>`).join('');

  // Leave sources as-is; user can replace brand-before.mp4 / brand-after.mp4
  modal.classList.add('active');
}

function setupVideoModal() {
  const modal = document.getElementById('video-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const playBtn = document.getElementById('video-play');
  
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    // Pause videos on close
    const raw = document.getElementById('video-raw');
    const fin = document.getElementById('video-final');
    if (raw) raw.pause();
    if (fin) fin.pause();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      const raw = document.getElementById('video-raw');
      const fin = document.getElementById('video-final');
      if (raw) raw.pause();
      if (fin) fin.pause();
    }
  });
  
  playBtn.addEventListener('click', async () => {
    const raw = document.getElementById('video-raw');
    const fin = document.getElementById('video-final');

    if (!raw || !fin) {
      // Fallback: toggle label only if videos not present
      if (playBtn.textContent.includes('Play')) {
        playBtn.textContent = '⏸ Pause Both';
      } else {
        playBtn.textContent = '▶ Play Both';
      }
      return;
    }

    const isPlaying = playBtn.textContent.includes('Pause');
    if (isPlaying) {
      raw.pause();
      fin.pause();
      playBtn.textContent = '▶ Play Both';
    } else {
      try {
        // Restart both so they stay in sync
        raw.currentTime = 0;
        fin.currentTime = 0;
        await Promise.allSettled([raw.play(), fin.play()]);
        playBtn.textContent = '⏸ Pause Both';
      } catch (e) {
        playBtn.textContent = '▶ Play Both';
      }
    }
  });
}

function setupBrandVideoModal() {
  const modal = document.getElementById('brand-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const playBtn = document.getElementById('brand-video-play');

  if (!modal || !closeBtn || !playBtn) return;

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    const raw = document.getElementById('brand-video-raw');
    const fin = document.getElementById('brand-video-final');
    if (raw) raw.pause();
    if (fin) fin.pause();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      const raw = document.getElementById('brand-video-raw');
      const fin = document.getElementById('brand-video-final');
      if (raw) raw.pause();
      if (fin) fin.pause();
    }
  });

  playBtn.addEventListener('click', async () => {
    const raw = document.getElementById('brand-video-raw');
    const fin = document.getElementById('brand-video-final');
    if (!raw || !fin) return;

    const isPlaying = playBtn.textContent.includes('Pause');
    if (isPlaying) {
      raw.pause();
      fin.pause();
      playBtn.textContent = '▶ Play Both';
    } else {
      try {
        raw.currentTime = 0;
        fin.currentTime = 0;
        await Promise.allSettled([raw.play(), fin.play()]);
        playBtn.textContent = '⏸ Pause Both';
      } catch (_) {
        playBtn.textContent = '▶ Play Both';
      }
    }
  });
}

// Tutorials
function setupTutorials() {
  const tutorialCards = document.querySelectorAll('.tutorial-card');
  
  tutorialCards.forEach(card => {
    const btn = card.querySelector('.btn');
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const tutorialId = parseInt(card.getAttribute('data-tutorial'));
      const tutorial = tutorials.find(t => t.id === tutorialId);
      openTutorialModal(tutorial);
    });
  });
}

function openTutorialModal(tutorial) {
  currentTutorialData = tutorial;
  const modal = document.getElementById('tutorial-modal');
  const title = document.getElementById('tutorial-title');
  const stepsContainer = document.getElementById('tutorial-steps');
  
  title.textContent = tutorial.title;
  stepsContainer.innerHTML = tutorial.steps.map(step => `
    <div class="tutorial-step">
      <h4>${step.title}</h4>
      <p>${step.desc}</p>
    </div>
  `).join('');
  
  modal.classList.add('active');
}

function setupTutorialModal() {
  const modal = document.getElementById('tutorial-modal');
  const closeBtn = modal.querySelector('.modal-close');
  
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Services
function setupServices() {
  const quoteBtns = document.querySelectorAll('.request-quote');
  const serviceSelect = document.getElementById('service');
  const formSection = document.querySelector('.booking-form-section');
  
  quoteBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const service = this.getAttribute('data-service');
      serviceSelect.value = service;
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

// Form
function setupForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    if (name && email && service && message) {
      form.style.display = 'none';
      successMsg.classList.remove('hidden');
      
      setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMsg.classList.add('hidden');
      }, 5000);
    }
  });
}

// Testimonials
function setupTestimonials() {
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dots = document.querySelectorAll('.dot');
  
  prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + 3) % 3;
    updateTestimonial();
  });
  
  nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % 3;
    updateTestimonial();
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      currentTestimonial = parseInt(this.getAttribute('data-index'));
      updateTestimonial();
    });
  });
  
  // Auto-rotate
  startTestimonialRotation();
}

function updateTestimonial() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  
  cards.forEach((card, index) => {
    if (index === currentTestimonial) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
  
  dots.forEach((dot, index) => {
    if (index === currentTestimonial) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function startTestimonialRotation() {
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % 3;
    updateTestimonial();
  }, 5000);
}

// Scroll Reveal
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.featured-card, .project-card, .service-card, .tutorial-card');
  
  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1
  });
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
}