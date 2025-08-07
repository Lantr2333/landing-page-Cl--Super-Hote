import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Star, 
  Users, 
  TrendingUp, 
  Calendar,
  Gift,
  Clock
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45 });
  const [freeGuide, setFreeGuide] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    fetchFreeGuide();
    loadGumroadScript();

    return () => clearInterval(timer);
  }, []);

  const fetchFreeGuide = async () => {
    try {
      const response = await axios.get(`${API}/gumroad/products`);
      const guide = response.data.find(product => product.price === 0);
      setFreeGuide(guide);
    } catch (error) {
      console.error('Error fetching free guide:', error);
    }
  };

  const loadGumroadScript = () => {
    if (!window.GumroadOverlay) {
      const script = document.createElement('script');
      script.src = 'https://gumroad.com/js/gumroad.js';
      script.async = true;
      document.head.appendChild(script);
    }
  };

  const handleFreeDownload = () => {
    if (freeGuide) {
      if (window.GumroadOverlay) {
        window.GumroadOverlay.open({
          url: freeGuide.short_url,
          wanted: true
        });
      } else {
        window.open(freeGuide.short_url, '_blank');
      }
    }
  };

  const stats = [
    { icon: TrendingUp, value: "500+", label: "Hôtes accompagnés" },
    { icon: Star, value: "98%", label: "Taux de satisfaction" },
    { icon: Calendar, value: "24/7", label: "Support disponible" },
  ];

  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgency Banner */}
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-sm font-medium inline-flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>
              Offre expire dans {timeLeft.hours}h {timeLeft.minutes}min - Ne laissez pas passer cette opportunité !
            </span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                La Méthode{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Éprouvée
                </span>{" "}
                pour Devenir Super-hôte
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Transformez votre Airbnb en machine à réservations grâce à mes 
                templates optimisés qui ont fait leurs preuves. Plus de 500 hôtes 
                nous font déjà confiance pour maximiser leur taux d'occupation 
                et leurs revenus locatifs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 text-lg px-8 py-4"
              >
                Découvrir la Méthode
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 text-lg px-8 py-4"
              >
                Voir les Témoignages
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Free Guide */}
          <div className="lg:pl-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full">
                  <Gift className="h-5 w-5 text-orange-600" />
                  <span className="text-orange-700 font-semibold">Guide Gratuit</span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900">
                  5 Erreurs Fatales qui Sabotent vos Réservations
                </h3>
                
                <p className="text-slate-600">
                  Téléchargez gratuitement mon guide exclusif et découvrez les 5 erreurs 
                  que 90% des hôtes commettent + Template Studio offert (Valeur 97€)
                </p>

                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <Button 
                    onClick={handleFreeDownload}
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 py-3"
                  >
                    🚀 Télécharger Gratuitement
                  </Button>
                </div>

                <div className="text-xs text-slate-500">
                  🔒 Vos données sont protégées et ne seront jamais partagées
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;