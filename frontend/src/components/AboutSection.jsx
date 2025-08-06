import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { 
  Star, 
  Award, 
  Calendar, 
  Users,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { mockData } from "../mock/mockData";

const AboutSection = () => {
  const { about, timeline } = mockData;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 text-sm font-medium mb-4">
            À PROPOS DE VOTRE EXPERT
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {about.name}, {about.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {about.bio}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Profile Image and Stats */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                A
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full">
                <Star className="h-6 w-6 text-yellow-900 fill-current" />
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4">
              {about.achievements.map((achievement, index) => {
                const icons = [Calendar, Star, Award, Users];
                const Icon = icons[index % icons.length];
                return (
                  <Card key={index} className="border-2 border-slate-100 hover:border-emerald-200 transition-colors">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-slate-900">{achievement.value}</div>
                      <div className="text-sm text-slate-600">{achievement.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Mon Parcours vers l'Excellence</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              
              <div className="space-y-8">
                {timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="ml-6 flex-1">
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-100">
                        <div className="text-sm font-medium text-emerald-600 mb-1">{event.date}</div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">{event.title}</h4>
                        <p className="text-slate-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Discovery */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
            <CardContent className="p-8">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Le déclic qui a tout changé : l'analyse comportementale des voyageurs
                </h3>
                <p className="text-lg text-slate-700 max-w-3xl mx-auto">
                  <strong>Découverte clé :</strong> Les mots ont plus d'impact que les photos pour déclencher la réservation. 
                  Une annonce psychologiquement optimisée peut transformer un logement ordinaire en destination incontournable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;