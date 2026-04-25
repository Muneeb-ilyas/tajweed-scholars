document.addEventListener("DOMContentLoaded", () => {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        let index = 0;
        
        function typeWriter() {
            if (index < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(typeWriter, 40); 
            } else {
                typewriterElement.style.borderRight = 'none'; 
            }
        }
        setTimeout(typeWriter, 500); 
    }

    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.anim-blur-in, .anim-pop-in').forEach(el => {
        observer.observe(el);
    });

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

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if(ans !== answer) {
                    ans.classList.remove('open');
                    ans.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            answer.classList.toggle('open');
            if(answer.classList.contains('open')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});

function openModal() {
    document.getElementById('license-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    document.getElementById('license-modal').classList.add('hidden');
    document.body.style.overflow = 'auto'; 
}

document.addEventListener('keydown', function (event) { 
    if (event.key === "Escape") closeModal(); 
});
