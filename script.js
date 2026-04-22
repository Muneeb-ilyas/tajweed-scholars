document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Typewriter Effect Logic (English LTR)
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        let index = 0;
        
        function typeWriter() {
            if (index < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 40); // Speed of typing
            } else {
                // Remove the blinking cursor line when finished
                typewriterElement.style.borderRight = 'none'; 
            }
        }
        
        // Start typing slightly after page load
        setTimeout(typeWriter, 500); 
    }

    // 2. Scroll Animation Observer (Reveals elements smoothly)
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Attach observer to all animated elements
    document.querySelectorAll('.anim-blur-in, .anim-pop-in').forEach(el => {
        observer.observe(el);
    });

    // 3. Mobile Hamburger Menu Toggle Logic
    const mobileBtn = document.getElementById('mobile-toggle');
    const navWrapper = document.getElementById('nav-wrapper');

    if (mobileBtn && navWrapper) {
        mobileBtn.addEventListener('click', () => {
            navWrapper.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navWrapper.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// 4. Modal (Popup) Logic for the Certificate
function openModal() {
    document.getElementById('license-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevents background from scrolling
}

function closeModal() {
    document.getElementById('license-modal').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restores background scrolling
}

// Close modal when user presses the "Escape" key
document.addEventListener('keydown', function (event) { 
    if (event.key === "Escape") closeModal(); 
});