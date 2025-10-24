# View Overrides Changelog - BobMag Theme

## Übersicht

Diese Datei dokumentiert **ALLE View-Overrides** im BobMag Theme, die bei nopCommerce-Updates manuell geprüft und ggf. gemergt werden müssen.

## ⚠️ WICHTIG für Updates

Bei nopCommerce-Updates:

1. **Standard-Views vergleichen**:
   ```bash
   git diff v4.9..v5.0 -- src/Presentation/Nop.Web/Views/
   ```

2. **Für jede überschriebene View**:
   - Prüfen, ob es Änderungen in der Standard-View gab
   - Falls ja: Änderungen in unsere Override-View übernehmen
   - Testen!

3. **Minimalismus**: Weniger Overrides = Weniger Update-Aufwand

---

## 1. Shared Views (Layout & Infrastructure)

### `Views/Shared/_Root.cshtml`

**Status**: ✅ ÜBERSCHRIEBEN
**Grund**: Integration von theme.js und product-variants-dropdown.js
**Änderungen gegenüber Standard**:

```diff
+ <script src="~/Themes/@themeName/Content/js/theme.js" asp-append-version="true"></script>
+ <script src="~/Themes/@themeName/Content/js/product-variants-dropdown.js" asp-append-version="true"></script>
```

**Update-Strategie**:
- ✅ **Update-sicher**: Nur Script-Tags am Ende hinzugefügt
- Bei Updates: Prüfen, ob Standard-_Root.cshtml strukturelle Änderungen hat
- Falls ja: Basis-Struktur übernehmen, Script-Tags am Ende wieder einfügen

**Letzte Änderung**: 2025-10-22
**nopCommerce Basis**: 4.9

---

### `Views/Shared/Head.cshtml`

**Status**: ✅ ÜBERSCHRIEBEN
**Grund**: CSS-Registrierung für BobMag Theme
**Änderungen gegenüber Standard**:

```cshtml
// Unsere CSS-Lade-Reihenfolge:
1. cleandefault.css     (Basis von DefaultClean)
2. styles.css          (Unser kompiliertes SCSS)
3. jquery-ui.css       (Standard)
4. swiper.css          (Standard, conditional)
```

**Update-Strategie**:
- ✅ **Update-sicher**: Keine JavaScript-Registrierung (nur CSS)
- Bei Updates: Prüfen, ob neue CSS/JS-Dependencies hinzugekommen sind
- Falls ja: In unsere Head.cshtml übernehmen

**Letzte Änderung**: 2025-10-22
**nopCommerce Basis**: 4.9

---

### `Views/_ViewImports.cshtml`

**Status**: ✅ ÜBERSCHRIEBEN
**Grund**: Zusätzliche using-Statements und Helpers für nopCommerce 4.9
**Änderungen gegenüber DefaultClean**:

```diff
+ @inject INopUrlHelper NopUrl
+ @using static Nop.Services.Common.NopLinksDefaults
+ @using Nop.Core.Http;
+ @using Nop.Web.Models.Menus
```

**Update-Strategie**:
- ⚠️ **Update-relevant**: Neue using-Statements in nopCommerce 5.0 übernehmen
- Bei Updates: Standard _ViewImports.cshtml mit unserer vergleichen
- Neue using-Statements hinzufügen

**Letzte Änderung**: 2025-10-22
**nopCommerce Basis**: 4.9

---

## 2. Product Views (Product Detail Pages)

### `Views/Product/ProductTemplate.VariantsDropdown.cshtml`

**Status**: ✅ ÜBERSCHRIEBEN
**Grund**: Custom Variants Dropdown System für Produkte mit Varianten
**Basis**: ProductTemplate.Grouped.cshtml (nopCommerce 4.9 Standard)

**Wichtige Änderungen**:

#### Code Block hinzugefügt (Zeilen 55-65):
```csharp
// ===== VARIANTS DROPDOWN LOGIC =====
// Determine the first available variant to pre-select
var firstAvailableVariant = Model.AssociatedProducts
    ?.FirstOrDefault(v => !string.IsNullOrEmpty(v.StockAvailability)
                          && !v.StockAvailability.ToLower().Contains("out of stock"));

// If nothing is available, take the first variant (if any)
if (firstAvailableVariant == null && (Model.AssociatedProducts?.Any() ?? false))
{
    firstAvailableVariant = Model.AssociatedProducts.FirstOrDefault();
}
```

#### Ersetzter Block (Zeilen 123-284):
Standard-Varianten-Liste wurde ersetzt durch:
- ✨ **Variants Header** (klickbar, öffnet Modal)
- ✨ **Toggle Button** (zeigt ausgewählte Variante)
- ✨ **Modal/Dropdown** (Liste aller Varianten)
- ✨ **AddToCart-Section** (pro Variante ein Block, JavaScript-gesteuert)

**Dependencies**:
- 🎨 SCSS: `Content/scss/components/_product-variants-dropdown.scss`
- ⚡ JavaScript: `Content/js/product-variants-dropdown.js`

**Update-Strategie**:
- ⚠️ **WICHTIG**: Bei Updates ZUERST neue `ProductTemplate.Grouped.cshtml` prüfen!
- Falls Standard-View geändert wurde:
  1. Neue Standard-View als Basis nehmen
  2. Code Block (Zeilen 55-65) wieder einfügen
  3. Variants Dropdown HTML (Zeilen 123-284) wieder einbauen
  4. Testen!

**Struktur der Custom-Section**:
```
<div class="product-variant-dropdown-wrapper">
    <h2 class="variants-header">...</h2>
    <div class="variant-dropdown-container">
        <button class="variant-dropdown-toggle">...</button>
        <div class="variant-modal" id="variantModal">
            <ul class="variant-list">
                @foreach variant → <li data-variantid="...">
            </ul>
        </div>
    </div>
    <div class="variant-addtocart-section">
        @foreach variant → <div id="addtocart-block-{id}">
    </div>
</div>
```

**Gelöschte Standard-Features**:
- ❌ Variant Pictures (können bei Bedarf wieder hinzugefügt werden)
- ❌ Variant Short Description
- ❌ SKU, GTIN, Vendor Info
- ❌ Product Attributes (pro Variante)
- ❌ Estimate Shipping
- ❌ Wishlist Button (pro Variante)

**Warum gelöscht?**
→ Vereinfachte UI: Nur Dropdown zur Auswahl, dann AddToCart für gewählte Variante

**Letzte Änderung**: 2025-10-22
**nopCommerce Basis**: ProductTemplate.Grouped.cshtml (4.9)

---

### `Views/Product/_AddToCart.cshtml`

**Status**: ✅ ÜBERSCHRIEBEN
**Grund**: Modernes horizontales Layout mit Quantity Controls (Minus/Plus Buttons)
**Basis**: Standard `_AddToCart.cshtml` (nopCommerce 4.9)

**Wichtige Änderungen**:

#### 1. HTML-Struktur (Zeilen 29-119):
```cshtml
<div class="add-to-cart-panel">
    <!-- Label versteckt (sr-only) für Accessibility -->
    <label class="qty-label sr-only">...</label>

    <!-- Quantity Control Wrapper -->
    <div class="qty-control-wrapper">
        <!-- Für manuelle Eingabe: -->
        <button class="qty-button qty-minus">−</button>
        <input type="number" class="qty-input" />
        <button class="qty-button qty-plus">+</button>

        <!-- ODER für vordefinierte Mengen: -->
        <select class="qty-dropdown">...</select>
    </div>

    <!-- Add to Cart Button mit Icon -->
    <button class="add-to-cart-button">
        <span class="cart-icon">🛒</span>
        <span class="cart-text">Zum Warenkorb hinzufügen</span>
    </button>
</div>
```

#### 2. JavaScript (Zeilen 74-90):
- ✨ Plus/Minus Button Handler hinzugefügt
- ✨ Min-Quantity Validation
- ✅ Bestehende Funktionalität erhalten (Enter-Key, Quantity-Change-Event)

**Design-Specs** (siehe `_add-to-cart.scss`):
- 🟢 Minus/Plus Buttons: Grün (#4a7c2e)
- 🟡 Input/Dropdown Hintergrund: Beige (#f8f5e8)
- 🟠 Add-to-Cart Button: Orange (#ef6c00)
- 📱 Responsive: Mobile vertikal, Desktop horizontal

**Dependencies**:
- 🎨 SCSS: `Content/scss/components/_add-to-cart.scss`
- ⚡ JavaScript: Inline in View (jQuery-basiert)

**Betroffene Seiten**:
- ✅ ProductTemplate.Simple.cshtml
- ✅ ProductTemplate.Grouped.cshtml
- ✅ ProductTemplate.VariantsDropdown.cshtml
- ✅ Alle anderen Product Templates

**Update-Strategie**:
- ⚠️ **WICHTIG**: Bei Updates die neue Standard-`_AddToCart.cshtml` prüfen!
- Falls Standard-View geändert wurde:
  1. **Struktur prüfen**: Gibt es neue Felder/Features? (z.B. Rental, Attributes)
  2. **Quantity Control erhalten**:
     - `qty-control-wrapper` div behalten
     - Minus/Plus Buttons behalten
     - JavaScript für Button-Handler behalten
  3. **CSS anpassen**: Falls neue Elemente hinzukommen, in `_add-to-cart.scss` stylen
  4. **Testen**: Alle Product Templates durchgehen

**Abweichungen vom Standard**:
```diff
- <label asp-for="EnteredQuantity" class="qty-label"></label>
+ <label asp-for="EnteredQuantity" class="qty-label sr-only"></label>

- <input type="text" class="qty-input" />
+ <div class="qty-control-wrapper">
+   <button class="qty-button qty-minus">−</button>
+   <input type="number" class="qty-input" />
+   <button class="qty-button qty-plus">+</button>
+ </div>

- <button class="button-1 add-to-cart-button">@addToCartText</button>
+ <button class="button-1 add-to-cart-button">
+   <span class="cart-icon">🛒</span>
+   <span class="cart-text">@addToCartText</span>
+ </button>
```

**User-Benefit vs Update-Aufwand**:
- ✅ **User-Benefit**: Moderne, intuitive UX mit klaren Plus/Minus Buttons
- ✅ **Visuell ansprechend**: Farbige Buttons wie im Design-System
- ⚠️ **Update-Aufwand**: Mittel (ca. 15-30 Min pro Update)
  - _AddToCart.cshtml ändert sich selten (stabile Core-Funktion)
  - Falls geändert: Merge ist einfach (klar abgegrenzte Sections)

**Letzte Änderung**: 2025-10-22
**nopCommerce Basis**: 4.9

---

## 3. Footer & Layout Components

### `Views/Shared/Components/Footer/Default.cshtml`

**Status**: ✅ ÜBERSCHRIEBEN
**Grund**: Integration von Trust Methods (Zahlungs- und Versandlogos) direkt im Footer
**Änderungen gegenüber Standard**:

```diff
+ <div class="footer-content-wrapper">
+   @await Component.InvokeAsync(typeof(FooterMenuViewComponent))
+
+   <div class="footer-block follow-us">
+     <div class="social-and-trust-row">
+       <div class="social">
+         <h2>Folgen Sie uns</h2>
+         @await Component.InvokeAsync(typeof(SocialButtonsViewComponent))
+       </div>
+       <div class="trust-headers">
+         <div class="trust-header-item"><h2>Sicher bezahlen</h2></div>
+         <div class="trust-header-item"><h2>Schnell versendet</h2></div>
+       </div>
+     </div>
+     <div class="trust-methods-footer">
+       <!-- 13 Zahlungslogos + 5 Versandlogos -->
+     </div>
+   </div>
+ </div>
```

**Struktur**:
- Footer-Navigation links/mittig
- Social Icons + Trust Headers rechts oben
- Zahlungs- und Versandlogos darunter in einer Reihe

**Dependencies**:
- 🎨 SCSS: `Content/scss/components/_footer.scss`

**Update-Strategie**:
- ⚠️ **WICHTIG**: Footer-Struktur stark angepasst
- Bei Updates:
  1. Prüfen ob `FooterViewComponent` neue Features hat
  2. Newsletter-Section wurde entfernt (jetzt Modal im Header)
  3. Trust Methods in Footer integriert behalten
  4. Flexbox-Layout beibehalten

**Letzte Änderung**: 2025-10-24
**nopCommerce Basis**: 4.9

---

## 4. Custom Partial Views (Neue Components)

### `Views/Shared/_MembershipBanner.cshtml`

**Status**: ✨ NEU ERSTELLT
**Grund**: Kostenloser Versand Banner am oberen Seitenrand + Newsletter Modal
**Position**: Ganz oben auf allen Seiten (in `_Root.cshtml` eingebunden)

**Funktionen**:
1. **Free Shipping Banner**: Kleiner roter Banner "KOSTENLOSER VERSAND AB 50€ BESTELLWERT³"
2. **Newsletter Modal**: Adidas-Style Modal mit kompaktem Checkbox und expandierbarem Legal-Text

**HTML-Struktur**:
```cshtml
<div class="free-shipping-banner">...</div>

<div id="newsletter-modal" class="newsletter-modal">
  <div class="newsletter-modal-overlay"></div>
  <div class="newsletter-modal-content">
    <!-- Newsletter-Formular -->
    <!-- Expandierbarer Legal-Text mit "Weitere Infos" Link -->
  </div>
</div>

<script>
  // Modal öffnen/schließen Logic
  // Legal-Text expandieren Logic
</script>
```

**Dependencies**:
- 🎨 SCSS: `Content/scss/components/_membership-banner.scss`
- ⚡ JavaScript: Inline im View (Modal + Expand Logic)

**Integration**:
- Wird in `Views/Shared/_Root.cshtml` ganz oben eingebunden
- `@{ await Html.RenderPartialAsync("_MembershipBanner"); }`

**Update-Strategie**:
- ✅ **Update-sicher**: Eigene Partial View, keine Core-Abhängigkeiten
- Nur bei Änderungen am Design/Text anpassen

**Letzte Änderung**: 2025-10-24

---

### `Views/Shared/_MembershipBannerFooter.cshtml`

**Status**: ✨ NEU ERSTELLT
**Grund**: Membership-Werbebanner direkt über dem Footer
**Position**: Zwischen Content und Footer (in `_Root.cshtml` eingebunden)

**Funktion**:
- Großer roter Banner: "WERDE MEMBER UND ERHALTE 250 PUNKTE..."
- "KOSTENLOS ANMELDEN" Link öffnet Newsletter Modal

**HTML-Struktur**:
```cshtml
<div class="membership-banner">
  <div class="membership-banner-content">
    <span class="membership-text">...</span>
    <a href="#" id="membership-signup-trigger">KOSTENLOS ANMELDEN</a>
  </div>
</div>

<script>
  // Trigger für Newsletter Modal
</script>
```

**Dependencies**:
- 🎨 SCSS: `Content/scss/components/_membership-banner.scss`

**Integration**:
- Wird in `Views/Shared/_Root.cshtml` vor Footer eingebunden
- `@{ await Html.RenderPartialAsync("_MembershipBannerFooter"); }`

**Update-Strategie**:
- ✅ **Update-sicher**: Eigene Partial View, keine Core-Abhängigkeiten

**Letzte Änderung**: 2025-10-24

---

### `Views/Shared/_WelcomeSection.cshtml`

**Status**: ✨ NEU ERSTELLT
**Grund**: Willkommenstext auf der Startseite vor dem Footer
**Position**: Nur auf Homepage, als letzte Section vor Footer

**Inhalt**:
- H1: "Glückliche Begleiter, beste Freunde – Willkommen bei Bob-Mag..."
- 4 Absätze mit Produktbeschreibung und USPs
- Zentrierte Überschrift, linksbündige Absätze

**HTML-Struktur**:
```cshtml
<section class="welcome-section">
  <div class="welcome-content">
    <h1>...</h1>
    <p>...</p>
    <p>...</p>
    <p>...</p>
    <p>...</p>
  </div>
</section>
```

**Dependencies**:
- 🎨 SCSS: `Content/scss/components/_welcome-section.scss`
- Verwendet Variablen: `$color-white`, `$color-text`, `$container-max`, `$space-*`

**Integration**:
- Wird in `Views/Home/Index.cshtml` am Ende eingebunden
- `@{ await Html.RenderPartialAsync("_WelcomeSection"); }`

**Update-Strategie**:
- ✅ **Update-sicher**: Eigene Partial View für Homepage
- Text kann einfach in Partial View angepasst werden

**Letzte Änderung**: 2025-10-24

---

## 5. Weitere Overrides (TODO)

### `Views/Product/ProductTemplate.*.cshtml`

Falls weitere ProductTemplates vom Live-System übertragen werden, hier dokumentieren:

- [ ] ProductTemplate.Simple.cshtml
- [ ] ProductTemplate.Grouped.cshtml (falls angepasst)
- [ ] Weitere Custom Templates

---

## Update Workflow Zusammenfassung

### Vor dem Update:

```bash
# 1. Aktuelles Theme sichern
cd src/Presentation/Nop.Web/Themes/BobMag
git checkout -b backup-before-update-vX.X

# 2. View-Overrides dokumentieren
ls -R Views/
```

### Nach dem Update:

```bash
# 1. Änderungen in Standard-Views prüfen
git diff v4.9..v5.0 -- src/Presentation/Nop.Web/Views/Shared/_Root.cshtml
git diff v4.9..v5.0 -- src/Presentation/Nop.Web/Views/Product/ProductTemplate.Grouped.cshtml

# 2. Für jede geänderte View:
# - Änderungen manuell in unsere Override-View übernehmen
# - Oder: Neue Standard-View als Basis, unsere Custom-Parts wieder einbauen

# 3. Testen!
dotnet build
dotnet run
```

### Testing Checklist:

- [ ] Theme lädt ohne Fehler
- [ ] CSS wird korrekt angewendet
- [ ] JavaScript funktioniert (theme.js, product-variants-dropdown.js)
- [ ] Variants Dropdown Modal öffnet/schließt
- [ ] Variantenauswahl funktioniert
- [ ] AddToCart für gewählte Variante funktioniert
- [ ] Responsive Design (Mobile + Desktop)
- [ ] Browser Console: Keine Fehler

---

## Minimierungs-Strategie

**Ziel**: So wenige View-Overrides wie möglich!

### Können wir das nur mit CSS lösen?

Vor jedem View-Override prüfen:
- ✅ Kann das Problem mit CSS/SCSS gelöst werden?
- ✅ Kann ein Widget/Component verwendet werden?
- ✅ Ist ein kompletter Override wirklich nötig?

### Beispiel: Floating Buttons

**OHNE View-Override**:
```scss
// Content/scss/components/_product-card-floating.scss
.product-box {
  position: relative;

  .buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    // ... styling
  }
}
```

✅ **Update-sicher**: Keine View-Änderung nötig!

---

## Dokumentations-Pflicht

**WICHTIG**: Jeder neue View-Override MUSS hier dokumentiert werden!

**Template für neue Overrides**:

```markdown
### `Views/Pfad/Zur/View.cshtml`

**Status**: ✅ ÜBERSCHRIEBEN
**Grund**: [Warum wurde diese View überschrieben?]
**Änderungen gegenüber Standard**:

[Beschreibung oder Diff]

**Update-Strategie**:
- [Was muss bei Updates beachtet werden?]

**Letzte Änderung**: [Datum]
**nopCommerce Basis**: [Version]
```

---

## Versionshistorie

| Datum | nopCommerce | Änderungen |
|-------|-------------|------------|
| 2025-10-24 | 4.9 | Footer/Default.cshtml überschrieben; Neue Partials: _MembershipBanner.cshtml, _MembershipBannerFooter.cshtml, _WelcomeSection.cshtml |
| 2025-10-22 | 4.9 | Initial: _Root.cshtml, Head.cshtml, _ViewImports.cshtml, ProductTemplate.VariantsDropdown.cshtml, _AddToCart.cshtml |

---

**Maintainer**: Development Team
**Letzte Aktualisierung**: 2025-10-24
**nopCommerce Version**: 4.9
