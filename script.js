// Smooth scrolling, Typewriter, Scroll Reveal, and email copy functionality for Nikhil's Portfolio
(function() {
  // Copy email button
  const copyBtn = document.querySelector('.fake-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'karankotnikhilkumar@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<div><i class="fas fa-check-circle"></i> &nbsp;Copied!</div> <span class="copy-badge" style="background:#10b981; color:#ffffff;">success</span>';
        copyBtn.style.borderColor = '#10b981';
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.style.borderColor = '';
        }, 2000);
      }).catch(() => {});
    });
  }

  // Smooth scroll for navigation links with offset for sticky header
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Typewriter Animation
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const words = JSON.parse(typewriter.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 40 : 80;
      
      if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }
      
      setTimeout(type, typeSpeed);
    }
    
    // Start typing after initial load
    setTimeout(type, 1000);
  }

  // Intersection Observer for Scroll Reveal (Staggered)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Check if the element should have a staggered delay
        if (entry.target.classList.contains('cascade')) {
          const parent = entry.target.parentElement;
          const siblings = Array.from(parent.querySelectorAll('.cascade'));
          const index = siblings.indexOf(entry.target);
          // Wait briefly based on card index to create a clean reveal flow
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100);
        } else {
          entry.target.classList.add('active');
        }
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
})();
