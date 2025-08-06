import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Clock, Star, Zap, ExternalLink } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PricingSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGumroadProducts();
    loadGumroadScript();
  }, []);

  const fetchGumroadProducts = async () => {
    try {
      const response = await axios.get(`${API}/gumroad/products`);
      // Filter and map products to match our pricing structure
      const mappedProducts = response.data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.formatted_price,
        originalPrice: null,
        description: extractDescription(product.description),
        features: extractFeatures(product.description),
        short_url: product.short_url,
        preview_url: product.preview_url,
        remaining: Math.floor(Math.random() * 50) + 10, // Mock remaining stock
        popular: product.name.toLowerCase().includes('studio'),
        recommended: product.name.toLowerCase().includes('appartement'),
        premium: product.name.toLowerCase().includes('maison'),
        bestValue: product.name.toLowerCase().includes('kit')
      }));
      
      setProducts(mappedProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching Gumroad products:', err);
      setError('Erreur lors du chargement des produits');
      setLoading(false);
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

  const extractDescription = (htmlDescription) => {
    // Extract clean description from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlDescription;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.split('.')[0] + '.'; // Take first sentence
  };

  const extractFeatures = (htmlDescription) => {
    // Extract features from description
    const features = [];
    if (htmlDescription.includes('Studio')) {
      features.push("Template Studio optimisé", "Guide de personnalisation", "Accès immédiat");
    } else if (htmlDescription.includes('Appartement')) {
      features.push("Template Appartement optimisé", "Guide de personnalisation", "Checklist Super-hôte", "Accès immédiat");
    } else if (htmlDescription.includes('Maison')) {
      features.push("Template Maison optimisé", "Guide de personnalisation", "Checklist Super-hôte", "Support email 15 jours", "Accès immédiat");
    } else if (htmlDescription.includes('Kit')) {
      features.push("3 Templates optimisés", "Guide de personnalisation", "Checklist Super-hôte", "Support email 30 jours", "Accès immédiat");
    } else {
      features.push("Template optimisé", "Guide inclus", "Support disponible");
    }
    return features;
  };

  const handlePurchase = (product) => {
    if (window.GumroadOverlay) {
      window.GumroadOverlay.open({
        url: product.short_url,
        wanted: true
      });
    } else {
      // Fallback to direct link
      window.open(product.short_url, '_blank');
    }
  };

  const getBadgeInfo = (product) => {
    if (product.popular) return { text: "POPULAIRE", className: "bg-blue-500" };
    if (product.recommended) return { text: "RECOMMANDÉ", className: "bg-emerald-500" };
    if (product.premium) return { text: "PREMIUM", className: "bg-purple-500" };
    if (product.bestValue) return { text: "MEILLEURE VALEUR", className: "bg-gradient-to-r from-orange-500 to-red-500" };
    return null;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Chargement des templates...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 text-sm font-medium mb-4">
            CHOISISSEZ VOTRE PACK
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Templates{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Optimisés
            </span>{" "}
            pour Airbnb
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choisissez le template adapté à votre type de logement et commencez 
            à attirer plus de voyageurs dès aujourd'hui.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.filter(product => product.price !== "0€").map((product, index) => {
            const badge = getBadgeInfo(product);
            const isHighlighted = product.bestValue || product.recommended;
            
            return (
              <Card
                key={product.id}
                className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                  isHighlighted
                    ? "border-3 border-emerald-300 shadow-lg scale-105"
                    : "border-2 border-slate-200 hover:border-emerald-200"
                }`}
              >
                {badge && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 ${badge.className} text-white text-xs font-bold rounded-full`}>
                    {badge.text}
                  </div>
                )}
                
                <CardHeader className="text-center p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name.split(' - ')[0]}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-emerald-600">{product.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{product.description}</p>
                </CardHeader>

                <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Remaining Stock */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Disponible:</span>
                      <span className="font-semibold text-orange-600">
                        Plus que {product.remaining} exemplaires
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{ width: `${Math.max(20, (product.remaining / 50) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePurchase(product)}
                    className={`w-full ${
                      isHighlighted
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {product.bestValue ? "Accéder à mes Templates" : "Acheter Maintenant"}
                  </Button>

                  {/* Urgency Indicator */}
                  <div className="flex items-center justify-center mt-3 text-xs text-slate-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Téléchargement immédiat</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Security & Guarantee */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Téléchargement immédiat</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Accès à vie</span>
            </div>
          </div>
          
          {/* Quote */}
          <div className="max-w-2xl mx-auto mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-100">
            <blockquote className="text-lg font-medium text-slate-800 text-center">
              « Excellence et Méthode Font la Différence »
            </blockquote>
            <div className="text-emerald-600 font-semibold mt-2">
              — Anthony, Super-hôte depuis 2 ans
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;