# View Overrides Dokumentation

Dieses Dokument listet alle View-Dateien auf, die im BobMag Theme überschrieben wurden, und erklärt warum jeder Override notwendig war.

## Übersicht

View Overrides ermöglichen es uns, die HTML-Struktur anzupassen, ohne die Core nopCommerce-Dateien zu modifizieren. Das hält das Theme update-sicher - wenn nopCommerce aktualisiert wird, bleiben unsere Core-Dateien unverändert, und wir müssen nur unsere Theme-Overrides auf Kompatibilität prüfen.

---

## Aktuelle View Overrides

### 1. `_AddToCart.cshtml`

**Location:** `Views/Product/_AddToCart.cshtml`

**Reason for Override:**
- Add modern quantity controls with plus/minus buttons
- Improve UX with visual quantity increment/decrement buttons
- Add SVG cart icon to "Add to Cart" button
- Implement custom styling that matches our theme design

**Changes Made:**
- Added `qty-control-wrapper` div with minus/plus buttons
- Changed input type to `number` with `data-target` attributes
- Added JavaScript for button click handlers (increment/decrement quantity)
- Added SVG cart icon before button text
- Maintained all original functionality (validation, min quantity, etc.)

**Key Code:**
```cshtml
<div class="qty-control-wrapper">
    <button type="button" class="qty-button qty-minus" data-target="product_enteredQuantity_@Model.ProductId">−</button>
    <input type="number" id="product_enteredQuantity_@Model.ProductId" class="qty-input" />
    <button type="button" class="qty-button qty-plus" data-target="product_enteredQuantity_@Model.ProductId">+</button>
</div>
```

**Styling:** See `Content/scss/components/_add-to-cart.scss`

**Update Notes:**
- When updating nopCommerce, check if `_AddToCart.cshtml` has structural changes
- Pay attention to: quantity validation logic, attributes, form structure
- Our override focuses on UI/UX - core functionality should remain compatible

---

### 2. `HeaderLinks/Default.cshtml`

**Location:** `Views/Shared/Components/HeaderLinks/Default.cshtml`

**Reason for Override:**
- Remove parentheses from cart and wishlist quantity display
- Cleaner, more modern UI (e.g., "4" instead of "(4)")

**Changes Made:**
- **Line 40:** Changed from `@T("Wishlist.HeaderQuantity", Model.WishlistItems)` to `@Model.WishlistItems`
- **Line 50:** Changed from `@T("ShoppingCart.HeaderQuantity", Model.ShoppingCartItems)` to `@Model.ShoppingCartItems`
- Added comments explaining the change

**Before:**
```cshtml
<span class="cart-qty">@T("ShoppingCart.HeaderQuantity", Model.ShoppingCartItems)</span>
<!-- Output: (4) -->
```

**After:**
```cshtml
<span class="cart-qty">@Model.ShoppingCartItems</span>
<!-- Output: 4 -->
```

**Update Notes:**
- Very small change - unlikely to break during updates
- If the HeaderLinks component structure changes significantly, review our override
- The `Model.ShoppingCartItems` and `Model.WishlistItems` properties should remain stable

---

---

### 3. `Components/Footer/Default.cshtml`

**Speicherort:** `Views/Shared/Components/Footer/Default.cshtml`

**Grund für Override:**
- Integration von Trust Methods (Zahlungs- und Versandlogos) direkt im Footer
- Newsletter-Section entfernt (jetzt als Modal im Header)
- Social Media Icons + Trust Headers in einer Zeile
- Modernes Flexbox-Layout

**Vorgenommene Änderungen:**
- Neue `footer-content-wrapper` Div für Flexbox-Layout
- `follow-us` Block komplett umstrukturiert:
  - `social-and-trust-row`: Social Icons links, Trust Headers rechts
  - `trust-methods-footer`: Alle 18 Logos (13 Zahlung + 5 Versand) in einer Reihe
- Newsletter-Box entfernt

**Wichtige Code-Teile:**
```cshtml
<div class="footer-content-wrapper">
  @await Component.InvokeAsync(typeof(FooterMenuViewComponent))

  <div class="footer-block follow-us">
    <div class="social-and-trust-row">
      <div class="social">...</div>
      <div class="trust-headers">
        <div class="trust-header-item"><h2>Sicher bezahlen</h2></div>
        <div class="trust-header-item"><h2>Schnell versendet</h2></div>
      </div>
    </div>
    <div class="trust-methods-footer">
      <div class="method-logos"><!-- 18 Logos --></div>
    </div>
  </div>
</div>
```

**Styling:** Siehe `Content/scss/components/_footer.scss`

**Update-Hinweise:**
- Footer-Struktur wurde stark angepasst
- Bei nopCommerce-Updates: Prüfen ob `FooterViewComponent` neue Features hat
- Newsletter wurde entfernt - nicht wiederherstellen
- Trust Methods Integration beibehalten

---

## Neue Custom Partial Views

Diese Views wurden komplett neu erstellt und überschreiben keine Standard-Views:

### 4. `_MembershipBanner.cshtml`

**Speicherort:** `Views/Shared/_MembershipBanner.cshtml`

**Zweck:**
- Kostenloser Versand Banner am oberen Seitenrand
- Newsletter Modal (Adidas-Style) mit kompaktem Design

**Funktionen:**
1. **Free Shipping Banner**: Roter Banner "KOSTENLOSER VERSAND AB 50€"
2. **Newsletter Modal**:
   - Kompaktes Checkbox mit "Weitere Infos" Link
   - Expandierbarer Legal-Text
   - Schließen per X-Button oder Overlay-Klick

**Integration:**
- In `_Root.cshtml` ganz oben eingebunden
- `@{ await Html.RenderPartialAsync("_MembershipBanner"); }`

**Styling:** Siehe `Content/scss/components/_membership-banner.scss`

**Update-Hinweise:**
- ✅ Komplett update-sicher (eigene Partial View)
- Keine Abhängigkeiten zu Core-Files

---

### 5. `_MembershipBannerFooter.cshtml`

**Speicherort:** `Views/Shared/_MembershipBannerFooter.cshtml`

**Zweck:**
- Membership-Werbebanner direkt über dem Footer
- Trigger für Newsletter-Modal

**Funktion:**
- Großer roter Banner: "WERDE MEMBER UND ERHALTE 250 PUNKTE..."
- "KOSTENLOS ANMELDEN" Link öffnet Newsletter Modal

**Integration:**
- In `_Root.cshtml` vor Footer eingebunden
- `@{ await Html.RenderPartialAsync("_MembershipBannerFooter"); }`

**Styling:** Siehe `Content/scss/components/_membership-banner.scss`

**Update-Hinweise:**
- ✅ Komplett update-sicher (eigene Partial View)

---

### 6. `_WelcomeSection.cshtml`

**Speicherort:** `Views/Shared/_WelcomeSection.cshtml`

**Zweck:**
- Willkommenstext auf der Startseite
- SEO-freundlicher Content vor Footer

**Inhalt:**
- H1: "Glückliche Begleiter, beste Freunde – Willkommen bei Bob-Mag..."
- 4 informative Absätze mit USPs
- Zentrierte Überschrift, linksbündiger Text

**Integration:**
- In `Views/Home/Index.cshtml` am Ende eingebunden
- `@{ await Html.RenderPartialAsync("_WelcomeSection"); }`

**Styling:** Siehe `Content/scss/components/_welcome-section.scss`
- Verwendet Theme-Variablen: `$color-white`, `$color-text`, `$container-max`, `$space-*`

**Update-Hinweise:**
- ✅ Komplett update-sicher (eigene Partial View)
- Text kann einfach angepasst werden

---

## Nur-CSS Anpassungen (Kein View-Override nötig)

Diese Features wurden rein mit CSS/SCSS umgesetzt und sind daher sehr update-sicher:

### Product Availability & Delivery Info
- **Datei:** `Content/scss/components/_product-availability.scss`
- **Features:** Grüne/rote Status-Bullets, gruppiertes Layout mit Trennlinien
- **Views verwendet:** Standard `_Availability.cshtml` und `_DeliveryInfo.cshtml` (kein Override)

### Cart Flyout Styling
- **Datei:** `Content/scss/components/_cart-flyout.scss`
- **Features:** Produktname in Standardfarbe (nicht blau), kleinerer Preis/Mengen-Text
- **Views verwendet:** Standard `FlyoutShoppingCart/Default.cshtml` (kein Override)

### Product Action Buttons
- **Datei:** `Content/scss/components/_product-action-buttons.scss`
- **Features:** Runde Icon-Only Buttons für Wishlist/Compare/Email
- **Views verwendet:** Standard Partials (kein Override)

### Product Overview Spacing
- **Datei:** `Content/scss/components/_product-overview.scss`
- **Features:** Verbesserte Zeilenhöhe, Abstände, grüne Links für Hersteller/Versand
- **Views verwendet:** Standard Product Templates (kein Override)

---

## Wartungs-Richtlinien

### Beim nopCommerce-Update:

1. **Release Notes prüfen:** Nach Änderungen an überschriebenen View-Dateien suchen
2. **Dateien vergleichen:** Diff-Tool verwenden um unsere Overrides mit neuen nopCommerce-Versionen zu vergleichen
3. **Gründlich testen:** Nach Updates testen:
   - Add-to-Cart Funktionalität mit Quantity Controls
   - Warenkorb/Wishlist Mengen-Anzeige im Header
   - Produktseiten (alle Templates)
   - Newsletter Modal und Membership Banner
   - Footer-Layout und Trust Methods

### Falls Breaking Changes auftreten:

1. **Problem dokumentieren:** Notieren was sich in nopCommerce Core geändert hat
2. **Override aktualisieren:** Neue Änderungen mit unseren Anpassungen mergen
3. **Testen:** Funktionalität überprüfen
4. **Dieses Dokument aktualisieren:** Hinweise zu den vorgenommenen Änderungen hinzufügen

### Neue Overrides hinzufügen:

Beim Hinzufügen neuer View Overrides:
1. **Zuerst CSS probieren:** Immer versuchen, Lösungen nur mit CSS umzusetzen, bevor Views überschrieben werden
2. **Minimale Änderungen:** Nur das Absolut-Notwendige überschreiben
3. **Hier dokumentieren:** Eintrag in diesem Dokument mit Begründung hinzufügen
4. **Im Code kommentieren:** Kommentare in der View-Datei einfügen, die Änderungen erklären
5. **Version Control:** Mit klarer Commit-Message committen, die erklärt warum der Override notwendig war

---

## Versionshistorie

| Datum | nopCommerce Version | Änderungen |
|------|---------------------|---------|
| 2025-10-24 | 4.9 | Footer/Default.cshtml Override; Neue Partials: _MembershipBanner.cshtml, _MembershipBannerFooter.cshtml, _WelcomeSection.cshtml |
| 2025-01-22 | 4.9 | Initiale View Overrides: _AddToCart.cshtml, HeaderLinks/Default.cshtml |

---

## Verwandte Dokumentation

- [SCSS Components](../Content/scss/components/) - Alle benutzerdefinierten Styles
- [JavaScript Anpassungen](../Content/js/) - Custom JavaScript Features
- [View Overrides Changelog](view-overrides-changelog.md) - Detaillierte Änderungshistorie

---

## Fragen oder Probleme?

Falls Probleme mit View Overrides während Updates auftreten:
1. nopCommerce Release Notes auf Breaking Changes prüfen
2. Override-Dateien mit neuesten Core-Versionen vergleichen
3. Zuerst in Entwicklungsumgebung testen
4. Alle Probleme und gefundene Lösungen dokumentieren
