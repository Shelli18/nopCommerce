# Feature Evaluation: Variants Dropdown System

## Feature-ID: UI-002

### Grundinformationen

**Feature-Name:** Variants Dropdown System

**Kategorie:**
- [x] UI/UX Enhancement
- [x] Funktionalität
- [ ] Integration (Drittsystem)
- [ ] Performance
- [ ] SEO
- [ ] Sicherheit
- [ ] Admin-Funktion

**Beschreibung:**
Ein modernes Dropdown/Modal-System zur Auswahl von Produktvarianten. Auf Desktop erscheint ein Dropdown unter dem Button, auf Mobile ein Bottom-Sheet Modal. Die Varianten zeigen Name, Verfügbarkeit und Preis. Nach Auswahl wird der entsprechende Add-to-Cart Block eingeblendet.

**Alter Shop - Status:**
- **Implementiert:** Ja
- **Technologie:** Theme / View Override (Pacific Theme)
- **Dateien/Komponenten:**
  - `ProductTemplate.VariantsDropdown.cshtml`
  - Inline CSS (ca. 300 Zeilen)
  - Inline JavaScript (ca. 200 Zeilen)

---

### Evaluierung

#### Priorität

- [ ] **CRITICAL** - Muss vor Go-Live implementiert sein
- [x] **HIGH** - Sollte vor Go-Live implementiert sein
- [ ] **MEDIUM** - Kann nach Go-Live nachgeliefert werden
- [ ] **LOW** - Nice-to-have, keine feste Timeline

**Begründung:**
Das Feature ist bereits im alten Shop im Einsatz und Kunden sind daran gewöhnt. Es verbessert die UX bei Produkten mit mehreren Varianten signifikant. Sollte vor Go-Live implementiert werden, um Feature-Parität zu gewährleisten.

---

#### Umsetzungsart

**Empfohlene Implementierung:**
- [x] **Theme** (BobMag Theme)
- [ ] **Plugin** (eigenes Plugin)
- [ ] **Existing Plugin** (bestehendes nopCommerce Plugin nutzen)
- [ ] **nopCommerce Core** (bereits in 4.9 vorhanden)
- [ ] **Externe Integration** (API, Webhook, etc.)

**Begründung:**
- Ist primär UI/UX Enhancement
- Kein wiederverwendbarer Funktions-Code (sehr shop-spezifisch)
- Benötigt View-Override + CSS + JavaScript
- Perfekt für Theme-Integration
- CSS/JS bereits extrahiert in separate Dateien:
  - `Content/scss/components/_product-variants-dropdown.scss`
  - `Content/js/product-variants-dropdown.js`

---

#### Technische Details

**Aufwand (Schätzung):**
- [ ] XS (< 2 Stunden)
- [ ] S (2-4 Stunden)
- [ ] M (1-2 Tage)
- [x] L (3-5 Tage)
- [ ] XL (> 1 Woche)

**Aufwands-Breakdown:**
1. View-Integration: 1 Tag (HTML in ProductTemplate einbauen)
2. CSS Fine-Tuning: 0.5 Tage (Responsive, Browser-Testing)
3. JavaScript Testing: 0.5 Tage (AJAX-Kompatibilität, Events)
4. Testing & Bugfixes: 1 Tag (Edge Cases, Mobile/Desktop)
5. Dokumentation: 0.5 Tage

**Dependencies:**
- jQuery (✅ bereits in nopCommerce vorhanden)
- BobMag Theme Basis-CSS
- ProductTemplate.Grouped.cshtml als Basis
- nopCommerce 4.9 Produktmodell (AssociatedProducts)

**Risiken:**
- ⚠️ View-Override muss bei nopCommerce-Updates gemergt werden
- ⚠️ JavaScript-Konflikte mit anderen Plugins möglich
- ⚠️ AJAX-Updates könnten Event-Listener zerstören (bereits mit ajaxComplete Handler gelöst)
- ✅ CSS/JS sind isoliert, minimales Risiko für Seiteneffekte

**Kompatibilität mit nopCommerce 4.9:**
- [x] Voll kompatibel
- [ ] Anpassungen nötig
- [ ] Unklar - muss getestet werden
- [ ] Nicht kompatibel - komplettes Rewrite nötig

**Hinweis:** Code ist bereits von Pacific Theme (nopCommerce 4.5) auf nopCommerce 4.9 Standard migriert worden. CSS und JavaScript sind in separate Dateien extrahiert.

---

#### Business Impact

**Betrifft:**
- [x] Kunden (Frontend)
- [ ] Admin (Backend)
- [ ] Beide

**User Story:**
Als **Kunde** möchte ich **Produktvarianten schnell und übersichtlich auswählen können**, damit **ich auf einen Blick Preis und Verfügbarkeit sehe und die richtige Variante in den Warenkorb legen kann**.

**Business Value:**
- [x] Umsatzsteigerung
- [x] Conversion-Optimierung
- [x] Kundenzufriedenheit
- [ ] Prozesseffizienz (Admin)
- [ ] Compliance/Legal
- [ ] Sonstiges: [___]

**Geschätzte Auswirkung bei Nicht-Implementierung:**
- [ ] Kritisch - Shop nicht nutzbar
- [x] Hoch - Signifikante Einschränkungen
- [ ] Mittel - Komforteinbußen
- [ ] Niedrig - Kaum bemerkbar

**Begründung:**
Produkte mit Varianten würden auf Standard-nopCommerce-Darstellung zurückfallen (lange vertikale Liste). Das ist deutlich weniger benutzerfreundlich und könnte die Conversion-Rate bei Varianten-Produkten negativ beeinflussen.

---

#### Migration & Testing

**Datenmigration nötig:**
- [ ] Ja
- [x] Nein

Falls ja, Details:
Keine Datenmigration nötig - arbeitet mit Standard-nopCommerce-Produktmodell.

**Testing-Aufwand:**
- [ ] Minimal (einfache Sichtprüfung)
- [ ] Standard (manuelle Tests)
- [x] Hoch (komplexe Workflows, mehrere Szenarien)
- [ ] Sehr hoch (Integration Tests, Performance Tests)

**Test-Szenarien:**
1. **Desktop - Dropdown öffnen/schließen**
   - Button-Klick öffnet Dropdown
   - X-Button schließt Dropdown
   - Klick außerhalb schließt Dropdown

2. **Mobile - Modal öffnen/schließen**
   - Button-Klick öffnet Bottom-Sheet Modal
   - X-Button schließt Modal
   - Backdrop-Klick schließt Modal

3. **Variantenauswahl**
   - Klick auf Variante wählt diese aus
   - Button-Content aktualisiert sich (Name, Preis, Verfügbarkeit)
   - Korrekter AddToCart-Block wird eingeblendet
   - Andere AddToCart-Blocks werden ausgeblendet

4. **Disabled Varianten**
   - "Nicht verfügbar" Varianten sind ausgegraut
   - Kein Klick möglich auf disabled Varianten
   - Tooltip zeigt Grund (falls implementiert)

5. **AJAX-Kompatibilität**
   - Nach AJAX-Update (z.B. AddToCart) funktioniert Dropdown weiter
   - Event-Listener werden re-initialisiert

6. **Browser-Kompatibilität**
   - Chrome, Firefox, Safari, Edge
   - iOS Safari, Chrome Mobile

7. **Responsive Breakpoints**
   - Wechsel von Desktop → Mobile bei 768px
   - Layout passt sich korrekt an

8. **Edge Cases**
   - Nur 1 Variante verfügbar
   - Alle Varianten nicht verfügbar
   - Sehr lange Variantennamen
   - Sehr viele Varianten (>20)

---

### Entscheidung

**Status:**
- [x] ✅ Genehmigt zur Implementierung
- [ ] ⏸️ Zurückgestellt (Post-Launch)
- [ ] ❌ Nicht implementieren
- [ ] ❓ Noch zu klären

**Implementierungs-Timeline:**
- [ ] Sprint 1 (Pre-Launch Must-Have)
- [x] Sprint 2 (Pre-Launch Should-Have)
- [ ] Post-Launch Phase 1 (innerhalb 4 Wochen nach Go-Live)
- [ ] Post-Launch Phase 2 (innerhalb 3 Monate nach Go-Live)
- [ ] Backlog (keine feste Timeline)

**Verantwortlich:**
Development Team

**Notizen:**
- ✅ CSS und JavaScript sind bereits extrahiert und dokumentiert
- ✅ Basis-View ProductTemplate.VariantsDropdown.cshtml ist erstellt
- 🔄 HTML-Integration in View steht noch aus
- 📝 Dokumentation ist vorhanden: `Themes/BobMag/Docs/variants-dropdown-system.md`
- ⚠️ Bei nopCommerce-Updates muss ProductTemplate.Grouped.cshtml verglichen werden

**Offene Fragen:**
- Soll Variants-Header klickbar sein (öffnet Modal)? → Ja, ist bereits implementiert
- Sollen Varianten-Bilder angezeigt werden? → Erstmal nein, kann später hinzugefügt werden

---

### Referenzen

**Links:**
- Alter Shop: [Screenshot/URL zum alten Variants Dropdown]
- Dokumentation: `src/Presentation/Nop.Web/Themes/BobMag/Docs/variants-dropdown-system.md`
- SCSS: `src/Presentation/Nop.Web/Themes/BobMag/Content/scss/components/_product-variants-dropdown.scss`
- JavaScript: `src/Presentation/Nop.Web/Themes/BobMag/Content/js/product-variants-dropdown.js`

**Anhänge:**
- [x] Screenshots (falls vorhanden im alten Shop)
- [x] Code-Beispiele (bereits extrahiert)
- [x] Anforderungsdokumente (Docs)

---

**Erstellt:** 2025-10-24
**Letzte Aktualisierung:** 2025-10-24
**Version:** 1.0
