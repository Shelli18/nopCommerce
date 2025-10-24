# Feature Evaluation: Cuntino Slider - Produktempfehlungen

## Feature-ID: FN-011

### Grundinformationen

**Feature-Name:** Cuntino Slider - Produktempfehlungen Widget

**Kategorie:**
- [x] UI/UX Enhancement
- [x] Funktionalität
- [x] Integration (Drittsystem)
- [ ] Performance
- [ ] SEO
- [ ] Sicherheit
- [ ] Admin-Funktion

**Beschreibung:**
Cuntino ist ein externes Widget für personalisierte Produktempfehlungen. Es zeigt Kunden relevante Produkte basierend auf Browsing-Verhalten, Kaufhistorie und anderen Produkten an. Das Widget wird über JavaScript eingebunden und benötigt HTML-Snippets an verschiedenen Stellen im Shop (Produktdetailseite, Warenkorb, Kategorieseiten).

**Alter Shop - Status:**
- **Implementiert:** Ja
- **Technologie:** JavaScript Widget + HTML Snippets
- **Dateien/Komponenten:**
  - Globales JavaScript (Cuntino Widget-Library)
  - HTML Snippets mit `data-product-id` Attribut
  - View-Overrides für Platzierung

**Technische Details (aktuell):**
```html
<!-- Globales JavaScript (im Head oder Footer) -->
<script src="https://cdn.cuntino.com/widget.js" async></script>

<!-- HTML Snippet (z.B. auf Produktdetailseite) -->
<div class="cuntino-recommendations"
     data-product-id="@Model.Id"
     data-widget-type="similar-products">
</div>
```

**Problem:**
Snippets müssen an mehreren Stellen eingefügt werden:
- Produktdetailseite (unter Produktbeschreibung)
- Warenkorb-Seite (Cross-Selling)
- Kategorieseiten (Trending Products)
- Checkout (Last-Minute Offers)

**Offene Frage:**
- Plugin-basierte Integration vs. View-Overrides?

---

### Evaluierung

#### Priorität

- [x] **CRITICAL** - Muss vor Go-Live implementiert sein
- [ ] **HIGH** - Sollte vor Go-Live implementiert sein
- [ ] **MEDIUM** - Kann nach Go-Live nachgeliefert werden
- [ ] **LOW** - Nice-to-have, keine feste Timeline

**Begründung:**
- ✅ **Produktempfehlungen sind umsatzrelevant** (Cross-Selling, Up-Selling)
- ✅ **Conversion-Optimierung** - Kunden entdecken relevante Produkte
- ✅ **Personalisierung** - Verbessert User Experience signifikant
- ⚠️ **Externes System** - Muss funktionieren, sonst fehlt wichtiges Feature
- 🎯 **Go-Live kritisch:** Ja, ist wichtiger Bestandteil der Customer Journey

---

#### Umsetzungsart

**Empfohlene Implementierung:**
- [x] **Plugin** (eigenes Plugin für Cuntino Integration)
- [ ] **Theme** (BobMag Theme)
- [ ] **Existing Plugin** (bestehendes nopCommerce Plugin nutzen)
- [ ] **nopCommerce Core** (bereits in 4.9 vorhanden)
- [x] **Externe Integration** (API, Webhook, etc.)

**Begründung:**

### 🎯 EMPFEHLUNG: Plugin-basierte Integration

**Warum Plugin statt View-Override?**

#### ✅ Vorteile Plugin-Ansatz:

1. **Wiederverwendbarkeit**
   - Plugin kann in anderen Shops genutzt werden
   - Einfache Installation/Deinstallation
   - Konfigurierbar über Admin-UI

2. **Update-Sicherheit**
   - ❌ View-Overrides müssen bei jedem nopCommerce-Update gemergt werden
   - ✅ Plugin nutzt Widget Zones → Update-sicher
   - ✅ Keine Abhängigkeit von View-Struktur-Änderungen

3. **Zentrale Verwaltung**
   - Alle Cuntino-Settings an einem Ort (Admin-Panel)
   - Widget-Typen zentral konfigurierbar
   - Ein-/Ausschalten per Admin möglich

4. **Flexibilität**
   - Widget Zones können per Admin zugewiesen werden
   - Verschiedene Widget-Typen für verschiedene Seiten
   - A/B Testing möglich (Widget an/aus)

5. **Clean Architecture**
   - Klare Separation of Concerns
   - Cuntino-Code isoliert vom Theme
   - Einfacher zu warten und zu debuggen

6. **Tracking & Analytics**
   - Plugin kann Cuntino-Events zentral loggen
   - Performance-Monitoring möglich
   - Fehlerbehandlung zentral

#### ❌ Nachteile View-Override-Ansatz:

1. **Wartungsaufwand**
   - Bei nopCommerce-Updates müssen alle Overrides geprüft werden
   - Jede überschriebene View ist ein Update-Risiko
   - Mehrere Views müssen angepasst werden (ProductTemplate, ShoppingCart, etc.)

2. **Duplizierung**
   - Cuntino-JavaScript muss in jeder View eingefügt werden
   - Code-Duplizierung = Fehleranfälligkeit
   - Änderungen müssen an mehreren Stellen gemacht werden

3. **Keine zentrale Konfiguration**
   - Settings müssen in Code/Config-Files gepflegt werden
   - Kein Admin-UI
   - Schwerer zu testen (verschiedene Szenarien)

---

### 🛠️ Plugin-Architektur (Empfohlen)

**Plugin-Name:** `Nop.Plugin.Widgets.Cuntino`

**Features:**
- ✅ Widget Component für nopCommerce Widget System
- ✅ Admin-Konfiguration (API Key, Widget-Typen, Placement)
- ✅ Automatisches Einfügen von Script-Tag (global)
- ✅ Widget Zones: `productdetails_bottom`, `shopping_cart_bottom`, etc.
- ✅ Product-ID wird automatisch aus Context geholt
- ✅ Error Handling (falls Cuntino API nicht erreichbar)
- ✅ Performance-Optimierung (async loading, lazy loading)

**Struktur:**
```
Nop.Plugin.Widgets.Cuntino/
├── Controllers/
│   └── CuntinoAdminController.cs      # Admin-Konfiguration
├── Components/
│   └── CuntinoWidgetViewComponent.cs  # Widget Component
├── Models/
│   ├── ConfigurationModel.cs          # Settings Model
│   └── CuntinoWidgetModel.cs          # View Model für Widget
├── Services/
│   └── CuntinoService.cs              # Business Logic
├── Views/
│   ├── Configure.cshtml               # Admin-Settings
│   └── Components/
│       └── CuntinoWidget/
│           └── Default.cshtml         # Widget-HTML
├── wwwroot/
│   └── js/
│       └── cuntino-integration.js     # Optional: Helper-Script
└── CuntinoPlugin.cs                   # Plugin-Hauptklasse
```

---

#### Technische Details

**Aufwand (Schätzung):**
- [x] M (1-2 Tage) - Plugin-Entwicklung

**Detaillierte Aufwands-Schätzung: 1-2 Tage**

**Tag 1: Core Plugin (6-8 Stunden)**
1. Plugin-Struktur erstellen (Boilerplate)
2. Admin-Konfiguration (Settings-Seite)
   - Cuntino API Key
   - Widget-Typen aktivieren/deaktivieren
   - Widget Zones Zuweisung
3. Widget Component implementieren
4. View für Widget-Rendering (HTML Snippet)
5. Script-Tag automatisch in Layout einfügen
6. Basis-Testing

**Tag 2: Erweiterte Features & Testing (4-6 Stunden)**
1. Error Handling (API nicht erreichbar)
2. Performance-Optimierung (async, lazy loading)
3. Multiple Widget-Typen (Similar Products, Cross-Sell, etc.)
4. Context-Detection (Product Page vs Cart vs Category)
5. Umfangreiches Testing (alle Szenarien)
6. Dokumentation

**Dependencies:**
- ✅ nopCommerce 4.9 Widget System
- ✅ Cuntino JavaScript Widget (extern, CDN)
- ✅ nopCommerce Plugin Framework
- ⚠️ Cuntino Account & API Key (extern)

**Risiken:**
- ⚠️ **Externe Abhängigkeit**: Cuntino API muss verfügbar sein
  - Mitigation: Timeout, Error Handling, Fallback (Widget einfach nicht anzeigen)
- ⚠️ **Performance**: JavaScript kann Ladezeit erhöhen
  - Mitigation: Async Loading, Lazy Loading (nur laden wenn sichtbar)
- ⚠️ **DSGVO/Privacy**: Tracking von User-Verhalten
  - Mitigation: Cookie-Consent Integration, Opt-Out möglich
- ⚠️ **Product-ID Mapping**: nopCommerce Product-ID vs Cuntino Product-ID
  - Mitigation: Konfigurierbares Mapping (falls unterschiedlich)

**Kompatibilität mit nopCommerce 4.9:**
- [x] Voll kompatibel (nutzt Standard Widget System)
- [ ] Anpassungen nötig
- [ ] Unklar - muss getestet werden
- [ ] Nicht kompatibel - komplettes Rewrite nötig

---

#### Business Impact

**Betrifft:**
- [x] Kunden (Frontend)
- [x] Admin (Backend)
- [x] Beide

**User Stories:**

**Als Kunde** möchte ich **personalisierte Produktempfehlungen sehen**, damit **ich relevante Produkte entdecke, die ich sonst übersehen hätte**.

**Als Shop-Betreiber** möchte ich **Produktempfehlungen zentral verwalten**, damit **ich Cross-Selling und Up-Selling optimieren kann**.

**Als Entwickler** möchte ich **ein Update-sicheres System**, damit **ich nicht bei jedem nopCommerce-Update alle Views neu anpassen muss**.

**Business Value:**
- [x] Umsatzsteigerung (Cross-Selling, Up-Selling)
- [x] Conversion-Optimierung (relevante Empfehlungen)
- [x] Kundenzufriedenheit (personalisierte Experience)
- [ ] Prozesseffizienz (Admin)
- [ ] Compliance/Legal
- [x] Sonstiges: **Personalisierung**, **Customer Engagement**

**Geschätzte Auswirkung bei Nicht-Implementierung:**
- [x] Kritisch - Shop nicht nutzbar (Feature fehlt komplett)
- [ ] Hoch - Signifikante Einschränkungen
- [ ] Mittel - Komforteinbußen
- [ ] Niedrig - Kaum bemerkbar

**Begründung:**
Produktempfehlungen sind essentieller Bestandteil moderner E-Commerce-Shops. Ohne Empfehlungen:
- 📉 Niedrigere Conversion-Rate
- 📉 Geringerer Average Order Value
- 📉 Schlechtere Customer Experience
- 💰 Direkter Umsatzverlust (Cross-Selling fehlt)

**Quantifizierung (Schätzung aus E-Commerce-Studien):**
- 📈 +10-30% Average Order Value durch Cross-Selling
- 📈 +15-20% Click-Through-Rate auf empfohlene Produkte
- 📈 +5-10% Conversion-Rate durch personalisierte Empfehlungen

---

#### Migration & Testing

**Datenmigration nötig:**
- [ ] Ja
- [x] Nein

**Details:**
Keine Datenmigration nötig. Cuntino nutzt Product-IDs aus nopCommerce direkt.

**Testing-Aufwand:**
- [ ] Minimal (einfache Sichtprüfung)
- [x] Standard (manuelle Tests)
- [ ] Hoch (komplexe Workflows, mehrere Szenarien)
- [ ] Sehr hoch (Integration Tests, Performance Tests)

**Test-Szenarien:**

**Produktdetailseite:**
1. ✅ Widget wird angezeigt (nach Produktbeschreibung)
2. ✅ Korrekte Product-ID wird übergeben
3. ✅ Widget lädt Empfehlungen (ähnliche Produkte)
4. ✅ Klick auf empfohlenes Produkt funktioniert
5. ✅ Widget ist responsive (Mobile & Desktop)

**Warenkorb-Seite:**
1. ✅ Widget wird angezeigt (unterhalb Warenkorb)
2. ✅ Cross-Selling-Empfehlungen basierend auf Warenkorb-Produkten
3. ✅ "In den Warenkorb" Button funktioniert

**Kategorieseite:**
1. ✅ Widget zeigt Trending Products der Kategorie
2. ✅ Empfehlungen sind relevant zur aktuellen Kategorie

**Checkout:**
1. ✅ Last-Minute Offers werden angezeigt
2. ✅ Performance: Widget blockiert Checkout nicht

**Error Handling:**
1. ✅ Cuntino API nicht erreichbar → Widget fehlt, Shop funktioniert
2. ✅ Ungültige Product-ID → Widget zeigt Fallback
3. ✅ Timeout → Nach 5s Abbruch, kein Laden-Spinner hängt

**Performance:**
1. ✅ JavaScript lädt async (blockiert Page-Load nicht)
2. ✅ Lazy Loading: Widget lädt erst bei Scroll (Below the Fold)
3. ✅ Ladezeit <2s für Widget-Rendering

**DSGVO/Privacy:**
1. ✅ Cookie-Consent Integration (falls Tracking)
2. ✅ Opt-Out funktioniert (Widget wird nicht geladen)
3. ✅ Keine Daten ohne Consent

**Admin:**
1. ✅ Plugin-Konfiguration im Admin funktioniert
2. ✅ Widget ein-/ausschalten funktioniert
3. ✅ API Key speichern/ändern funktioniert
4. ✅ Widget Zones zuweisen funktioniert

---

### Entscheidung

**Status:**
- [x] ✅ Genehmigt zur Implementierung
- [ ] ⏸️ Zurückgestellt (Post-Launch)
- [ ] ❌ Nicht implementieren
- [ ] ❓ Noch zu klären

**Implementierungs-Timeline:**
- [x] Sprint 2 (Pre-Launch Should-Have)
- [ ] Post-Launch Phase 1 (innerhalb 4 Wochen nach Go-Live)
- [ ] Post-Launch Phase 2 (innerhalb 3 Monate nach Go-Live)
- [ ] Backlog (keine feste Timeline)

**Hinweis:** Falls Zeit in Sprint 2 knapp → Kann in Sprint 1 Post-Launch, aber vor Go-Live kritisch!

**Verantwortlich:**
Development Team

**Budget:**
- ✅ Plugin-Entwicklung: 1-2 Tage Arbeitszeit
- ⚠️ Cuntino Service: Kosten unklar (muss mit Cuntino abgeklärt werden)

**Notizen:**
- ✅ **Entscheidung: Plugin-basierte Integration (empfohlen)**
- ⚠️ **Alternative möglich:** View-Overrides (falls Plugin-Entwicklung zu aufwändig)
- 📝 Plugin ist langfristig die bessere Lösung (Update-Sicherheit)
- 🔗 Cuntino API-Dokumentation muss geprüft werden

**Offene Fragen:**
1. ❓ **Cuntino Account vorhanden?**
   - API Key verfügbar?
   - Welcher Plan/Tarif?
   - Action: Mit Cuntino-Account-Manager klären

2. ❓ **Welche Widget-Typen werden benötigt?**
   - Similar Products (Produktdetailseite)
   - Cross-Selling (Warenkorb)
   - Trending Products (Kategorieseite)
   - Last-Minute Offers (Checkout)
   - Action: Liste mit Marketing erstellen

3. ❓ **Widget Zones Mapping**
   - Wo genau sollen Widgets platziert werden?
   - Unterschiedliche Placements für Mobile/Desktop?
   - Action: UX-Review, Wireframes erstellen

4. ❓ **DSGVO/Privacy-Anforderungen**
   - Benötigt Cuntino Cookie-Consent?
   - Tracking-Daten: Was wird getrackt?
   - Opt-Out erforderlich?
   - Action: Mit Datenschutzbeauftragten klären

5. ❓ **Product-ID Mapping**
   - Nutzt Cuntino nopCommerce Product-ID direkt?
   - Oder eigenes Mapping erforderlich?
   - Action: Cuntino API-Dokumentation prüfen

6. ❓ **Fallback bei Plugin-Ansatz nicht gewünscht**
   - Soll View-Override als Quick-Win für Go-Live genutzt werden?
   - Dann Post-Launch auf Plugin migrieren?
   - Action: Entscheidung mit Team

---

### Technischer Implementierungsplan

#### Option A: Plugin-Ansatz (⭐ EMPFOHLEN)

**Plugin-Struktur:**
```csharp
// CuntinoPlugin.cs
public class CuntinoPlugin : BasePlugin, IWidgetPlugin
{
    public Task<IList<string>> GetWidgetZonesAsync()
    {
        return Task.FromResult<IList<string>>(new List<string>
        {
            PublicWidgetZones.ProductDetailsBottom,
            PublicWidgetZones.OrderSummaryContentAfter,
            PublicWidgetZones.CategoryDetailsBottom,
            // Weitere Zones...
        });
    }

    public Type GetWidgetViewComponent(string widgetZone)
    {
        return typeof(CuntinoWidgetViewComponent);
    }
}

// Components/CuntinoWidgetViewComponent.cs
public class CuntinoWidgetViewComponent : NopViewComponent
{
    private readonly CuntinoSettings _settings;
    private readonly IProductService _productService;

    public async Task<IViewComponentResult> InvokeAsync(string widgetZone)
    {
        if (!_settings.Enabled)
            return Content("");

        var model = new CuntinoWidgetModel
        {
            WidgetType = GetWidgetTypeForZone(widgetZone),
            ProductId = await GetProductIdFromContext(),
            ApiKey = _settings.ApiKey
        };

        return View("~/Plugins/Widgets.Cuntino/Views/CuntinoWidget.cshtml", model);
    }

    private async Task<int?> GetProductIdFromContext()
    {
        var routeData = Url.ActionContext.RouteData;

        // Produktdetailseite
        if (routeData.Values.TryGetValue("productId", out var productId))
            return (int)productId;

        // Warenkorb: Produkte aus Cart holen
        // Kategorie: Kategorie-ID für Trending

        return null;
    }

    private string GetWidgetTypeForZone(string widgetZone)
    {
        return widgetZone switch
        {
            PublicWidgetZones.ProductDetailsBottom => "similar-products",
            PublicWidgetZones.OrderSummaryContentAfter => "cross-sell",
            PublicWidgetZones.CategoryDetailsBottom => "trending",
            _ => "default"
        };
    }
}

// Models/CuntinoSettings.cs
public class CuntinoSettings : ISettings
{
    public bool Enabled { get; set; }
    public string ApiKey { get; set; }
    public bool EnableSimilarProducts { get; set; }
    public bool EnableCrossSell { get; set; }
    public bool EnableTrending { get; set; }
    public int WidgetTimeout { get; set; } = 5000; // ms
    public bool LazyLoad { get; set; } = true;
}
```

**View-Template:**
```cshtml
@* Views/CuntinoWidget.cshtml *@
@model CuntinoWidgetModel

@if (!string.IsNullOrEmpty(Model.ApiKey))
{
    <div class="cuntino-recommendations-container">
        <div class="cuntino-recommendations"
             data-product-id="@Model.ProductId"
             data-widget-type="@Model.WidgetType"
             data-api-key="@Model.ApiKey">

            @* Loading Placeholder *@
            <div class="cuntino-loading">
                <span class="spinner"></span>
                <p>Lade Empfehlungen...</p>
            </div>
        </div>
    </div>

    @* Lazy Loading (falls aktiviert) *@
    @if (Model.LazyLoad)
    {
        <script>
        (function() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Widget laden wenn sichtbar
                        loadCuntinoWidget(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            document.querySelectorAll('.cuntino-recommendations').forEach(el => {
                observer.observe(el);
            });
        })();
        </script>
    }
}
```

**Script-Tag Einfügen (im Layout):**
```csharp
// CuntinoPlugin.cs - GetConfigurationPageUrl überschreiben
public override async Task InstallAsync()
{
    await base.InstallAsync();

    // Script-Tag in Layout einfügen (via Event Handler)
    // Oder: In Views/Shared/Head.cshtml via Widget Zone
}
```

**Alternativ: Script in View**
```cshtml
@* In _Root.cshtml oder Head.cshtml *@
@await Component.InvokeAsync("Widget", new { widgetZone = "head_html_tag" })

@* Plugin registriert sich für head_html_tag Zone *@
<script src="https://cdn.cuntino.com/widget.js" async></script>
```

---

#### Option B: View-Override-Ansatz (⚠️ Fallback)

**Falls Plugin zu aufwändig oder Zeitdruck:**

**Struktur:**
```
Themes/BobMag/
├── Views/
│   ├── Shared/
│   │   └── _Root.cshtml                    # Script-Tag einfügen
│   ├── Product/
│   │   └── ProductTemplate.Simple.cshtml   # Widget einfügen
│   └── ShoppingCart/
│       └── Cart.cshtml                     # Widget einfügen
```

**Beispiel: ProductTemplate.Simple.cshtml**
```cshtml
@* Nach Produktbeschreibung *@
<div class="product-details-bottom">
    @* ... Standard nopCommerce Content ... *@

    @* Cuntino Widget *@
    <div class="cuntino-recommendations"
         data-product-id="@Model.Id"
         data-widget-type="similar-products">
        <div class="cuntino-loading">Lade Empfehlungen...</div>
    </div>
</div>
```

**Script-Tag in _Root.cshtml:**
```cshtml
@* Vor </body> Tag *@
<script src="https://cdn.cuntino.com/widget.js" async></script>

@await Component.InvokeAsync(typeof(WidgetViewComponent), new { widgetZone = PublicWidgetZones.BodyEndHtmlTagBefore })
```

**Vorteile View-Override:**
- ✅ Schneller (1-2 Stunden statt 1-2 Tage)
- ✅ Keine Plugin-Entwicklung nötig
- ✅ Direkter Zugriff auf Model-Properties

**Nachteile View-Override:**
- ❌ Wartungsaufwand bei Updates
- ❌ Code-Duplizierung (in mehreren Views)
- ❌ Keine zentrale Konfiguration
- ❌ Schwerer zu testen

---

### Vergleich: Plugin vs View-Override

| Kriterium | Plugin (⭐ empfohlen) | View-Override |
|-----------|---------------------|---------------|
| **Aufwand Initial** | 1-2 Tage | 1-2 Stunden |
| **Wartungsaufwand** | Niedrig (Widget Zones) | Hoch (bei jedem Update prüfen) |
| **Update-Sicherheit** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Zentrale Verwaltung** | ✅ Admin-UI | ❌ Code/Config |
| **Flexibilität** | ✅ Zones konfigurierbar | ❌ Hardcoded |
| **Wiederverwendbarkeit** | ✅ Ja | ❌ Nein |
| **Testbarkeit** | ✅ Einfach | ⚠️ Mehrere Views testen |
| **Go-Live** | ⚠️ Mehr Zeit nötig | ✅ Schneller |

---

### Referenzen

**Links:**
- Alter Shop: [Screenshots von Cuntino Widgets]
- Cuntino Website: [URL falls verfügbar]
- Cuntino API-Dokumentation: [URL]
- nopCommerce Widget System: https://docs.nopcommerce.com/en/developer/plugins/how-to-write-plugin-4.50.html#widgets

**Prüfen:**
- [ ] Cuntino API-Dokumentation verfügbar?
- [ ] Beispiel-Integration von Cuntino (andere Shops)?
- [ ] Cuntino Support kontaktieren (beste Practices)?

**Anhänge:**
- [ ] Screenshots Cuntino Widgets aus altem Shop
- [ ] Wireframes für Widget-Platzierung
- [ ] Cuntino Account-Details (API Key, Plan)

---

**Erstellt:** 2025-10-24
**Letzte Aktualisierung:** 2025-10-24
**Version:** 1.0
**Review-Status:** ❓ Offene Fragen müssen geklärt werden

---

## 📝 Zusammenfassung der Empfehlung

### ⭐ EMPFEHLUNG: Plugin-Ansatz

**Lösung:** Eigenes Plugin `Nop.Plugin.Widgets.Cuntino`
- ✅ **Update-sicher** (nutzt Widget Zones)
- ✅ **Zentrale Verwaltung** (Admin-UI)
- ✅ **Flexibel** (Zones konfigurierbar)
- ✅ **Wiederverwendbar** (andere Shops)
- ⏱️ **Aufwand:** 1-2 Tage

**Langfristig beste Lösung!**

### ⚠️ Fallback: View-Override

**Falls Zeitdruck oder Plugin zu aufwändig:**
- ✅ **Schnell** (1-2 Stunden)
- ❌ **Wartungsaufwand** (Updates)
- ❌ **Keine zentrale Verwaltung**

**Kurzfristige Lösung, mittelfristig auf Plugin migrieren!**

### 🎯 Empfohlener Workflow

**Option 1: Plugin direkt (empfohlen)**
- Sprint 2: Plugin entwickeln (1-2 Tage)
- Testing & Go-Live

**Option 2: Hybrid (falls Zeitdruck)**
- Sprint 2: View-Override Quick-Win (2h)
- Post-Launch: Migration auf Plugin (1-2 Tage)

### ❓ Nächste Schritte

1. **Cuntino Account klären** (API Key, Plan, Kosten)
2. **Widget-Typen definieren** (mit Marketing)
3. **DSGVO-Anforderungen prüfen** (mit Datenschutz)
4. **Entscheidung:** Plugin vs View-Override
5. **Implementierung starten**
