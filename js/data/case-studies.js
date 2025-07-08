// Case Studies Data
const caseStudiesData = [
  {
    id: 1,
    title: "TechFlow AB - 300% försäljningsökning på 6 månader",
    subtitle: "SaaS-företag får skalbara försäljningsprocesser",
    image: "src/images/case-studies/techflow-case.jpg",
    tags: ["SaaS", "HubSpot", "B2B"],
    challenge: {
      title: "Utmaningen",
      description: "TechFlow hade en bra produkt men saknade struktur i sin försäljning. De förlitade sig på manuella processer och hade svårt att skala sin tillväxt. Lead generation var sporadisk och konverteringsgraden låg."
    },
    solution: {
      title: "Vår lösning",
      steps: [
        "Implementerade HubSpot som central plattform",
        "Skapade automatiserade lead nurturing-flöden",
        "Byggde ut outbound-sales processer",
        "Implementerade datadriven lead scoring",
        "Skapade sälj- och marknadsföringsalignment"
      ]
    },
    results: {
      title: "Resultaten",
      metrics: [
        { value: "300%", label: "Försäljningsökning" },
        { value: "450%", label: "Lead generation" },
        { value: "85%", label: "Konverteringsgrad" },
        { value: "6 mån", label: "Implementationstid" }
      ]
    },
    client: {
      name: "TechFlow AB",
      industry: "SaaS",
      size: "50-100 anställda",
      logo: "src/images/clients/techflow-logo.png"
    },
    featured: true,
    industry: "SaaS"
  },
  {
    id: 2,
    title: "Nordic Solutions - Från manuell till automatiserad försäljning",
    subtitle: "Tillverkningsföretag får datadrivna processer",
    image: "src/images/case-studies/nordic-solutions-case.jpg",
    tags: ["Manufacturing", "Automation", "B2B"],
    challenge: {
      title: "Utmaningen",
      description: "Nordic Solutions var beroende av manuella säljprocesser och hade svårt att hålla koll på sin pipeline. De saknade insikter om kundbeteende och hade ingen struktur för lead qualification."
    },
    solution: {
      title: "Vår lösning",
      steps: [
        "Analyserade befintliga säljprocesser",
        "Implementerade HubSpot CRM och automation",
        "Skapade kundresor och touchpoints",
        "Byggde ut content marketing-strategi",
        "Implementerade sales enablement-verktyg"
      ]
    },
    results: {
      title: "Resultaten",
      metrics: [
        { value: "250%", label: "Försäljningsökning" },
        { value: "400%", label: "Lead generation" },
        { value: "78%", label: "Konverteringsgrad" },
        { value: "8 mån", label: "Implementationstid" }
      ]
    },
    client: {
      name: "Nordic Solutions",
      industry: "Manufacturing",
      size: "100-250 anställda",
      logo: "src/images/clients/nordic-solutions-logo.png"
    },
    featured: true,
    industry: "Manufacturing"
  },
  {
    id: 3,
    title: "DataFlow Systems - Skalbar tillväxt för FinTech-startup",
    subtitle: "FinTech-företag bygger förutsägbara intäkter",
    image: "src/images/case-studies/dataflow-case.jpg",
    tags: ["FinTech", "Startup", "Scale-up"],
    challenge: {
      title: "Utmaningen",
      description: "DataFlow Systems hade en innovativ produkt men ingen struktur för att nå rätt kunder. De förlitade sig på personliga nätverk och hade svårt att skala sin försäljning."
    },
    solution: {
      title: "Vår lösning",
      steps: [
        "Definierade ideal customer profile (ICP)",
        "Skapade targeted outbound-strategi",
        "Implementerade account-based marketing",
        "Byggde ut thought leadership-content",
        "Skapade sales development process"
      ]
    },
    results: {
      title: "Resultaten",
      metrics: [
        { value: "400%", label: "Försäljningsökning" },
        { value: "600%", label: "Lead generation" },
        { value: "90%", label: "Konverteringsgrad" },
        { value: "4 mån", label: "Implementationstid" }
      ]
    },
    client: {
      name: "DataFlow Systems",
      industry: "FinTech",
      size: "10-50 anställda",
      logo: "src/images/clients/dataflow-logo.png"
    },
    featured: true,
    industry: "FinTech"
  },
  {
    id: 4,
    title: "GreenTech Innovations - Hållbar tillväxt med CleanTech",
    subtitle: "CleanTech-företag får struktur i försäljning",
    image: "src/images/case-studies/greentech-case.jpg",
    tags: ["CleanTech", "Sustainability", "B2B"],
    challenge: {
      title: "Utmaningen",
      description: "GreenTech Innovations hade en stark miljöprofil men svårt att nå rätt beslutsfattare. Deras försäljning var reaktiv och de saknade en proaktiv approach till lead generation."
    },
    solution: {
      title: "Vår lösning",
      steps: [
        "Skapade thought leadership-strategi",
        "Implementerade inbound marketing",
        "Byggde ut partner-ekosystem",
        "Skapade customer success-processer",
        "Implementerade ROI-kalkylatorer"
      ]
    },
    results: {
      title: "Resultaten",
      metrics: [
        { value: "180%", label: "Försäljningsökning" },
        { value: "320%", label: "Lead generation" },
        { value: "72%", label: "Konverteringsgrad" },
        { value: "7 mån", label: "Implementationstid" }
      ]
    },
    client: {
      name: "GreenTech Innovations",
      industry: "CleanTech",
      size: "50-100 anställda",
      logo: "src/images/clients/greentech-logo.png"
    },
    featured: false,
    industry: "CleanTech"
  },
  {
    id: 5,
    title: "HealthTech Solutions - Digital transformation i vården",
    subtitle: "HealthTech-företag moderniserar försäljning",
    image: "src/images/case-studies/healthtech-case.jpg",
    tags: ["HealthTech", "Digital Transformation", "B2B"],
    challenge: {
      title: "Utmaningen",
      description: "HealthTech Solutions arbetade i en traditionell bransch med långa försäljningscykler. De behövde modernisera sina processer och få bättre insikter om sina prospects."
    },
    solution: {
      title: "Vår lösning",
      steps: [
        "Analyserade försäljningscykler",
        "Implementerade lead nurturing-flöden",
        "Skapade educational content",
        "Byggde ut customer journey mapping",
        "Implementerade sales forecasting"
      ]
    },
    results: {
      title: "Resultaten",
      metrics: [
        { value: "220%", label: "Försäljningsökning" },
        { value: "380%", label: "Lead generation" },
        { value: "80%", label: "Konverteringsgrad" },
        { value: "9 mån", label: "Implementationstid" }
      ]
    },
    client: {
      name: "HealthTech Solutions",
      industry: "HealthTech",
      size: "100-250 anställda",
      logo: "src/images/clients/healthtech-logo.png"
    },
    featured: false,
    industry: "HealthTech"
  },
  {
    id: 6,
    title: "AI Solutions - Framtidssäker försäljning för AI-startup",
    subtitle: "AI-företag bygger skalbara processer",
    image: "src/images/case-studies/ai-solutions-case.jpg",
    tags: ["AI/ML", "Startup", "Innovation"],
    challenge: {
      title: "Utmaningen",
      description: "AI Solutions hade en banbrytande teknologi men ingen struktur för att förklara och sälja den. De behövde bygga förståelse för sin produkt och skapa en skalbara försäljningsprocess."
    },
    solution: {
      title: "Vår lösning",
      steps: [
        "Skapade educational content-strategi",
        "Implementerade demo-automation",
        "Byggde ut use case-bibliotek",
        "Skapade customer success-stories",
        "Implementerade product-led growth"
      ]
    },
    results: {
      title: "Resultaten",
      metrics: [
        { value: "350%", label: "Försäljningsökning" },
        { value: "500%", label: "Lead generation" },
        { value: "88%", label: "Konverteringsgrad" },
        { value: "5 mån", label: "Implementationstid" }
      ]
    },
    client: {
      name: "AI Solutions",
      industry: "AI/ML",
      size: "10-50 anställda",
      logo: "src/images/clients/ai-solutions-logo.png"
    },
    featured: true,
    industry: "AI/ML"
  }
];

// Case Study Categories
const caseStudyCategories = [
  {
    id: "all",
    name: "Alla branscher",
    count: caseStudiesData.length
  },
  {
    id: "saas",
    name: "SaaS",
    count: caseStudiesData.filter(cs => cs.industry === "SaaS").length
  },
  {
    id: "manufacturing",
    name: "Tillverkning",
    count: caseStudiesData.filter(cs => cs.industry === "Manufacturing").length
  },
  {
    id: "fintech",
    name: "FinTech",
    count: caseStudiesData.filter(cs => cs.industry === "FinTech").length
  },
  {
    id: "cleantech",
    name: "CleanTech",
    count: caseStudiesData.filter(cs => cs.industry === "CleanTech").length
  },
  {
    id: "healthtech",
    name: "HealthTech",
    count: caseStudiesData.filter(cs => cs.industry === "HealthTech").length
  },
  {
    id: "ai-ml",
    name: "AI/ML",
    count: caseStudiesData.filter(cs => cs.industry === "AI/ML").length
  }
];

// Export data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    caseStudiesData,
    caseStudyCategories
  };
} else {
  window.caseStudiesData = caseStudiesData;
  window.caseStudyCategories = caseStudyCategories;
} 