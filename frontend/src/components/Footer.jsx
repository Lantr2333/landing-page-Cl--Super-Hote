import React from "react";
import { Star, Mail, MessageCircle, Shield } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-2 rounded-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Super-hôte Méthode
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              La méthode éprouvée d'Anthony pour transformer votre Airbnb 
              en machine à réservations et devenir Super-hôte.
            </p>
            <div className="flex space-x-4">
              <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Super-hôte Certifié
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">
                  À propos d'Anthony
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-orange-400 transition-colors">
                  La Méthode
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-orange-400 transition-colors">
                  Témoignages
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-orange-400 transition-colors">
                  Templates & Prix
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition-colors">
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Templates</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Template Studio (19€)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Template Appartement (29€)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Template Maison (39€)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Kit Complet (67€)
                </a>
              </li>
              <li>
                <span className="text-emerald-400 font-semibold">
                  🎁 Guide Gratuit Disponible
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact & Support</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <a 
                  href="mailto:anthony@superhote-methode.fr"
                  className="hover:text-emerald-400 transition-colors"
                >
                  anthony@superhote-methode.fr
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Support 9h-18h (Lun-Ven)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Paiement 100% sécurisé</span>
              </li>
            </ul>
            
            <div className="mt-4 p-3 bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-300 mb-2">
                <strong>Réponse garantie sous 24h</strong>
              </p>
              <p className="text-xs text-slate-400">
                Support premium inclus avec le Kit Complet (30 jours)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} Super-hôte Méthode - Anthony. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Mentions légales
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm mb-2">
              « Excellence et Méthode Font la Différence » - Anthony, Super-hôte depuis 2 ans
            </p>
            <div className="flex justify-center space-x-6 text-xs text-slate-500">
              <span>✅ +500 hôtes accompagnés</span>
              <span>⭐ 98% de satisfaction client</span>
              <span>🏆 Badge Super-hôte depuis 2 ans</span>
              <span>💰 +40% de revenus en moyenne</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;