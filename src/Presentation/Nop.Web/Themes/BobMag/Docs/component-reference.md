# BobMag Theme - Component Reference

Diese Datei dokumentiert alle verfügbaren CSS-Komponenten und deren Verwendung.

---

## 🧡 Buttons

### Hauptbuttons (Orange CTA)

Alle diese Klassen werden automatisch mit dem BobMag-Orange (#ef6c00) gestylt:

```html
<button class="button-1">Button 1</button>
<button class="add-to-cart-button">In den Warenkorb</button>
<button class="search-box-button">Suchen</button>
```

**CSS-Klassen:**
- `.button`
- `.button-1`, `.button-2`
- `.add-to-cart-button`
- `.product-box-add-to-cart-button`
- `.cart-button-header-orange`
- `.search-box-button`

**Eigenschaften:**
- Hintergrund: `#ef6c00` (Orange)
- Textfarbe: `#ffffff` (Weiß)
- Border-Radius: `15px`
- Uppercase-Text
- Hover: Dunkler + Scale-Animation
- Disabled: 60% Opacity

### Button-Varianten

```html
<button class="button--primary">Primary</button>
<button class="button--secondary">Secondary (Rot)</button>
<button class="button--success">Success (Grün)</button>
<button class="button--ghost">Ghost (Outline)</button>
```

**Farbvarianten:**
- `.button--primary`: Orange (#ef6c00)
- `.button--secondary`: Rot (#d20000)
- `.button--success`: Grün (#4e9521)
- `.button--ghost`: Transparent mit Orange-Border

### Spezielle Button-Styles

```scss
// Item-Box Button (60% Breite)
.item-box .product-box-add-to-cart-button { width: 60%; }

// Search-Box Button (Padding angepasst)
.search-box .search-box-button { padding: 0 15px; }
```

---

## 🏷️ Badges & Ribbons

### Deal / Rabatt-Badges (Rot)

```html
<span class="badge--deal">-10% DEAL</span>
<span class="discount-badge">SALE</span>
<div class="product-ribbon">NEU</div>
```

**CSS-Klassen:**
- `.ribbon--deal`
- `.badge--deal`
- `.discount-badge`
- `.product-ribbon`

**Eigenschaften:**
- Hintergrund: `#d20000` (Rot)
- Pill-Shape (border-radius: 999px)
- Uppercase + Bold
- Font-Size: 0.75rem
- Schatten: Soft Shadow

### Erfolgs-Badges (Grün)

```html
<span class="badge--success">Kostenloser Versand</span>
<span class="badge--success-alt">Hypoallergen</span>
```

**Farbvarianten:**
- `.badge--success`: Dunkelgrün (#4e9521)
- `.badge--success-alt`: Hellgrün (#54b65f)
- `.free-shipping-badge`: Grün

### Weitere Badge-Varianten

```html
<span class="badge--new">NEU</span>
<span class="badge--info">Info</span>
<span class="badge--warning">Warnung</span>
```

**Klassen:**
- `.badge--new`: Orange (#ef6c00)
- `.badge--info`: Neutral (Grau)
- `.badge--warning`: Hell-Orange

### Badge-Positionierung

```scss
// Ecke einer Produktkarte
.ribbon--corner {
  position: absolute;
  top: 10px;
  right: 10px;
}

// Inline (im Text)
.badge--inline {
  display: inline-flex;
  vertical-align: middle;
}
```

---

## 💶 Preise

### Hauptpreis (Grün)

```html
<div class="prices">
  <span class="price">7,29 €</span>
  <span class="tax-shipping-info">inkl. MwSt. zzgl. Versandkosten</span>
</div>
```

**CSS-Klassen:**
- `.price`
- `.product-price`
- `.actual-price`
- `.prices .price`

**Eigenschaften:**
- Farbe: `#4e9521` (Grün)
- Font-Weight: 700 (Bold)
- Font-Size: 1.25rem
- Wichtig: Mit `!important` versehen, um cleandefault.css zu überschreiben

### Alter Preis (durchgestrichen)

```html
<span class="old-price">9,99 €</span>
<span class="price">7,29 €</span>
```

**CSS-Klassen:**
- `.old-price`
- `.old-product-price`

**Eigenschaften:**
- Farbe: `#d20000` (Rot)
- Text-Decoration: line-through
- Font-Size: 1rem
- Opacity: 0.8

### MwSt. & Versand-Hinweis

```html
<div class="tax-shipping-info">inkl. MwSt. zzgl. Versandkosten</div>
```

**CSS-Klassen:**
- `.tax-shipping-info`
- `.price-vat-note`
- `.tax-note`

**Eigenschaften:**
- Font-Size: 0.875rem
- Opacity: 0.8
- Farbe: Text-Farbe (#404040)

### Preis mit Rabatt-Prozentsatz

```html
<div class="price-wrapper">
  <span class="old-price">9,99 €</span>
  <span class="price">7,29 €</span>
  <span class="price-discount-percentage">-27%</span>
</div>
```

### Große Preis-Anzeige (Produktdetails)

```html
<span class="product-price-large">7,29 €</span>
```

**Eigenschaften:**
- Font-Size: 2rem
- Font-Weight: 700
- Farbe: Grün

---

## 📦 Produktkarten

### Basis-Produktkarte

```html
<div class="product-item">
  <div class="picture">
    <img src="product.jpg" alt="Produkt">
    <span class="ribbon--corner badge--deal">-10%</span>
  </div>
  <h3 class="product-title">
    <a href="/produkt">Produktname</a>
  </h3>
  <div class="prices">
    <span class="price">7,29 €</span>
  </div>
  <div class="buttons">
    <button class="add-to-cart-button">In den Warenkorb</button>
  </div>
</div>
```

**CSS-Klassen:**
- `.product-item`
- `.item-box`
- `.item-box-overlay`

**Eigenschaften:**
- Border-Radius: `15px`
- Hintergrund: Weiß
- Border: 1px solid #e0e0e0
- Box-Shadow: Soft (0 2px 4px)
- Hover: Shadow-Hover + translateY(-2px)

### Produktkarten-Elemente

**Produktbild:**
```scss
.picture, .product-picture {
  margin-bottom: 0.75rem;
  text-align: center;

  img {
    border-radius: 12px;
    max-width: 100%;
  }
}
```

**Produkt-Titel:**
```scss
.product-title {
  font-size: 1rem;
  color: #404040;
  font-weight: 500;

  a:hover {
    color: #ef6c00; // Orange
  }
}
```

**Button-Container:**
```scss
.buttons, .add-info {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
```

**Ribbon-Position:**
```scss
.product-ribbon, .ribbon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
```

### Grid-Layout (Produktliste)

```html
<div class="product-grid">
  <div class="product-item">...</div>
  <div class="product-item">...</div>
  <div class="product-item">...</div>
</div>
```

**Eigenschaften:**
- Display: Grid
- Grid-Template: repeat(auto-fill, minmax(280px, 1fr))
- Gap: 1.5rem

### Listen-Layout (horizontal)

```html
<div class="product-list">
  <div class="product-item">
    <div class="picture">...</div>
    <div class="details">...</div>
  </div>
</div>
```

**Eigenschaften:**
- Flex-Direction: Row
- Bild: 200px fest, rechts Details

---

## 🎨 Farb-Referenz

### Haupt-Farben

```scss
$color-primary: #ef6c00;     // Orange (Buttons, Links)
$color-secondary: #d20000;   // Rot (Deals, Warnungen)
$color-success: #4e9521;     // Grün (Preise, Erfolg)
$color-success-alt: #54b65f; // Hellgrün (Alternative)
$color-text: #404040;        // Standard-Text
$color-bg: #f3f3f3;          // Seitenhintergrund
$color-white: #ffffff;       // Weiß
$color-border: #e0e0e0;      // Rahmen
```

### Verwendung

| Farbe | Verwendung | Beispiel |
|-------|------------|----------|
| Orange (#ef6c00) | CTA-Buttons, Hover-States, "Neu"-Badge | `.button-1`, `.badge--new` |
| Rot (#d20000) | Deals, Rabatte, alte Preise | `.badge--deal`, `.old-price` |
| Grün (#4e9521) | Preise, Erfolg, "Versandkostenfrei" | `.price`, `.badge--success` |
| Hellgrün (#54b65f) | Alternative Badge-Farbe | `.badge--success-alt` |
| Grau (#404040) | Text, Überschriften | `body`, `.product-title` |
| Hellgrau (#f3f3f3) | Hintergrund | `body { background }` |

---

## 📐 Abstände & Radien

### Spacing-Scale

```scss
$space-1: .25rem;   // 4px
$space-2: .5rem;    // 8px
$space-3: .75rem;   // 12px
$space-4: 1rem;     // 16px
$space-6: 1.5rem;   // 24px
$space-8: 2rem;     // 32px
$space-12: 3rem;    // 48px
```

### Border-Radius

```scss
$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 15px;
$radius-card: 15px;  // Produktkarten
```

### Schatten

```scss
$shadow-soft: 0 2px 4px rgba(0,0,0,.06);
$shadow-hover: 0 6px 18px rgba(0,0,0,.12);
```

---

## 🔧 Typografie

```scss
$font-base: 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif;
$font-size-base: 16px;
$line-height-base: 1.5;
$font-weight-base: 300;  // "lighter"
```

---

## 💡 Best Practices

### 1. Buttons immer mit BobMag-Klassen

```html
<!-- ✅ GUT -->
<button class="button-1">Kaufen</button>
<button class="add-to-cart-button">In den Warenkorb</button>

<!-- ❌ SCHLECHT -->
<button style="background: blue;">Kaufen</button>
```

### 2. Preise immer in Grün

```html
<!-- ✅ GUT -->
<span class="price">7,29 €</span>

<!-- ❌ SCHLECHT -->
<span style="color: black;">7,29 €</span>
```

### 3. Badges für Deals nutzen

```html
<!-- ✅ GUT -->
<span class="badge--deal">-10%</span>

<!-- ❌ SCHLECHT -->
<span style="background: red;">-10%</span>
```

### 4. Produktkarten-Struktur einhalten

```html
<!-- ✅ GUT -->
<div class="product-item">
  <div class="picture">...</div>
  <h3 class="product-title">...</h3>
  <div class="prices">...</div>
  <div class="buttons">...</div>
</div>
```

---

## 🚀 Verwendungsbeispiel: Vollständige Produktkarte

```html
<div class="product-item">
  <!-- Produktbild mit Deal-Badge -->
  <div class="picture">
    <a href="/produkt/magazin-1">
      <img src="/images/product.jpg" alt="Magazin 1">
    </a>
    <span class="ribbon--corner badge--deal">-27%</span>
  </div>

  <!-- Produkt-Titel -->
  <h3 class="product-title">
    <a href="/produkt/magazin-1">
      Magazin 1 | 10er Set
    </a>
  </h3>

  <!-- Zusatz-Badge -->
  <div class="badges">
    <span class="badge--success">Kostenloser Versand</span>
  </div>

  <!-- Preise -->
  <div class="prices">
    <div class="price-wrapper">
      <span class="old-price">9,99 €</span>
      <span class="price">7,29 €</span>
    </div>
    <div class="tax-shipping-info">
      inkl. MwSt. zzgl. Versandkosten
    </div>
  </div>

  <!-- Buttons -->
  <div class="buttons">
    <button class="add-to-cart-button">
      In den Warenkorb
    </button>
    <button class="button--ghost">
      Details
    </button>
  </div>
</div>
```

**Ergebnis:**
- Weiße Karte mit runden Ecken (15px)
- Rotes Deal-Badge in der Ecke
- Grüner Versand-Badge
- Durchgestrichener roter Altpreis
- Grüner neuer Preis
- Oranger "In den Warenkorb"-Button
- Outline "Details"-Button
- Hover: Karte hebt sich mit Schatten

---

## 📝 Anmerkungen

### CSS-Spezifität

Die meisten Styles nutzen `!important`, um cleandefault.css zu überschreiben:

```scss
.button {
  background-color: $color-primary !important;
  color: $color-white !important;
}

.price {
  color: $color-success !important;
}
```

Das ist nötig, weil cleandefault.css als erstes geladen wird und sehr spezifische Selektoren hat.

### Updates

Bei nopCommerce-Updates:
1. Neue `cleandefault.css` kopieren
2. Styles kompilieren: `gulp theme`
3. Prüfen, ob alle Komponenten noch korrekt sind
4. Bei Problemen: Spezifität erhöhen oder Selektoren anpassen

---

**Letzte Aktualisierung**: 2025-10-22
**Version**: 1.0.0
**Autor**: Development Team
