(function () {
  // until the page have finish loading, before the elements will be added
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const navList = document.querySelector('.nav-links');
    const sections = Array.from(document.querySelectorAll('section[id], .about-strip[id]'));
    const submitBtn = document.querySelector('.submit-btn');
    const contactForm = document.querySelector('.contact-form-wrap');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

    // Mobile nmenu button: create a toggle button for the mobile version of this website
    if (nav && navList) {
      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'nav-toggle';
      toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      nav.insertBefore(toggleButton, navList);

      // Open and close mobile menu when the button is clicked
      toggleButton.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('show');
        toggleButton.setAttribute('aria-expanded', String(isOpen));
      });

      // Auto clo the mobile menu when a nav link is selected.
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navList.classList.remove('show');
          toggleButton.setAttribute('aria-expanded', 'false');
        });
      });

      // Atap the page to close the menu if open 
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && navList.classList.contains('show')) {
          navList.classList.remove('show');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // To highlight the active section in the navigation based on scroll position.
    function updateActiveLink() {
      const scrollPosition = window.scrollY;
      let activeId = '';

      sections.forEach(section => {
        const offsetTop = section.offsetTop - 130;
        if (scrollPosition >= offsetTop) {
          activeId = section.id;
        }
      });

      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${activeId}`;
        link.classList.toggle('active', isActive);
      });
    }

    if (sections.length && navLinks.length) {
      updateActiveLink();
      window.addEventListener('scroll', updateActiveLink, { passive: true });
      window.addEventListener('resize', updateActiveLink);
    }

    if (galleryItems.length) {
      galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
          const image = item.querySelector('img');
          if (image && image.src) {
            window.open(image.src, '_blank');
          }
        });
      });
    }

    if (submitBtn && contactForm) {
      const firstNameInput = contactForm.querySelector('input[placeholder="First name"]');
      const lastNameInput = contactForm.querySelector('input[placeholder="Last name"]');
      const phoneInput = contactForm.querySelector('input[type="tel"]');
      const interestSelect = contactForm.querySelector('select');
      const messageTextarea = contactForm.querySelector('textarea');

      submitBtn.addEventListener('click', () => {
        const firstName = (firstNameInput?.value || '').trim();
        const lastName = (lastNameInput?.value || '').trim();
        const phone = (phoneInput?.value || '').trim();
        const interest = interestSelect?.value || 'General Enquiry';
        const message = (messageTextarea?.value || '').trim();

        if (!firstName) {
          firstNameInput?.focus();
          window.alert('Please enter your first name so we can personalize your response.');
          return;
        }

        if (!phone) {
          phoneInput?.focus();
          window.alert('Please provide your phone or WhatsApp number so we can contact you.');
          return;
        }

        if (!message) {
          messageTextarea?.focus();
          window.alert('Please type a short message so we know how to help you.');
          return;
        }

        const text = [
          'Hello,',
          `I am ${firstName}${lastName ? ` ${lastName}` : ''}.`,
          `Interest: ${interest}.`,
          `Phone/WhatsApp: ${phone}.`,
          `Message: ${message}`
        ].join(' ');

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/2347060480907?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
      });
    }
  });
})();
