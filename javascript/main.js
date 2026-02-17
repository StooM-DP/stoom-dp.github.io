document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .platform-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    
    animateOnScroll();

    const downloadTabs = document.querySelectorAll('.download-tab');
    const downloadContents = document.querySelectorAll('.download-content');

    if (downloadTabs.length > 0) {
        downloadTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                downloadTabs.forEach(t => t.classList.remove('active'));
                downloadContents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                if (downloadContents[index]) {
                    downloadContents[index].classList.add('active');
                }
            });
        });
    }

    const cards = document.querySelectorAll('.feature-card, .platform-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            const glow = card.querySelector('.glow');
            if (!glow) {
                const newGlow = document.createElement('div');
                newGlow.className = 'glow';
                newGlow.style.left = `${x}px`;
                newGlow.style.top = `${y}px`;
                card.appendChild(newGlow);
                
                setTimeout(() => {
                    newGlow.remove();
                }, 1000);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    };
    
    updateTheme();
    
    prefersDarkScheme.addListener(updateTheme);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

function downloadFile(fileName, fileUrl) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

if (document.readyState === 'complete') {
    initParticles();
} else {
    window.addEventListener('load', initParticles);
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// e.g. :
// showToast('something executed successfully', 'success');
// showToast('something went wrong', 'error');
// showToast('something important', 'info');
