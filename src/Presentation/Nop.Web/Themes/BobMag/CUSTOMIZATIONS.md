# BobMag Theme - Customizations Documentation

This document tracks all customizations made to the BobMag theme compared to the base nopCommerce 4.9 / DefaultClean theme.

## File Structure

```
Themes/BobMag/
├── Content/
│   ├── scss/
│   │   ├── components/
│   │   │   ├── _footer-trust-section.scss  ← NEW: Trust components styling
│   │   │   └── ...
│   │   └── app.scss
│   └── ...
├── Views/
│   └── Shared/
│       ├── _Root.cshtml                    ← MODIFIED: Added trust banner
│       ├── _TrustBanner.cshtml             ← NEW: Red shipping banner
│       ├── _TrustMethods.cshtml            ← NEW: Payment/shipping logos
│       ├── _TrustDisclaimer.cshtml         ← NEW: Footnote text
│       └── Components/
│           └── Footer/
│               └── Default.cshtml          ← MODIFIED: Added trust sections
└── CUSTOMIZATIONS.md                       ← This file
```

---

## View Customizations

### 1. `Views/Shared/_Root.cshtml`

**Purpose**: Main layout file that wraps all pages

**Changes**:
- **Line 30**: Added Trust Banner before the main footer
  ```cshtml
  @{ await Html.RenderPartialAsync("_TrustBanner"); }
  ```

**Reason**:
- Displays red "free shipping" banner above the footer
- Replaces previous plugin-based solution (not available in nopCommerce 4.9)

**Update Strategy**:
When updating from upstream, only this ONE line needs to be re-added if the file is overwritten.

---

### 2. `Views/Shared/_TrustBanner.cshtml` *(NEW)*

**Purpose**: Red banner displayed above the main footer

**Content**:
- "KOSTENLOSER VERSAND AB 50€ BESTELLWERT³"
- Red background (#d20000), white text, bold

**Styling**:
- Controlled by `.trust-banner` in `_footer-trust-section.scss`

---

### 3. `Views/Shared/_TrustMethods.cshtml` *(NEW)*

**Purpose**: Displays payment and shipping method logos below the footer

**Content**:
1. **Payment methods** (13 logos):
   - Paypal, Klarna, Klarna Rechnung, Klarna Sofort
   - Maestro, Mastercard, Visa, Stripe
   - SEPA, Giropay, Money Order, Google Pay, Apple Pay

2. **Shipping methods** (5 logos):
   - DPD, DPD Express, DHL, DHL Express, UPS Express

**Assets**:
- All logos served from CDN: `https://cdn.bob-mag.de/shop/payments/` and `/shipping/`

**Styling**:
- Controlled by `.trust-methods` in `_footer-trust-section.scss`
- Responsive: 2-column grid on desktop, 1-column on mobile

---

### 4. `Views/Shared/_TrustDisclaimer.cshtml` *(NEW)*

**Purpose**: Footnote text displayed at the very bottom of the page

**Content**:
- "³Kostenloser Versand: Ab einem Bestellwert von 50,00€ übernehmen wir die Versandkosten für dich über unseren Standartversand"

**Styling**:
- Controlled by `.trust-disclaimer` in `_footer-trust-section.scss`
- Small text, centered, white background

---

### 5. `Views/Shared/Components/Footer/Default.cshtml` *(MODIFIED)*

**Purpose**: Footer component override

**Changes**:
- **Line 24** (after `.footer-upper`): Added `_TrustMethods` partial
  ```cshtml
  @{ await Html.RenderPartialAsync("_TrustMethods"); }
  ```

- **Line 49** (after `footer-lower`): Added `_TrustDisclaimer` partial
  ```cshtml
  @{ await Html.RenderPartialAsync("_TrustDisclaimer"); }
  ```

**Reason**:
- Trust methods shown between footer navigation and copyright section
- Disclaimer shown at the very bottom after "Powered by nopCommerce"

**Update Strategy**:
When updating from upstream, these TWO lines need to be re-added in the correct positions.

---

## Layout Structure

The new layout structure (from top to bottom):

1. **Main Content** (`_Root.cshtml`)
2. **Trust Banner** (red, above footer) - `_TrustBanner.cshtml`
3. **Footer Upper** (navigation links) - Default Footer
4. **Trust Methods** (payment/shipping logos) - `_TrustMethods.cshtml`
5. **Footer Lower** (copyright, powered by) - Default Footer
6. **Trust Disclaimer** (footnote text) - `_TrustDisclaimer.cshtml`

---

## SCSS Customizations

### 1. `Content/scss/components/_footer-trust-section.scss` *(NEW)*

**Purpose**: Styles for all trust components

**Sections**:

#### `.trust-banner`
- Red banner (background: #d20000)
- Full width, bold white text
- `margin-top: 3rem` for spacing from content

#### `.trust-methods`
- Container for payment/shipping logos
- Grid layout: 2 columns on desktop, 1 column on mobile
- Background: `$color-bg`
- Padding: 2rem vertical

#### `.trust-method-section`
- Individual sections for "Sicher bezahlen" and "Schnell versendet"
- H2 headings: left-aligned on desktop, centered on mobile

#### `.method-logo`
- 80px wide (65px on small mobile)
- White background with border
- Hover effect: lift + shadow
- Border radius and padding for visual appeal

#### `.trust-disclaimer`
- Small font size (0.75rem)
- Centered text
- White background
- Border-top for separation

**Responsive Breakpoints**:
- Desktop (default): Full features
- Tablet/Mobile (≤768px): 1-column, centered content
- Small Mobile (≤480px): Smaller logos and text

**Import Order**:
Added to `app.scss` before the footer import:
```scss
@import "components/footer-trust-section"; // Trust components
@import "components/footer";
```

---

## Maintenance Notes

### When Updating nopCommerce

If you update to a newer nopCommerce version and need to merge upstream changes:

1. **`_Root.cshtml`**:
   - Check if the file was updated upstream
   - If yes, apply upstream changes and re-add this ONE line before the FooterViewComponent:
     ```cshtml
     @{ await Html.RenderPartialAsync("_TrustBanner"); }
     ```

2. **`Components/Footer/Default.cshtml`**:
   - Check if the default footer component was updated upstream
   - If yes, apply upstream changes and re-add these TWO lines:
     - After `.footer-upper`: `@{ await Html.RenderPartialAsync("_TrustMethods"); }`
     - After `.footer-lower`: `@{ await Html.RenderPartialAsync("_TrustDisclaimer"); }`

3. **Trust Partial Views** (`_TrustBanner.cshtml`, `_TrustMethods.cshtml`, `_TrustDisclaimer.cshtml`):
   - These are custom files, won't be affected by updates
   - Update payment/shipping logos here if needed

4. **`_footer-trust-section.scss`**:
   - This is a custom file, won't be affected by updates
   - Adjust styling if needed

### Updating Trust Section Content

**To change banner text**:
1. Edit `Views/Shared/_TrustBanner.cshtml`
2. Change text in the `.trust-banner` div

**To add/remove payment methods**:
1. Edit `Views/Shared/_TrustMethods.cshtml`
2. Add/remove `<img>` tags in the `.trust-payment-methods` section
3. Upload logo to CDN: `https://cdn.bob-mag.de/shop/payments/[filename].png`
4. Logo should be ~80px wide with transparent background

**To add/remove shipping methods**:
1. Edit `Views/Shared/_TrustMethods.cshtml`
2. Add/remove `<img>` tags in the `.trust-shipping-methods` section
3. Upload logo to CDN: `https://cdn.bob-mag.de/shop/shipping/[filename].png`

**To change disclaimer text**:
1. Edit `Views/Shared/_TrustDisclaimer.cshtml`
2. Change text in the `.trust-disclaimer` div

---

## Design Rationale

### Why Split Into 3 Components?

Instead of one large trust section:
1. **Better separation of concerns**: Banner, methods, and disclaimer serve different purposes
2. **More flexible layout**: Can be positioned independently (banner above footer, methods/disclaimer below)
3. **Easier maintenance**: Each component can be updated independently
4. **Better for UI hierarchy**:
   - Banner grabs attention first
   - Footer provides navigation
   - Trust methods build confidence
   - Disclaimer provides legal info

### Why This Specific Layout?

1. **Trust Banner above Footer**: Highly visible, catches attention before navigation
2. **Trust Methods below Footer navigation**: After user has navigated, reinforce trust with logos
3. **Disclaimer at bottom**: Legal text belongs at the very end, after "Powered by nopCommerce"

This structure mimics professional e-commerce sites that place trust signals strategically throughout the footer area.

---

## Testing Checklist

After making changes to trust components:

- [ ] Trust Banner: Full width, red background, white text, ³ symbol visible
- [ ] Footer navigation: Displays correctly between banner and trust methods
- [ ] Trust Methods: 2-column layout on desktop, all 18 logos visible
- [ ] Tablet view (≤768px): Trust methods switch to 1-column, centered
- [ ] Mobile view: All components stack correctly, logos readable
- [ ] Trust Disclaimer: Visible at very bottom after "Powered by nopCommerce"
- [ ] Logo hover effects: Logos lift slightly on hover
- [ ] Responsive text: Font sizes adjust appropriately on mobile

---

## Related Files

- `Content/scss/components/_footer.scss` - Main footer styling
- `Content/scss/_variables.scss` - Color/spacing tokens used
- `Views/Shared/_Root.cshtml` - Main layout
- `Views/Shared/Components/Footer/Default.cshtml` - Footer component
- Theme documentation: See parent README.md

---

**Last Updated**: 2025-10-24
**Theme Version**: BobMag 1.0 (based on nopCommerce 4.9)
**Changes**: Split trust section into 3 separate components for better structure
