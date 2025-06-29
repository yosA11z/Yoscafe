document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };


    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                entry.target.classList.add('visible');
               
                observer.unobserve(entry.target);
            }
        });
    };

   
    const observer = new IntersectionObserver(observerCallback, observerOptions);

   
    const sectionTitles = document.querySelectorAll('.products-section h2, .history-section h2, .experiences-section h2');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`; 
        observer.observe(item);
    });

   
    const historyContent = document.querySelector('.history-content');
    const historyImage = document.querySelector('.history-image');
    if (historyContent) {
        
        historyContent.style.animationDelay = '0.1s';
        historyContent.classList.add('animate-slide-right'); 
        observer.observe(historyContent);
    }
    if (historyImage) {
        historyImage.style.animationDelay = '0.3s'; 
        historyImage.classList.add('animate-fade-in-zoom-in'); 
        observer.observe(historyImage);
    }

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`; 
        observer.observe(card);
    });

    
    const thankYouSection = document.querySelector('.thank-you-section .content-wrapper');
    if (thankYouSection) {
        thankYouSection.style.animationDelay = '0.5s';
        observer.observe(thankYouSection);
    }

    
    const heroVideo = document.getElementById('heroVideo');
    const volumeControl = document.getElementById('volumeControl');
    const volumeIconMuted = document.getElementById('volumeIconMuted');
    const volumeIconHigh = document.getElementById('volumeIconHigh');

    if (heroVideo && volumeControl) {
        
        volumeControl.classList.add('animate-pulse');

        volumeControl.addEventListener('click', () => {
            if (heroVideo.muted) {
                heroVideo.muted = false;
                volumeIconMuted.style.display = 'none';
                volumeIconHigh.style.display = 'block';
                volumeControl.classList.remove('animate-pulse');
            } else {
                heroVideo.muted = true;
                volumeIconMuted.style.display = 'block';
                volumeIconHigh.style.display = 'none';
                
            }
        });

    
        heroVideo.addEventListener('volumechange', () => {
            if (heroVideo.muted) {
                volumeIconMuted.style.display = 'block';
                volumeIconHigh.style.display = 'none';
                volumeControl.classList.add('animate-pulse');
            } else {
                volumeIconMuted.style.display = 'none';
                volumeIconHigh.style.display = 'block';
                volumeControl.classList.remove('animate-pulse');
            }
        });
    }
    
});