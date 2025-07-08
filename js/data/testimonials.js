// Testimonials Data
const testimonialsData = [
  {
    id: 1,
    name: "Anna Lindberg",
    title: "VD & Grundare",
    company: "TechFlow AB",
    avatar: "src/images/testimonials/anna-lindberg.jpg",
    content: "Scaleble hjälpte oss att öka vår försäljning med 300% på bara 6 månader. Deras expertis inom HubSpot och B2B-försäljning är helt enkelt fantastisk. Vi har nu en skalbara processer som växer med vårt företag.",
    rating: 5,
    results: {
      salesIncrease: "300%",
      leadGeneration: "450%",
      conversionRate: "85%"
    },
    industry: "SaaS",
    featured: true
  },
  {
    id: 2,
    name: "Marcus Andersson",
    title: "Sales Director",
    company: "Nordic Solutions",
    avatar: "src/images/testimonials/marcus-andersson.jpg",
    content: "Efter att ha arbetat med Scaleble har vi fått en helt ny förståelse för våra kunder. Deras datadrivna approach har gett oss insikter vi aldrig trodde var möjliga. Vår pipeline är nu 5x större än tidigare.",
    rating: 5,
    results: {
      salesIncrease: "250%",
      leadGeneration: "400%",
      conversionRate: "78%"
    },
    industry: "Manufacturing",
    featured: true
  },
  {
    id: 3,
    name: "Sofia Karlsson",
    title: "CMO",
    company: "GreenTech Innovations",
    avatar: "src/images/testimonials/sofia-karlsson.jpg",
    content: "Scaleble har inte bara implementerat HubSpot för oss - de har skapat en helt ny försäljningskultur. Våra team arbetar nu sömlöst tillsammans och vi ser resultat varje vecka.",
    rating: 5,
    results: {
      salesIncrease: "180%",
      leadGeneration: "320%",
      conversionRate: "72%"
    },
    industry: "CleanTech",
    featured: false
  },
  {
    id: 4,
    name: "Erik Nilsson",
    title: "CEO",
    company: "DataFlow Systems",
    avatar: "src/images/testimonials/erik-nilsson.jpg",
    content: "Som en scale-up var vi desperata efter struktur i vår försäljning. Scaleble kom in och skapade en process som inte bara fungerar nu, utan som kommer att skala med oss i framtiden.",
    rating: 5,
    results: {
      salesIncrease: "400%",
      leadGeneration: "600%",
      conversionRate: "90%"
    },
    industry: "FinTech",
    featured: true
  },
  {
    id: 5,
    name: "Maria Bergström",
    title: "Head of Sales",
    company: "HealthTech Solutions",
    avatar: "src/images/testimonials/maria-bergstrom.jpg",
    content: "Scalebles expertis inom B2B-försäljning är oöverträffad. De förstod våra utmaningar direkt och skapade en lösning som passar perfekt för vår bransch. Resultaten talar för sig själva.",
    rating: 5,
    results: {
      salesIncrease: "220%",
      leadGeneration: "380%",
      conversionRate: "80%"
    },
    industry: "HealthTech",
    featured: false
  },
  {
    id: 6,
    name: "Johan Ekström",
    title: "Founder",
    company: "AI Solutions",
    avatar: "src/images/testimonials/johan-ekstrom.jpg",
    content: "Vi hade en bra produkt men ingen struktur i vår försäljning. Scaleble kom in och byggde hela vårt go-to-market från grunden. Nu har vi förutsägbara intäkter och en process som fungerar.",
    rating: 5,
    results: {
      salesIncrease: "350%",
      leadGeneration: "500%",
      conversionRate: "88%"
    },
    industry: "AI/ML",
    featured: true
  }
];

// Client Logos Data
const clientLogosData = [
  {
    id: 1,
    name: "TechFlow AB",
    logo: "src/images/clients/techflow-logo.png",
    industry: "SaaS"
  },
  {
    id: 2,
    name: "Nordic Solutions",
    logo: "src/images/clients/nordic-solutions-logo.png",
    industry: "Manufacturing"
  },
  {
    id: 3,
    name: "GreenTech Innovations",
    logo: "src/images/clients/greentech-logo.png",
    industry: "CleanTech"
  },
  {
    id: 4,
    name: "DataFlow Systems",
    logo: "src/images/clients/dataflow-logo.png",
    industry: "FinTech"
  },
  {
    id: 5,
    name: "HealthTech Solutions",
    logo: "src/images/clients/healthtech-logo.png",
    industry: "HealthTech"
  },
  {
    id: 6,
    name: "AI Solutions",
    logo: "src/images/clients/ai-solutions-logo.png",
    industry: "AI/ML"
  },
  {
    id: 7,
    name: "Smart Manufacturing",
    logo: "src/images/clients/smart-manufacturing-logo.png",
    industry: "Manufacturing"
  },
  {
    id: 8,
    name: "CloudTech",
    logo: "src/images/clients/cloudtech-logo.png",
    industry: "SaaS"
  }
];

// Success Metrics Data
const successMetricsData = [
  {
    id: 1,
    value: "300%",
    label: "Genomsnittlig försäljningsökning",
    description: "Bland våra kunder"
  },
  {
    id: 2,
    value: "450%",
    label: "Lead generation ökning",
    description: "Genomsnittligt resultat"
  },
  {
    id: 3,
    value: "85%",
    label: "Konverteringsgrad",
    description: "För kvalificerade leads"
  },
  {
    id: 4,
    value: "6 mån",
    label: "Tid till resultat",
    description: "Genomsnittlig implementationstid"
  }
];

// Export data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testimonialsData,
    clientLogosData,
    successMetricsData
  };
} else {
  window.testimonialsData = testimonialsData;
  window.clientLogosData = clientLogosData;
  window.successMetricsData = successMetricsData;
} 