export const mockData = {
  hero: {
    title: "La Méthode Éprouvée pour Devenir Super-hôte",
    subtitle: "Transformez votre Airbnb en machine à réservations grâce à mes templates optimisés qui ont fait leurs preuves. Plus de 500 hôtes nous font déjà confiance pour maximiser leur taux d'occupation et leurs revenus locatifs.",
    stats: [
      { value: "500+", label: "Hôtes accompagnés" },
      { value: "98%", label: "Taux de satisfaction" },
      { value: "24/7", label: "Support disponible" }
    ]
  },
  
  about: {
    name: "Anthony",
    title: "Expert en Optimisation Airbnb",
    bio: "Propriétaire Airbnb depuis 2 ans, j'ai développé une méthode systématique pour optimiser les annonces et maintenir un taux d'occupation élevé. Ma stratégie basée sur l'analyse comportementale des voyageurs a permis à des centaines d'hôtes d'augmenter significativement leurs revenus locatifs.",
    achievements: [
      { value: "3 mois", label: "Pour obtenir le badge Super-hôte" },
      { value: "Dès le début", label: "Logement \"Coup de cœur voyageur\"" },
      { value: "2 ans", label: "Badge Super-hôte conservé sans interruption" },
      { value: "+500", label: "Hôtes accompagnés" }
    ]
  },

  timeline: [
    {
      date: "Juin 2023",
      title: "Analyse Stratégique du Marché JO 2024",
      description: "L'opportunité me vient : profiter des JO 2024 pour me lancer dans l'Airbnb avec une approche méthodique et professionnelle."
    },
    {
      date: "Août 2023", 
      title: "Développement d'une Méthode Systématique",
      description: "Acquisition d'un 2 pièces en Île-de-France après négociations expertes dans un marché tendu."
    },
    {
      date: "14 octobre 2023",
      title: "Jour de Vérité",
      description: "16h30 : Publication de l'annonce avec ma formule optimisée. 11h45 le lendemain : PREMIÈRE RÉSERVATION CONFIRMÉE !"
    },
    {
      date: "3 mois plus tard",
      title: "Résultats Mesurables",
      description: "Badge Super-hôte obtenu, taux d'occupation de 80% en moyenne, badge \"Coup de cœur voyageur\" maintenu."
    }
  ],

  features: [
    {
      step: "1",
      title: "Choisissez",
      description: "Sélectionnez le template correspondant à votre type de logement (Studio/Appartement/Maison)"
    },
    {
      step: "2", 
      title: "Personnalisez",
      description: "Remplacez les [VARIABLES] par vos informations personnelles en suivant le guide"
    },
    {
      step: "3",
      title: "Publiez", 
      description: "Copiez-collez votre annonce optimisée directement dans Airbnb"
    },
    {
      step: "4",
      title: "Récoltez",
      description: "Observez l'augmentation de vos réservations et de votre taux d'occupation"
    }
  ],

  testimonials: [
    {
      name: "Paul",
      location: "Paris",
      text: "Grâce aux templates d'Anthony, j'ai eu 9 réservations le premier mois ! La méthode est vraiment efficace et facile à appliquer.",
      rating: 5
    },
    {
      name: "Arnaud", 
      location: "Région parisienne",
      text: "Super-hôte en 2 mois avec ses méthodes. Les templates sont parfaitement adaptés à l'activité de location courte durée. Je recommande !",
      rating: 5
    },
    {
      name: "Marie",
      location: "Lyon", 
      text: "Mes revenus ont augmenté de 40% depuis que j'utilise les templates d'Anthony. Un investissement qui en vaut vraiment la peine !",
      rating: 5
    },
    {
      name: "Pierre",
      location: "Marseille",
      text: "Méthode claire et efficace. J'ai obtenu mon statut de Super-hôte en seulement 2 mois grâce à ses conseils.",
      rating: 5
    }
  ],

  pricing: [
    {
      id: "studio",
      name: "Template Studio",
      price: "19€",
      popular: true,
      description: "Optimisé pour studios",
      features: [
        "Template Studio optimisé",
        "Guide de personnalisation",
        "Accès immédiat"
      ],
      remaining: 23
    },
    {
      id: "appartement",
      name: "Template Appartement", 
      price: "29€",
      recommended: true,
      description: "Solution intermédiaire",
      features: [
        "Template Appartement optimisé",
        "Guide de personnalisation", 
        "Checklist Super-hôte",
        "Accès immédiat"
      ],
      remaining: 31
    },
    {
      id: "maison",
      name: "Template Maison",
      price: "39€", 
      premium: true,
      description: "Pour grandes propriétés",
      features: [
        "Template Maison optimisé",
        "Guide de personnalisation",
        "Checklist Super-hôte", 
        "Support email 15 jours",
        "Accès immédiat"
      ],
      remaining: 18
    },
    {
      id: "complet",
      name: "Kit Complet",
      price: "67€",
      originalPrice: "87€",
      bestValue: true,
      description: "Les 3 templates + Bonus exclusifs",
      features: [
        "3 Templates optimisés",
        "Guide de personnalisation",
        "Checklist Super-hôte",
        "Support email 30 jours", 
        "Accès immédiat"
      ],
      remaining: 12,
      savings: "ÉCONOMISEZ 20€"
    }
  ]
};