// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple reveal animation on scroll (optional, but adds nice touch)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to major sections
document.querySelectorAll('.concept-card, .module-card, .res-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(el);
});

// Lightbox Logic for Infographics
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxDownload = document.getElementById('lightbox-download');
    const thumbnails = document.querySelectorAll('.infographic-thumb');

    if (!lightbox) return; // Exit if lightbox not in DOM

    // Open lightbox
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const imgSrc = thumb.getAttribute('src');
            
            // Set image source
            lightboxImg.setAttribute('src', imgSrc);
            
            // Set download link attributes
            lightboxDownload.setAttribute('href', imgSrc);
            // Extract filename from path for the download attribute
            const fileName = imgSrc.split('/').pop();
            lightboxDownload.setAttribute('download', fileName);
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close lightbox function
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Clear src after fade out to avoid ghosting
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
        }, 300);
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Close on X click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});