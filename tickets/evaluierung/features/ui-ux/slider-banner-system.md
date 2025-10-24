# Feature Evaluation: Slider & Banner System

## Feature-ID: UI-012

### Grundinformationen

**Feature-Name:** Slider & Banner System (Bilder, Banner, Karussells)

**Kategorie:**
- [x] UI/UX Enhancement
- [x] Funktionalität
- [x] Integration (Drittsystem)
- [ ] Performance
- [ ] SEO
- [ ] Sicherheit
- [ ] Admin-Funktion

**Beschreibung:**
System zur Anzeige von Slidern und Bannern auf verschiedenen Seiten (Homepage, Kategorieseiten, Produktseiten). Umfasst:
1. **Produkt-Slider** (z.B. "Bestseller", "Neue Produkte") → JavaScript Widget
2. **Banner/Hero-Slider** (Homepage, Kampagnen) → Externe Verwaltung + API
3. **Bild-Galerien** (Produkt-Slider in Detailansicht)

**Alter Shop - Status:**
- **Implementiert:** Ja
- **Technologie:** Plugin (Name nicht spezifiziert)
- **Dateien/Komponenten:**
  - Slider-Plugin für Bilder/Banner
  - Produkt-Slider (vermutlich Custom oder Plugin)
  - Admin-Verwaltung im Shop-Backend

**Probleme im alten System:**
1. ❌ Plugin wird nicht mehr gebraucht (veraltet)
2. ❌ Admin muss Banner im Shop-Backend pflegen (nicht zentral)
3. ❌ Keine API-Anbindung für externe Content-Management-Systeme
4. ❌ Keine 4.9-Version verfügbar (vermutlich)
5. ⚠️ Wartungsaufwand für Slider-Konfiguration im Backend

---

### Evaluierung

#### Priorität

- [ ] **CRITICAL** - Muss vor Go-Live implementiert sein
- [x] **HIGH** - Sollte vor Go-Live implementiert sein
- [ ] **MEDIUM** - Kann nach Go-Live nachgeliefert werden
- [ ] **LOW** - Nice-to-have, keine feste Timeline

**Begründung:**
- ✅ **Produkt-Slider:** Wichtig für Homepage ("Bestseller", "Neue Produkte") → HIGH
- ⚠️ **Banner-Slider:** Marketing-relevant, aber kann mit Platzhaltern starten → MEDIUM möglich
- 🎯 **Kompromiss:** Produkt-Slider Pre-Launch, Banner-Slider Post-Launch (Phase 1)

**Aufgeteilt nach Komponente:**
- 🔴 Produkt-Slider: HIGH (Go-Live wichtig)
- 🟡 Banner-Slider: MEDIUM (kann nachgeliefert werden)
- 🟢 Zusatz-Features (Animationen, etc.): LOW

---

#### Umsetzungsart

**Empfohlene Implementierung (Hybrid-Ansatz):**
- [x] **Theme** (BobMag Theme) - Produkt-Slider via JavaScript Widget
- [x] **Plugin** (eigenes Plugin oder externes) - Banner-Slider mit API
- [x] **Externe Integration** (API, Webhook, etc.) - Content Management
- [ ] **Existing Plugin** (bestehendes nopCommerce Plugin nutzen)
- [ ] **nopCommerce Core** (bereits in 4.9 vorhanden)

**Begründung:**

### 🎯 Empfohlener Ansatz: 2-Komponenten-Lösung

#### 1️⃣ Produkt-Slider → JavaScript Widget (Theme)

**Umsetzung:**
- ✅ **Swiper.js** oder **Slick Slider** (bereits in nopCommerce integriert)
- ✅ JavaScript-basiert, keine Backend-Pflege nötig
- ✅ View-Override für Platzierung (z.B. Homepage, Kategorieseiten)
- ✅ Slider holt Produkt-Daten via nopCommerce Core (Bestseller, New, Featured)

**Vorteile:**
- ⚡ Performance: Client-Side Rendering
- 🚀 Schnell implementierbar (1-2 Tage)
- 🔄 Update-sicher (wenig Custom Code)
- 💰 Kostenlos (Open Source Libraries)

**Nachteile:**
- ⚠️ Keine Admin-UI (Konfiguration in Code/Settings)
- ⚠️ Design-Anpassungen nur per CSS

**Beispiel-Libraries:**
- **Swiper.js** (bereits in nopCommerce): Modern, touch-fähig
- **Slick Slider**: jQuery-basiert, simpel
- **Flickity**: Moderne Alternative

#### 2️⃣ Banner-Slider → Externe Verwaltung + API Integration

**Umsetzung - Option A: Headless CMS (empfohlen)**
- ✅ **Contentful** (kostenlos bis 25k Records)
- ✅ **Strapi** (Open Source, Self-Hosted)
- ✅ **Storyblok** (Developer-freundlich)
- ✅ **Sanity** (Realtime, kollaborativ)

**Vorteile:**
- 🎯 Marketing-Team kann Banner selbst pflegen (kein Dev-Bottleneck)
- 🌍 Multi-Language Support out-of-the-box
- 📅 Zeitgesteuerte Banner (von-bis Datum, automatisch)
- 📊 Analytics/Tracking direkt im CMS
- 🔗 API-First: Wiederverwendbar in anderen Systemen
- 🖼️ Asset Management (Bilder, Videos) zentral

**Nachteile:**
- 💰 Kosten: $0-300/Monat (je nach Service & Volumen)
- 🛠️ Initial Setup nötig (API-Integration in nopCommerce)
- 📚 Lernkurve für Marketing-Team

**Umsetzung - Option B: Plugin mit Admin-UI**

**Option B1: Offizielles nopCommerce Team Plugin - Swiper Slider (⭐ EMPFOHLEN FÜR START)**
- **Link:** https://www.nopcommerce.com/de/swiper-slider
- ✅ **Offizielles nopCommerce Team Plugin**
- ✅ Kostenlos
- ✅ **Ab Version 4.8 verfügbar** (nopCommerce 4.9 kompatibel)
- ✅ Admin-UI im Shop
- ✅ Basiert auf Swiper.js (moderne Library)
- ✅ Gut gepflegt & Update-sicher (offizielles Team)
- ⚠️ Keine API (externe Verwaltung nicht möglich)
- ⚠️ Pflege im Shop-Backend erforderlich

**Option B2: nopStation Anywhere Slider**
- **Link:** https://www.nopcommerce.com/de/anywhere-slider-by-nopstation
- ✅ Kostenlos
- ✅ Admin-UI im Shop
- ❓ Version 4.9 verfügbar? (muss geprüft werden)
- ⚠️ Keine API (externe Verwaltung nicht möglich)

**Umsetzung - Option C: Hybrid (CMS + Widget/Plugin)**
- Headless CMS für Content-Management
- Leichtgewichtiges Widget in nopCommerce für Rendering
- API holt Banner-Daten beim Seitenaufruf (gecacht)

---

### 🎯 NEUE EMPFEHLUNG (mit offiziellem Plugin)

**Phase 1: Go-Live (Sprint 2) → Offizielles Swiper Slider Plugin**
- ✅ **Schnellster Start:** Plugin installieren & konfigurieren (2-4h)
- ✅ **Update-sicher:** Offizielles nopCommerce Team Plugin
- ✅ **Funktionsfähig:** Produkt-Slider & Banner-Slider out-of-the-box
- ⚠️ **Kompromiss:** Admin muss im Shop-Backend pflegen (temporär akzeptabel)

**Phase 2: Post-Launch → Headless CMS Integration**
- ✅ **Langfristige Lösung:** Externe Banner-Verwaltung
- ✅ **Marketing-Autonomie:** Selbstverwaltung ohne IT
- ✅ **API-Integration:** Content-Wiederverwendbarkeit
- 🔄 **Migration:** Banner aus Plugin-Admin in CMS übertragen

---

#### Technische Details

**Aufwand (Schätzung):**

**⭐ NEUE EMPFEHLUNG - 2-Phasen-Ansatz:**

**Phase 1: Go-Live (Offizielles Swiper Slider Plugin)**
- [x] XS (2-4 Stunden) - Plugin installieren + konfigurieren

**Phase 2: Post-Launch (Headless CMS Integration)**
- [x] M (1-2 Tage) - API-Integration + Frontend-Rendering

---

**Alternative Ansätze (ursprüngliche Evaluierung):**

**Produkt-Slider (JavaScript Widget - manuell):**
- [ ] S (2-4 Stunden) - Bei Nutzung von Swiper.js/Slick

**Banner-Slider (Varianten):**
- **Option A (Headless CMS):**
  - [ ] M (1-2 Tage) - API-Integration + Frontend-Rendering

- **Option B1 (Offizielles Plugin - ⭐ EMPFOHLEN):**
  - [x] XS (2-4 Stunden) - Installation + Konfiguration

- **Option B2 (nopStation Plugin):**
  - [ ] XS (<2 Stunden) - Installation + Konfiguration

- **Option C (Eigenes Plugin):**
  - [ ] L (3-5 Tage) - Admin-UI + API + Frontend

**Detaillierte Aufwands-Schätzung (2-Phasen-Ansatz):**

**🚀 Phase 1: Go-Live mit offiziellem Plugin - 2-4 Stunden**
1. Plugin installieren (Swiper Slider von nopCommerce Team)
2. Plugin konfigurieren im Admin
3. Produkt-Slider erstellen (Bestseller, Neue Produkte)
4. Banner-Slider erstellen (Homepage Hero)
5. Widget Zones zuweisen
6. CSS-Styling anpassen (BobMag Theme)
7. Testing (Mobile, Desktop)

**Vorteile:**
- ✅ Schnellster Go-Live
- ✅ Funktionsfähige Slider sofort
- ✅ Kein Custom Code erforderlich
- ✅ Update-sicher (offizielles Plugin)

**Nachteile (temporär):**
- ⚠️ Admin muss im Shop-Backend pflegen
- ⚠️ Keine API-Integration (noch)

---

**🔄 Phase 2: Post-Launch Headless CMS Integration - 1-2 Tage**
1. CMS auswählen & Setup (Contentful/Strapi/Storyblok)
2. Content-Model definieren (Banner-Struktur)
3. API-Endpoint in nopCommerce (BannerController)
4. Frontend-Rendering (erweitert Plugin oder eigenes Widget)
5. Caching-Layer (Redis/Memory Cache)
6. Migration: Banner aus Plugin-Admin → CMS
7. Admin-Dokumentation für Marketing-Team
8. Plugin deaktivieren oder parallel laufen lassen

**Vorteile:**
- ✅ Marketing-Autonomie (Selbstverwaltung)
- ✅ Zentrale Content-Verwaltung
- ✅ API-Integration für andere Systeme
- ✅ Zeit für saubere Implementierung (kein Launch-Druck)

---

**⚠️ Alternative: Manuelles Swiper.js (nicht empfohlen) - 4-6 Stunden**
1. Swiper.js in Theme integrieren (falls noch nicht vorhanden)
2. View-Override für Homepage erstellen (Widget Zone)
3. JavaScript für Produkt-Slider (Bestseller, New Products)
4. CSS-Styling anpassen (BobMag Theme)
5. Responsive Testing (Mobile, Tablet, Desktop)

**Warum nicht empfohlen?**
- ❌ Mehr Aufwand als Plugin (4-6h vs 2-4h)
- ❌ Custom Code = mehr Maintenance
- ❌ Offizielles Plugin bietet mehr Features out-of-the-box

**Dependencies:**

**Phase 1 (Offizielles Plugin):**
- ✅ Swiper Slider Plugin (nopCommerce Team)
- ✅ Swiper.js (im Plugin enthalten)
- ✅ jQuery (bereits in nopCommerce vorhanden)
- ✅ nopCommerce Widget System

**Phase 2 (Headless CMS):**
- ✅ Swiper.js / Slick Slider (JavaScript Library)
- ✅ jQuery (bereits in nopCommerce vorhanden)
- ✅ nopCommerce Widget System
- ⚠️ Headless CMS Account (Contentful/Strapi/etc.)
- ⚠️ HTTP Client für API-Calls (RestSharp/HttpClient)

**Risiken:**
- ⚠️ **Performance**: API-Calls können Ladezeit erhöhen
  - Mitigation: Aggressives Caching (z.B. 1h TTL), CDN für Bilder
- ⚠️ **Externe Abhängigkeit**: CMS-Ausfall → Banner fehlen
  - Mitigation: Fallback auf statische Banner, Offline-Cache
- ⚠️ **Kosten**: Headless CMS kann teuer werden bei hohem Traffic
  - Mitigation: Free Tier nutzen (Contentful: 25k Records), Self-Hosted (Strapi)
- ⚠️ **Komplexität**: Marketing-Team muss CMS lernen
  - Mitigation: Training, Dokumentation, einfaches Content-Model

**Kompatibilität mit nopCommerce 4.9:**
- [x] Voll kompatibel
- [ ] Anpassungen nötig
- [ ] Unklar - muss getestet werden
- [ ] Nicht kompatibel - komplettes Rewrite nötig

**Hinweis:** JavaScript-Widgets sind framework-agnostisch und funktionieren mit jeder nopCommerce-Version.

---

#### Business Impact

**Betrifft:**
- [x] Kunden (Frontend)
- [x] Admin (Backend)
- [x] Beide

**User Stories:**

**Als Kunde** möchte ich **ansprechende Produkt-Slider und Banner sehen**, damit **ich schnell neue Produkte und Angebote entdecken kann**.

**Als Marketing-Manager** möchte ich **Banner selbst pflegen und zeitgesteuert schalten**, damit **ich unabhängig von der IT schnell auf Kampagnen reagieren kann**.

**Als Content-Manager** möchte ich **Banner zentral in einem CMS verwalten**, damit **ich sie auch für andere Kanäle (App, Newsletter) nutzen kann**.

**Business Value:**
- [x] Umsatzsteigerung (Produkt-Discovery durch Slider)
- [x] Conversion-Optimierung (Banner für Kampagnen)
- [x] Kundenzufriedenheit (ansprechende Präsentation)
- [x] Prozesseffizienz (Admin) (Selbstverwaltung durch Marketing)
- [ ] Compliance/Legal
- [x] Sonstiges: **Marketing-Agilität**, **Content-Wiederverwendbarkeit**

**Geschätzte Auswirkung bei Nicht-Implementierung:**
- [ ] Kritisch - Shop nicht nutzbar
- [x] Hoch - Signifikante Einschränkungen
- [ ] Mittel - Komforteinbußen
- [ ] Niedrig - Kaum bemerkbar

**Begründung:**
- 🛑 **Produkt-Slider:** Ohne Slider keine Präsentation von Bestsellern/Neuheiten auf Homepage → Conversion leidet
- ⚠️ **Banner-Slider:** Marketing kann keine Kampagnen-Banner schalten → Flexibilität fehlt
- 📉 Shop wirkt statisch und weniger professionell

**Quantifizierung (Schätzung):**
- 📈 +15-25% Klickrate auf vorgestellte Produkte (Slider)
- 🎯 +10-20% Conversion bei Kampagnen-Bannern
- ⏱️ -90% Zeitaufwand für Banner-Pflege (Self-Service statt IT-Ticket)

---

#### Migration & Testing

**Datenmigration nötig:**
- [x] Ja
- [ ] Nein

**Details:**
Falls alte Slider/Banner vorhanden sind:
1. **Produkt-Slider:** Keine Migration (neue Konfiguration)
2. **Banner-Slider:**
   - Bilder exportieren aus altem System
   - In Headless CMS importieren (via API oder manuell)
   - Links/CTAs prüfen und anpassen

**Migrations-Checkliste:**
- [ ] Alle Banner-Bilder exportieren (inkl. Alt-Tags)
- [ ] Banner-Zeiträume dokumentieren (von-bis Datum)
- [ ] Links/CTAs prüfen (alte URLs vs neue Shop-URLs)
- [ ] In CMS importieren & testen

**Testing-Aufwand:**
- [ ] Minimal (einfache Sichtprüfung)
- [x] Standard (manuelle Tests)
- [ ] Hoch (komplexe Workflows, mehrere Szenarien)
- [ ] Sehr hoch (Integration Tests, Performance Tests)

**Test-Szenarien:**

**Produkt-Slider:**
1. ✅ Slider zeigt korrekte Produkte (Bestseller, New, Featured)
2. ✅ Navigation funktioniert (Vor/Zurück Buttons, Dots)
3. ✅ Touch-Gesten auf Mobile (Swipe)
4. ✅ Auto-Play (falls aktiviert) funktioniert
5. ✅ Responsive: Anzahl Slides passt sich an (Desktop: 4, Tablet: 2, Mobile: 1)
6. ✅ Performance: Kein Flackern beim Laden
7. ✅ Accessibility: Keyboard-Navigation, Screen-Reader

**Banner-Slider:**
1. ✅ Banner werden von API geholt und angezeigt
2. ✅ Zeitgesteuerte Banner: Nur aktive Banner sichtbar
3. ✅ Links/CTAs funktionieren (Tracking)
4. ✅ Bilder laden schnell (CDN, Lazy Loading)
5. ✅ Fallback: Bei API-Fehler wird statischer Banner angezeigt
6. ✅ Caching funktioniert (zweiter Aufruf schneller)
7. ✅ Mobile/Desktop: Verschiedene Bilder möglich (Responsive Images)
8. ✅ Admin: Marketing-Team kann Banner im CMS erstellen/bearbeiten

**Performance:**
1. ✅ Ladezeit: Slider blockiert nicht die Seite (<1s)
2. ✅ Bilder optimiert (WebP, Lazy Loading)
3. ✅ JavaScript Bundle-Size akzeptabel (+50kb für Swiper.js)
4. ✅ API-Response-Time: <200ms (gecacht)

**Browser-Kompatibilität:**
- Chrome, Firefox, Safari, Edge (Desktop & Mobile)

---

### Entscheidung

**Status:**
- [x] ✅ Genehmigt zur Implementierung
- [ ] ⏸️ Zurückgestellt (Post-Launch)
- [ ] ❌ Nicht implementieren
- [ ] ❓ Noch zu klären

**Implementierungs-Timeline:**

**⭐ NEUE Timeline mit offiziellem Plugin:**

**Phase 1 - Sprint 2 (Pre-Launch):**
- [x] Offizielles Swiper Slider Plugin installieren & konfigurieren
- [x] Produkt-Slider (Bestseller, Neue Produkte)
- [x] Banner-Slider (Homepage Hero)
- [x] CSS-Anpassungen im BobMag Theme
- ⏱️ **Aufwand:** 2-4 Stunden

**Phase 2 - Post-Launch Phase 1 (4 Wochen nach Go-Live):**
- [ ] Headless CMS Setup (Contentful/Strapi)
- [ ] API-Integration in nopCommerce
- [ ] Banner-Migration aus Plugin → CMS
- [ ] Marketing-Team Training
- ⏱️ **Aufwand:** 1-2 Tage

---

**Alternative Timeline (falls manuell gewünscht):**

**Produkt-Slider (manuelles Swiper.js):**
- [ ] Sprint 2 (Pre-Launch Should-Have)
- ⏱️ Aufwand: 4-6 Stunden

**Banner-Slider (Headless CMS):**
- [ ] Sprint 1 (Pre-Launch Must-Have)
- [ ] Sprint 2 (Pre-Launch Should-Have) - Falls Zeit
- [ ] Post-Launch Phase 1 (innerhalb 4 Wochen nach Go-Live)
- ⏱️ Aufwand: 1-2 Tage

**Verantwortlich:**
Development Team (Produkt-Slider)
Development Team + Marketing (Banner-Slider Setup)

**Budget:**

**Phase 1 (Go-Live):**
- ✅ **Offizielles Swiper Slider Plugin:** Kostenlos (nopCommerce Team)
- ✅ **Keine laufenden Kosten**

**Phase 2 (Post-Launch):**
- ✅ Headless CMS: $0-50/Monat (Contentful Free Tier oder Strapi Self-Hosted)
- ✅ Entwicklungszeit: 1-2 Tage

**Gesamt:**
- 💰 **Go-Live:** $0 (nur Arbeitszeit: 2-4h)
- 💰 **Langfristig:** $0-50/Monat (CMS) + einmalig 1-2 Tage Entwicklung

**Notizen:**
- ✅ **NEUE Entscheidung: Phase 1 → Offizielles Swiper Slider Plugin (Go-Live)**
- ✅ **NEUE Entscheidung: Phase 2 → Headless CMS Integration (Post-Launch)**
- ✅ **Vorteil:** Schneller Go-Live ohne Kompromisse bei Funktionalität
- ✅ **Vorteil:** Zeit für saubere CMS-Integration nach Launch
- 📝 Langfristig: Externe Verwaltung (nicht im Shop-Backend)
- 🔗 Plugin: https://www.nopcommerce.com/de/swiper-slider

**Offene Fragen:**
1. ❓ **Welches Headless CMS?**
   - Empfehlung: **Contentful** (einfach, Free Tier) oder **Strapi** (Self-Hosted, kostenlos)
   - Action: Entscheidung mit Marketing & IT

2. ❓ **Wer pflegt Banner-Content?**
   - Marketing-Team oder Agentur?
   - Action: Zuständigkeiten klären

3. ❓ **Banner-Typen definieren**
   - Hero-Banner (Homepage, Full-Width)
   - Teaser-Banner (Kategorie-Seiten, halb-breit)
   - Promotion-Banner (Sidebar, klein)
   - Action: Liste mit Marketing erstellen

4. ❓ **Tracking-Requirements**
   - Google Analytics Events bei Banner-Klicks?
   - UTM-Parameter automatisch?
   - Action: Mit Marketing/Analytics besprechen

5. ❓ **Bilder-Anforderungen**
   - Formate: JPG, PNG, WebP?
   - Größen: Desktop (1920x600), Mobile (768x400)?
   - Dateigröße: Max 200kb?
   - Action: Guidelines erstellen

---

### Technischer Implementierungsplan

#### Produkt-Slider (Swiper.js)

**Struktur:**
```
Themes/BobMag/
├── Content/
│   ├── scss/
│   │   └── components/_product-slider.scss   # Slider-Styling
│   ├── js/
│   │   └── product-slider.js                 # Slider-Init
│   └── lib/
│       └── swiper/                           # Swiper.js (falls nicht global)
├── Views/
│   ├── Home/
│   │   └── Index.cshtml                      # Homepage mit Slider
│   └── Components/
│       └── ProductSlider/
│           └── Default.cshtml                # Slider-Widget
```

**HTML-Beispiel:**
```cshtml
@* Views/Components/ProductSlider/Default.cshtml *@
<div class="product-slider-container">
    <h2 class="slider-title">@Model.Title</h2>

    <div class="swiper product-slider" data-slider-type="@Model.Type">
        <div class="swiper-wrapper">
            @foreach (var product in Model.Products)
            {
                <div class="swiper-slide">
                    @await Html.PartialAsync("_ProductBox", product)
                </div>
            }
        </div>

        <!-- Navigation -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</div>
```

**JavaScript-Init:**
```javascript
// Content/js/product-slider.js
(function($) {
    'use strict';

    function initProductSliders() {
        $('.product-slider').each(function() {
            new Swiper(this, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 },
                }
            });
        });
    }

    $(document).ready(initProductSliders);
})(jQuery);
```

---

#### Banner-Slider (Headless CMS - Contentful Beispiel)

**Content-Model (Contentful):**
```json
{
  "name": "Banner",
  "fields": [
    { "id": "title", "type": "Symbol", "required": true },
    { "id": "image_desktop", "type": "Asset" },
    { "id": "image_mobile", "type": "Asset" },
    { "id": "link_url", "type": "Symbol" },
    { "id": "link_text", "type": "Symbol" },
    { "id": "background_color", "type": "Symbol" },
    { "id": "text_color", "type": "Symbol" },
    { "id": "active_from", "type": "Date" },
    { "id": "active_to", "type": "Date" },
    { "id": "display_order", "type": "Integer" },
    { "id": "target_page", "type": "Symbol", "enum": ["Homepage", "Category", "Product"] }
  ]
}
```

**nopCommerce Integration:**
```csharp
// Controllers/BannerController.cs
public class BannerController : Controller
{
    private readonly IContentfulService _contentfulService;
    private readonly ICacheManager _cacheManager;

    public async Task<IActionResult> GetBanners(string location = "homepage")
    {
        var cacheKey = $"banners_{location}";

        var banners = await _cacheManager.GetAsync(cacheKey, async () =>
        {
            return await _contentfulService.GetActiveBanners(location);
        }, 60); // Cache 60 Minuten

        return Json(banners);
    }
}

// Services/ContentfulService.cs
public class ContentfulService : IContentfulService
{
    private readonly IContentfulClient _client;

    public async Task<List<BannerModel>> GetActiveBanners(string location)
    {
        var queryBuilder = QueryBuilder<Banner>
            .New
            .ContentTypeIs("banner")
            .FieldEquals("fields.target_page", location)
            .FieldLessThanOrEqualTo("fields.active_from", DateTime.UtcNow)
            .FieldGreaterThanOrEqualTo("fields.active_to", DateTime.UtcNow)
            .OrderBy("fields.display_order");

        var entries = await _client.GetEntries(queryBuilder);

        return entries.Select(e => new BannerModel
        {
            Title = e.Title,
            ImageDesktop = e.ImageDesktop?.File?.Url,
            ImageMobile = e.ImageMobile?.File?.Url,
            LinkUrl = e.LinkUrl,
            LinkText = e.LinkText,
            BackgroundColor = e.BackgroundColor,
            TextColor = e.TextColor
        }).ToList();
    }
}
```

**Frontend-Rendering:**
```cshtml
@* Views/Components/BannerSlider/Default.cshtml *@
<div class="banner-slider-container">
    <div class="swiper banner-slider">
        <div class="swiper-wrapper" id="banner-container">
            <!-- Wird via JavaScript geladen -->
            <div class="swiper-slide banner-loading">
                <p>Lade Banner...</p>
            </div>
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>

<script>
(function() {
    // Banner von API holen
    fetch('/banner/getbanners?location=homepage')
        .then(response => response.json())
        .then(banners => {
            const container = document.getElementById('banner-container');
            container.innerHTML = banners.map(banner => `
                <div class="swiper-slide">
                    <a href="${banner.linkUrl}" class="banner-link">
                        <picture>
                            <source media="(max-width: 768px)" srcset="${banner.imageMobile}">
                            <img src="${banner.imageDesktop}" alt="${banner.title}">
                        </picture>
                        <div class="banner-content" style="background-color: ${banner.backgroundColor}; color: ${banner.textColor}">
                            <h2>${banner.title}</h2>
                            <span class="banner-cta">${banner.linkText}</span>
                        </div>
                    </a>
                </div>
            `).join('');

            // Swiper initialisieren
            new Swiper('.banner-slider', {
                loop: true,
                autoplay: { delay: 5000 },
                effect: 'fade',
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            });
        })
        .catch(error => {
            console.error('Fehler beim Laden der Banner:', error);
            // Fallback: Statischen Banner anzeigen
        });
})();
</script>
```

---

### Alternative: nopStation Plugin

Falls Headless CMS nicht gewünscht:

**nopStation Anywhere Slider**
- Link: https://www.nopcommerce.com/de/anywhere-slider-by-nopstation
- ✅ Kostenlos
- ✅ Admin-UI im Shop
- ⚠️ Version 4.9 muss geprüft werden

**Prüfen:**
- [ ] Ist 4.9-Version verfügbar?
- [ ] Unterstützt es API/External Management?
- [ ] Kann es mit Widget Zones arbeiten?
- [ ] Performance OK?

---

### Referenzen

**Links:**
- Alter Shop: [Screenshots von Slidern]
- **⭐ Offizielles Swiper Slider Plugin:** https://www.nopcommerce.com/de/swiper-slider
- Swiper.js: https://swiperjs.com/
- Contentful: https://www.contentful.com/
- Strapi: https://strapi.io/
- nopStation Plugin: https://www.nopcommerce.com/de/anywhere-slider-by-nopstation

**Offizielles Plugin - Features:**
- ✅ Ab nopCommerce 4.8 (4.9 kompatibel)
- ✅ Kostenlos (vom nopCommerce Core Team)
- ✅ Basiert auf Swiper.js (modern, touch-fähig)
- ✅ Admin-UI für Slider-Verwaltung
- ✅ Widget Zone Support
- ✅ Responsive & Mobile-optimiert
- ✅ Multiple Slider-Typen (Produkte, Bilder, Banner)
- ✅ Update-sicher (offizielles Team-Plugin)

**Vergleich Headless CMS:**

| Feature | Contentful | Strapi | Storyblok | Sanity |
|---------|-----------|--------|-----------|--------|
| **Kosten** | Free bis 25k Records | Open Source (Self-Host) | Free bis 10k Assets | Free bis 3 Users |
| **Hosting** | Cloud (managed) | Self-Hosted oder Cloud | Cloud (managed) | Cloud (managed) |
| **API** | GraphQL + REST | REST | REST + GraphQL | GROQ + GraphQL |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Flexibilität** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Multi-Language** | ✅ | ✅ | ✅ | ✅ |
| **Asset Management** | ✅ | ✅ | ✅ | ✅ |
| **Zeitsteuerung** | ✅ | ✅ (Custom) | ✅ | ✅ |

**Empfehlung:**
- **Contentful** (einfach, schneller Start)
- **Strapi** (kostenlos, volle Kontrolle, Self-Hosted)

**Anhänge:**
- [ ] Mockups für Slider-Design
- [ ] Liste aller benötigten Slider-Typen
- [ ] CMS-Evaluation Matrix

---

**Erstellt:** 2025-10-24
**Letzte Aktualisierung:** 2025-10-24
**Version:** 1.1
**Review-Status:** ✅ Ready for Decision

---

## 📝 Zusammenfassung der Empfehlung

### ⭐ EMPFOHLENER 2-PHASEN-ANSATZ

#### Phase 1: Go-Live (Sprint 2)
**Lösung:** Offizielles Swiper Slider Plugin vom nopCommerce Team
- 🚀 **Schnell:** 2-4 Stunden Setup
- 💰 **Kostenlos:** $0 Kosten
- ✅ **Funktionsfähig:** Produkt-Slider & Banner-Slider
- ✅ **Update-sicher:** Offizielles Plugin
- ⚠️ **Kompromiss:** Admin pflegt im Shop-Backend (temporär)

#### Phase 2: Post-Launch Phase 1 (4 Wochen)
**Lösung:** Headless CMS Integration (Contentful/Strapi)
- 🎯 **Langfristig:** Marketing-Autonomie
- 🔗 **API-fähig:** Externe Verwaltung
- 📅 **Zeitgesteuert:** Automatische Banner
- 💰 **$0-50/Monat:** Free Tier oder Self-Hosted

### Vorteile dieser Strategie:
1. ✅ Schneller Go-Live ohne Kompromisse
2. ✅ Keine Custom-Entwicklung unter Zeitdruck
3. ✅ Zeit für saubere CMS-Integration nach Launch
4. ✅ Erreichung des Ziels: Externe Verwaltung (mittelfristig)
5. ✅ Minimale Kosten & Risiken
