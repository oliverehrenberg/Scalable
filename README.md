# Scaleble Website

En modern, responsiv website för Scaleble - B2B försäljningskonsulter med HubSpot-specialisering.

## 🚀 Funktioner

- **Responsiv design** - Fungerar perfekt på alla enheter
- **HubSpot integration** - Formulär, tracking och chat
- **Automatiskt tema** - Baserat på systempreferenser
- **Smooth scrolling** - Elegant navigering
- **Animationer** - Scroll reveal och hover effects
- **Prestanda-optimerad** - Komprimerad CSS och optimerad kod
- **Tillgänglighet** - WCAG-kompatibel
- **SEO-optimerad** - Semantisk HTML struktur

## 📁 Projektstruktur

```
Scaleup/
├── index.html              # Huvudsida
├── css/
│   └── main.css            # Kompilerad CSS (genereras automatiskt)
├── js/
│   ├── main.js             # Huvudfunktionalitet
│   └── hubspot.js          # HubSpot integration
├── src/scss/               # SCSS källfiler
│   ├── main.scss           # Huvud SCSS-fil
│   ├── _variables.scss     # Variabler och konfiguration
│   ├── base/               # Grundstilar
│   └── components/         # Komponentstilar
├── package.json            # NPM konfiguration
└── README.md              # Denna fil
```

## 🛠️ Installation & Setup

### 1. Grundinstallation

```bash
# Klona projektet
git clone [repo-url]
cd Scaleup

# Installera dependencies
npm install

# Kompilera SCSS till CSS
npm run build-css
```

### 2. HubSpot Konfiguration

#### Steg 1: Skaffa HubSpot uppgifter
1. Logga in på ditt HubSpot-konto
2. Gå till **Marketing** → **Forms**
3. Skapa ett nytt formulär eller välj ett befintligt
4. Notera **Form ID** (finns i URL:en eller formulärinställningar)
5. Hitta din **Portal ID** under **Settings** → **Account Setup** → **Account Information**

#### Steg 2: Uppdatera konfiguration
Öppna `js/hubspot.js` och uppdatera följande variabler:

```javascript
const HUBSPOT_CONFIG = {
    portalId: 'DIN_HUBSPOT_PORTAL_ID',  // Ersätt med riktig Portal ID
    formId: 'DIN_HUBSPOT_FORM_ID',      // Ersätt med riktig Form ID
    region: 'eu1',                      // Ändra om du använder annan region
    // ... resten av konfigurationen
};
```

#### Steg 3: HubSpot Tracking Code
Lägg till HubSpot tracking code i `<head>`-sektionen av `index.html`:

```html
<!-- HubSpot Tracking Code -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/DIN_PORTAL_ID.js"></script>
```

### 3. Formulärkonfiguration

Webbplatsen har både HubSpot-formulär och fallback-formulär:

- **HubSpot-formulär**: Visas när HubSpot laddas korrekt
- **Fallback-formulär**: Visas om HubSpot inte kan laddas

Formuläret innehåller följande fält:
- Förnamn (required)
- Efternamn (required) 
- E-post (required)
- Företag
- Telefon
- Meddelande (required)

## 🎨 Tema och Styling

### CSS Variables
Webbplatsen använder CSS custom properties för enkel temakonfiguration:

```css
:root {
    --primary-purple: #8b5cf6;
    --secondary-green: #10b981;
    --text-dark: #1f2937;
    --background-light: #ffffff;
    /* ... fler variabler */
}
```

### Automatiskt tema
Temat väljs automatiskt baserat på användarens systempreferenser:
- **Ljust tema**: När systemet är satt till ljust läge
- **Mörkt tema**: När systemet är satt till mörkt läge
- **Automatisk växling**: Temat uppdateras automatiskt när användaren ändrar systeminställningar

### Responsiva breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 📱 Responsiv Design

Webbplatsen är byggd mobile-first och anpassar sig automatiskt:

- **Header**: Hamburger-meny på mobil, full navigation på desktop
- **Hero**: Staplad layout på mobil, sida-vid-sida på desktop
- **Sektioner**: Flexibla grid-system som anpassar sig
- **Formulär**: Touch-vänlig design på mobil

## 🔧 NPM Scripts

```bash
# Kompilera SCSS till CSS (development)
npm run build-css

# Kompilera SCSS till CSS (watch mode)
npm run watch-css

# Linta SCSS-filer
npm run lint-scss
```

## 🚀 Deployment

### För One.com eller traditionell hosting:

1. **Kompilera CSS**:
   ```bash
   npm run build-css
   ```

2. **Ladda upp filer**:
   - `index.html`
   - `css/` mapp
   - `js/` mapp
   - Eventuella tillgångsfiler (bilder, fonter)

3. **Konfigurera server**:
   - Sätt `index.html` som default-fil
   - Konfigurera GZIP-komprimering
   - Sätt caching headers för statiska filer

### För moderna hosting-plattformar (Vercel, Netlify):

1. Koppla Git-repository
2. Build command: `npm run build-css`
3. Publish directory: `./`

## 🔍 SEO Optimering

Webbplatsen är optimerad för sökmotorer:

- **Semantisk HTML**: Korrekta HTML5-element
- **Meta tags**: Title, description, keywords
- **Schema markup**: Strukturerad data för företag
- **Open Graph**: Social media-optimering
- **Sitemap**: XML sitemap för indexering
- **Robots.txt**: Crawler-instruktioner

## 📊 Analytics & Tracking

### HubSpot Analytics
- Automatisk sidvisning-tracking
- Formulär-submission tracking
- CTA-klick tracking
- Anpassade events

### Google Analytics (valfritt)
Lägg till GA4-kod för utökad analys:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛡️ Säkerhet

- **HTTPS**: Används överallt i production
- **Content Security Policy**: Skyddar mot XSS
- **Input validation**: Formulärvalidering både frontend och backend
- **No inline scripts**: All JavaScript i externa filer

## 🧪 Testing

### Manuell testning:
- [x] Desktop/mobile responsivitet
- [x] Formulär-funktionalitet  
- [x] Navigation och smooth scroll
- [x] Tema-växling
- [x] Prestanda (PageSpeed Insights)
- [x] Tillgänglighet (axe DevTools)

### Browser-kompatibilitet:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📞 Support

För teknisk support eller frågor om implementeringen, kontakta utvecklingsteamet.

### Viktiga filer att konfigurera:
1. `js/hubspot.js` - HubSpot portal ID och form ID
2. `index.html` - HubSpot tracking script
3. `src/scss/_variables.scss` - Färger och styling

### Utvecklingsworkflow:
1. Gör ändringar i SCSS-filer (`src/scss/`)
2. Kör `npm run build-css` för att kompilera
3. Testa lokalt med en webbserver
4. Deployja uppdaterade filer

---

**Built with ❤️ for Scaleble** - Maximera din försäljning med expertkonsultation och HubSpot-automation. 