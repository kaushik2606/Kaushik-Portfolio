/* ===================================================
   Personal Portfolio - Simple Vanilla JavaScript
   Developer: Kaushik Kalsariya
   Features:
   1. Mobile Navigation Toggle (Hamburger Menu)
   2. Active Link Detection
   3. Simple Project Category Filtering
   4. Contact Form Validation and Submission Feedback
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // -------------------------------------------------
  // 1. Mobile Menu Toggle Functionality
  // -------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');

      // Change hamburger icon to close icon when opened
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu when clicking any nav link
    const allLinks = navLinks.querySelectorAll('a');
    allLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close menu when clicking outside of navbar
    document.addEventListener('click', function (event) {
      if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // -------------------------------------------------
  // 2. Simple Project Filter (Projects Page)
  // -------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Remove active class from all buttons and add to clicked one
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
        });
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-filter');

        // Show or hide project cards based on category
        projectCards.forEach(function (card) {
          const cardCategories = (card.getAttribute('data-category') || '').split(' ');

          if (selectedCategory === 'all' || cardCategories.includes(selectedCategory)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // -------------------------------------------------
  // 3. Contact Form Validation (Contact Page)
  // -------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Stop default page refresh

      // Grab user input values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple validation checks
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }

      // Basic email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Display friendly success message
      showStatus(
        'Thank you, ' + name + '! Your message has been sent successfully. I will get back to you soon.',
        'success'
      );

      // Reset form fields
      contactForm.reset();
    });

    function showStatus(messageText, statusType) {
      formStatus.textContent = messageText;
      formStatus.className = 'form-status ' + statusType;
      formStatus.style.display = 'block';

      // Auto hide error message after 5 seconds
      if (statusType === 'error') {
        setTimeout(function () {
          formStatus.style.display = 'none';
        }, 5000);
      }
    }
  }
});
