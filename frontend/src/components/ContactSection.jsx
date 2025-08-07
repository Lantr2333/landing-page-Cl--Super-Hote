import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, MessageCircle, Clock, Shield } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 text-sm font-medium mb-4">
                BESOIN D'AIDE ?
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Contactez{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Anthony
                </span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Une question sur les templates ? Besoin d'aide pour optimiser votre annonce ? 
                Je suis là pour vous accompagner dans votre réussite Airbnb.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Email Support</h3>
                      <p className="text-slate-600 mb-2">
                        Réponse garantie sous 24h pour toutes vos questions
                      </p>
                      <a 
                        href="mailto:anthony@superhote-methode.fr" 
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        anthony@superhote-methode.fr
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Support Premium</h3>
                      <p className="text-slate-600 mb-2">
                        Accompagnement personnalisé pour les clients Kit Complet
                      </p>
                      <span className="text-orange-600 font-medium">
                        Inclus avec le Kit Complet (30 jours)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Support Hours */}
            <div className="bg-slate-100 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-slate-600" />
                <h3 className="font-semibold text-slate-900">Horaires de Support</h3>
              </div>
              <div className="space-y-2 text-slate-600">
                <p><strong>Lundi - Vendredi:</strong> 9h00 - 18h00 CET</p>
                <p><strong>Weekend:</strong> Support email uniquement</p>
                <p><strong>Réponse moyenne:</strong> 4-6 heures (jours ouvrés)</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <Card className="border-2 border-slate-200 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Envoyez-moi un message
                    </h3>
                    <p className="text-slate-600">
                      Je vous répondrai dans les plus brefs délais
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Prénom *
                        </label>
                        <Input placeholder="Votre prénom" className="border-slate-300" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Nom *
                        </label>
                        <Input placeholder="Votre nom" className="border-slate-300" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email *
                      </label>
                      <Input 
                        type="email" 
                        placeholder="votre@email.com" 
                        className="border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Sujet
                      </label>
                      <Input 
                        placeholder="Question sur les templates, support..." 
                        className="border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Message *
                      </label>
                      <Textarea
                        placeholder="Décrivez votre question ou votre situation..."
                        rows={5}
                        className="border-slate-300"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 py-3"
                    >
                      Envoyer le message
                    </Button>
                  </form>

                  {/* Privacy Notice */}
                  <div className="flex items-start space-x-2 text-xs text-slate-500 pt-4 border-t border-slate-200">
                    <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>
                      Vos données personnelles sont protégées et utilisées uniquement 
                      pour vous répondre. Elles ne seront jamais partagées avec des tiers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Questions Fréquentes
            </h3>
          </div>

          <div className="space-y-4">
            <Card className="border border-slate-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Les templates fonctionnent-ils pour tous les types de logements ?
                </h4>
                <p className="text-slate-600">
                  Oui, j'ai créé des templates spécifiques pour studios, appartements et maisons. 
                  Chaque template est optimisé pour mettre en valeur les spécificités de votre type de logement.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Combien de temps faut-il pour voir des résultats ?
                </h4>
                <p className="text-slate-600">
                  Mes clients voient généralement une amélioration dans les 48-72h après publication. 
                  Ma propre première réservation est arrivée moins de 24h après la mise en ligne !
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Le support est-il vraiment inclus ?
                </h4>
                <p className="text-slate-600">
                  Absolument ! Avec le Kit Complet, vous avez 30 jours de support email. 
                  Pour les autres templates, je reste disponible pour répondre à vos questions essentielles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;