// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navigation highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  let current = '';
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = sectionId;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Create project card
function createProjectCard(project) {
  return `
    <div class="card">
      <span class="card-tag">${project.tag}</span>
      <h3 class="card-title">${project.title}</h3>
      <p class="card-description">${project.description}</p>
      <a href="${project.link}" class="card-link">View project</a>
    </div>
  `;
}

// Create lab card
function createLabCard(lab) {
  return `
    <div class="card">
      <span class="card-tag">${lab.tag}</span>
      <h3 class="card-title">${lab.title}</h3>
      <p class="card-description">${lab.description}</p>
      <a href="${lab.link}" class="card-link">View lab</a>
    </div>
  `;
}

// Load data from JSON and populate content
function loadData() {
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update homepage content
      document.getElementById('fullname').textContent = data.name;
      document.querySelector('.signature').textContent = data.signature;
      
      // Update social links
      const socialLinks = document.querySelectorAll('.socials a');
      data.socials.forEach((social, index) => {
        if (socialLinks[index]) {
          socialLinks[index].href = social.href;
          socialLinks[index].setAttribute('aria-label', social.label);
        }
      });
      
      // Load projects
      const projectsGrid = document.getElementById('projects-grid');
      if (projectsGrid) {
        projectsGrid.innerHTML = data.projects.map(createProjectCard).join('');
      }
      
      // Load labs  
      const labsGrid = document.getElementById('labs-grid');
      if (labsGrid) {
        labsGrid.innerHTML = data.labs.map(createLabCard).join('');
      }
      
      // Load experience
      const experienceList = document.getElementById('experience-list');
      if (experienceList) {
        experienceList.innerHTML = data.experience.map(exp => `
          <div class="timeline-item">
            <h3>${exp.role} · ${exp.company}</h3>
            <p class="timeline-meta">${exp.period} | ${exp.location}</p>
            <p>${exp.summary}</p>
          </div>
        `).join('');
      }
    })
    .catch(error => console.error('Error loading data:', error));
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  highlightNav();
});