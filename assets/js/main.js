document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Load JSON data and populate sections
    loadData();

    // Smooth scrolling for navigation links
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

    // Navigation active state
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

function loadData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    populateProjects(data.projects);
                    populateLabs(data.labs);
                    populateExperience(data.experience);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    showErrorMessages();
                }
            } else {
                console.error('Error loading data:', xhr.status);
                showErrorMessages();
            }
        }
    };
    xhr.send();
}

function showErrorMessages() {
    document.getElementById('projects-grid').innerHTML = '<p>Error loading projects</p>';
    document.getElementById('labs-grid').innerHTML = '<p>Error loading labs</p>';
    document.getElementById('experience-list').innerHTML = '<p>Error loading experience</p>';
}

function populateProjects(projects) {
    const grid = document.getElementById('projects-grid');
    
    if (!projects || projects.length === 0) {
        grid.innerHTML = '<p>No projects to display</p>';
        return;
    }
    
    grid.innerHTML = projects.map(project => `
        <div class="card">
            <div class="card-tag">${project.tag}</div>
            <h3 class="card-title">${project.title}</h3>
            <p class="card-description">${project.description}</p>
            ${project.link && project.link !== '#' ? `<a href="${project.link}" class="card-link">View Project</a>` : ''}
        </div>
    `).join('');
}

function populateLabs(labs) {
    const grid = document.getElementById('labs-grid');
    
    if (!labs || labs.length === 0) {
        grid.innerHTML = '<p>No labs to display</p>';
        return;
    }
    
    grid.innerHTML = labs.map(lab => `
        <div class="card">
            <div class="card-tag">${lab.tag}</div>
            <h3 class="card-title">${lab.title}</h3>
            <p class="card-description">${lab.description}</p>
            ${lab.link && lab.link !== '#' ? `<a href="${lab.link}" class="card-link">View Lab</a>` : ''}
        </div>
    `).join('');
}

function populateExperience(experience) {
    const container = document.getElementById('experience-list');
    
    if (!experience || experience.length === 0) {
        container.innerHTML = '<p>No experience to display</p>';
        return;
    }
    
    container.innerHTML = experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3 class="timeline-role">${exp.role}</h3>
                <div class="timeline-company">${exp.company}</div>
                <div class="timeline-period">${exp.period}</div>
                <div class="timeline-location">${exp.location}</div>
                <p class="timeline-summary">${exp.summary}</p>
            </div>
        </div>
    `).join('');
}