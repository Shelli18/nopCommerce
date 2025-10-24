/**
 * Shrinking Header on Scroll
 * Adds 'scrolled' class to header when user scrolls down
 */
(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Get the header element - try multiple selectors
        const header = document.querySelector('.header') ||
                      document.querySelector('.master-wrapper-page .header');

        if (!header) {
            console.log('BobMag: Header not found for shrinking effect');
            return;
        }

        console.log('BobMag: Shrinking header initialized');

        // Scroll threshold (in pixels) - when to shrink the header
        const scrollThreshold = 50;

        // Function to handle scroll
        function handleScroll() {
            if (window.scrollY > scrollThreshold) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                    console.log('BobMag: Header shrunk');
                }
            } else {
                if (header.classList.contains('scrolled')) {
                    header.classList.remove('scrolled');
                    console.log('BobMag: Header expanded');
                }
            }
        }

        // Add scroll event listener with throttling for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial check in case page is already scrolled on load
        handleScroll();
    }
})();
