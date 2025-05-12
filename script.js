// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        document.getElementById('mobile-menu').classList.remove('active');
    });
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuButton.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeInElements.forEach(element => observer.observe(element));

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing Animation for Hero Subtitle
const typingText = document.querySelector('.typing-text');
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;
function type() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    } else {
        typingText.style.animation = 'none';
    }
}
setTimeout(type, 500);

// Form Submission Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || subject.length < 3 || message.length < 10) {
        contactForm.classList.add('error');
        formMessage.textContent = 'Lütfen tüm alanları doğru şekilde doldurun.';
        formMessage.classList.remove('hidden');
        formMessage.classList.add('text-red-600');
        setTimeout(() => {
            contactForm.classList.remove('error');
            formMessage.classList.add('hidden');
        }, 3000);
        return;
    }
    try {
        const response = await fetch('mail.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        formMessage.textContent = result.message;
        formMessage.classList.remove('hidden');
        formMessage.classList.add(result.status === 'success' ? 'text-green-600' : 'text-red-600');
        if (result.status === 'success') {
            contactForm.classList.add('success');
            contactForm.reset();
        } else {
            contactForm.classList.add('error');
        }
    } catch (error) {
        contactForm.classList.add('error');
        formMessage.textContent = 'Mesaj gönderilirken bir hata oluştu.';
        formMessage.classList.remove('hidden');
        formMessage.classList.add('text-red-600');
    } finally {
        setTimeout(() => {
            contactForm.classList.remove('success', 'error');
            formMessage.classList.add('hidden');
        }, 3000);
    }
});