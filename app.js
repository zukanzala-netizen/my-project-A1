document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES ---
    const header = document.querySelector('.main-header'); // Fixed selector
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    
    // --- SCROLL EFFECTS ---
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY; // Modern standard
        
        // Header background toggle
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE MENU ---
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active'); // Correct class toggling
        // Toggle icon between hamburger and close (optional visual flare)
        const icon = menuToggle.querySelector('i');
        if(icon) {
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate sending
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            
            setTimeout(() => {
                alert('Message sent! We will get back to you shortly.');
                contactForm.reset(); // Fixed typo
                btn.innerText = originalText;
            }, 1500);
        });
    }

    // --- INTERSECTION OBSERVER (Scroll Animations) ---
    // This makes elements fade in as they enter the screen
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Target elements to animate
    document.querySelectorAll('.project-card, .contact-info, #contact-form').forEach(el => {
        observer.observe(el);
    });

    // --- IMAGE LAZY-LOAD + FALLBACK (makes images appear reliably) ---
    // Load images normally (keep their src so they appear immediately)
    const projectImages = document.querySelectorAll('.project-image-container img');

    projectImages.forEach(img => {
        img.loading = 'lazy'; // optional native lazy loading
        img.classList.add('project-img');

        img.addEventListener('error', () => {
            img.src = 'https://via.placeholder.com/600x400?text=Image+not+found';
            img.classList.add('loaded');
            img.closest('.project-card')?.classList.add('visible');
        });

        if (img.complete && img.naturalWidth !== 0) {
            img.classList.add('loaded');
            img.closest('.project-card')?.classList.add('visible');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                img.closest('.project-card')?.classList.add('visible');
            });
        }
    });

    // --- MOBILE CONTACT HELPERS ---
    // Ensure contact form is easy to use on small phones: add a helper class and autofocus name field
    function adaptContactForMobile() {
        if (window.innerWidth <= 600) {
            const contact = document.querySelector('.contact') || document.querySelector('.contact-container') || document.querySelector('.contact-section');
            if (contact) contact.classList.add('mobile-contact');
            const firstInput = document.querySelector('#contact-form input[name="name"]') || document.querySelector('#contact-form input');
            if (firstInput) firstInput.setAttribute('autofocus', '');
        }
    }

    adaptContactForMobile();
    window.addEventListener('resize', () => {
        adaptContactForMobile();
    });
});
