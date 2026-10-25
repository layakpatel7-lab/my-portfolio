/* ===== Layak Patel Portfolio - Master Script ===== */

document.addEventListener("DOMContentLoaded", () => {
    /* ===== 1. Typing Animation ===== */
    const typingText = document.getElementById("typing-text");

    if (typingText) {
        const roles = [
            "Frontend Developer",
            "Python Developer",
            "Computer Science Student",
            "Aspiring Software Engineer"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typingText.textContent = currentRole.slice(0, characterIndex);

            let typingSpeed = isDeleting ? 40 : 85;

            if (!isDeleting && characterIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1600; // Pause at end of word
            } else if (isDeleting && characterIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400; // Pause before typing next word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    /* ===== 2. Mobile Menu Toggle ===== */
    const menuToggle = document.getElementById("menu-toggle");
    const navLinksContainer = document.getElementById("nav-links");

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
        });

        // Close mobile menu on clicking any navigation link
        navLinksContainer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinksContainer.classList.remove("active");
            });
        });
    }

    /* ===== 3. Active Navigation Link on Scroll ===== */
    const sections = document.querySelectorAll(
        "#home, #about, #skills, #projects, #education, #resume, #contact"
    );
    const navLinks = document.querySelectorAll(".nav-links a:not(.btn-nav)");

    function updateActiveNavLink() {
        let currentSectionId = "home";
        const scrollOffset = window.scrollY + 180;

        sections.forEach((section) => {
            if (scrollOffset >= section.offsetTop) {
                currentSectionId = section.id;
            }
        });

        // If user scrolled to the very bottom, activate Contact
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 20
        ) {
            currentSectionId = "contact";
        }

        navLinks.forEach((link) => {
            const isTarget = link.getAttribute("href") === `#${currentSectionId}`;
            link.classList.toggle("active", isTarget);

            if (isTarget) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavLink, { passive: true });
    window.addEventListener("resize", updateActiveNavLink);
    updateActiveNavLink();

    /* ===== 4. Tactile Feedback on Resume Download ===== */
    const resumeDownloadButtons = document.querySelectorAll(
        "#hero-resume-download, #resume-download-btn, .btn-nav"
    );

    resumeDownloadButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const labelSpan = btn.querySelector("span");
            if (!labelSpan) return;

            const originalText = labelSpan.textContent;
            labelSpan.textContent = "Downloading...";

            setTimeout(() => {
                labelSpan.textContent = "Downloaded! ✓";
            }, 600);

            setTimeout(() => {
                labelSpan.textContent = originalText;
            }, 2600);
        });
    });
});
