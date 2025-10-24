# Feature Evaluation: Product Ribbons System

## Feature-ID: UI-011

### Grundinformationen

**Feature-Name:** Product Ribbons System (Badges auf Produkten)

**Kategorie:**
- [x] UI/UX Enhancement
- [x] Funktionalität
- [ ] Integration (Drittsystem)
- [ ] Performance
- [ ] SEO
- [ ] Sicherheit
- [x] Admin-Funktion

**Beschreibung:**
System zur Anzeige von Ribbons/Badges auf Produktkarten und Produktdetailseiten (z.B. "NEU", "SALE", "-20%", "EXKLUSIV", "Kostenloser Versand"). Ribbons sollen automatisch basierend auf Produkt-Eigenschaften (Rabatte, Deals, Zeiträume) gesetzt werden können, aber auch manuell steuerbar sein. Idealerweise über PIM verwaltbar und per API setzbar.

**Alter Shop - Status:**
- **Implementiert:** Ja
- **Technologie:** Plugin (Nop Product Ribbons von nop-templates, $79)
- **Dateien/Komponenten:**
  - Nop.Plugin.Misc.ProductRibbons
  - SQL Agent Job für automatische Ribbon-Zuweisung bei Deals/Angeboten
  - Custom CSS für Ribbon-Styling

**Probleme im alten System:**
1. ❌ Plugin kostet $79 und ist nicht für nopCommerce 4.9 verfügbar
2. ❌ Ribbons müssen manuell gesetzt werden (keine Automatisierung)
3. ❌ Workaround mit SQL Agent Job (nicht elegant, fehleranfällig)
4. ❌ Keine API-Anbindung für PIM
5. ⚠️ Keine automatische Synchronisation mit Rabatt-Kampagnen

**Alternative Plugins geprüft:**
- **nopStation Product Ribbon Plugin**:
  - ✅ Kostenlos
  - ❌ Nur bis Version 4.8
  - ❌ Weniger umfangreich
  - ❓ Unklar ob Kompatibilität mit eigenen CSS/Preistabelle
  - ❓ API-Fähigkeit muss geprüft werden

---

### Evaluierung

#### Priorität

- [ ] **CRITICAL** - Muss vor Go-Live implementiert sein
- [ ] **HIGH** - Sollte vor Go-Live implementiert sein
- [x] **MEDIUM** - Kann nach Go-Live nachgeliefert werden
- [ ] **LOW** - Nice-to-have, keine feste Timeline

**Begründung:**
- ✅ Shop ist ohne Ribbons funktionsfähig
- ✅ Kann nach Go-Live als eines der ersten Features nachgeliefert werden
- ✅ Gibt Zeit für saubere Eigenentwicklung statt Quick-Fix
- ⚠️ Ribbons sind Marketing-relevant (Deals, Neuheiten hervorheben)
- ⚠️ Conversion-Impact, aber nicht kritisch für Launch

**Business-Perspektive:**
Go-Live ohne Ribbons möglich. Erstes Post-Launch Feature (Phase 1), damit Marketing-Kampagnen besser unterstützt werden.

---

#### Umsetzungsart

**Empfohlene Implementierung:**
- [ ] **Theme** (BobMag Theme)
- [x] **Plugin** (eigenes Plugin)
- [ ] **Existing Plugin** (bestehendes nopCommerce Plugin nutzen)
- [ ] **nopCommerce Core** (bereits in 4.9 vorhanden)
- [x] **Externe Integration** (API, Webhook, etc.)

**Begründung:**
**→ Plugin-Entwicklung empfohlen** aus folgenden Gründen:

1. **Funktionalität über UI hinaus:**
   - Admin-Interface zum Ribbon-Management
   - Datenbank-Tabellen für Ribbon-Konfiguration
   - API-Endpoints für PIM-Integration
   - Automatisierungs-Logik (Deals, Zeiträume, Rabatte)

2. **Wiederverwendbarkeit:**
   - Kann in anderen nopCommerce-Shops genutzt werden
   - Updates unabhängig vom Theme
   - Testbar als eigenständige Komponente

3. **Wartbarkeit:**
   - Klare Separation of Concerns
   - Theme kann Ribbons nur stylen (CSS)
   - Plugin liefert Daten und Logik

4. **PIM-Integration:**
   - RESTful API für externe Systeme
   - Webhook-Support für automatische Updates
   - Bulk-Operations via API

5. **Erweiterbarkeit:**
   - Ribbon-Typen können erweitert werden
   - Rule-Engine für automatische Zuweisungen
   - Zeitgesteuerte Ribbons (von-bis Datum)

**Alternative: Theme-Only (❌ nicht empfohlen)**
- ✅ Schneller umzusetzen (nur CSS + View-Override)
- ❌ Keine Admin-UI
- ❌ Keine API
- ❌ Keine Automatisierung
- ❌ Ribbons müssten in Produkt-Attributen gepflegt werden (umständlich)

**Prüfung nopCommerce 4.9 Core:**
- ❓ Muss geprüft werden ob 4.9 Built-in Ribbon/Badge System hat
- ℹ️ Standard nopCommerce hat "Product Tags", aber keine visuellen Ribbons
- ℹ️ "Discount" System vorhanden, aber keine automatische Badge-Anzeige

---

#### Technische Details

**Aufwand (Schätzung):**
- [ ] XS (< 2 Stunden)
- [ ] S (2-4 Stunden)
- [ ] M (1-2 Tage)
- [ ] L (3-5 Tage)
- [x] XL (> 1 Woche)

**Detaillierte Aufwands-Schätzung: 2-3 Wochen**

**Phase 1: Core Plugin (1 Woche)**
- Datenbank-Schema (Ribbon-Entitäten, Mappings)
- Domain Models & Services
- Admin-Controller & Views (CRUD für Ribbons)
- Widget für Frontend-Rendering
- Basis-CSS/HTML für Ribbons

**Phase 2: Automatisierung (3-5 Tage)**
- Rule-Engine für automatische Ribbon-Zuweisung
  - Rabatt-basiert (z.B. ">20% → SALE Badge")
  - Deal-basiert (Discount-Kampagnen)
  - Neu-basiert (Produkt CreatedOn < 30 Tage)
  - Datum-basiert (zeitgesteuerte Ribbons)
- Scheduled Task für automatische Updates
- Performance-Optimierung (Caching)

**Phase 3: API & PIM Integration (3-5 Tage)**
- RESTful API Endpoints
  - GET /api/ribbons/product/{id}
  - POST /api/ribbons/product/{id}
  - DELETE /api/ribbons/product/{id}
  - PUT /api/ribbons/bulk (Bulk-Operation)
- Authentication & Authorization
- API-Dokumentation (Swagger)
- Webhook-Support (optional)

**Phase 4: Testing & Dokumentation (2-3 Tage)**
- Unit Tests
- Integration Tests
- Admin-Dokumentation
- API-Dokumentation
- User-Guide

**Dependencies:**
- ✅ nopCommerce 4.9 Plugin-Framework
- ✅ Entity Framework Core
- ✅ nopCommerce Widget System
- ✅ ASP.NET Core Web API
- ⚠️ PIM-System muss API-Calls unterstützen (extern)

**Risiken:**
- ⚠️ **Performance**: Bei vielen Produkten muss Ribbon-Check optimiert sein
  - Mitigation: Caching-Layer, Pre-Computation bei Produkt-Update
- ⚠️ **Plugin-Updates**: Bei nopCommerce-Updates muss Plugin angepasst werden
  - Mitigation: Clean Architecture, minimale Abhängigkeiten zu Core
- ⚠️ **PIM-Integration**: PIM muss API-fähig sein
  - Mitigation: Fallback auf manuelles Management via Admin-Panel
- ⚠️ **Theme-Kompatibilität**: Ribbons müssen in allen Themes funktionieren
  - Mitigation: Standard-HTML/CSS, Theme kann via CSS überschreiben

**Kompatibilität mit nopCommerce 4.9:**
- [x] Voll kompatibel (neu zu entwickeln)
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

**Als Kunde** möchte ich **auf einen Blick sehen, welche Produkte im Angebot, neu oder besonders sind**, damit **ich schneller Kaufentscheidungen treffen kann**.

**Als Marketing-Manager** möchte ich **Ribbons automatisch bei Deals setzen und per PIM verwalten**, damit **ich effizienter arbeiten kann und keine Ribbons manuell pflegen muss**.

**Als PIM-Administrator** möchte ich **Ribbons über eine API setzen können**, damit **ich Ribbon-Daten zentral im PIM verwalten und automatisch synchronisieren kann**.

**Business Value:**
- [x] Umsatzsteigerung (Deals/Angebote sind sichtbarer)
- [x] Conversion-Optimierung (visuelles Highlighting)
- [x] Kundenzufriedenheit (bessere Orientierung)
- [x] Prozesseffizienz (Admin) (Automatisierung statt manueller Pflege)
- [ ] Compliance/Legal
- [x] Sonstiges: **Marketing-Effizienz**, **PIM-Integration**

**Geschätzte Auswirkung bei Nicht-Implementierung:**
- [ ] Kritisch - Shop nicht nutzbar
- [ ] Hoch - Signifikante Einschränkungen
- [x] Mittel - Komforteinbußen
- [ ] Niedrig - Kaum bemerkbar

**Begründung:**
Shop funktioniert ohne Ribbons, aber Marketing-Kampagnen sind weniger effektiv. Kunden haben schlechtere Orientierung bei Angeboten/Neuheiten. Conversion-Rate bei Deal-Produkten könnte leiden.

**Quantifizierung (Schätzung):**
- 📈 +5-10% Conversion bei Deal-Produkten mit Ribbon
- ⏱️ -80% Zeitaufwand für Ribbon-Pflege (Automatisierung)
- 📊 Bessere Klickrate auf hervorgehobene Produkte

---

#### Migration & Testing

**Datenmigration nötig:**
- [x] Ja
- [ ] Nein

**Details:**
Falls alte Ribbon-Daten vom alten Plugin vorhanden sind:
- Ribbon-Konfigurationen exportieren (SQL)
- Produkt-Ribbon Zuordnungen migrieren
- Ribbon-Design/Farben übernehmen

**Migrations-Script:**
```sql
-- Ribbon-Daten aus altem Plugin exportieren
-- Format: ProductId, RibbonText, RibbonType, RibbonColor, ValidFrom, ValidTo

-- In neues Plugin-Schema importieren
-- Mapping auf neue Datenstruktur
```

**Testing-Aufwand:**
- [ ] Minimal (einfache Sichtprüfung)
- [ ] Standard (manuelle Tests)
- [x] Hoch (komplexe Workflows, mehrere Szenarien)
- [ ] Sehr hoch (Integration Tests, Performance Tests)

**Test-Szenarien:**

**Frontend:**
1. ✅ Ribbon wird auf Produktkarte angezeigt (Kategorie-Seite)
2. ✅ Ribbon wird auf Produktdetailseite angezeigt
3. ✅ Ribbon-Farben/Styles sind korrekt (Deal=Rot, Neu=Orange, etc.)
4. ✅ Responsive: Ribbon auf Mobile korrekt positioniert
5. ✅ Mehrere Ribbons pro Produkt (z.B. "NEU" + "SALE")
6. ✅ Ribbon-Priorität (wichtigster Ribbon im Vordergrund)
7. ✅ Performance: Keine Verzögerung beim Laden

**Admin:**
1. ✅ Ribbon erstellen (Name, Text, Farbe, Icon)
2. ✅ Ribbon einem Produkt zuweisen
3. ✅ Ribbon von Produkt entfernen
4. ✅ Ribbon bearbeiten (Änderungen sofort sichtbar)
5. ✅ Ribbon löschen (wird bei Produkten entfernt)
6. ✅ Bulk-Operation: Ribbon mehreren Produkten zuweisen
7. ✅ Zeitgesteuertes Ribbon (automatisch anzeigen von-bis Datum)

**Automatisierung:**
1. ✅ Produkt bekommt Rabatt → "SALE" Ribbon wird automatisch gesetzt
2. ✅ Rabatt endet → "SALE" Ribbon wird automatisch entfernt
3. ✅ Neues Produkt angelegt → "NEU" Ribbon für 30 Tage
4. ✅ Scheduled Task läuft alle X Minuten (konfigurierbar)
5. ✅ Rule-Engine: Custom Rules funktionieren

**API:**
1. ✅ GET /api/ribbons/product/{id} liefert Ribbons
2. ✅ POST /api/ribbons/product/{id} setzt Ribbon
3. ✅ DELETE /api/ribbons/product/{id} entfernt Ribbon
4. ✅ PUT /api/ribbons/bulk für Bulk-Update
5. ✅ Authentication funktioniert (API Key / OAuth)
6. ✅ Error Handling (404, 401, 500)
7. ✅ Rate Limiting (bei Bedarf)

**Performance:**
1. ✅ 1000+ Produkte mit Ribbons: Ladezeit <2s
2. ✅ Caching funktioniert (zweiter Aufruf schneller)
3. ✅ Scheduled Task belastet Server nicht übermäßig
4. ✅ Datenbank-Queries sind optimiert (Indexes)

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

**Verantwortlich:**
Development Team

**Budget:**
- ❌ Plugin kaufen: $79 (nicht verfügbar für 4.9)
- ✅ Eigenentwicklung: 2-3 Wochen Entwicklung
- ✅ ROI: Langfristig günstiger + volle Kontrolle + PIM-Integration

**Notizen:**
- ✅ **Entscheidung: Eigenes Plugin entwickeln**
- ✅ Go-Live ohne Ribbons möglich
- ✅ Erstes großes Post-Launch Feature
- ⚠️ Vor Start: nopCommerce 4.9 Core auf Built-in Ribbon-Features prüfen
- ⚠️ PIM-Team einbeziehen: API-Requirements klären
- 📝 Plugin-Name: "BobMag.Plugin.ProductRibbons"

**Offene Fragen:**
1. ❓ **PIM-Integration**: Welches PIM-System wird verwendet? API-Fähigkeit?
   - Action: Meeting mit PIM-Team

2. ❓ **Ribbon-Typen**: Welche Ribbon-Typen werden benötigt?
   - Vorschlag: NEU, SALE, EXKLUSIV, VERSANDKOSTENFREI, BESTSELLER, -X%
   - Action: Liste mit Marketing abstimmen

3. ❓ **Automatisierungs-Regeln**: Welche automatischen Regeln sind gewünscht?
   - Rabatt >20% → SALE
   - Neu <30 Tage → NEU
   - Free Shipping → VERSANDKOSTENFREI
   - Action: Workshop mit Marketing & Product Owner

4. ❓ **Multi-Language**: Ribbon-Texte mehrsprachig?
   - Action: Anforderung klären

5. ❓ **Ribbon-Position**: Wo sollen Ribbons angezeigt werden?
   - Produktkarte: Ja (Ecke links oben)
   - Produktdetails: Ja (über Produktbild)
   - Warenkorb: ? (zu klären)
   - Suche: Ja
   - Action: UI/UX Review

---

### Technischer Implementierungsplan

**Plugin-Struktur:**
```
Nop.Plugin.BobMag.ProductRibbons/
├── Controllers/
│   ├── ProductRibbonsAdminController.cs    # Admin CRUD
│   └── ProductRibbonsApiController.cs      # API Endpoints
├── Data/
│   ├── ProductRibbonRecord.cs              # Datenbank-Entität
│   ├── ProductRibbonMap.cs                 # EF Mapping
│   └── Migrations/                         # Schema Migrations
├── Domain/
│   ├── ProductRibbon.cs                    # Domain Model
│   ├── RibbonType.cs                       # Enum: Sale, New, etc.
│   └── RibbonRule.cs                       # Automatisierungs-Regel
├── Services/
│   ├── IProductRibbonService.cs            # Interface
│   ├── ProductRibbonService.cs             # Business Logic
│   └── ProductRibbonRuleEngine.cs          # Automatisierung
├── Infrastructure/
│   ├── DependencyRegistrar.cs              # IoC
│   └── RouteProvider.cs                    # Routing
├── Models/
│   ├── ProductRibbonModel.cs               # Admin View Model
│   └── ProductRibbonApiModel.cs            # API DTO
├── Views/
│   ├── Admin/
│   │   ├── Configure.cshtml                # Plugin-Einstellungen
│   │   ├── List.cshtml                     # Ribbon-Liste
│   │   └── Edit.cshtml                     # Ribbon-Editor
│   └── Components/
│       └── ProductRibbon/Default.cshtml    # Frontend-Widget
├── wwwroot/
│   ├── css/
│   │   └── product-ribbons.css             # Standard-Styles
│   └── js/
│       └── product-ribbons.admin.js        # Admin-JS
└── ProductRibbonsPlugin.cs                 # Plugin-Hauptklasse
```

**API-Endpoints:**
```
GET    /api/ribbons                        # Alle Ribbons
GET    /api/ribbons/{id}                   # Einzelner Ribbon
POST   /api/ribbons                        # Ribbon erstellen
PUT    /api/ribbons/{id}                   # Ribbon aktualisieren
DELETE /api/ribbons/{id}                   # Ribbon löschen

GET    /api/ribbons/product/{productId}   # Ribbons eines Produkts
POST   /api/ribbons/product/{productId}   # Ribbon zu Produkt hinzufügen
DELETE /api/ribbons/product/{productId}/{ribbonId}  # Ribbon von Produkt entfernen

PUT    /api/ribbons/bulk                   # Bulk-Update (JSON Array)
```

**Datenbank-Schema:**
```sql
-- Ribbon-Definition
CREATE TABLE ProductRibbon (
    Id INT PRIMARY KEY,
    Name NVARCHAR(100),           -- "SALE", "NEU", etc.
    DisplayText NVARCHAR(100),    -- Angezeigter Text
    RibbonType INT,               -- Enum: Sale, New, Exclusive, etc.
    BackgroundColor NVARCHAR(7),  -- #d20000
    TextColor NVARCHAR(7),        -- #ffffff
    IconClass NVARCHAR(50),       -- Font-Awesome Klasse
    DisplayOrder INT,             -- Sortierung
    IsActive BIT,
    CreatedOnUtc DATETIME,
    UpdatedOnUtc DATETIME
);

-- Ribbon-Produkt Zuordnung
CREATE TABLE ProductRibbon_Product_Mapping (
    Id INT PRIMARY KEY,
    ProductRibbonId INT FOREIGN KEY,
    ProductId INT FOREIGN KEY,
    ValidFromUtc DATETIME NULL,   -- Optional: Zeitsteuerung
    ValidToUtc DATETIME NULL,
    IsAutoAssigned BIT,           -- Automatisch oder manuell
    CreatedOnUtc DATETIME
);

-- Automatisierungs-Regeln
CREATE TABLE ProductRibbonRule (
    Id INT PRIMARY KEY,
    ProductRibbonId INT FOREIGN KEY,
    RuleType INT,                 -- Enum: Discount, NewProduct, etc.
    RuleData NVARCHAR(MAX),       -- JSON mit Regel-Config
    IsActive BIT,
    Priority INT
);
```

**Automatisierungs-Beispiel:**
```csharp
public class ProductRibbonRuleEngine
{
    // Regel: Produkt mit >20% Rabatt bekommt SALE-Ribbon
    public async Task<bool> ShouldAssignSaleRibbon(Product product)
    {
        var discount = await _discountService.GetAppliedDiscounts(product);
        var maxDiscount = discount.Max(d => d.DiscountPercentage);
        return maxDiscount >= 20;
    }

    // Regel: Produkt <30 Tage alt bekommt NEU-Ribbon
    public bool ShouldAssignNewRibbon(Product product)
    {
        var daysSinceCreation = (DateTime.UtcNow - product.CreatedOnUtc).TotalDays;
        return daysSinceCreation <= 30;
    }
}
```

---

### Referenzen

**Links:**
- Alter Shop: [Screenshots von Ribbons im alten Shop]
- Altes Plugin: [Nop Product Ribbons von nop-templates](https://www.nop-templates.com/product-ribbons-for-nopcommerce) - $79, nicht für 4.9
- Alternative: [nopStation Product Ribbon Plugin](https://www.nopstation.com/) - Kostenlos, bis 4.8

**Recherche:**
- [ ] nopCommerce 4.9 Core auf Built-in Ribbon-Features prüfen
- [ ] nopCommerce Marketplace nach 4.9-kompatiblen Plugins durchsuchen
- [ ] PIM-API Dokumentation sichten

**Anhänge:**
- [ ] Screenshots aus altem Shop
- [ ] Anforderungsliste von Marketing
- [ ] PIM-API Spezifikation (falls vorhanden)
- [ ] Wireframes für Admin-UI

---

**Erstellt:** 2025-10-24
**Letzte Aktualisierung:** 2025-10-24
**Version:** 1.0
**Review-Status:** ✅ Ready for Decision
