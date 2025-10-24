// =====================================================
// Product Variants Dropdown System
// =====================================================
// Custom dropdown/modal system for product variant selection
// Extracted from old ProductTemplate.VariantsDropdown.cshtml

(function ($) {
    'use strict';

    /**
     * Initialize the Variants Dropdown System
     * This creates a modal/dropdown for selecting product variants
     */
    function initVariantsDropdown() {
        const dropdownToggle = document.querySelector(".variant-dropdown-toggle");
        const variantsHeader = document.querySelector(".variants-header");
        const variantModal = document.getElementById("variantModal");
        const closeButton = document.querySelector(".close-button");
        const variantList = document.querySelector(".variant-list");
        const addtocartSection = document.querySelector(".variant-addtocart-section");

        // Check if all required elements exist
        if (!dropdownToggle || !variantModal || !closeButton || !variantList || !addtocartSection) {
            return; // Elements not found, exit gracefully
        }

        /**
         * Open the variant selection modal
         */
        function openModal() {
            variantModal.style.display = "block";
        }

        /**
         * Close the variant selection modal
         */
        function closeModal() {
            variantModal.style.display = "none";
        }

        /**
         * Check if device is mobile based on viewport width
         * @returns {boolean}
         */
        function isMobileDevice() {
            return window.innerWidth <= 768;
        }

        /**
         * Update the toggle button content with selected variant info
         * @param {string} variantName - Name of the variant
         * @param {string} priceHtml - HTML string for price display
         * @param {boolean} inStock - Whether variant is in stock
         * @param {string} stockAvailability - Stock availability text from server
         */
        function updateToggleButton(variantName, priceHtml, inStock, stockAvailability) {
            const stockClass = inStock ? 'in-stock' : 'out-of-stock';
            const stockText = stockAvailability || (inStock ? 'Verfügbar' : 'Nicht verfügbar');

            const newButtonContent = `
                <div class="button-content">
                    <div class="button-left">
                        <div class="variant-name"><strong>${variantName}</strong></div>
                        <div class="variant-availability">
                            <span class="${stockClass}">${stockText}</span>
                        </div>
                    </div>
                    <div class="button-right">
                        ${priceHtml}
                    </div>
                    <div class="button-arrow-row">
                        <span class="arrow-icon">▼</span>
                    </div>
                </div>
            `;

            dropdownToggle.innerHTML = newButtonContent;
        }

        /**
         * Show the AddToCart block for a specific variant
         * @param {string} variantId - The variant ID
         */
        function showVariantAddToCart(variantId) {
            // Hide all AddToCart blocks
            const allAddToCartBlocks = document.querySelectorAll(".addtocart-block");
            allAddToCartBlocks.forEach(block => block.style.display = "none");

            // Show the target AddToCart block
            const targetBlock = document.getElementById("addtocart-block-" + variantId);
            if (targetBlock) {
                targetBlock.style.display = "block";
            }
        }

        /**
         * Show the Wishlist block for a specific variant
         * @param {string} variantId - The variant ID
         */
        function showVariantWishlist(variantId) {
            // Hide all Wishlist blocks
            const allWishlistBlocks = document.querySelectorAll(".wishlist-block");
            allWishlistBlocks.forEach(block => block.style.display = "none");

            // Show the target Wishlist block
            const targetBlock = document.getElementById("wishlist-block-" + variantId);
            if (targetBlock) {
                targetBlock.style.display = "contents"; // Use contents to maintain flex layout
            }
        }

        /**
         * Handle variant selection
         * @param {HTMLElement} item - The clicked variant list item
         */
        function selectVariant(item) {
            // Check if variant is disabled
            if (item.classList.contains("variant-disabled")) {
                return; // No action for disabled variants
            }

            // Get all variant items
            const items = variantList.querySelectorAll(".variant-item");

            // Remove selected class from all items
            items.forEach(i => i.classList.remove("variant-selected"));

            // Mark this item as selected
            item.classList.add("variant-selected");

            // Get variant data from attributes
            const variantId = item.getAttribute("data-variantid");
            if (!variantId) {
                console.error("Variant ID fehlt!");
                return;
            }

            const variantName = item.getAttribute("data-variantname") || "Unbekannt";
            const variantInStock = item.getAttribute("data-instock") === "true";
            const stockAvailability = item.getAttribute("data-stockavailability") || "";

            // Get price HTML from hidden element
            const priceHtmlElement = document.getElementById(`price-html-${variantId}`);
            if (!priceHtmlElement) {
                console.error(`Preis-HTML für Variante ID ${variantId} nicht gefunden.`);
                return;
            }
            const priceHtml = priceHtmlElement.innerHTML || "";

            // Update the toggle button
            updateToggleButton(variantName, priceHtml, variantInStock, stockAvailability);

            // Close the modal
            closeModalWithListeners();

            // Show the correct AddToCart block
            showVariantAddToCart(variantId);

            // Show the correct Wishlist block
            showVariantWishlist(variantId);
        }

        // =====================================================
        // Event Listeners
        // =====================================================

        // Click on toggle button opens modal
        dropdownToggle.addEventListener("click", function(event) {
            event.stopPropagation();
            openModalWithListeners();
        });

        // Click on variants header also opens modal
        if (variantsHeader) {
            variantsHeader.addEventListener("click", function(event) {
                event.stopPropagation();
                openModalWithListeners();
            });
        }

        // Click on close button closes modal
        closeButton.addEventListener("click", function() {
            closeModalWithListeners();
        });

        // Click outside modal closes it
        // We need to use a timeout to avoid immediate closing when opening
        let isModalOpen = false;

        function handleClickOutside(event) {
            if (!isModalOpen) return;

            // Check if click is outside the dropdown container
            const dropdownContainer = variantModal.closest('.variant-dropdown-container');
            if (dropdownContainer && !dropdownContainer.contains(event.target)) {
                closeModal();
            }
        }

        // Add click outside listener when modal opens
        function openModalWithListeners() {
            openModal();
            isModalOpen = true;
            // Small delay to prevent immediate closing
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 100);
        }

        // Remove listener when modal closes
        function closeModalWithListeners() {
            closeModal();
            isModalOpen = false;
            document.removeEventListener('click', handleClickOutside);
        }

        // ESC key closes modal
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && isModalOpen) {
                closeModalWithListeners();
            }
        });

        // Click on variant items
        const items = variantList.querySelectorAll(".variant-item");
        items.forEach(item => {
            item.addEventListener("click", function() {
                selectVariant(item);
            });
        });
    }

    // =====================================================
    // Initialize on DOM Ready
    // =====================================================
    $(document).ready(function() {
        initVariantsDropdown();
    });

    // Re-initialize after AJAX updates (for dynamic content)
    $(document).ajaxComplete(function() {
        setTimeout(initVariantsDropdown, 100);
    });

})(jQuery);
