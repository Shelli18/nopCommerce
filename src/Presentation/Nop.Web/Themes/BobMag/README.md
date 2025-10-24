# BobMag Theme für nopCommerce 4.9

## Übersicht

BobMag ist ein **Update-sicheres Custom Theme** für nopCommerce mit **CSS-first Approach** und minimalen View-Overrides.

## Features

- ✅ **Floating Buttons** auf Product Cards (nur CSS, kein View-Override)
- ✅ **Variants Dropdown System** für Produkte mit Varianten
- ✅ **SCSS/CSS Layer System** (cleandefault.css + styles.css)
- ✅ **Responsive Design** (Mobile + Desktop)
- ✅ **Update-sicher** durch minimale View-Änderungen

## Struktur

```
Themes/BobMag/
├── Content/
│   ├── scss/               # SCSS Source Files
│   │   ├── app.scss       # Main SCSS (Import-Order)
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _utilities.scss
│   │   ├── _base.scss
│   │   ├── _layout.scss
│   │   └── components/
│   │       ├── _buttons.scss
│   │       ├── _product-card-floating.scss
│   │       └── _product-variants-dropdown.scss
│   │
│   ├── css/
│   │   ├── cleandefault.css    # Basis von DefaultClean (bei Updates ersetzen)
│   │   └── styles.css          # Kompiliert aus SCSS
│   │
│   ├── js/
│   │   ├── theme.js                        # Theme JavaScript
│   │   └── product-variants-dropdown.js    # Variants Dropdown Logic
│   │
│   └── images/             # Theme Images
│
├── Views/
│   ├── Shared/
│   │   ├── Head.cshtml    # CSS Registrierung
│   │   └── _Root.cshtml   # JavaScript Registrierung
│   ├── Product/
│   │   └── ProductTemplate.VariantsDropdown.cshtml
│   └── _ViewImports.cshtml
│
├── Docs/
│   ├── theme-dev.md                    # Entwickler-Dokumentation
│   ├── variants-dropdown-system.md     # Variants Dropdown Doku
│   └── view-overrides-changelog.md     # View-Overrides für Updates
│
├── preview.jpg
├── theme.json
└── README.md              # Diese Datei
```

## Quick Start

### 1. Entwicklung starten

```bash
# Terminal 1: SCSS Watch Mode
cd src/Presentation/Nop.Web
npm install
npx gulp theme:watch

# Terminal 2: nopCommerce starten
dotnet run
```

### 2. SCSS bearbeiten

```bash
# Änderungen in Content/scss/ machen
# → Gulp kompiliert automatisch zu Content/css/styles.css
# → Browser refresh (F5)
```

### 3. Theme aktivieren

1. nopCommerce Admin öffnen
2. Configuration → Settings → General Settings
3. Store Theme: **BobMag** auswählen
4. Speichern

## Verfügbare Gulp-Tasks

```bash
npx gulp theme          # SCSS einmalig kompilieren
npx gulp theme:watch    # Watch-Mode (empfohlen für Entwicklung)
```

## View Overrides

**Minimale Overrides für Update-Sicherheit!**

### Überschriebene Views:

1. **`Views/Shared/_Root.cshtml`**
   - Grund: theme.js und product-variants-dropdown.js einbinden
   - Update-Risiko: ⭐ NIEDRIG

2. **`Views/Shared/Head.cshtml`**
   - Grund: CSS-Registrierung (cleandefault.css + styles.css)
   - Update-Risiko: ⭐ NIEDRIG

3. **`Views/_ViewImports.cshtml`**
   - Grund: Zusätzliche using-Statements für nopCommerce 4.9
   - Update-Risiko: ⭐⭐ MITTEL

4. **`Views/Product/ProductTemplate.VariantsDropdown.cshtml`**
   - Grund: Custom Variants Dropdown System
   - Update-Risiko: ⭐⭐⭐ HOCH (basiert auf ProductTemplate.Grouped.cshtml)

➡️ **Siehe**: [view-overrides-changelog.md](Docs/view-overrides-changelog.md) für Details

## Update-Strategie

### Bei nopCommerce-Updates:

#### Schritt 1: DefaultClean CSS aktualisieren

```bash
# Neue cleandefault.css von DefaultClean kopieren
cp Themes/DefaultClean/Content/css/styles.css \
   Themes/BobMag/Content/css/cleandefault.css

# SCSS neu kompilieren
npx gulp theme
```

#### Schritt 2: View-Overrides prüfen

```bash
# Änderungen in Standard-Views prüfen
git diff v4.9..v5.0 -- src/Presentation/Nop.Web/Views/Shared/_Root.cshtml
git diff v4.9..v5.0 -- src/Presentation/Nop.Web/Views/Product/ProductTemplate.Grouped.cshtml

# Für jede geänderte View: Manuell mergen
# → Siehe view-overrides-changelog.md für Details
```

#### Schritt 3: Testen

- [ ] Build erfolgreich
- [ ] Theme lädt ohne Fehler
- [ ] CSS korrekt angewendet
- [ ] JavaScript funktioniert
- [ ] Variants Dropdown funktioniert
- [ ] Browser Console: Keine Fehler

## Dokumentation

### Entwickler-Dokumentation

- **[theme-dev.md](Docs/theme-dev.md)** - Vollständige Entwicklungs-Doku
  - Theme-Architektur
  - SCSS-Struktur
  - JavaScript Integration
  - View-Override System
  - Häufige Fallstricke

### Feature-Dokumentation

- **[variants-dropdown-system.md](Docs/variants-dropdown-system.md)** - Variants Dropdown
  - Funktionsweise
  - Integration
  - Anpassungen
  - Testing

### Update-Dokumentation

- **[view-overrides-changelog.md](Docs/view-overrides-changelog.md)** - View-Overrides
  - Liste aller Overrides
  - Update-Strategie pro View
  - Minimierungs-Tipps

## Troubleshooting

### CSS-Änderungen werden nicht angezeigt

```bash
# 1. SCSS neu kompilieren
npx gulp theme

# 2. Browser Hard Reload
Ctrl + Shift + R    (Chrome/Firefox)

# 3. Cache leeren falls nötig
# nopCommerce Admin → System → Maintenance → Clear cache
```

### JavaScript-Fehler: "$ is not defined"

- ✅ Prüfen: theme.js wird NACH jQuery geladen (siehe _Root.cshtml)
- ✅ Prüfen: Browser Console für Fehler
- ✅ Hard Reload im Browser

### Variants Dropdown funktioniert nicht

```bash
# 1. Prüfen: SCSS kompiliert?
ls -la Content/css/styles.css

# 2. Prüfen: JavaScript geladen?
# Browser DevTools → Network Tab → product-variants-dropdown.js

# 3. Prüfen: ProductTemplate.VariantsDropdown.cshtml aktiv?
# Admin → Catalog → Products → [Produkt] → Product Template
```

### Build-Fehler nach View-Änderungen

```bash
# 1. _ViewImports.cshtml prüfen
# 2. using-Statements vollständig?
# 3. Syntax-Fehler in CSHTML?

# Clean & Rebuild
dotnet clean
dotnet build
```

## Kontakt & Support

- **Dokumentation**: `Themes/BobMag/Docs/`
- **Git History**: Für Kontext zu Änderungen
- **Issues**: Im Projekt-Repository

## Changelog

| Datum | Version | Änderungen |
|-------|---------|------------|
| 2025-10-22 | 1.0.0 | Initial Release: Theme-Struktur, SCSS, Variants Dropdown System |

## Technologie-Stack

- **nopCommerce**: 4.9
- **SCSS**: Dart Sass (via Gulp)
- **JavaScript**: jQuery (nopCommerce Standard)
- **Node.js**: Für SCSS-Kompilierung
- **Gulp**: Task Runner

## Lizenz

Internes Projekt - Alle Rechte vorbehalten

---

**Maintainer**: Development Team
**Letzte Aktualisierung**: 2025-10-22
**nopCommerce Version**: 4.9
