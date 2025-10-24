# Floating Buttons - HTML Beispiele

## Übersicht

Die Floating Buttons schweben über dem Produktbild und sind rund mit Icons (ohne Text).

**Layout:**
- **Warenkorb-Button**: Rechts unten, groß (56px), grün, Einkaufswagen-Icon
- **Merken-Button**: Rechts oben, klein (40px), weiß mit rotem Herz
- **Vergleich-Button**: Rechts oben unter Merken, klein (40px), weiß mit Waage

---

## HTML-Struktur

### Vollständige Produktkarte mit Floating Buttons

```html
<div class="product-item">
  <!-- Produktbild-Container -->
  <div class="picture">
    <!-- Produktbild -->
    <a href="/produkt/multifit-naturelle">
      <img src="/images/product.jpg" alt="MultiFit naturelle">
    </a>

    <!-- Deal-Badge (links oben) -->
    <span class="ribbon--corner badge--deal">EXKLUSIV</span>

    <!-- FLOATING BUTTONS -->

    <!-- Warenkorb (rechts unten, grün, groß) -->
    <button class="add-to-cart-button-floating" title="In den Warenkorb">
      <span class="button-text">In den Warenkorb</span>
    </button>

    <!-- Merken (rechts oben, weiß mit Herz) -->
    <button class="add-to-wishlist-button-floating" title="Auf die Wunschliste">
      <span class="button-text">Merken</span>
    </button>

    <!-- Vergleichen (rechts oben, drunter) -->
    <button class="add-to-compare-button-floating" title="Zur Vergleichsliste">
      <span class="button-text">Vergleichen</span>
    </button>
  </div>

  <!-- Produkt-Infos -->
  <div class="details">
    <!-- Badge -->
    <span class="badge--inline badge--success">2 Verpackungsgrößen</span>

    <!-- Produkt-Titel -->
    <h3 class="product-title">
      <a href="/produkt/multifit-naturelle">
        MultiFit naturelle...
      </a>
    </h3>

    <!-- Preis -->
    <div class="prices">
      <span class="price">1,75 €</span>
      <span class="tax-shipping-info">(35,00 €/kg)</span>
    </div>
  </div>
</div>
```

---

## CSS-Klassen Übersicht

### Warenkorb-Button (Floating)

```html
<button class="add-to-cart-button-floating">
  <span class="button-text">In den Warenkorb</span>
</button>
```

**Eigenschaften:**
- Position: `absolute` rechts unten (12px Abstand)
- Größe: 56x56px (rund)
- Farbe: Grün (#4e9521)
- Icon: 🛒 (Einkaufswagen Emoji)
- Hover: Dunkler + Scale 1.05

**Alternative mit Font-Awesome:**
```html
<button class="add-to-cart-button-floating with-icon">
  <i class="fa fa-shopping-cart"></i>
  <span class="button-text">In den Warenkorb</span>
</button>
```

### Merken-Button (Floating)

```html
<button class="add-to-wishlist-button-floating">
  <span class="button-text">Merken</span>
</button>
```

**Eigenschaften:**
- Position: `absolute` rechts oben (12px Abstand)
- Größe: 40x40px (rund)
- Farbe: Weiß mit Border
- Icon: ♡ (leeres Herz), beim Hover: ♥ (volles Herz)
- Hover: Rot mit weißem Icon

**Aktiv-Status:**
```html
<button class="add-to-wishlist-button-floating active">
  <span class="button-text">Merken</span>
</button>
```

### Vergleich-Button (Floating)

```html
<button class="add-to-compare-button-floating">
  <span class="button-text">Vergleichen</span>
</button>
```

**Eigenschaften:**
- Position: `absolute` rechts oben, 60px von oben (unter Merken)
- Größe: 40x40px (rund)
- Farbe: Weiß mit Border
- Icon: ⚖ (Waage)
- Hover: Orange mit weißem Icon

---

## nopCommerce Integration

### Option 1: View-Override

In deinem Theme-Override von `_ProductBox.cshtml`:

```cshtml
<div class="product-item">
  <div class="picture">
    <a href="@Model.ProductUrl">
      <img src="@Model.DefaultPictureModel.ImageUrl" alt="@Model.DefaultPictureModel.AlternateText">
    </a>

    @* Warenkorb *@
    @if (Model.ProductPrice.DisableBuyButton)
    {
      <button class="add-to-cart-button-floating" disabled title="@T("ShoppingCart.AddToCart")">
        <span class="button-text">@T("ShoppingCart.AddToCart")</span>
      </button>
    }
    else
    {
      <button class="add-to-cart-button-floating"
              onclick="AjaxCart.addproducttocart_catalog('@Url.RouteUrl("AddProductToCart-Catalog", new { productId = Model.Id })')"
              title="@T("ShoppingCart.AddToCart")">
        <span class="button-text">@T("ShoppingCart.AddToCart")</span>
      </button>
    }

    @* Merken *@
    <button class="add-to-wishlist-button-floating"
            onclick="AjaxCart.addproducttocart_catalog('@Url.RouteUrl("AddProductToCart-Catalog", new { productId = Model.Id, shoppingCartTypeId = (int)ShoppingCartType.Wishlist })')"
            title="@T("ShoppingCart.AddToWishlist")">
      <span class="button-text">@T("ShoppingCart.AddToWishlist")</span>
    </button>

    @* Vergleichen *@
    <button class="add-to-compare-button-floating"
            onclick="AjaxCart.addproducttocomparelist('@Url.RouteUrl("AddProductToCompare", new { productId = Model.Id })')"
            title="@T("ShoppingCart.AddToCompareList")">
      <span class="button-text">@T("ShoppingCart.AddToCompareList")</span>
    </button>
  </div>

  <div class="details">
    <h3 class="product-title">
      <a href="@Model.ProductUrl">@Model.Name</a>
    </h3>
    <div class="prices">
      <span class="price">@Model.ProductPrice.Price</span>
    </div>
  </div>
</div>
```

### Option 2: JavaScript-Lösung (ohne View-Override)

Füge in `theme.js` hinzu:

```javascript
(function($) {
  'use strict';

  $(document).ready(function() {
    // Konvertiere Standard-Buttons zu Floating-Buttons
    $('.product-item, .item-box').each(function() {
      var $item = $(this);
      var $picture = $item.find('.picture');
      var $buttons = $item.find('.buttons, .add-info');

      // Warenkorb-Button
      var $cartBtn = $buttons.find('.add-to-cart-button, .product-box-add-to-cart-button');
      if ($cartBtn.length) {
        var $floatingCart = $cartBtn.clone()
          .removeClass('add-to-cart-button product-box-add-to-cart-button')
          .addClass('add-to-cart-button-floating')
          .appendTo($picture);
      }

      // Wishlist-Button
      var $wishlistBtn = $buttons.find('.add-to-wishlist-button');
      if ($wishlistBtn.length) {
        var $floatingWishlist = $wishlistBtn.clone()
          .removeClass('add-to-wishlist-button')
          .addClass('add-to-wishlist-button-floating')
          .appendTo($picture);
      }

      // Compare-Button
      var $compareBtn = $buttons.find('.add-to-compare-list-button');
      if ($compareBtn.length) {
        var $floatingCompare = $compareBtn.clone()
          .removeClass('add-to-compare-list-button')
          .addClass('add-to-compare-button-floating')
          .appendTo($picture);
      }

      // Original-Button-Container verstecken
      $item.addClass('floating-buttons-active');
    });
  });

})(jQuery);
```

---

## Varianten

### Quick-View Button (optional)

Zusätzlicher Button mittig unten über dem Bild:

```html
<button class="quick-view-button-floating" title="Schnellansicht">
  Schnellansicht
</button>
```

**Eigenschaften:**
- Position: `absolute` mittig unten
- Größe: Auto-Breite, 36px Höhe
- Farbe: Weiß mit Border (Pill-Shape)
- Text sichtbar (nicht nur Icon)

### Badge-Position angepasst

Wenn Floating-Buttons aktiv sind, sollte das Deal-Badge links oben sein:

```html
<span class="ribbon--corner badge--deal">EXKLUSIV</span>
```

Das CSS setzt automatisch `left: 12px` statt `right: 12px`.

---

## Responsive Design

### Mobile (< 576px)

- Warenkorb-Button: 48x48px (kleiner)
- Wishlist/Compare: 36x36px
- Icons: Kleiner (20px bzw. 16px)
- Abstände: 8px statt 12px

**Das CSS passt sich automatisch an!**

---

## Icons anpassen

### Option 1: Unicode-Symbole (Standard)

```scss
// Warenkorb
&::before {
  content: "🛒"; // Einkaufswagen-Emoji
}

// Herz
&::before {
  content: "♡"; // Leeres Herz
}

// Waage
&::before {
  content: "⚖"; // Waage
}
```

### Option 2: Font-Awesome Icons

```scss
// Font-Awesome aktivieren
.add-to-cart-button-floating.with-icon::before {
  content: "\f07a"; // fa-shopping-cart
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
}
```

HTML:
```html
<button class="add-to-cart-button-floating with-icon">
  <span class="button-text">In den Warenkorb</span>
</button>
```

### Option 3: Eigene SVG-Icons

```html
<button class="add-to-cart-button-floating">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
  <span class="button-text">In den Warenkorb</span>
</button>
```

---

## Testing-Checklist

- [ ] Warenkorb-Button rechts unten, grün, 56px
- [ ] Merken-Button rechts oben, weiß, 40px
- [ ] Vergleich-Button rechts oben unter Merken, weiß, 40px
- [ ] Button-Text ist versteckt
- [ ] Icons sind sichtbar
- [ ] Hover-Effekte funktionieren
- [ ] Buttons sind über dem Bild (z-index)
- [ ] Bild bleibt klickbar
- [ ] Badge ist links oben (nicht überlappend)
- [ ] Responsive auf Mobile (kleinere Buttons)

---

**Letzte Aktualisierung**: 2025-10-22
