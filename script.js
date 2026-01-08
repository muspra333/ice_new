  // DOM Elements
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dots span");
  const progressBar = document.querySelector(".progress-bar");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const desktopMenuLinks = document.querySelectorAll(".desktop-menu a");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
  // const prevBtn = document.querySelector(".arrow-left");
  // const nextBtn = document.querySelector(".arrow-right");
  const contactForm = document.getElementById("contactForm");
  // const testimonialDots = document.querySelectorAll(".testimonial-dot");

  // State variables
  let currentSlide = 0;
  const totalSlides = slides.length;
  let startX = 0;
  let isDragging = false;
  let currentTestimonial = 0;

  // Initialize
  function init() {
    updateSlider();
    setupEventListeners();
    updateActiveMenu();
    // startTestimonialSlider();
  }

  // Update slider position
  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
    
    // Update progress bar
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
    
    // Update active menu
    updateActiveMenu();
    
    // Trigger animations for current slide
    animateSlideContent();
  }

  // Update active menu item
  function updateActiveMenu() {
    // Update desktop menu
    desktopMenuLinks.forEach((link, index) => {
      link.classList.toggle("active", index === currentSlide);
    });
    
    // Update mobile menu
    mobileMenuLinks.forEach((link, index) => {
      if (link.dataset.index) {
        link.classList.toggle("active", parseInt(link.dataset.index) === currentSlide);
      }
    });
  }

  // Animate content when slide changes
  function animateSlideContent() {
    const currentSlideEl = slides[currentSlide];
    const animatedElements = currentSlideEl.querySelectorAll('.home-buttons, .service-card, .gallery-item, .testimonial-card, .contact-form');
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }


  // Navigation functions
  // function nextSlide() {
  //   currentSlide = (currentSlide + 1) % totalSlides;
  //   updateSlider();
  //   closeMobileMenu();
  // }

  // function prevSlide() {
  //   currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  //   updateSlider();
  //   closeMobileMenu();
  // }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    closeMobileMenu();
  }

  // Mobile menu functions
  function toggleMobileMenu() {
    mobileMenu.classList.toggle("show");
    menuOverlay.classList.toggle("show");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("show");
    menuOverlay.classList.remove("show");
  }

  // Testimonial slider
  // function startTestimonialSlider() {
    // In a real implementation, this would cycle through testimonials
    // For this demo, we'll just highlight the active dot
    // testimonialDots.forEach((dot, index) => {
    //   dot.addEventListener("click", () => {
    //     testimonialDots.forEach(d => d.classList.remove("active"));
    //     dot.classList.add("active");
    //     currentTestimonial = index;
        // In a full implementation, you would update the testimonial content here
    //   });
    // });
    
    // Auto-advance testimonials
    // setInterval(() => {
    //   currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
    //   testimonialDots.forEach((dot, index) => {
    //     dot.classList.toggle("active", index === currentTestimonial);
    //   });
    // }, 5000);
  

  // Setup event listeners

  // function setupEventListeners() {
    // Arrow buttons
    // prevBtn.addEventListener("click", prevSlide);
    // nextBtn.addEventListener("click", nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });
    
    // Desktop menu navigation
    desktopMenuLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        goToSlide(index);
      });
    });
    
    // Mobile menu navigation
    mobileMenuLinks.forEach((link) => {
      if (link.dataset.index) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          goToSlide(parseInt(link.dataset.index));
        });
      }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    menuOverlay.addEventListener("click", closeMobileMenu);
    
    // Desktop CTA button
    document.querySelector(".desktop-cta").addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(5); // Contact slide
    });
    
    // Mobile CTA button
    document.querySelector(".mobile-cta").addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(5); // Contact slide
    });
    
    // Home buttons
    document.querySelectorAll(".btn-primary").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        goToSlide(2); // Services slide
      });
    });
    
    document.querySelectorAll(".btn-secondary").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        goToSlide(5); // Contact slide
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });
    
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closeMobileMenu();
    });
    
    // Touch/swipe navigation
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
    
    slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
    
    slider.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const threshold = 50;
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      isDragging = false;
    });
    
    // Mouse drag navigation (for desktop)
    slider.addEventListener("mousedown", (e) => {
      startX = e.clientX;
      isDragging = true;
    });
    
    slider.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      
      const endX = e.clientX;
      const diffX = startX - endX;
      const threshold = 50;
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      isDragging = false;
    });
    
    // Mouse leave
    slider.addEventListener("mouseleave", () => {
      isDragging = false;
    });
    
    // Form submission
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        
        // Show success message
        alert(`Thank you, ${name}! Your consultation request has been submitted. We will contact you within 24 hours.`);
        
        // Reset form
        contactForm.reset();
      });
    }
    
    // Gallery item click
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        // In a real implementation, this would open a lightbox
        alert('Image gallery - In a full implementation, this would open a lightbox with the full-size image.');
      });
    });
  

  // Initialize everything when page loads
  window.addEventListener('DOMContentLoaded', init);
