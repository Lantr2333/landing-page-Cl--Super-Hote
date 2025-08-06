import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, Star } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Super-hôte Méthode
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              À propos
            </a>
            <a
              href="#features"
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Méthode
            </a>
            <a
              href="#testimonials"
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Témoignages
            </a>
            <a
              href="#pricing"
              className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Templates
            </a>
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
              Commencer
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#about"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </a>
              <a
                href="#features"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Méthode
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Témoignages
              </a>
              <a
                href="#pricing"
                className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </a>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
                Commencer
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;