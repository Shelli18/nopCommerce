// BobMag Theme - JavaScript
(function ($) {
  'use strict';

  $(document).ready(function() {

    // Add JS-ready class
    document.documentElement.classList.add('js-ready');

    // ===== FLOATING BUTTONS =====
    // Buttons werden jetzt komplett über CSS positioniert (siehe _product-card-floating.scss)
    // Kein JavaScript mehr notwendig!

    // ===== TOOLTIPS FÜR BUTTONS =====
    // Fügt title-Attribute zu Buttons hinzu, die keins haben
    function setupButtonTooltips() {
      // Warenkorb-Buttons
      $('.product-box-add-to-cart-button, button[onclick*="addproducttocart"][class*="product-box"]').each(function() {
        if (!$(this).attr('title')) {
          $(this).attr('title', 'In den Warenkorb');
        }
      });

      // Wishlist-Buttons (falls title fehlt)
      $('.add-to-wishlist-button, button[onclick*="wishlist"]').each(function() {
        if (!$(this).attr('title')) {
          $(this).attr('title', 'Zur Wunschliste hinzufügen');
        }
      });

      // Vergleichen-Buttons (falls title fehlt)
      $('.add-to-compare-list-button, button[onclick*="compare"]').each(function() {
        if (!$(this).attr('title')) {
          $(this).attr('title', 'Vergleichen');
        }
      });
    }

    // Initial setup
    setupButtonTooltips();

    // Nach AJAX-Requests erneut ausführen (für dynamisch geladene Produkte)
    $(document).ajaxComplete(function() {
      setTimeout(setupButtonTooltips, 100);
    });

  });

})(jQuery);
