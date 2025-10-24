# Variants Dropdown System - Dokumentation

## Übersicht

Das **Variants Dropdown System** ist ein Custom UI-Feature für die Darstellung von Produktvarianten in nopCommerce. Es wurde aus der alten ProductTemplate.VariantsDropdown.cshtml (nopCommerce 4.5 / Pacific Theme) extrahiert und sauber in separate SCSS- und JavaScript-Dateien ausgelagert.

## Dateien

### 1. SCSS
**Datei**: `Content/scss/components/_product-variants-dropdown.scss`
- **Zweck**: Alle Styles für das Dropdown/Modal System
- **Import**: Automatisch via `app.scss` Zeile 15
- **Größe**: ~300 Zeilen CSS

### 2. JavaScript
**Datei**: `Content/js/product-variants-dropdown.js`
- **Zweck**: Modal-Logik, Variantenauswahl, AddToCart-Block Switching
- **Laden**: Via `_Root.cshtml` Zeile 36 (NACH theme.js und jQuery)
- **Größe**: ~200 Zeilen JavaScript

### 3. View Template
**Datei**: `Views/Product/ProductTemplate.VariantsDropdown.cshtml`
- **Zweck**: Product Detail Page für Produkte mit Varianten-Auswahl
- **Status**: Basis-Template erstellt (nopCommerce 4.9 Standard)
- **Nächster Schritt**: Variants Dropdown HTML integrieren

## Funktionsweise

### 1. User Interface

```
┌─────────────────────────────────────────────┐
│ [Artikel wählen (3 Varianten verfügbar)]   │  ← Klickbarer Header
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ ▼ [Variante A | Auf Lager | 99,99 €]       │  ← Toggle Button
└─────────────────────────────────────────────┘
          │
          │ KLICK
          ▼
┌─────────────────────────────────────────────┐
│                   [X]                       │  ← Modal/Dropdown
├─────────────────────────────────────────────┤
│ □ Variante A | Auf Lager    | 99,99 €      │  ← Auswahl
│ ■ Variante B | Auf Lager    | 89,99 €      │  ← Ausgewählt
│ □ Variante C | Nicht verfügbar | 79,99 €   │  ← Disabled
└─────────────────────────────────────────────┘
```

### 2. Responsive Verhalten

#### Mobile (≤768px):
- **Bottom Sheet Modal** mit Overlay
- Fixed position, von unten einfahrend
- Backdrop-Overlay (rgba(0,0,0,0.5))
- Max. 60% Viewport Height

#### Desktop (>768px):
- **Dropdown** ohne Overlay
- Absolute positioning unter dem Button
- Border + Shadow für Dropdown-Look
- Max. 60% Viewport Height

### 3. Variantenauswahl

1. **Initial**: Erste verfügbare Variante ist vorausgewählt
2. **Klick auf Button/Header**: Modal öffnet sich
3. **Klick auf Variante**:
   - Button-Content wird aktualisiert (Name, Preis, Verfügbarkeit)
   - Modal schließt sich
   - Korrekter AddToCart-Block wird eingeblendet
4. **Disabled Varianten**: Ausgegraut, kein Klick möglich

## Integration in ProductTemplate

### Schritt 1: HTML-Struktur (TODO)

Die View `ProductTemplate.VariantsDropdown.cshtml` muss noch erweitert werden um:

```cshtml
<!-- 1. Variants Header -->
<h2 class="variants-header">
    Artikel wählen (@Model.AssociatedProducts.Count Varianten verfügbar)
</h2>

<!-- 2. Toggle Button -->
<button class="variant-dropdown-toggle">
    <!-- Initial: Erste verfügbare Variante -->
</button>

<!-- 3. Modal mit Varianten-Liste -->
<div class="variant-modal" id="variantModal">
    <div class="variant-modal-content">
        <span class="close-button">&times;</span>
        <ul class="variant-list">
            @foreach (var variant in Model.AssociatedProducts) {
                <li class="variant-item"
                    data-variantid="@variant.Id"
                    data-variantname="@variant.Name"
                    data-instock="@variant.InStock">
                    <!-- Variant Info -->
                </li>
            }
        </ul>
    </div>
</div>

<!-- 4. AddToCart Blöcke (pro Variante) -->
<div class="variant-addtocart-section">
    @foreach (var variant in Model.AssociatedProducts) {
        <div id="addtocart-block-@variant.Id"
             class="addtocart-block"
             style="display:none">
            @await Html.PartialAsync("_AddToCart", variant.AddToCart, dataDict)
        </div>
    }
</div>
```

### Schritt 2: Custom Partials (Optional)

Falls gewünscht, können Custom Partials erstellt werden:

1. `_ProductPriceVariants.cshtml` - Spezielle Preis-Darstellung
2. `_DeliveryInfoParentVariant.cshtml` - Custom Lieferinfo
3. `_ProductBonusOutput.cshtml` - Bonus-Berechnung

## Anpassungen

### Farben ändern

In `_product-variants-dropdown.scss`:

```scss
// Hover-Farbe (Orange-Ton)
.variant-item:hover:not(.variant-disabled) {
    background-color: rgba(239, 108, 0, 0.07); // Hier anpassen
}

// Ausgewählte Variante
.variant-selected {
    background-color: rgba(239, 108, 0, 0.15); // Hier anpassen
    border-color: rgba(239, 108, 0);
}
```

### Breakpoint ändern

Mobile/Desktop Breakpoint ist aktuell bei **768px**:

```scss
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) { /* Desktop */ }
```

### JavaScript Hooks

Das System reagiert auf AJAX-Updates automatisch:

```javascript
// Re-initialize after AJAX updates
$(document).ajaxComplete(function() {
    setTimeout(initVariantsDropdown, 100);
});
```

## Unterschiede zum alten System

### ✅ Verbesserungen

1. **Separation of Concerns**:
   - CSS → SCSS-Datei
   - JavaScript → JS-Datei
   - HTML → View Template
   - Kein Inline-Code mehr!

2. **Wartbarkeit**:
   - SCSS wird kompiliert und gecacht
   - JavaScript ist dokumentiert und modular
   - Wiederverwendbar für andere Templates

3. **Performance**:
   - Gecachte Assets
   - Minifizierung möglich
   - Version-Tagging via `asp-append-version`

4. **nopCommerce 4.9 kompatibel**:
   - Moderne Helpers (`NopUrl.RouteGenericUrlAsync`)
   - JSON-LD Support
   - Microdata Support

### ❌ Entfernt

1. **Pacific Theme Dependencies**:
   - `ISettingService` / `IStoreContext` entfernt
   - `pacificthemesettings.productpagelayout` entfernt
   - Cloud Zoom Widget entfernt
   - Category Navigation entfernt

2. **Custom Components**:
   - `<cu-asset-box>` muss separat integriert werden
   - `<cu-content-box>` muss separat integriert werden

3. **Sticky Container**:
   - Alte Sticky-Layout-Logik entfernt
   - Kann bei Bedarf in SCSS wieder hinzugefügt werden

## Testing Checklist

- [ ] SCSS kompiliert ohne Fehler (`gulp theme`)
- [ ] JavaScript lädt ohne Fehler (Browser Console prüfen)
- [ ] Modal öffnet sich auf Button-Klick
- [ ] Modal öffnet sich auf Header-Klick
- [ ] Modal schließt sich auf X-Button
- [ ] Modal schließt sich auf Außen-Klick
- [ ] Variantenauswahl funktioniert
- [ ] Button-Content wird aktualisiert
- [ ] AddToCart-Block wechselt korrekt
- [ ] Disabled Varianten nicht klickbar
- [ ] Mobile View: Bottom Sheet Modal
- [ ] Desktop View: Dropdown
- [ ] Nach AJAX-Request funktioniert es noch

## Next Steps

1. **HTML in ProductTemplate.VariantsDropdown.cshtml integrieren**
2. **Custom Partials erstellen** (falls gewünscht)
3. **Custom Components integrieren** (`<cu-asset-box>`, etc.)
4. **Testen mit echten Produktdaten**
5. **Fine-Tuning** von Styles und Verhalten

## Hinweise

- Das System benötigt jQuery (wird von nopCommerce bereitgestellt)
- SCSS muss nach Änderungen neu kompiliert werden: `gulp theme`
- JavaScript wird NACH jQuery und theme.js geladen (wichtig!)
- Alle data-Attribute (`data-variantid`, etc.) sind essentiell für die Funktion

---

**Erstellt**: 2025-10-22
**Version**: 1.0.0
**nopCommerce**: 4.9
**Status**: Extrahiert & Bereit zur Integration
