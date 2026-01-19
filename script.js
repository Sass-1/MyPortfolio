document.addEventListener('DOMContentLoaded', () => {
    console.log("%c SYSTEM ONLINE %c Louis Portfolio v1.0 ", "background: #06b6d4; color: black; padding: 2px 5px; font-weight: bold;", "background: #1e293b; color: white; padding: 2px 5px;");

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typing Effect for About Me
    const text = "Cybersecurity Analyst & Accounting Specialist. I bridge the gap between technical security and financial integrity. With a strong background in Finance and Accounting, I apply meticulous analytical rigor to system auditing and risk management. Former Digital Marketing Tutor with a passion for knowledge transfer and leadership.";
    const typingElement = document.getElementById('typewriter-text');
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 20); // Typing speed
        } else {
            typingElement.classList.add('typing-cursor'); // Add blinking cursor at end
        }
    }

    // Start typing when About section is in view
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && index === 0) { // Only start if not started
                typeWriter();
            }
        });
    }, { threshold: 0.5 });

    if (document.getElementById('about')) {
        aboutObserver.observe(document.getElementById('about'));
    }

    // Existing Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-container').forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // CSS class for visible state
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
