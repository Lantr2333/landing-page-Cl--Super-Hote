import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Search, 
  Edit, 
  Upload, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { mockData } from "../mock/mockData";

const FeaturesSection = () => {
  const { features } = mockData;
  
  const stepIcons = [Search, Edit, Upload, TrendingUp];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 text-sm font-medium mb-4">
            COMMENT ÇA MARCHE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Une Méthode Simple en{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              4 Étapes
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Suivez notre processus éprouvé pour transformer votre annonce Airbnb 
            et booster vos réservations dès aujourd'hui.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < features.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-300 to-amber-300 z-0">
                    <ArrowRight className="h-4 w-4 text-orange-500 absolute -top-2 right-0" />
                  </div>
                )}
                
                <Card className="relative z-10 h-full border-2 border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {feature.step}
                    </div>
                    
                    {/* Icon */}
                    <Icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Benefits */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Pourquoi Choisir Nos Templates ?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Optimisés pour les Conversions</h4>
                    <p className="text-slate-600">Basés sur l'analyse comportementale de plus de 200 annonces performantes</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Search className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">SEO Airbnb Intégré</h4>
                    <p className="text-slate-600">Mots-clés stratégiques pour améliorer votre visibilité dans les recherches</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Edit className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Personnalisation Simple</h4>
                    <p className="text-slate-600">Système de variables [BRACKETS] pour une adaptation rapide à votre logement</p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700"
            >
              Voir les Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-orange-600 to-amber-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold mb-2">80%</div>
                <div className="text-orange-100">Taux d'occupation moyen</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-600 to-orange-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold mb-2">24h</div>
                <div className="text-amber-100">Première réservation</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-700 to-amber-700 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold mb-2">+40%</div>
                <div className="text-orange-100">Revenus en moyenne</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;