# BobMag Theme - Entwicklungs-Dokumentation

## Inhaltsverzeichnis

1. [Übersicht & Philosophie](#übersicht--philosophie)
2. [Theme-Architektur](#theme-architektur)
3. [Setup & Installation](#setup--installation)
4. [Entwicklungs-Workflow](#entwicklungs-workflow)
5. [View-Override System](#view-override-system)
6. [CSS/SCSS Strategie](#cssscss-strategie)
7. [JavaScript Integration](#javascript-integration)
8. [Update-Strategie](#update-strategie)
9. [Häufige Fallstricke](#häufige-fallstricke)
10. [Referenzen](#referenzen)

---

## Übersicht & Philosophie

### Design-Prinzipien

Das BobMag Theme folgt einer **Update-sicheren, CSS-first Strategie**:

- ✅ **CSS-First**: Soviel wie möglich mit CSS/SCSS lösen
- ✅ **Minimale View-Overrides**: Nur überschreiben, was absolut nötig ist
- ✅ **Layer-Architektur**: DefaultClean als Basis, Custom CSS darüber
- ✅ **SCSS-Modular**: Komponenten-basierte SCSS-Struktur
- ❌ **Keine unnötigen CSHTML-Kopien**: Vermeidung von Update-Konflikten

### Vorteile dieser Strategie

1. **Update-Sicherheit**: Bei nopCommerce-Updates nur Basis-CSS austauschen
2. **Wartbarkeit**: Änderungen sind isoliert und nachvollziehbar
3. **Performance**: CSS-Only Anpassungen sind schneller als View-Rendering
4. **Teamwork**: Klare Trennung zwischen Struktur und Design

---

## Theme-Architektur

### Verzeichnis-Struktur

```
Themes/BobMag/
├── Content/
│   ├── css/
│   │   ├── cleandefault.css    # Basis-CSS von DefaultClean (wird bei Updates ersetzt)
│   │   ├── styles.css          # Kompiliert aus SCSS (unser Custom CSS)
│   │   ├── styles.rtl.css      # RTL-Version (optional)
│   │   └── print.css           # Print-Styles
│   │
│   ├── scss/
│   │   ├── app.scss           # Haupt-SCSS-Datei (Import-Order)
│   │   ├── _variables.scss    # Theme-Variablen (Farben, Fonts, etc.)
│   │   ├── _mixins.scss       # Wiederverwendbare Mixins
│   │   ├── _utilities.scss    # Utility-Klassen
│   │   ├── _base.scss         # Base-Styles (HTML-Elemente)
│   │   ├── _layout.scss       # Layout-Struktur
│   │   └── components/
│   │       ├── _buttons.scss
│   │       ├── _header.scss
│   │       ├── _footer.scss
│   │       └── _product-card.scss
│   │
│   ├── js/
│   │   └── theme.js           # Custom JavaScript
│   │
│   └── images/                # Theme-spezifische Bilder
│
├── Views/
│   ├── Shared/
│   │   └── Head.cshtml        # CSS/JS Registrierung (einziger Override!)
│   └── _ViewImports.cshtml    # Using-Statements
│
├── Docs/
│   └── theme-dev.md          # Diese Datei
│
├── preview.jpg               # Theme-Vorschau (Admin)
└── theme.json                # Theme-Konfiguration
```

### CSS-Lade-Reihenfolge

```
1. cleandefault.css     ← Basis von DefaultClean
2. styles.css          ← Unser kompiliertes SCSS (überschreibt Basis)
3. jquery-ui.css       ← jQuery UI Components
4. swiper.css          ← Swiper Slider (conditional)
```

Diese Reihenfolge wird in `Views/Shared/Head.cshtml` definiert.

---

## Setup & Installation

### Voraussetzungen

- Node.js & npm installiert
- nopCommerce 4.9 läuft
- Grundkenntnisse in SCSS

### Erste Schritte

```bash
# 1. Zum Web-Projekt navigieren
cd src/Presentation/Nop.Web

# 2. Dependencies installieren (falls noch nicht geschehen)
npm install

# 3. SCSS einmalig kompilieren
gulp theme

# 4. Watch-Mode für Entwicklung starten
gulp theme:watch
```

### Verfügbare Gulp-Tasks

```bash
gulp default        # Standard-Tasks (clean, copyDependencies, prepareCldr)
gulp theme          # Kompiliert SCSS einmalig
gulp theme:watch    # Watch-Mode: Kompiliert bei Änderungen automatisch
```

---

## Entwicklungs-Workflow

### Typischer Workflow

```bash
# Terminal 1: Watch-Mode starten
gulp theme:watch

# Terminal 2: nopCommerce starten
dotnet run

# Dann:
# 1. SCSS in Content/scss/ bearbeiten
# 2. Gulp kompiliert automatisch → styles.css
# 3. Browser refresh (F5)
# 4. Änderungen sichtbar
```

### SCSS bearbeiten

```scss
// Content/scss/_variables.scss
$primary-color: #007bff;
$font-family: 'Arial', sans-serif;

// Content/scss/components/_buttons.scss
.button-1 {
  background: $primary-color;
  // Überschreibt cleandefault.css
}
```

### Browser-Cache leeren

Bei CSS-Änderungen, die nicht erscheinen:

```
Ctrl + Shift + R     (Chrome/Firefox - Hard Reload)
Ctrl + F5            (Alternative)
```

Oder: Cache-Busting mit Versionsnummer aktivieren (siehe Update-Strategie).

---

## View-Override System

### ⚠️ WICHTIG: Wie View-Overrides funktionieren

**nopCommerce View-Resolution:**

```
ThemeableViewLocationExpander.cs prüft:
1. /Themes/{ThemeName}/Views/{Controller}/{Action}.cshtml
2. /Themes/{ThemeName}/Views/Shared/{PartialName}.cshtml
3. /Views/{Controller}/{Action}.cshtml              ← Fallback
4. /Views/Shared/{PartialName}.cshtml              ← Fallback
```

**Wichtig**: Bei einem Match wird die View **komplett ersetzt**!

### ❌ Es gibt KEIN "base.Render()" oder Parent-Call

Im Gegensatz zu C# gibt es in Razor Views **keine Vererbung**:

```cshtml
// ❌ FUNKTIONIERT NICHT:
@{ await base.RenderAsync(); }
@{ @RenderParentView(); }
@{ @Html.RenderBase(); }
```

### ✅ Richtige Override-Strategie

**Szenario 1: Nur CSS/JS registrieren**

```cshtml
// Datei: /Themes/BobMag/Views/Shared/Head.cshtml
@{
    Layout = "";

    // CSS registrieren
    NopHtml.AppendCssFileParts($"~/Themes/{themeName}/Content/css/cleandefault.css");
    NopHtml.AppendCssFileParts($"~/Themes/{themeName}/Content/css/styles.css");

    // JS registrieren
    NopHtml.AppendScriptParts(ResourceLocation.Footer,
        $"~/Themes/{themeName}/Content/js/theme.js");
}
```

**Warum funktioniert das?**

In `/Views/Shared/_Root.Head.cshtml` Zeile 66 steht:

```cshtml
@*This is used so that themes can inject content into the header*@
@await Html.PartialAsync("Head")
```

Das ist ein **Hook-Pattern**: Die Basis-View ruft explizit ein Partial auf, das wir überschreiben können!

**Szenario 2: Layout-Struktur ändern** (VERMEIDEN!)

Falls du **wirklich** das Layout ändern musst:

```
1. Kopiere /Views/Shared/_Root.cshtml nach /Themes/BobMag/Views/Shared/_Root.cshtml
2. Mache deine Änderungen
3. ⚠️ WICHTIG: Bei Updates musst du manuell mergen!
```

**Empfehlung**: Versuche alles mit CSS zu lösen! Nur im absoluten Notfall Views überschreiben.

### View-Override-Hierarchie

```
_Root.Head.cshtml           ← Basis-Layout (NICHT überschreiben)
  └─> Head.cshtml           ← Theme-Hook (DAS überschreiben wir!)

_Root.cshtml                ← Seiten-Layout (nur bei Strukturänderungen)
  └─> _Header.cshtml        ← Partial (bei Bedarf überschreiben)
  └─> MainMenu Component    ← Component (überschreiben möglich)
  └─> _Footer.cshtml        ← Partial (bei Bedarf überschreiben)
```

**Faustregel**: Je tiefer in der Hierarchie, desto sicherer der Override!

---

## CSS/SCSS Strategie

### SCSS Import-Order (app.scss)

```scss
// Build order matters: tokens -> mixins -> utilities/base -> layout -> components
@import "variables";      // 1. Variablen (Farben, Fonts, Breakpoints)
@import "mixins";         // 2. Mixins (Funktionen)
@import "utilities";      // 3. Utility-Klassen
@import "base";          // 4. Base-Styles (html, body, h1-h6)
@import "layout";        // 5. Layout (Grid, Container)

@import "components/buttons";
@import "components/header";
@import "components/footer";
@import "components/product-card";
```

**Warum diese Reihenfolge?**

1. Variablen müssen zuerst definiert sein
2. Mixins nutzen Variablen
3. Base-Styles bilden die Grundlage
4. Layout strukturiert die Seite
5. Komponenten überschreiben spezifisch

### CSS-Spezifität-Strategie

**Ziel**: cleandefault.css überschreiben, ohne !important

```scss
// ❌ SCHLECHT: !important überall
.button-1 {
  background: red !important;
}

// ✅ GUT: Gleiche oder höhere Spezifität
.button-1 {
  background: red;  // Überschreibt cleandefault.css durch Lade-Reihenfolge
}

// ✅ BESSER: BEM-Pattern für eigene Komponenten
.bobmag-button {
  // Neuer Namespace, kein Konflikt
}
```

### Responsive Design

```scss
// _variables.scss - Breakpoints definieren
$breakpoint-mobile: 576px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 992px;
$breakpoint-wide: 1200px;

// _mixins.scss - Media Query Mixins
@mixin mobile {
  @media (max-width: $breakpoint-mobile) { @content; }
}

@mixin tablet {
  @media (min-width: $breakpoint-mobile) and (max-width: $breakpoint-tablet) { @content; }
}

@mixin desktop {
  @media (min-width: $breakpoint-desktop) { @content; }
}

// Verwendung:
.header {
  padding: 20px;

  @include mobile {
    padding: 10px;
  }

  @include desktop {
    padding: 30px;
  }
}
```

### CSS-Variablen vs SCSS-Variablen

```scss
// SCSS-Variablen (Compile-Time)
$primary-color: #007bff;

.button {
  background: $primary-color;  // Wird zu #007bff kompiliert
}

// CSS-Variablen (Runtime, änderbar per JS)
:root {
  --primary-color: #007bff;
}

.button {
  background: var(--primary-color);  // Kann per JS geändert werden
}
```

**Empfehlung**: SCSS-Variablen für statische Werte, CSS-Variablen für Theming/Dark-Mode.

---

## JavaScript Integration

### ⚠️ KRITISCH: JavaScript-Bundling und Ladereihenfolge

**Problem**: nopCommerce bundelt JavaScript-Dateien automatisch. Wenn `theme.js` mit `AppendScriptParts()` registriert wird, landet es IM BUNDLE - aber in falscher Reihenfolge!

**Warum das passiert**:
- `AppendScriptParts()` arbeitet mit LIFO (Last In First Out)
- `_Root.Head.cshtml` registriert jQuery zuerst (Zeile 39)
- `Head.cshtml` wird DANACH aufgerufen (Zeile 66 in `_Root.Head.cshtml`)
- Theme.js wird also NACH jQuery registriert
- Wegen LIFO landet theme.js VOR jQuery im Bundle
- Ergebnis: `$ is not defined` Fehler!

**✅ LÖSUNG: theme.js NICHT bundeln**

Wir laden theme.js als separaten Script-Tag NACH dem Bundle:

**Schritt 1**: Head.cshtml - NUR CSS, KEIN JavaScript!

```cshtml
// Datei: /Themes/BobMag/Views/Shared/Head.cshtml
@{
    Layout = "";
    var themeName = await themeContext.GetWorkingThemeNameAsync();

    // NUR CSS registrieren!
    NopHtml.AppendCssFileParts($"~/Themes/{themeName}/Content/css/cleandefault.css");
    NopHtml.AppendCssFileParts($"~/Themes/{themeName}/Content/css/styles.css");
    // ... weitere CSS-Dateien

    // ❌ NICHT: AppendScriptParts für theme.js verwenden!
}
```

**Schritt 2**: _Root.cshtml - theme.js als separater Tag

```cshtml
// Datei: /Themes/BobMag/Views/Shared/_Root.cshtml
@using Nop.Services.Themes

@inject IThemeContext themeContext

@{
    Layout = "_Root.Head";
    var themeName = await themeContext.GetWorkingThemeNameAsync();
}

@* ... Standard-Layout-Content von _Root.cshtml ... *@

@await Component.InvokeAsync(typeof(WidgetViewComponent), new { widgetZone = PublicWidgetZones.BodyEndHtmlTagBefore })

@* Theme-JavaScript wird NACH allen gebündelten Scripts geladen *@
<script src="~/Themes/@themeName/Content/js/theme.js" asp-append-version="true"></script>
```

**Reihenfolge der JS-Dateien im Footer:**

```html
<!-- 1. Gebündeltes Script (enthält jQuery, jQuery-UI, Validation, etc.) -->
<script src="/js/0lbk4wisq2zyrrdqon1ljw.scripts.js"></script>

<!-- 2. Inline Scripts von nopCommerce -->
<script>
  // nopCommerce inline code
</script>

<!-- 3. Unser theme.js (NICHT gebündelt, lädt als letztes) -->
<script src="/Themes/BobMag/Content/js/theme.js?v=..."></script>
```

**Vorteile dieser Lösung:**
- ✅ jQuery ist garantiert verfügbar, wenn theme.js ausgeführt wird
- ✅ Keine Bundle-Konflikte
- ✅ theme.js kann separat gecacht werden
- ✅ Einfacher zu debuggen (eigene Datei in DevTools)
- ✅ Update-sicher (keine Änderungen an Core-Bundling)

### theme.js Struktur

```javascript
// Content/js/theme.js

(function($) {
  'use strict';

  // Warte bis DOM geladen ist
  $(document).ready(function() {

    // Beispiel: Custom Menu-Toggle
    $('.bobmag-menu-toggle').on('click', function() {
      $('.bobmag-menu').toggleClass('open');
    });

    // Beispiel: Smooth Scroll
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 500);
      }
    });

  });

})(jQuery);
```

### jQuery vs Vanilla JS

nopCommerce nutzt jQuery - du kannst es direkt verwenden:

```javascript
// jQuery ist bereits geladen
jQuery(document).ready(function($) {
  // Code hier
});

// Oder Vanilla JS
document.addEventListener('DOMContentLoaded', function() {
  // Code hier
});
```

---

## Update-Strategie

### Bei nopCommerce-Updates

**Schritt 1: Neue DefaultClean CSS kopieren**

```bash
# Nach Update von nopCommerce:
cd src/Presentation/Nop.Web

# Neue Basis-CSS kopieren
cp Themes/DefaultClean/Content/css/styles.css \
   Themes/BobMag/Content/css/cleandefault.css
```

**Schritt 2: Testen**

```bash
# SCSS neu kompilieren
gulp theme

# Anwendung starten und testen
dotnet run
```

**Schritt 3: Anpassungen**

Falls Styles kaputt sind:
- Prüfe in Browser DevTools, welche Styles überschrieben werden
- Passe dein SCSS entsprechend an
- Nutze höhere Spezifität oder neue Selektoren

### Cache-Busting (empfohlen)

Um Browser-Cache-Probleme zu vermeiden:

```cshtml
// Head.cshtml - Version als Query-String
@{
    var version = "v=2025-10-22";  // Oder aus Config/Buildnummer

    NopHtml.AppendCssFileParts(
        $"~/Themes/{themeName}/Content/css/cleandefault.css?{version}");
    NopHtml.AppendCssFileParts(
        $"~/Themes/{themeName}/Content/css/styles.css?{version}");
    NopHtml.AppendScriptParts(ResourceLocation.Footer,
        $"~/Themes/{themeName}/Content/js/theme.js?{version}");
}
```

Nach jedem Deployment: Version ändern!

### View-Override Updates

Falls du Views überschrieben hast (`_Root.cshtml`, `_Header.cshtml`, etc.):

```bash
# 1. Vergleiche alte vs neue Version
git diff v4.8..v4.9 -- src/Presentation/Nop.Web/Views/Shared/_Root.cshtml

# 2. Merge manuell oder mit Merge-Tool
# 3. Teste ausgiebig!
```

**Darum**: So wenig Views wie möglich überschreiben!

---

## Häufige Fallstricke

### 1. CSS-Änderungen erscheinen nicht

**Problem**: Browser-Cache oder SCSS nicht kompiliert

**Lösung**:
```bash
# Watch-Mode läuft?
gulp theme:watch

# Oder manuell kompilieren
gulp theme

# Hard Reload im Browser
Ctrl + Shift + R
```

### 2. JavaScript-Fehler: "$ is not defined"

**Problem**: jQuery noch nicht geladen oder falsche Reihenfolge

**Ursache**: theme.js wurde mit `AppendScriptParts()` registriert und landet wegen LIFO VOR jQuery im Bundle!

**Lösung**:
```javascript
// 1. theme.js mit IIFE wrappen
(function($) {
  'use strict';
  // $ ist hier verfügbar
})(jQuery);

// 2. UND WICHTIG: theme.js NICHT mit AppendScriptParts registrieren!
// Stattdessen: Direkter <script>-Tag in _Root.cshtml (siehe "JavaScript Integration")
```

**Siehe**: Sektion "JavaScript Integration" für die komplette Lösung!

### 3. Views werden nicht überschrieben

**Problem**: Dateiname oder Pfad falsch

**Lösung**:
```
Richtig: /Themes/BobMag/Views/Shared/Head.cshtml
Falsch:  /Themes/BobMag/Views/Shared/_Head.cshtml  (Unterstrich!)
Falsch:  /Themes/BobMag/Views/head.cshtml          (Case-sensitive!)
```

### 4. SCSS-Kompilierung schlägt fehl

**Problem**: Syntax-Fehler oder fehlende Dependencies

**Lösung**:
```bash
# Error-Log prüfen
gulp theme

# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
```

### 5. CSS-Spezifität zu niedrig

**Problem**: Deine Styles werden von cleandefault.css überschrieben

**Lösung**:
```scss
// ❌ FALSCH: Zu niedrige Spezifität
.button {
  background: red;
}

// ✅ RICHTIG: Höhere Spezifität
.button-1.button-1 {  // Erhöht Spezifität
  background: red;
}

// ✅ BESSER: Eigener Namespace
.bobmag-button {
  background: red;
}
```

### 6. "_Root.cshtml überschrieben und Updates sind kaputt"

**Problem**: Du hast strukturelle Views überschrieben

**Lösung**:
```
1. Prüfe, ob Änderung wirklich nötig war
2. Falls ja: Merge nach Updates
3. Falls nein: Lösche Override, nutze CSS
```

---

## Referenzen

### Wichtige Dateien

| Datei | Zweck | Überschreiben? |
|-------|-------|----------------|
| `theme.json` | Theme-Konfiguration | ✅ Ja, anpassen |
| `preview.jpg` | Theme-Vorschau (Admin) | ✅ Ja, eigenes Bild |
| `Views/Shared/Head.cshtml` | CSS/JS Registrierung | ✅ Ja, das ist unser Hook |
| `Views/_ViewImports.cshtml` | Using-Statements | ✅ Optional |
| `Content/scss/app.scss` | Haupt-SCSS | ✅ Ja, das ist unser Code |
| `Content/js/theme.js` | Custom JavaScript | ✅ Ja, das ist unser Code |
| `Views/Shared/_Root.cshtml` | Layout-Struktur | ⚠️ Nur im Notfall |
| `Views/Shared/_Root.Head.cshtml` | HTML-Dokument-Basis | ❌ Nein, niemals |

### nopCommerce Theme-System

- **ThemeableViewLocationExpander**: `src/Presentation/Nop.Web.Framework/Themes/ThemeableViewLocationExpander.cs`
- **Theme-Konfiguration**: `src/Presentation/Nop.Web.Framework/Themes/ThemeProvider.cs`
- **View-Rendering**: ASP.NET Core Razor View Engine

### Externe Ressourcen

- [nopCommerce Docs - Themes](https://docs.nopcommerce.com/en/developer/design/index.html)
- [SCSS Guide](https://sass-lang.com/guide)
- [Gulp Documentation](https://gulpjs.com/docs/en/getting-started/quick-start)
- [BEM Methodology](http://getbem.com/)

### Team-Kontakt

Bei Fragen zum Theme-System:
- Siehe `/Themes/BobMag/Docs/` für weitere Dokumentation
- Prüfe Git-History für Kontext zu Änderungen
- Erstelle Issues im Projekt-Repository

---

## Changelog

| Datum | Version | Änderungen |
|-------|---------|------------|
| 2025-10-22 | 1.0.0 | Initiale Theme-Struktur mit SCSS, Gulp, CSS-Layer-Strategie |

---

**Letzte Aktualisierung**: 2025-10-22
**Autor**: Development Team
**nopCommerce Version**: 4.9
