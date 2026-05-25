document.addEventListener('DOMContentLoaded', () => {
  // ========== ROTATING ORBIT ICONS (Upright) ==========
  const orbitContainer = document.getElementById('orbitContainer');
  if (orbitContainer) {
    // Spring Boot uses the same fab fa-spring icon (official Font Awesome)
    const techIcons = [
      { icon: 'fab fa-java', label: 'Java & Spring Boot', color: '#f89820' },
      { icon: 'fab fa-aws', label: 'AWS Cloud', color: '#ff9900' },
      { icon: 'fas fa-brain', label: 'AI & RAG', color: '#a855f7' },
      { icon: 'fas fa-cubes', label: 'Kubernetes & DevOps', color: '#06b6d4' },
      { icon: 'fab fa-docker', label: 'Docker', color: '#2496ed' },
      { icon: 'fab fa-git-alt', label: 'Git Version Control', color: '#f05032' },
      { icon: 'fas fa-database', label: 'PostgreSQL & Vector DB', color: '#47a248' },
      { icon: 'fas fa-leaf', label: 'Spring Boot', color: '#6db33f' },
      { icon: 'fas fa-microchip', label: 'Microservices', color: '#3b82f6' },
      { icon: 'fas fa-cloud', label: 'Cloud Native', color: '#2d9cdb' }
    ];

    const baseRadius = 165;
    const total = techIcons.length;

    techIcons.forEach((tech, idx) => {
      const angle = (idx / total) * (Math.PI * 2);
      const x = Math.cos(angle) * baseRadius;
      const y = Math.sin(angle) * baseRadius;

      const iconDiv = document.createElement('div');
      iconDiv.className = 'orbit-icon';
      iconDiv.setAttribute('title', tech.label);
      iconDiv.style.left = `calc(50% + ${x}px)`;
      iconDiv.style.top = `calc(50% + ${y}px)`;
      iconDiv.style.transform = 'translate(-50%, -50%)';

      const iElem = document.createElement('i');
      const iconClasses = tech.icon.split(' ');
      iconClasses.forEach(cls => iElem.classList.add(cls));
      iElem.style.color = tech.color;
      iElem.style.fontSize = '1.6rem';
      iconDiv.appendChild(iElem);

      orbitContainer.appendChild(iconDiv);
    });

    function adjustRadius() {
      const screenWidth = window.innerWidth;
      let newRadius = 150;   // default now 150
      if (screenWidth <= 650) newRadius = 110;
      else if (screenWidth <= 900) newRadius = 130;
      else newRadius = 150;

      const icons = document.querySelectorAll('.orbit-icon');
      techIcons.forEach((_, idx) => {
        const angle = (idx / total) * (Math.PI * 2);
        const x = Math.cos(angle) * newRadius;
        const y = Math.sin(angle) * newRadius;
        const icon = icons[idx];
        if (icon) {
          icon.style.left = `calc(50% + ${x}px)`;
          icon.style.top = `calc(50% + ${y}px)`;
        }
      });
    }
    window.addEventListener('resize', adjustRadius);
    adjustRadius();
  }

  // ========== SCROLL REVEAL ANIMATION ==========
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(el => observer.observe(el));

  // ========== TYPEWRITER EFFECT ==========
  const typewriterSpan = document.querySelector('.typewriter');
  if (typewriterSpan && typewriterSpan.dataset.words) {
    const words = JSON.parse(typewriterSpan.dataset.words);
    let wordIndex = 0, charIndex = 0, isDeleting = false, currentText = '';
    function typeEffect() {
      const fullWord = words[wordIndex];
      if (isDeleting) {
        currentText = fullWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullWord.substring(0, charIndex + 1);
        charIndex++;
      }
      typewriterSpan.innerText = currentText;
      if (!isDeleting && charIndex === fullWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
        return;
      }
      setTimeout(typeEffect, isDeleting ? 80 : 120);
    }
    setTimeout(typeEffect, 400);
  }

  // ========== EMAIL COPY FUNCTIONALITY ==========
  const fakeEmailBtn = document.querySelector('.fake-email-btn');
  if (fakeEmailBtn) {
    fakeEmailBtn.addEventListener('click', () => {
      const email = 'karankotnikhilkumar@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const badge = fakeEmailBtn.querySelector('.copy-badge');
        if (badge) {
          const original = badge.innerText;
          badge.innerText = 'copied!';
          setTimeout(() => { badge.innerText = original; }, 1500);
        }
      }).catch(() => alert('Could not copy email. Please copy manually.'));
    });
  }
});