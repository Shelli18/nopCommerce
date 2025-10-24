/**
 * Mobile Navigation (Adidas-style)
 * Hamburger menu with drawer navigation and mobile search overlay
 */
(function() {
    'use strict';

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('BobMag: Mobile navigation initialized');

        // Create mobile navigation elements
        createMobileHeader();
        createMobileDrawer();
        createMobileSearchOverlay();

        // Setup event listeners
        setupEventListeners();
    }

    function createMobileHeader() {
        const headerLower = document.querySelector('.header-lower');
        if (!headerLower) return;

        // Create hamburger menu toggle
        const menuToggle = document.createElement('div');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰'; // Hamburger icon
        menuToggle.setAttribute('aria-label', 'Menü öffnen');

        // Create mobile icons container
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'mobile-header-icons';

        // Search icon (Adidas-style SVG)
        const searchIcon = document.createElement('div');
        searchIcon.className = 'search-icon';
        searchIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0909 6C9.62242 6 6 9.62242 6 14.0909C6 18.5594 9.62242 22.1818 14.0909 22.1818C16.3253 22.1818 18.3473 21.2768 19.812 19.812C21.2768 18.3473 22.1818 16.3253 22.1818 14.0909C22.1818 9.62242 18.5594 6 14.0909 6ZM5 14.0909C5 9.07014 9.07014 5 14.0909 5C19.1117 5 23.1818 9.07014 23.1818 14.0909C23.1818 16.4212 22.3045 18.5474 20.863 20.1559L27.3536 26.6464L26.6464 27.3536L20.1559 20.863C18.5474 22.3045 16.4212 23.1818 14.0909 23.1818C9.07014 23.1818 5 19.1117 5 14.0909Z" fill="currentColor"></path></svg>';
        searchIcon.setAttribute('aria-label', 'Suche öffnen');

        // Wishlist icon (get from existing header-links)
        const wishlistLink = document.querySelector('.header-links .ico-wishlist');
        if (wishlistLink) {
            const wishlistIcon = document.createElement('div');
            wishlistIcon.className = 'wishlist-icon';
            wishlistIcon.innerHTML = '♡';
            wishlistIcon.onclick = () => window.location.href = wishlistLink.getAttribute('href');

            const wishlistQty = wishlistLink.querySelector('.wishlist-qty');
            if (wishlistQty && wishlistQty.textContent.trim() !== '0') {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = wishlistQty.textContent;
                wishlistIcon.appendChild(badge);
            }
            iconsContainer.appendChild(wishlistIcon);
        }

        // Cart icon (get from existing header-links)
        const cartLink = document.querySelector('.header-links .ico-cart');
        if (cartLink) {
            const cartIcon = document.createElement('div');
            cartIcon.className = 'cart-icon';
            cartIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 2.75C1 2.33579 1.33579 2 1.75 2H2.27029C3.34283 2 4.26626 2.75703 4.4766 3.80874L4.71485 5H20.2676C21.3791 5 22.209 6.02281 21.98 7.11052L20.5682 13.8165C20.3003 15.0891 19.1777 16 17.8772 16H7.63961C6.32874 16 5.20009 15.0747 4.94301 13.7893L3.00573 4.10291C2.93562 3.75234 2.6278 3.5 2.27029 3.5H1.75C1.33579 3.5 1 3.16421 1 2.75ZM6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21C6.89543 21 6 20.1046 6 19ZM15 19C15 17.8954 15.8954 17 17 17C18.1046 17 19 17.8954 19 19C19 20.1046 18.1046 21 17 21C15.8954 21 15 20.1046 15 19Z"></path></svg>';
            cartIcon.onclick = () => window.location.href = cartLink.getAttribute('href');

            const cartQty = cartLink.querySelector('.cart-qty');
            if (cartQty && cartQty.textContent.trim() !== '0') {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = cartQty.textContent;
                cartIcon.appendChild(badge);
            }
            iconsContainer.appendChild(cartIcon);
        }

        iconsContainer.insertBefore(searchIcon, iconsContainer.firstChild);

        // Insert into header
        headerLower.insertBefore(menuToggle, headerLower.firstChild);
        headerLower.appendChild(iconsContainer);
    }

    function createMobileDrawer() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';

        // Create drawer
        const drawer = document.createElement('div');
        drawer.className = 'mobile-nav-drawer';

        // Drawer header
        const drawerHeader = document.createElement('div');
        drawerHeader.className = 'drawer-header';
        drawerHeader.innerHTML = `
            <div style="font-weight: 600; font-size: 18px;">Menü</div>
            <div class="close-drawer" aria-label="Menü schließen">✕</div>
        `;

        // Drawer menu (copy from desktop menu)
        const drawerMenu = document.createElement('ul');
        drawerMenu.className = 'drawer-menu';

        // Get desktop menu items (ONLY top-level items, not nested submenu items)
        const desktopMenu = document.querySelector('.menu-container .menu');
        if (desktopMenu) {
            // Get only DIRECT children of .menu to avoid getting submenu items
            const menuItems = desktopMenu.querySelectorAll(':scope > .menu__item');
            console.log('BobMag: Found', menuItems.length, 'top-level menu items');

            menuItems.forEach(item => {
                const link = item.querySelector(':scope > .menu__link, :scope > .menu__item-toggle > .menu__link');
                if (!link) return;

                const li = document.createElement('li');
                li.className = 'menu-item';

                const hasSubmenu = item.classList.contains('menu-dropdown');

                if (hasSubmenu) {
                    const button = document.createElement('button');
                    button.type = 'button'; // Important: prevent form submit
                    button.textContent = link.textContent.trim();
                    button.innerHTML += ' <span class="arrow">►</span>'; // Right arrow when closed

                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        const submenu = this.nextElementSibling;
                        console.log('BobMag: Button clicked, submenu:', submenu);

                        if (submenu) {
                            const isOpen = submenu.classList.toggle('open');
                            console.log('BobMag: Submenu classes:', submenu.className);
                            console.log('BobMag: Submenu toggled', isOpen ? 'open' : 'closed');

                            // Arrow points down when open, right when closed
                            const arrow = this.querySelector('.arrow');
                            if (arrow) {
                                arrow.textContent = isOpen ? '▼' : '►';
                            }
                        } else {
                            console.error('BobMag: No submenu found!');
                        }
                    });

                    li.appendChild(button);

                    // Create submenu - get ONLY direct children to avoid duplicates
                    const desktopSubmenu = item.querySelector('.menu__list-view, .menu__grid-view');
                    console.log('BobMag: Desktop submenu found for', link.textContent.trim(), ':', desktopSubmenu);

                    if (desktopSubmenu) {
                        const subMenuEl = document.createElement('ul');
                        subMenuEl.className = 'submenu';

                        // Try different selectors to find submenu items
                        let subItems = desktopSubmenu.querySelectorAll(':scope > .menu__item-link');

                        // Fallback: try getting all links if specific selector doesn't work
                        if (subItems.length === 0) {
                            console.log('BobMag: No items with :scope > .menu__item-link, trying .menu__link');
                            subItems = desktopSubmenu.querySelectorAll('.menu__link');
                        }

                        console.log('BobMag: Found', subItems.length, 'submenu items for', link.textContent.trim());

                        subItems.forEach(subItem => {
                            const subLink = subItem.classList.contains('menu__link') ? subItem : subItem.querySelector('.menu__link');
                            if (subLink) {
                                const subLi = document.createElement('li');
                                const subA = document.createElement('a');
                                subA.href = subLink.getAttribute('href') || '#';
                                subA.textContent = subLink.textContent.trim();
                                subLi.appendChild(subA);
                                subMenuEl.appendChild(subLi);
                            }
                        });

                        // Only append if we have items
                        if (subMenuEl.children.length > 0) {
                            li.appendChild(subMenuEl);
                            console.log('BobMag: Submenu appended with', subMenuEl.children.length, 'items');
                        } else {
                            console.warn('BobMag: No submenu items created for', link.textContent.trim());
                        }
                    } else {
                        console.warn('BobMag: No desktop submenu found for', link.textContent.trim());
                    }
                } else {
                    const a = document.createElement('a');
                    a.href = link.getAttribute('href') || '#';
                    a.textContent = link.textContent.trim();
                    li.appendChild(a);
                }

                drawerMenu.appendChild(li);
            });
        }

        // Drawer footer (account links)
        const drawerFooter = document.createElement('div');
        drawerFooter.className = 'drawer-footer';

        const headerLinks = document.querySelector('.header-links');
        if (headerLinks) {
            const accountLink = headerLinks.querySelector('a[href*="customer"]');
            if (accountLink) {
                const a = document.createElement('a');
                a.href = accountLink.getAttribute('href');
                a.textContent = accountLink.textContent.trim();
                drawerFooter.appendChild(a);
            }
        }

        drawer.appendChild(drawerHeader);
        drawer.appendChild(drawerMenu);
        drawer.appendChild(drawerFooter);

        document.body.appendChild(overlay);
        document.body.appendChild(drawer);
    }

    function createMobileSearchOverlay() {
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'mobile-search-overlay';

        const desktopSearchBox = document.querySelector('.search-box');
        const searchAction = desktopSearchBox ? desktopSearchBox.querySelector('form')?.getAttribute('action') : '/search';

        searchOverlay.innerHTML = `
            <div class="search-header">
                <div class="back-button" aria-label="Zurück">‹</div>
                <form action="${searchAction}" method="get">
                    <input type="text" name="q" class="search-input" placeholder="Suche..." autocomplete="off" />
                </form>
            </div>
            <div class="search-results"></div>
        `;

        document.body.appendChild(searchOverlay);
    }

    function setupEventListeners() {
        // Hamburger menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const drawer = document.querySelector('.mobile-nav-drawer');
        const overlay = document.querySelector('.mobile-nav-overlay');
        const closeDrawer = document.querySelector('.close-drawer');

        if (menuToggle && drawer && overlay) {
            menuToggle.addEventListener('click', () => {
                drawer.classList.add('open');
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            });

            closeDrawer?.addEventListener('click', () => {
                drawer.classList.remove('open');
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            });

            overlay.addEventListener('click', () => {
                drawer.classList.remove('open');
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        }

        // Search icon toggle
        const searchIcon = document.querySelector('.search-icon');
        const searchOverlay = document.querySelector('.mobile-search-overlay');
        const backButton = searchOverlay?.querySelector('.back-button');
        const searchInput = searchOverlay?.querySelector('.search-input');

        if (searchIcon && searchOverlay) {
            searchIcon.addEventListener('click', () => {
                searchOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
                // Focus search input
                setTimeout(() => searchInput?.focus(), 100);
            });

            backButton?.addEventListener('click', () => {
                searchOverlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        }
    }
})();
