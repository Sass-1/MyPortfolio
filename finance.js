document.addEventListener('DOMContentLoaded', () => {
    console.log("%c FINANCE MODE %c Louis Portfolio - Financial Audit ", "background: #002147; color: #D4AF37; padding: 2px 5px; font-weight: bold;", "background: #D4AF37; color: #002147; padding: 2px 5px;");

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // ANIMATION FUNCTIONS
    // ==========================================

    // Animate counter values
    function animateCounters() {
        const counters = document.querySelectorAll('[data-target]');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            if (!target || isNaN(target)) return;

            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Cubic ease-out
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const current = easeProgress * target;

                // Check if it's a percentage display
                if (counter.textContent.includes('%')) {
                    counter.innerText = current.toFixed(1) + '%';
                } else {
                    counter.innerText = current.toFixed(1);
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    if (counter.textContent.includes('%')) {
                        counter.innerText = target.toFixed(1) + '%';
                    } else {
                        counter.innerText = target.toFixed(1);
                    }
                }
            }
            requestAnimationFrame(update);
        });
    }

    // Animate asset bars
    function animateAssetBars() {
        const bars = document.querySelectorAll('.asset-bar-fill');
        bars.forEach((bar, index) => {
            const width = bar.style.getPropertyValue('--width');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100 + (index * 150));
        });
    }

    // Animate metric bars
    function animateMetricBars() {
        const bars = document.querySelectorAll('.metric-fill');
        bars.forEach((bar, index) => {
            const width = bar.style.getPropertyValue('--width');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100 + (index * 200));
        });
    }

    // ==========================================
    // INTERSECTION OBSERVERS
    // ==========================================

    // Animate elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on section
                if (entry.target.id === 'hero') {
                    setTimeout(animateCounters, 300);
                    setTimeout(animateMetricBars, 500);
                }
                if (entry.target.id === 'skills') {
                    setTimeout(animateAssetBars, 300);
                }
            }
        });
    }, { threshold: 0.2 });

    // Observe all sections
    document.querySelectorAll('.section-container, .hero-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        animateOnScroll.observe(section);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Initial animations for hero (in case already visible)
    setTimeout(() => {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
            animateCounters();
            animateMetricBars();
        }
    }, 100);

    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ==========================================

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn-primary)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
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

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================

    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // CONTACT BUTTON INTERACTION
    // ==========================================

    const contactBtn = document.getElementById('dynamic-contact-btn');
    const contactReveal = document.getElementById('contact-reveal');

    if (contactBtn && contactReveal) {
        contactBtn.addEventListener('click', () => {
            contactReveal.classList.toggle('active');
            
            if (contactReveal.classList.contains('active')) {
                contactBtn.querySelector('.btn-text').textContent = 'HIDE CONTACT';
            } else {
                contactBtn.querySelector('.btn-text').textContent = 'ACCESS CONTACT';
            }
        });
    }

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // SERVICE CARD HOVER EFFECTS
    // ==========================================

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#D4AF37';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        });
    });

    // ==========================================
    // STOCK CARD INTERACTIONS
    // ==========================================

    const stockCards = document.querySelectorAll('.stock-card');
    stockCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const header = card.querySelector('.ticker-change');
            if (header) {
                header.style.transform = 'scale(1.1)';
            }
        });
        card.addEventListener('mouseleave', () => {
            const header = card.querySelector('.ticker-change');
            if (header) {
                header.style.transform = 'scale(1)';
            }
        });
    });

    // Add CSS for ticker change animation
    const tickerStyle = document.createElement('style');
    tickerStyle.innerHTML = `
        .ticker-change {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(tickerStyle);
});
