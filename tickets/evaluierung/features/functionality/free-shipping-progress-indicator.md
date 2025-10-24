# Feature Evaluation: Free Shipping Progress Indicator (Versandkosten-Fortschrittsbalken)

## Feature-ID: FN-012

### Grundinformationen

**Feature-Name:** Free Shipping Progress Indicator / Versandkosten-Fortschrittsbalken

**Kategorie:**
- [x] UI/UX Enhancement
- [x] Funktionalität
- [ ] Integration (Drittsystem)
- [ ] Performance
- [ ] SEO
- [ ] Sicherheit
- [x] Admin-Funktion

**Beschreibung:**
Ein visueller Fortschrittsbalken, der Kunden zeigt, wie viel Geld noch bis zum kostenlosen Versand fehlt. Das Feature motiviert Kunden, mehr zu kaufen, um die Versandkostenschwelle zu erreichen.

**Anzeige:**
- Flyout Warenkorb (Mini-Cart)
- Warenkorb-Seite
- Checkout-Seite (optional)

**Beispiele aus altem Shop:**
```
"€ 42,71 bis zum KOSTENLOSEN⁵ Versand"
[████████░░░░░░░░░░░░] (Fortschrittsbalken grün/grau)

"Deine Ware wird Versandkostenfrei geliefert!"
[████████████████████] (Voller grüner Balken)
```

**Alter Shop - Status:**
- **Implementiert:** Ja
- **Technologie:** Plugin oder Custom Code
- **Dateien/Komponenten:**
  - Fortschrittsbalken in Flyout Cart
  - Fortschrittsbalken auf Warenkorb-Seite
  - Icon + Text + Prozentualer Balken

---

### Evaluierung

#### Priorität

- [ ] **CRITICAL** - Muss vor Go-Live implementiert sein
- [ ] **HIGH** - Sollte vor Go-Live implementiert sein
- [x] **MEDIUM** - Kann nach Go-Live nachgeliefert werden
- [ ] **LOW** - Nice-to-have, keine feste Timeline

**Begründung:**
> "mit dem plugin und der anzeige könnte ich aber auch mit nach go live leben"

- ✅ **Nicht kritisch für Go-Live** - Shop funktioniert ohne
- ✅ **Nice-to-have** - Conversion-Optimierung
- ✅ **Post-Launch möglich** - Kann nachträglich implementiert werden
- 🎯 **Empfehlung:** Post-Launch Phase 1 (4 Wochen nach Go-Live)

---

#### Umsetzungsart

**Empfohlene Implementierung:**
- [x] **Plugin** (eigenes Plugin)
- [ ] **Theme** (BobMag Theme)
- [ ] **Existing Plugin** (bestehendes nopCommerce Plugin nutzen)
- [ ] **nopCommerce Core** (bereits in 4.9 vorhanden)
- [ ] **Externe Integration** (API, Webhook, etc.)

**Begründung:**

### 🎯 EMPFEHLUNG: Plugin-basierte Lösung

**Plugin-Name:** `Nop.Plugin.Widgets.FreeShippingProgress`

**Warum Plugin?**

1. **Zentrale Konfiguration (Admin-UI)**
   - ✅ Free Shipping Threshold konfigurierbar (z.B. 50€)
   - ✅ Text-Vorlagen anpassbar
   - ✅ Icon/Emoji auswählbar
   - ✅ Farben konfigurierbar (Progressbar)
   - ✅ Anzeige-Positionen ein-/ausschalten
   - ✅ Multi-Store Support (verschiedene Schwellen pro Store)

2. **Flexibilität**
   - Widget Zones: Flyout Cart, Shopping Cart, Checkout
   - A/B Testing möglich (Feature an/aus)
   - Verschiedene Texte für verschiedene Sprachen

3. **Erweiterbarkeit (Phase 2)**
   - ✅ **Gift with Purchase:** "Bei Bestellung über X€ → Artikel Y gratis"
   - ✅ **Tiered Rewards:** Mehrere Stufen (50€ → Versandkostenfrei, 100€ → 5% Rabatt)
   - ✅ **Progress Milestones:** "Nur noch 10€ bis zu deinem Geschenk!"

4. **Update-Sicherheit**
   - Nutzt Widget Zones → keine View-Overrides nötig
   - Unabhängig von Theme
   - Kann in anderen Shops wiederverwendet werden

---

#### Technische Details

**Aufwand (Schätzung):**

**Phase 1: Basis-Feature (Free Shipping Progress)**
- [x] M (1-2 Tage) - Plugin mit Fortschrittsbalken

**Phase 2: Erweiterte Features (Gift with Purchase, etc.)**
- [x] L (3-5 Tage) - Reward-System, Tiered Incentives

**Gesamt-Aufwand Phase 1: 1-2 Tage**

**Detaillierte Aufwands-Schätzung (Phase 1):**

**Tag 1: Core Plugin (6-8 Stunden)**
1. Plugin-Struktur erstellen (Boilerplate)
2. Admin-Konfiguration
   - Free Shipping Threshold (Betrag)
   - Text-Vorlagen (Noch X€ fehlen, Erreicht-Text)
   - Icon/Emoji auswählen
   - Farben (Progressbar: aktiv/inaktiv)
   - Widget Zones aktivieren/deaktivieren
3. Widget Component implementieren
4. Berechnung: Warenkorb-Summe vs Threshold
5. Progressbar HTML/CSS (responsive)
6. Basis-Testing

**Tag 2: Feinschliff & Testing (4-6 Stunden)**
1. Multi-Language Support (Ressourcen-Strings)
2. Multi-Currency Support (verschiedene Währungen)
3. Edge Cases behandeln (leerer Warenkorb, Over-Threshold)
4. Umfangreiches Testing (Flyout, Cart, Checkout)
5. Responsive Design (Mobile, Tablet, Desktop)
6. Performance-Optimierung (Caching)
7. Dokumentation

**Phase 2: Erweiterte Features (Optional, Post-Launch)**

**Tag 3-5: Gift with Purchase & Tiered Rewards (3-5 Tage)**
1. Reward-System Design
   - Datenbank-Schema (Rewards, Thresholds)
   - Admin-UI für Reward-Management
2. Reward-Types
   - Free Shipping (bereits vorhanden)
   - Free Product (automatisch in Warenkorb)
   - Discount Percentage (z.B. 5%)
   - Gift Selection (Kunde wählt Geschenk)
3. Tiered Progress
   - Mehrere Stufen (50€ → Versand frei, 100€ → Geschenk)
   - Nächste Stufe anzeigen ("Nur noch 10€ bis...")
4. Auto-Add to Cart (Geschenk automatisch hinzufügen)
5. Testing & Dokumentation

**Dependencies:**
- ✅ nopCommerce 4.9 Widget System
- ✅ nopCommerce Shopping Cart Service
- ✅ nopCommerce Shipping Plugin (für Threshold-Einstellung)
- ✅ jQuery (für dynamische Updates)

**Risiken:**
- ⚠️ **Mehrere Versandmethoden**: Was wenn mehrere Shipping-Methoden existieren?
  - Mitigation: Admin wählt relevante Versandmethode aus (z.B. "Standard")
- ⚠️ **Multi-Store**: Verschiedene Thresholds pro Store
  - Mitigation: Store-spezifische Settings im Plugin
- ⚠️ **Währungen**: Threshold muss für jede Währung separat konfiguriert werden
  - Mitigation: Currency-Dropdown im Admin
- ⚠️ **Steuern**: Warenkorb-Summe inkl. oder exkl. MwSt?
  - Mitigation: Konfigurierbar im Admin

**Kompatibilität mit nopCommerce 4.9:**
- [x] Voll kompatibel (nutzt Standard Widget System & Services)
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

**Als Kunde** möchte ich **sehen, wie viel mir noch bis zum kostenlosen Versand fehlt**, damit **ich motiviert werde, noch ein Produkt zu kaufen**.

**Als Shop-Betreiber** möchte ich **Kunden motivieren, mehr zu kaufen**, damit **ich meinen Average Order Value erhöhe und Versandkosten als Kaufhemmnis reduziere**.

**Als Marketing-Manager** möchte ich **Rewards flexibel konfigurieren**, damit **ich saisonale Kampagnen (z.B. "Ab 100€ Geschenk") einfach umsetzen kann**.

**Business Value:**
- [x] Umsatzsteigerung (höherer Average Order Value)
- [x] Conversion-Optimierung (reduziert Warenkorbabbruch)
- [x] Kundenzufriedenheit (Transparenz über Versandkosten)
- [ ] Prozesseffizienz (Admin)
- [ ] Compliance/Legal
- [x] Sonstiges: **Gamification**, **Psychologischer Anreiz**

**Geschätzte Auswirkung bei Nicht-Implementierung:**
- [ ] Kritisch - Shop nicht nutzbar
- [ ] Hoch - Signifikante Einschränkungen
- [x] Mittel - Komforteinbußen
- [ ] Niedrig - Kaum bemerkbar

**Begründung:**
Shop funktioniert ohne Feature. Aber:
- 📉 Niedrigerer Average Order Value (Kunden kaufen weniger)
- 📉 Höhere Warenkorbabbruch-Rate (Versandkosten als Barriere)
- 📉 Weniger Motivation für Zusatzkäufe

**Quantifizierung (E-Commerce-Studien):**
- 📈 +15-25% Average Order Value durch Progress Incentives
- 📈 +10-15% Conversion-Rate (weniger Warenkorbabbrüche)
- 📊 60% der Kunden sagen, dass kostenloser Versand ihre Kaufentscheidung beeinflusst

---

#### Migration & Testing

**Datenmigration nötig:**
- [ ] Ja
- [x] Nein

**Details:**
Keine Datenmigration nötig. Plugin nutzt bestehende Warenkorb-Daten und Shipping-Konfiguration.

**Testing-Aufwand:**
- [ ] Minimal (einfache Sichtprüfung)
- [x] Standard (manuelle Tests)
- [ ] Hoch (komplexe Workflows, mehrere Szenarien)
- [ ] Sehr hoch (Integration Tests, Performance Tests)

**Test-Szenarien:**

**Flyout Warenkorb (Mini-Cart):**
1. ✅ Fortschrittsbalken wird angezeigt
2. ✅ Text: "€ X,XX bis zum kostenlosen Versand"
3. ✅ Balken zeigt korrekten Fortschritt (z.B. 50% bei 25€ von 50€)
4. ✅ Farbe: Grün (aktiv) / Grau (inaktiv)
5. ✅ Icon wird angezeigt (z.B. 🚚 oder Truck-Icon)
6. ✅ Dynamisches Update beim Hinzufügen von Produkten (AJAX)

**Threshold erreicht:**
1. ✅ Text: "Deine Ware wird versandkostenfrei geliefert!"
2. ✅ Balken: 100% grün
3. ✅ Icon ändert sich (z.B. ✅ oder grüner Haken)

**Warenkorb-Seite:**
1. ✅ Fortschrittsbalken prominent angezeigt
2. ✅ Gleiche Logik wie Flyout Cart
3. ✅ Position konfigurierbar (oben/unten)

**Checkout-Seite:**
1. ✅ Optional: Anzeige im Order Summary
2. ✅ Konfigurierbar (Admin kann ein-/ausschalten)

**Edge Cases:**
1. ✅ Leerer Warenkorb: "Füge Produkte hinzu für kostenlosen Versand ab 50€"
2. ✅ Over-Threshold: "Du hast kostenlosen Versand erreicht!"
3. ✅ Threshold genau erreicht (50,00€): Korrekte Anzeige
4. ✅ Multi-Currency: Threshold in EUR, USD, GBP korrekt

**Responsive:**
1. ✅ Mobile: Balken passt sich an (schmaler)
2. ✅ Tablet: Gut lesbar
3. ✅ Desktop: Volle Breite

**Admin:**
1. ✅ Threshold speichern (z.B. 50€)
2. ✅ Text-Vorlagen bearbeiten
3. ✅ Farben ändern (Progressbar)
4. ✅ Icon auswählen
5. ✅ Widget Zones aktivieren/deaktivieren
6. ✅ Multi-Store: Verschiedene Settings pro Store

**Performance:**
1. ✅ Kein Performance-Impact (gecachte Berechnung)
2. ✅ AJAX-Update bei Warenkorb-Änderung (<200ms)

---

### Entscheidung

**Status:**
- [x] ✅ Genehmigt zur Implementierung
- [ ] ⏸️ Zurückgestellt (Post-Launch)
- [ ] ❌ Nicht implementieren
- [ ] ❓ Noch zu klären

**Implementierungs-Timeline:**
- [ ] Sprint 1 (Pre-Launch Must-Have)
- [ ] Sprint 2 (Pre-Launch Should-Have)
- [x] Post-Launch Phase 1 (innerhalb 4 Wochen nach Go-Live)
- [ ] Post-Launch Phase 2 (innerhalb 3 Monate nach Go-Live)
- [ ] Backlog (keine feste Timeline)

**Hinweis:**
> "mit dem plugin und der anzeige könnte ich aber auch mit nach go live leben"

→ Post-Launch Phase 1 (nicht kritisch für Go-Live)

**Verantwortlich:**
Development Team

**Budget:**
- ✅ **Phase 1 (Free Shipping Progress):** 1-2 Tage Arbeitszeit
- ✅ **Phase 2 (Gift with Purchase, optional):** 3-5 Tage Arbeitszeit

**Notizen:**
- ✅ **Entscheidung: Plugin-basierte Lösung**
- ✅ **Phase 1:** Free Shipping Progress (Post-Launch)
- ✅ **Phase 2 (optional):** Gift with Purchase, Tiered Rewards
- 📝 Plugin kann später einfach erweitert werden
- 🎨 Screenshots aus altem Shop als Referenz verwenden

**Offene Fragen:**
1. ❓ **Exakte Free Shipping Threshold?**
   - Aktuell 50€? Oder andere Schwelle?
   - Action: Mit Shop-Betreiber klären

2. ❓ **Text-Vorlagen**
   - Deutsch: "€ X,XX bis zum kostenlosen Versand"
   - Englisch: "€ X,XX until free shipping"
   - Action: Finale Texte mit Marketing abstimmen

3. ❓ **Icon/Emoji**
   - 🚚 Truck-Emoji?
   - Font-Awesome Icon?
   - Custom SVG?
   - Action: Design entscheiden

4. ❓ **Farben**
   - Grün (aktiv): Welcher Grün-Ton? (#4e9521 wie Preise?)
   - Grau (inaktiv): #e0e0e0?
   - Action: BobMag Theme Colors verwenden

5. ❓ **Anzeige-Positionen**
   - Flyout Cart: Ja ✅
   - Warenkorb-Seite: Ja ✅
   - Checkout: Ja oder Nein?
   - Produktdetailseite: Nein (wahrscheinlich)
   - Action: UX-Review

6. ❓ **Phase 2 - Gift with Purchase**
   - Gewünscht: Ja
   - Zeitpunkt: Post-Launch Phase 2 (3 Monate)?
   - Beispiele: "Ab 100€ → Gratisartikel XY"
   - Action: Anforderungen später detaillieren

---

### Technischer Implementierungsplan

#### Plugin-Struktur

**Plugin-Name:** `Nop.Plugin.Widgets.FreeShippingProgress`

```
Nop.Plugin.Widgets.FreeShippingProgress/
├── Controllers/
│   └── FreeShippingProgressAdminController.cs    # Admin-Konfiguration
├── Components/
│   └── FreeShippingProgressViewComponent.cs      # Widget Component
├── Models/
│   ├── ConfigurationModel.cs                     # Settings Model
│   └── FreeShippingProgressModel.cs              # View Model
├── Services/
│   ├── IFreeShippingProgressService.cs           # Interface
│   └── FreeShippingProgressService.cs            # Business Logic
├── Domain/
│   └── FreeShippingProgressSettings.cs           # Settings Entity
├── Views/
│   ├── Configure.cshtml                          # Admin-UI
│   └── Components/
│       └── FreeShippingProgress/
│           └── Default.cshtml                    # Widget HTML
├── wwwroot/
│   ├── css/
│   │   └── free-shipping-progress.css            # Progressbar Styles
│   └── js/
│       └── free-shipping-progress.js             # AJAX Update
└── FreeShippingProgressPlugin.cs                 # Plugin-Hauptklasse
```

---

#### Code-Beispiele

**Settings Model:**
```csharp
// Domain/FreeShippingProgressSettings.cs
public class FreeShippingProgressSettings : ISettings
{
    // Basis-Einstellungen
    public bool Enabled { get; set; } = true;
    public decimal FreeShippingThreshold { get; set; } = 50m;
    public string CurrencyCode { get; set; } = "EUR";

    // Text-Vorlagen
    public string ProgressText { get; set; } = "€ {remaining} bis zum kostenlosen Versand";
    public string AchievedText { get; set; } = "Deine Ware wird versandkostenfrei geliefert!";
    public string EmptyCartText { get; set; } = "Füge Produkte hinzu für kostenlosen Versand ab € {threshold}";

    // Design
    public string IconType { get; set; } = "truck"; // truck, emoji, custom
    public string IconEmoji { get; set; } = "🚚";
    public string ProgressColorActive { get; set; } = "#4e9521"; // Grün
    public string ProgressColorInactive { get; set; } = "#e0e0e0"; // Grau

    // Anzeige-Positionen
    public bool ShowInFlyoutCart { get; set; } = true;
    public bool ShowInShoppingCart { get; set; } = true;
    public bool ShowInCheckout { get; set; } = false;

    // Erweiterte Einstellungen
    public bool IncludeTax { get; set; } = true;
    public bool IncludeShippingCost { get; set; } = false;
}
```

**Service (Berechnung):**
```csharp
// Services/FreeShippingProgressService.cs
public class FreeShippingProgressService : IFreeShippingProgressService
{
    private readonly IShoppingCartService _shoppingCartService;
    private readonly IWorkContext _workContext;
    private readonly IOrderTotalCalculationService _orderTotalService;
    private readonly FreeShippingProgressSettings _settings;

    public async Task<FreeShippingProgressModel> GetProgressModelAsync()
    {
        var customer = await _workContext.GetCurrentCustomerAsync();
        var cart = await _shoppingCartService.GetShoppingCartAsync(customer);

        if (!cart.Any())
            return new FreeShippingProgressModel
            {
                IsEmpty = true,
                Message = _settings.EmptyCartText
                    .Replace("{threshold}", _settings.FreeShippingThreshold.ToString("F2"))
            };

        // Warenkorb-Summe berechnen
        var cartTotal = await _orderTotalService.GetShoppingCartTotalAsync(cart,
            useRewardPoints: false,
            usePaymentMethodAdditionalFee: false);

        var currentAmount = cartTotal.shoppingCartTotal ?? 0m;
        var threshold = _settings.FreeShippingThreshold;
        var remaining = threshold - currentAmount;

        var model = new FreeShippingProgressModel
        {
            CurrentAmount = currentAmount,
            Threshold = threshold,
            RemainingAmount = remaining > 0 ? remaining : 0,
            ProgressPercentage = Math.Min(100, (int)((currentAmount / threshold) * 100)),
            IsAchieved = currentAmount >= threshold,
            Message = currentAmount >= threshold
                ? _settings.AchievedText
                : _settings.ProgressText.Replace("{remaining}", remaining.ToString("F2")),
            IconType = _settings.IconType,
            IconEmoji = _settings.IconEmoji,
            ColorActive = _settings.ProgressColorActive,
            ColorInactive = _settings.ProgressColorInactive
        };

        return model;
    }
}
```

**View Component:**
```csharp
// Components/FreeShippingProgressViewComponent.cs
public class FreeShippingProgressViewComponent : NopViewComponent
{
    private readonly IFreeShippingProgressService _progressService;
    private readonly FreeShippingProgressSettings _settings;

    public async Task<IViewComponentResult> InvokeAsync(string widgetZone)
    {
        if (!_settings.Enabled)
            return Content("");

        // Widget Zone Check
        var showWidget = widgetZone switch
        {
            PublicWidgetZones.OrderSummaryContentBefore => _settings.ShowInFlyoutCart,
            "shopping_cart_before_cart_items" => _settings.ShowInShoppingCart,
            PublicWidgetZones.CheckoutProgressBefore => _settings.ShowInCheckout,
            _ => false
        };

        if (!showWidget)
            return Content("");

        var model = await _progressService.GetProgressModelAsync();

        return View("~/Plugins/Widgets.FreeShippingProgress/Views/Default.cshtml", model);
    }
}
```

**View Template:**
```cshtml
@* Views/Components/FreeShippingProgress/Default.cshtml *@
@model FreeShippingProgressModel

<div class="free-shipping-progress-container">
    @if (Model.IsEmpty)
    {
        <div class="free-shipping-empty">
            <span class="icon">@Model.IconEmoji</span>
            <p>@Model.Message</p>
        </div>
    }
    else
    {
        <div class="free-shipping-progress">
            <!-- Icon -->
            <span class="icon">
                @if (Model.IsAchieved)
                {
                    <span class="achieved">✅</span>
                }
                else
                {
                    @Model.IconEmoji
                }
            </span>

            <!-- Text -->
            <div class="progress-text">
                <strong>@Model.Message</strong>
            </div>

            <!-- Progressbar -->
            <div class="progress-bar-container">
                <div class="progress-bar-bg" style="background-color: @Model.ColorInactive">
                    <div class="progress-bar-fill"
                         style="width: @Model.ProgressPercentage%; background-color: @Model.ColorActive">
                    </div>
                </div>
            </div>
        </div>
    }
</div>
```

**CSS:**
```css
/* wwwroot/css/free-shipping-progress.css */
.free-shipping-progress-container {
    padding: 15px;
    background: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 15px;
}

.free-shipping-progress {
    display: flex;
    align-items: center;
    gap: 12px;
}

.free-shipping-progress .icon {
    font-size: 24px;
    flex-shrink: 0;
}

.free-shipping-progress .progress-text {
    flex: 1;
}

.progress-bar-container {
    width: 100%;
    margin-top: 8px;
}

.progress-bar-bg {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 999px;
}

/* Achieved State */
.free-shipping-progress .achieved {
    color: #4e9521;
    font-size: 28px;
}

/* Mobile */
@media (max-width: 576px) {
    .free-shipping-progress {
        flex-direction: column;
        align-items: flex-start;
    }
}
```

**JavaScript (AJAX Update):**
```javascript
// wwwroot/js/free-shipping-progress.js
(function($) {
    'use strict';

    function updateFreeShippingProgress() {
        $.ajax({
            url: '/Widgets/FreeShippingProgress/GetProgress',
            type: 'GET',
            success: function(data) {
                $('.free-shipping-progress-container').replaceWith(data);
            }
        });
    }

    // Update bei Warenkorb-Änderung
    $(document).on('cart.updated', function() {
        updateFreeShippingProgress();
    });

    // Update nach AddToCart
    $(document).on('product.added', function() {
        setTimeout(updateFreeShippingProgress, 500);
    });

})(jQuery);
```

---

#### Admin-Konfiguration

**Admin-View:**
```cshtml
@* Views/Configure.cshtml *@
@model ConfigurationModel

<form asp-action="Configure" method="post">

    <div class="panel-group">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Basis-Einstellungen</h3>
            </div>
            <div class="panel-body">

                <!-- Aktivieren/Deaktivieren -->
                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="Enabled" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="Enabled" />
                    </div>
                </div>

                <!-- Free Shipping Threshold -->
                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="FreeShippingThreshold" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="FreeShippingThreshold" />
                        <span class="help-block">Betrag ab dem Versand kostenlos ist (z.B. 50,00)</span>
                    </div>
                </div>

                <!-- Währung -->
                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="CurrencyCode" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="CurrencyCode" />
                    </div>
                </div>

            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Text-Vorlagen</h3>
            </div>
            <div class="panel-body">

                <!-- Progress Text -->
                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="ProgressText" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="ProgressText" />
                        <span class="help-block">
                            Platzhalter: {remaining} = Fehlbetrag
                        </span>
                    </div>
                </div>

                <!-- Achieved Text -->
                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="AchievedText" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="AchievedText" />
                    </div>
                </div>

            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Design</h3>
            </div>
            <div class="panel-body">

                <!-- Icon Emoji -->
                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="IconEmoji" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="IconEmoji" />
                        <span class="help-block">z.B. 🚚 oder ✈️</span>
                    </div>
                </div>

                <!-- Farben -->
                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="ProgressColorActive" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="ProgressColorActive" />
                    </div>
                </div>

            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Anzeige-Positionen</h3>
            </div>
            <div class="panel-body">

                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="ShowInFlyoutCart" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="ShowInFlyoutCart" />
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="ShowInShoppingCart" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="ShowInShoppingCart" />
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-3">
                        <nop-label asp-for="ShowInCheckout" />
                    </div>
                    <div class="col-md-9">
                        <nop-editor asp-for="ShowInCheckout" />
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-9 col-md-offset-3">
            <button type="submit" class="btn btn-primary">Speichern</button>
        </div>
    </div>

</form>
```

---

### Phase 2: Erweiterte Features (Optional)

**Gift with Purchase / Tiered Rewards**

**Beispiele:**
- "Bei Bestellung über 100€ erhältst du Produkt XY gratis!"
- "Nur noch 10€ bis zu deinem Geschenk!"

**Zusätzliche Settings:**
```csharp
public class RewardSettings
{
    public bool EnableGiftWithPurchase { get; set; }
    public decimal GiftThreshold { get; set; } = 100m;
    public int GiftProductId { get; set; } // Produkt-ID des Geschenks
    public string GiftText { get; set; } = "Bei Bestellung über € {threshold} erhältst du {product} gratis!";
}
```

**Logik:**
- Bei Erreichen der Schwelle → Produkt automatisch in Warenkorb
- Oder: Kunde wählt aus mehreren Geschenken
- Visualisierung: Zweiter Fortschrittsbalken (Tiered)

---

### Referenzen

**Links:**
- Screenshots aus altem Shop: [Siehe unten]
- E-Commerce Best Practices: https://baymard.com/blog/free-shipping-threshold
- nopCommerce Widget System: https://docs.nopcommerce.com/en/developer/plugins/how-to-write-plugin-4.50.html#widgets

**Screenshots aus altem Shop:**

**Screenshot 1: Flyout Warenkorb (Fortschritt)**
```
€ 42,71 bis zum KOSTENLOSEN⁵ Versand
[████████░░░░░░░░░░░░] (Grüner Balken ~60%)

300 g Rinderkopfhaut ca. 20-25 cm
€7,29 inkl. MwSt.
Menge: 1

€7,29 INKL. MWST. ZWISCHENSUMME:

ZUM WARENKORB (Orange Button)
ZUR KASSE (Grüner Button)
```

**Screenshot 2: Warenkorb-Seite (Fortschritt)**
```
GESAMT
€7,29 inkl. MwSt.

---

€ 42,71 bis zum KOSTENLOSEN Versand
[████████░░░░░░░░░░░░] (Grüner Balken)

Zwischensumme:           €7,29 inkl. MwSt.
Versand:                 €4,95 inkl. MwSt.
(Standartversand)
Gesamt:                  €12,24

ZUR KASSE (Grüner Button)
```

**Screenshot 3: Checkout (Erreicht)**
```
Deine Ware wird Versandkostenfrei geliefert!
[████████████████████] (Voller grüner Balken)

Zwischensumme:           €72,90 inkl. MwSt.
Versand:                 Wird während des Checkouts berechnet
```

**Anhänge:**
- [x] Screenshots aus altem Shop (siehe oben)
- [ ] Wireframes für neue Implementierung
- [ ] Design-Mockups (optional)

---

**Erstellt:** 2025-10-24
**Letzte Aktualisierung:** 2025-10-24
**Version:** 1.0
**Review-Status:** ✅ Ready for Decision

---

## 📝 Zusammenfassung der Empfehlung

### ⭐ EMPFEHLUNG: Plugin-basierte Lösung

**Lösung:** Eigenes Plugin `Nop.Plugin.Widgets.FreeShippingProgress`
- ✅ **Admin-Konfiguration:** Threshold, Texte, Farben, Positionen
- ✅ **Flexibel:** Widget Zones konfigurierbar
- ✅ **Erweiterbar:** Phase 2 (Gift with Purchase) möglich
- ✅ **Update-sicher:** Nutzt Widget System
- ⏱️ **Aufwand Phase 1:** 1-2 Tage
- ⏱️ **Aufwand Phase 2 (optional):** 3-5 Tage

### 📅 Timeline

**Post-Launch Phase 1 (4 Wochen nach Go-Live):**
- Phase 1: Free Shipping Progress Indicator
- Admin-UI mit allen Einstellungen
- Flyout Cart + Warenkorb-Seite

**Post-Launch Phase 2 (3 Monate nach Go-Live, optional):**
- Gift with Purchase
- Tiered Rewards (mehrere Stufen)
- Automatisches Hinzufügen von Geschenken

### 💡 Business Impact

**Mit Free Shipping Progress:**
- 📈 +15-25% Average Order Value
- 📈 +10-15% Conversion-Rate
- 📊 Weniger Warenkorbabbrüche

**Empfehlung:** Post-Launch implementieren (nicht kritisch für Go-Live)
