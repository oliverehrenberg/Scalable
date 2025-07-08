# Scaleble - B2B Försäljningskonsult

En komplett, professionell hemsida för Scaleble - en B2B-försäljningskonsult som specialiserar sig på HubSpot-implementation och datadrivna försäljningsprocesser.

## 🚀 Funktioner

### ✅ Implementerade Funktioner

#### **1. Kundförtroende & Social Proof**
- **Testimonials-sektion** med kundutlåtanden och kvantifierade resultat
- **Kundlogotyper** från företag som litar på Scaleble
- **Success metrics** som visar genomsnittliga resultat
- **Case studies** med detaljerade kundfall från olika branscher

#### **2. Team & Expertis**
- **Team-sektion** med detaljerad information om experterna
- **Certifieringar och expertområden** för varje teammedlem
- **Team-statistik** som visar erfarenhet och framgångar
- **Företagskultur och värderingar**

#### **3. Interaktiva Verktyg**
- **ROI-kalkylator** med dragbara sliders för realtidsberäkning
- **Fördefinierade scenarier** (Startup, Scale-up, Enterprise)
- **PDF-export** av kalkylatorresultat
- **Chatbot** med lead qualification och automation

#### **4. Avancerad Navigation**
- **Header som döljs vid scroll nedåt** och visas vid scroll uppåt
- **Smooth scroll** till sektioner
- **Aktiv navigation** som uppdateras baserat på scroll-position
- **Responsiv mobile menu**

#### **5. Dynamiskt Innehåll**
- **JavaScript-moduler** för alla interaktiva komponenter
- **Data-filer** för testimonials, case studies och team
- **Filtrering av case studies** per bransch
- **Automatisk laddning** av innehåll

#### **6. Professionell Design**
- **Modern UI/UX** med smooth animations
- **Responsiv design** för alla enheter
- **Dark/light theme** baserat på systempreferenser
- **Scroll-reveal animations**

### 📁 Projektstruktur

```
Scaleble/
├── index.html                 # Huvudsida
├── css/
│   └── main.css              # Kompilerad CSS
├── src/
│   ├── scss/
│   │   ├── main.scss         # Huvud SCSS-fil
│   │   ├── _variables.scss   # Variabler
│   │   ├── base/             # Grundläggande stilar
│   │   └── components/       # Komponenter
│   │       ├── _testimonials.scss
│   │       ├── _case-studies.scss
│   │       ├── _team.scss
│   │       ├── _calculator.scss
│   │       ├── _chatbot.scss
│   │       └── _footer.scss
│   └── images/
│       ├── testimonials/     # Kundfoton
│       ├── clients/          # Kundlogotyper
│       ├── case-studies/     # Case study bilder
│       └── team/             # Team-foton
└── js/
    ├── main.js               # Huvud JavaScript
    ├── data/                 # Data-filer
    │   ├── testimonials.js
    │   ├── case-studies.js
    │   └── team.js
    └── modules/              # JavaScript-moduler
        ├── calculator.js
        └── chatbot.js
```

## 🛠️ Teknisk Implementation

### **SCSS-struktur**
- **Modulär arkitektur** med separata komponenter
- **Variabler** för konsistent design
- **Responsiv design** med breakpoints
- **Animations och transitions**

### **JavaScript-moduler**
- **ROICalculator** - Interaktiv kalkylator med dragbara sliders
- **ScalebleChatbot** - AI-assistent med lead qualification
- **Dynamisk innehållsladdning** från data-filer
- **Event handling** och DOM-manipulation

### **Data-struktur**
- **Testimonials** med kundutlåtanden och resultat
- **Case studies** med detaljerade processer och utfall
- **Team-data** med expertområden och certifieringar
- **Success metrics** och kundlogotyper

## 🎯 Konverteringsoptimering

### **Förtroendeingivande Element**
1. **Kundtestimonials** med kvantifierade resultat
2. **Case studies** från olika branscher
3. **Team-expertis** och certifieringar
4. **Success metrics** som visar genomsnittliga resultat

### **Lead Generation**
1. **ROI-kalkylator** för att visa värde
2. **Chatbot** för lead qualification
3. **Kontaktformulär** med validering
4. **Call-to-action** knappar strategiskt placerade

### **Användarupplevelse**
1. **Smooth animations** och transitions
2. **Responsiv design** för alla enheter
3. **Intuitiv navigation** med scroll-effekter
4. **Snabb laddningstid** med optimerad CSS

## 📊 Prestanda & SEO

### **Optimerad CSS**
- **Kompilerad SCSS** till minifierad CSS
- **Efficienta selektorer** för snabb rendering
- **CSS Grid och Flexbox** för modern layout

### **JavaScript-optimering**
- **Modulär arkitektur** för bättre underhåll
- **Event delegation** för effektiv event handling
- **Lazy loading** av innehåll

### **SEO-vänlig struktur**
- **Semantisk HTML** med korrekta taggar
- **Alt-text** för alla bilder
- **Strukturerad data** för sökmotorer

## 🚀 Komma igång

### **Förutsättningar**
- Node.js och npm installerat
- Sass compiler

### **Installation**
```bash
# Klona projektet
git clone [repository-url]
cd Scaleble

# Installera dependencies (om några)
npm install

# Kompilera SCSS till CSS
sass src/scss/main.scss:css/main.css --style compressed

# Öppna index.html i webbläsaren
open index.html
```

### **Utveckling**
```bash
# Watch mode för SCSS
sass --watch src/scss/main.scss:css/main.css

# Live server (om installerat)
npx live-server
```

## 📈 Nästa Steg

### **Planerade Förbättringar**
1. **HubSpot-integration** för lead capture
2. **Analytics** och conversion tracking
3. **A/B-testing** för optimering
4. **Blog-sektion** för content marketing
5. **E-bok nedladdning** för lead generation

### **Tekniska Förbättringar**
1. **Webpack** för bundling
2. **TypeScript** för bättre kodkvalitet
3. **Testing** med Jest
4. **CI/CD** pipeline

## 🎨 Design System

### **Färger**
- **Primary Purple**: #8B5CF6
- **Secondary Green**: #10B981
- **Background**: #FFFFFF / #F9FAFB
- **Text**: #1F2937 / #6B7280

### **Typografi**
- **Primary Font**: Inter, system-ui
- **Headings**: Bold, 24px-48px
- **Body**: Regular, 16px-18px

### **Spacing**
- **Container**: max-width 1200px
- **Section padding**: 80px-120px
- **Grid gap**: 24px-48px

## 📞 Support

För frågor eller support, kontakta:
- **Email**: info@scaleble.io
- **Telefon**: +46 70 XXX XX XX
- **Adress**: Linnégatan 17, Stockholm

---

**Scaleble** - Vi skapar framtidens försäljningsplattform 