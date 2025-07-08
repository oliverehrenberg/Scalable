// Team Data
const teamData = [
  {
    id: 1,
    name: "Erik Johansson",
    title: "VD & Grundare",
    company: "Scaleble",
    avatar: "src/images/team/erik-johansson.jpg",
    bio: "Erik har över 15 års erfarenhet inom B2B-försäljning och har hjälpt över 100 företag att skapa skalbara försäljningsprocesser. Han är expert på HubSpot och har certifieringar inom sales enablement och revenue operations.",
    expertise: [
      "HubSpot Implementation",
      "Sales Strategy",
      "Revenue Operations",
      "B2B Sales",
      "Team Building"
    ],
    certifications: [
      { name: "HubSpot Sales Software", icon: "🏆" },
      { name: "HubSpot Marketing Software", icon: "📈" },
      { name: "Sales Enablement Pro", icon: "🎯" },
      { name: "Revenue Operations", icon: "💰" }
    ],
    social: {
      linkedin: "https://linkedin.com/in/erik-johansson-scaleble",
      twitter: "https://twitter.com/erikjohansson",
      email: "erik@scaleble.io"
    },
    featured: true
  },
  {
    id: 2,
    name: "Anna Lindström",
    title: "Head of Sales Operations",
    company: "Scaleble",
    avatar: "src/images/team/anna-lindstrom.jpg",
    bio: "Anna specialiserar sig på att bygga och optimera försäljningsprocesser för scale-up företag. Hon har en bakgrund inom både tech och traditionell B2B-försäljning och förstår utmaningarna som växande företag möter.",
    expertise: [
      "Sales Operations",
      "Process Optimization",
      "CRM Implementation",
      "Sales Training",
      "Performance Analytics"
    ],
    certifications: [
      { name: "HubSpot CRM", icon: "📊" },
      { name: "Sales Operations", icon: "⚙️" },
      { name: "Data Analytics", icon: "📈" },
      { name: "Process Management", icon: "🔄" }
    ],
    social: {
      linkedin: "https://linkedin.com/in/anna-lindstrom-scaleble",
      twitter: "https://twitter.com/annalindstrom",
      email: "anna@scaleble.io"
    },
    featured: true
  },
  {
    id: 3,
    name: "Marcus Bergman",
    title: "Senior Sales Consultant",
    company: "Scaleble",
    avatar: "src/images/team/marcus-bergman.jpg",
    bio: "Marcus har hjälpt över 50 företag att implementera HubSpot och skapa datadrivna försäljningsprocesser. Han är expert på automation och har specialiserat sig på SaaS och tech-företag.",
    expertise: [
      "HubSpot Automation",
      "SaaS Sales",
      "Lead Generation",
      "Account-Based Marketing",
      "Sales Automation"
    ],
    certifications: [
      { name: "HubSpot Automation", icon: "🤖" },
      { name: "SaaS Sales", icon: "☁️" },
      { name: "ABM Strategy", icon: "🎯" },
      { name: "Marketing Automation", icon: "📧" }
    ],
    social: {
      linkedin: "https://linkedin.com/in/marcus-bergman-scaleble",
      twitter: "https://twitter.com/marcusbergman",
      email: "marcus@scaleble.io"
    },
    featured: true
  },
  {
    id: 4,
    name: "Sofia Andersson",
    title: "Marketing & Growth Specialist",
    company: "Scaleble",
    avatar: "src/images/team/sofia-andersson.jpg",
    bio: "Sofia fokuserar på att skapa integrerade marknadsförings- och försäljningsstrategier. Hon har erfarenhet från både startup och enterprise-miljöer och förstår hur man bygger skalbara growth-processer.",
    expertise: [
      "Growth Marketing",
      "Content Strategy",
      "Inbound Marketing",
      "Customer Journey",
      "Conversion Optimization"
    ],
    certifications: [
      { name: "HubSpot Marketing", icon: "📢" },
      { name: "Growth Marketing", icon: "🚀" },
      { name: "Content Marketing", icon: "✍️" },
      { name: "Conversion Optimization", icon: "📊" }
    ],
    social: {
      linkedin: "https://linkedin.com/in/sofia-andersson-scaleble",
      twitter: "https://twitter.com/sofiaandersson",
      email: "sofia@scaleble.io"
    },
    featured: false
  },
  {
    id: 5,
    name: "Johan Nilsson",
    title: "Technical Implementation Lead",
    company: "Scaleble",
    avatar: "src/images/team/johan-nilsson.jpg",
    bio: "Johan är expert på teknisk implementation av HubSpot och integration med andra system. Han har hjälpt företag att bygga kompletta tech-stacks som stödjer deras försäljningsprocesser.",
    expertise: [
      "Technical Implementation",
      "System Integration",
      "API Development",
      "Data Migration",
      "Technical Consulting"
    ],
    certifications: [
      { name: "HubSpot Developer", icon: "💻" },
      { name: "System Integration", icon: "🔗" },
      { name: "API Development", icon: "⚡" },
      { name: "Data Architecture", icon: "🏗️" }
    ],
    social: {
      linkedin: "https://linkedin.com/in/johan-nilsson-scaleble",
      twitter: "https://twitter.com/johannilsson",
      email: "johan@scaleble.io"
    },
    featured: false
  },
  {
    id: 6,
    name: "Maria Karlsson",
    title: "Customer Success Manager",
    company: "Scaleble",
    avatar: "src/images/team/maria-karlsson.jpg",
    bio: "Maria säkerställer att våra kunder får maximalt värde av sina investeringar. Hon arbetar nära kunderna för att optimera deras processer och säkerställa långsiktig framgång.",
    expertise: [
      "Customer Success",
      "Account Management",
      "Process Optimization",
      "Training & Enablement",
      "Success Metrics"
    ],
    certifications: [
      { name: "Customer Success", icon: "🤝" },
      { name: "Account Management", icon: "👥" },
      { name: "Training & Enablement", icon: "🎓" },
      { name: "Success Metrics", icon: "📊" }
    ],
    social: {
      linkedin: "https://linkedin.com/in/maria-karlsson-scaleble",
      twitter: "https://twitter.com/mariakarlsson",
      email: "maria@scaleble.io"
    },
    featured: false
  }
];

// Team Stats
const teamStatsData = [
  {
    id: 1,
    value: "100+",
    label: "Företag hjälpta",
    description: "Sedan starten 2020"
  },
  {
    id: 2,
    value: "15+",
    label: "Års erfarenhet",
    description: "Genomsnitt i teamet"
  },
  {
    id: 3,
    value: "25+",
    label: "Certifieringar",
    description: "HubSpot och andra"
  },
  {
    id: 4,
    value: "300%",
    label: "Genomsnittlig ökning",
    description: "I kundernas försäljning"
  }
];

// Team Values
const teamValuesData = [
  {
    id: 1,
    icon: "🎯",
    title: "Resultatfokus",
    description: "Vi levererar mätbara affärseffekter, inte bara rekommendationer. Varje projekt har tydliga KPI:er och vi följer upp resultaten kontinuerligt."
  },
  {
    id: 2,
    icon: "🤝",
    title: "Partnerskap",
    description: "Vi arbetar som en förlängning av ditt team. Vi delar både ansvar och uppsida - din framgång är vår framgång."
  },
  {
    id: 3,
    icon: "📊",
    title: "Datadriven",
    description: "Alla beslut baseras på data och insikter. Vi använder analytics för att optimera processer och maximera ROI."
  },
  {
    id: 4,
    icon: "🚀",
    title: "Skalbarhet",
    description: "Vi bygger processer som växer med ditt företag. Våra lösningar är designade för långsiktig tillväxt och framgång."
  }
];

// Team Culture
const teamCultureData = {
  title: "Vår kultur",
  description: "Vi tror på att bygga långsiktiga partnerskap baserade på förtroende, transparens och gemensamma framgångar.",
  pillars: [
    {
      title: "Transparens",
      description: "Vi delar alltid data, insikter och processer öppet med våra kunder."
    },
    {
      title: "Innovation",
      description: "Vi ständigt utvecklar våra metoder och verktyg för att leverera bästa möjliga resultat."
    },
    {
      title: "Kvalitet",
      description: "Vi levererar alltid högsta kvalitet och går aldrig på kompromiss med våra standarder."
    }
  ]
};

// Export data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    teamData,
    teamStatsData,
    teamValuesData,
    teamCultureData
  };
} else {
  window.teamData = teamData;
  window.teamStatsData = teamStatsData;
  window.teamValuesData = teamValuesData;
  window.teamCultureData = teamCultureData;
} 