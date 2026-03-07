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

    // Matrix Rain Effect
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width, height, columns;
        const fontSize = 16;
        const rainDrops = [];

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const initMatrix = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const newColumns = Math.floor(width / fontSize);

            for (let x = 0; x < newColumns; x++) {
                if (rainDrops[x] === undefined) {
                    rainDrops[x] = 1;
                }
            }

            columns = newColumns;
        };

        initMatrix();

        // Check for prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const draw = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#06b6d4'; // Theme Cyan
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < columns; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        // Use requestAnimationFrame instead of setInterval for better performance
        if (!prefersReducedMotion) {
            const animateMatrix = () => {
                draw();
                requestAnimationFrame(animateMatrix);
            };
            animateMatrix();
        }

        window.addEventListener('resize', () => {
            initMatrix();
        });
    }

    // Typewriter Effect
    const text = "I specialize in cybersecurity, focusing on System Auditing, Compliance (GRC), and Risk Assessment. I bring a strong analytical rigor to identifying technical vulnerabilities and understanding their impact on organizational assets. With skills in C++, Python, and network security, I build tools and solutions to strengthen digital defenses. I am also a former Digital Marketing Tutor, passionate about clear communication and technical mentorship.";

    const speed = 30; // Faster typing speed
    let i = 0;
    const element = document.getElementById("typewriter-text");

    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i); // Use textContent to avoid stripping cursor

            // Ensure cursor class is active
            if (!element.classList.contains("typing-cursor")) {
                element.classList.add("typing-cursor");
            }

            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Typing complete, keep cursor blinking
        }
    }

    // Start typing when About section is in view
    let typingStarted = false;
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingStarted) {
                typingStarted = true;
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
    // Active Navigation Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // System Log Easter Egg
    const logTrigger = document.getElementById('system-log-trigger');
    const logOverlay = document.getElementById('system-log-overlay');
    const closeLog = document.querySelector('.close-log');
    const logContent = document.getElementById('log-content');

    const logMessages = [
        "Initializing secure handshake...",
        "Verifying cryptographic signatures...",
        "Scanning port 443 [HTTPS]...",
        "Traffic analysis: NORMAL",
        "Buffer overflow protection: ACTIVE",
        "Firewall rules: ENFORCED",
        "Loading modules: [GRC_V2.0, AUDIT_CORE]",
        "Identity verified: LOUIS.SEC"
    ];

    let logInterval;

    function addLogLine() {
        const line = document.createElement('div');
        line.classList.add('log-line');
        const timestamp = new Date().toLocaleTimeString('en-GB');
        const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
        line.innerHTML = `<span style="color:#64748b">[${timestamp}]</span> ${msg}`;

        logContent.appendChild(line);

        // Auto scroll
        if (logContent.children.length > 8) {
            logContent.removeChild(logContent.firstChild);
        }
    }

    if (logTrigger && logOverlay) {
        logTrigger.addEventListener('click', () => {
            logOverlay.classList.remove('hidden');
            setTimeout(() => logOverlay.classList.add('active'), 10);

            // Start generating logs
            clearInterval(logInterval);
            logInterval = setInterval(addLogLine, 800);
        });

        closeLog.addEventListener('click', () => {
            logOverlay.classList.remove('active');
            setTimeout(() => logOverlay.classList.add('hidden'), 400);
            clearInterval(logInterval);
        });
    }

    // ==========================================
    // CONTACT BUTTON INTERACTION
    // ==========================================
    const contactBtn = document.getElementById('dynamic-contact-btn');
    const contactReveal = document.getElementById('contact-reveal');
    const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Initialize contact button
    if (contactBtn) {
        const btnTextSpan = contactBtn.querySelector('.btn-text');
        if (btnTextSpan) btnTextSpan.textContent = 'DECRYPT CONTACT';
    }

    // Interaction Click Handler
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            // Cyber Mode: Decrypt Animation
            const originalText = "ACCESS GRANTED";
            const btnText = contactBtn.querySelector('.btn-text');
            let iterations = 0;
            const interval = setInterval(() => {
                if (btnText) {
                    btnText.innerText = originalText.split('')
                        .map((letter, index) => {
                            if (index < iterations) {
                                return originalText[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join('');
                }

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    // After decryption, show content
                    setTimeout(() => {
                        contactReveal.classList.add('visible-reveal');
                        contactBtn.style.border = "1px solid #22c55e"; // Green
                        contactBtn.style.color = "#22c55e";
                    }, 500);
                }
                iterations += 1 / 2; // Speed control
            }, 30);
        });
    }
});
