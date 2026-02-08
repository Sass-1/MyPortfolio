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

        setInterval(draw, 30);

        window.addEventListener('resize', () => {
            initMatrix();
        });
    }

    // Typewriter Effect
    const text = "I bridge the gap between technical infrastructure security and financial integrity. With a solid foundation in Accounting and Finance, I bring a unique analytical rigor to cybersecurity, specializing in System Auditing, Compliance (GRC), and Risk Assessment. My background allows me to understand not just the technical vulnerability, but its impact on the organization’s assets. I am also a former Digital Marketing Tutor, passionate about clear communication and technical mentorship.";

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
        "Financial integrity check: PASSED",
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
    // MODE SWITCHER LOGIC (SLIDING TOGGLE)
    // ==========================================
    const modeToggleContainer = document.getElementById('mode-toggle-container');
    const modeCyber = document.getElementById('mode-cyber');
    const modeFinance = document.getElementById('mode-finance');

    // Hero Element References
    const heroName = document.querySelector('.long-name');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const typewriterElement = document.getElementById("typewriter-text");

    // Bio Content
    const bioCyber = "Focus on offensive security operations, penetration testing, and infrastructure resilience analysis. Specialized in PhishDetector development and network reconnaissance.";
    const bioFinance = "Dedicated to financial integrity, regulatory compliance (ECC), and governance auditing. Applying rigorous analytical methodology to detect fraud and ensure data accuracy.";

    // Finance Ticker Animation
    function animateFinanceNumbers() {
        const counters = document.querySelectorAll('.chart-value');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            if (!target) return;

            const duration = 2000; // ms
            const start = 0;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out quart
                const ease = 1 - Math.pow(1 - progress, 4);

                const current = start + (target - start) * ease;
                counter.innerText = current.toFixed(1);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target.toFixed(1);
                }
            }
            requestAnimationFrame(update);
        });
    }

    // Function to set theme
    function setTheme(theme) {
        if (theme === 'finance') {
            document.body.setAttribute('data-theme', 'finance');
            if (modeToggleContainer) modeToggleContainer.classList.add('finance-active');

            // Trigger animation
            setTimeout(animateFinanceNumbers, 300); // Slight delay for transition

            if (modeFinance) modeFinance.classList.add('active');
            if (modeCyber) modeCyber.classList.remove('active');

            // Canvas handled by CSS (display: none)
            if (canvas) canvas.style.opacity = '0';

            // Dynamic Hero Content (Finance)
            if (heroName) heroName.innerHTML = `Dülze Hkloë Sassie Shaikelta <br><span class="gradient-text">LOUIS</span>`;

            // Update Bio
            if (typewriterElement) {
                typewriterElement.textContent = bioFinance;
            }

        } else {
            document.body.removeAttribute('data-theme');
            if (modeToggleContainer) modeToggleContainer.classList.remove('finance-active');

            if (modeCyber) modeCyber.classList.add('active');
            if (modeFinance) modeFinance.classList.remove('active');

            // Canvas handled by CSS
            if (canvas) canvas.style.opacity = '1';

            // Dynamic Hero Content (Cyber)
            if (heroName) heroName.innerHTML = `Dülze Hkloë Sassie Shaikelta <br><span class="gradient-text">LOUIS</span>`;

            // Update Bio
            if (typewriterElement) {
                typewriterElement.textContent = bioCyber;
            }
        }



        // Save preference
        localStorage.setItem('portfolio-theme', theme);
    }

    // Event Listeners
    if (modeToggleContainer) {
        modeToggleContainer.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('portfolio-theme') || 'cyber';
            const newTheme = currentTheme === 'cyber' ? 'finance' : 'cyber';
            setTheme(newTheme);
        });
    }

    // Load saved preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to Cyber
        setTheme('cyber');
    }


    // ==========================================
    // CONTACT BUTTON INTERACTION
    // ==========================================
    const contactBtn = document.getElementById('dynamic-contact-btn');
    const contactReveal = document.getElementById('contact-reveal');
    const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Update button text based on mode immediately
    function updateContactButtonText() {
        if (!contactBtn) return;
        const isFinance = document.body.getAttribute('data-theme') === 'finance';
        const btnTextSpan = contactBtn.querySelector('.btn-text');

        if (isFinance) {
            // Check if already updated to avoid flicker
            if (contactBtn.innerText.includes("View Contact Card")) return;

            contactBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg> <span class="btn-text">View Contact Card</span>`;
        } else {
            if (contactBtn.innerText.includes("DECRYPT CONTACT")) return;
            contactBtn.innerHTML = `<span class="btn-text">DECRYPT CONTACT</span>`;
        }
    }

    // Observe body attribute changes to update button text dynamically
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                updateContactButtonText();
                // Hide reveal if theme changes to reset interaction
                if (contactReveal) contactReveal.classList.remove('visible-reveal');
                if (contactBtn) contactBtn.classList.remove('btn-hidden');
                if (contactBtn) {
                    contactBtn.style.opacity = '1';
                    contactBtn.style.border = "";
                    contactBtn.style.color = "";
                }
            }
        });
    });
    themeObserver.observe(document.body, { attributes: true });

    // Initialize text
    updateContactButtonText();

    // Interaction Click Handler
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const isFinance = document.body.getAttribute('data-theme') === 'finance';

            if (isFinance) {
                // Finance Mode: Smooth Reveal
                contactBtn.style.opacity = '0';
                setTimeout(() => {
                    contactBtn.classList.add('btn-hidden');
                    contactReveal.classList.add('visible-reveal');
                }, 300);
            } else {
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
            }
        });
    }
});
