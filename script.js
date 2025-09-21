// Main JavaScript functionality for the website

// Mobile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      body.classList.toggle('mobile-nav-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        body.classList.remove('mobile-nav-open');
      }
    });
  }

  // Mobile submenu functionality
  const mobileSubmenuBack = document.querySelectorAll('.mobile-submenu-back');
  mobileSubmenuBack.forEach(backButton => {
    backButton.addEventListener('click', function() {
      const submenuPanel = this.closest('.mobile-submenu-panel');
      if (submenuPanel) {
        submenuPanel.classList.remove('active');
      }
    });
  });

  // Navigation menu item clicks
  const navMenuItems = document.querySelectorAll('.nav-menu-item-btn');
  navMenuItems.forEach(item => {
    item.addEventListener('click', function() {
      const submenuId = this.getAttribute('data-submenu');
      if (submenuId) {
        const submenuPanel = document.getElementById(submenuId);
        if (submenuPanel) {
          submenuPanel.classList.add('active');
        }
      }
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form validation and submission
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    } else {
      field.classList.remove('error');
    }
  });

  return isValid;
}

// Add form validation styles
const style = document.createElement('style');
style.textContent = `
  .error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
`;
document.head.appendChild(style);

// Initialize any third-party widgets or components
function initializeWidgets() {
  // Initialize any carousels, sliders, or other interactive components
  if (typeof Swiper !== 'undefined') {
    // Initialize Swiper instances if needed
    const swipers = document.querySelectorAll('.swiper');
    swipers.forEach(swiperEl => {
      new Swiper(swiperEl, {
        // Default Swiper configuration
        loop: true,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  }
}

// Call initialization functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeWidgets();
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Scroll event handlers
const handleScroll = throttle(function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add scroll-based functionality here
  if (scrollTop > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
}, 100);

window.addEventListener('scroll', handleScroll);

// Resize event handlers
const handleResize = debounce(function() {
  // Handle window resize events
  const windowWidth = window.innerWidth;
  
  if (windowWidth < 768) {
    document.body.classList.add('mobile');
  } else {
    document.body.classList.remove('mobile');
  }
}, 250);

window.addEventListener('resize', handleResize);

// Initialize on load
handleResize();
