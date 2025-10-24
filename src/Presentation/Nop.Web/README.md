# nopCommerce Theme SCSS Starter (CleanDefault overlay)

This starter gives you a clean SCSS structure that **layers on top of CleanDefault**:
- Keep `cleandefault.css` (updated when you upgrade nopCommerce)
- Build your custom styles from `scss/` -> `css/styles.css`, loaded **after** CleanDefault

## Folder structure
```
Themes/MeinTheme/
  Content/
    scss/
      _variables.scss
      _mixins.scss
      _utilities.scss
      _base.scss
      _layout.scss
      components/
        _buttons.scss
        _header.scss
        _footer.scss
        _product-card.scss
      app.scss          # -> compiled to css/styles.css
    css/
      cleandefault.css  # (put your base file here)
      styles.css        # (generated)
    js/
      theme.js
  Views/
    Shared/
      _Root.Head.cshtml # registers CSS in correct order
      _Root.cshtml      # registers JS at footer
  theme.json
```

## How to build styles

### Option A — Visual Studio **WebCompiler**
1. Install the VS extension **WebCompiler** by Mads Kristensen.
2. Put the provided `compilerconfig.json` at the **solution root** (same folder as `nopCommerce.sln`).
3. Ensure the `inputFile` points to your `app.scss` and `outputFile` to `styles.css`.
4. Save `app.scss` -> WebCompiler builds `styles.css` automatically.

### Option B — Node (Gulp)
```
npm install
npx gulp
```
This runs Autoprefixer and builds `styles.css` (with sourcemap) into `Content/css/`.

## CSS registration (very important)
- Load **CleanDefault first**, then `styles.css`:
```csharp
@{
    NopHtml.AppendCssFileParts("~/Themes/MeinTheme/Content/css/cleandefault.css");
    NopHtml.AppendCssFileParts("~/Themes/MeinTheme/Content/css/styles.css");
}
@await Html.PartialAsync("_CssFiles")
```

## Update flow
1. Upgrade nopCommerce.
2. Replace `cleandefault.css` with the new base version.
3. Rebuild `styles.css`. Most of your look stays intact.

---

Happy theming!
Generated: 2025-10-22
