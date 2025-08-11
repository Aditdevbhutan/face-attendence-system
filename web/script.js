// Smooth scroll and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle navbar background on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Handle mobile menu toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
    
    // Smooth scroll for navigation links
    function smoothScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Handle navigation link clicks
    function handleNavClick(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScroll(href);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }
    
    // Intersection Observer for scroll animations
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }
    
    // Initialize scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        // Elements to animate
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .tech-item, .section-header, .github-content'
        );
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Parallax effect for hero section
    function initParallax() {
        const heroVisual = document.querySelector('.hero-visual');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
        }
        
        // Throttle scroll events for performance
        let ticking = false;
        function handleParallaxScroll() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
                setTimeout(() => ticking = false, 16);
            }
        }
        
        window.addEventListener('scroll', handleParallaxScroll);
    }
    
    // Face scanner animation enhancements
    function enhanceFaceScanner() {
        const detectionPoints = document.querySelectorAll('.point');
        
        // Add random delay variations for more realistic animation
        detectionPoints.forEach((point, index) => {
            const randomDelay = Math.random() * 0.5;
            point.style.animationDelay = `${randomDelay}s`;
        });
        
        // Simulate face detection events
        function simulateDetection() {
            const scannerFrame = document.querySelector('.scanner-frame');
            if (scannerFrame) {
                scannerFrame.style.borderColor = '#10B981'; // Green for detection
                setTimeout(() => {
                    scannerFrame.style.borderColor = '#3B82F6'; // Back to blue
                }, 1000);
            }
        }
        
        // Trigger detection simulation every 5 seconds
        setInterval(simulateDetection, 5000);
    }
    
    // Handle GitHub link with analytics (if needed)
    function handleGitHubClick() {
        // Add any analytics tracking here if needed
        console.log('GitHub repository link clicked');
        
        // Open in new tab
        window.open('https://github.com/Aditdevbhutan/face-attendence-system', '_blank');
    }
    
    // Keyboard navigation enhancement
    function handleKeyboardNavigation(e) {
        // Handle escape key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Handle enter/space on interactive elements
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('hamburger')) {
            e.preventDefault();
            toggleMobileMenu();
        }
    }
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    const debouncedHandleScroll = debounce(handleScroll, 10);
    
    // Event listeners
    window.addEventListener('scroll', debouncedHandleScroll);
    hamburger.addEventListener('click', toggleMobileMenu);
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add click handlers to all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Add click handler to hero CTA button
    document.querySelectorAll('a[href="#features"]').forEach(button => {
        button.addEventListener('click', handleNavClick);
    });
    
    // Handle GitHub buttons
    document.querySelectorAll('a[href*="github"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleGitHubClick();
        });
    });
    
    // Initialize all features
    initScrollAnimations();
    initParallax();
    enhanceFaceScanner();
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Preload critical images for better performance
    function preloadImages() {
        const imagesToPreload = [
            // Add any critical images here
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Add loading complete class for CSS animations
    document.body.classList.add('loaded');
});

// Add CSS for animation states
const style = document.createElement('style');
style.textContent = `
    /* Animation states */
    .feature-card,
    .tech-item,
    .section-header,
    .github-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in,
    .tech-item.animate-in,
    .section-header.animate-in,
    .github-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card.animate-in {
        transition-delay: calc(var(--animation-order, 0) * 0.1s);
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(10, 10, 10, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            backdrop-filter: blur(20px);
            border-top: 1px solid rgba(59, 130, 246, 0.1);
            padding: 20px 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 10px 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
    
    /* Loading state */
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .feature-card,
        .tech-item,
        .section-header,
        .github-content {
            transition: none;
        }
        
        .scan-line,
        .point {
            animation: none;
        }
        
        .grid-overlay {
            animation: none;
        }
    }
`;

document.getElementById("portfolioBtn").addEventListener("click", function() {
    window.open("https://aditport.netlify.app/", "_blank");
});


document.head.appendChild(style);