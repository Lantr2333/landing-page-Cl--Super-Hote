import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { mockData } from "../mock/mockData";

const TestimonialsSection = () => {
  const { testimonials } = mockData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-2 text-sm font-medium mb-4">
            ILS ONT TESTÉ ET APPROUVÉ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Plus de{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              500 Hôtes
            </span>{" "}
            Nous Font Confiance
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez comment nos templates ont transformé leur activité Airbnb 
            et boosté leurs réservations dès le premier mois.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <Card className="bg-white border-2 border-slate-100 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                {/* Quote Icon */}
                <Quote className="h-12 w-12 text-orange-600 mx-auto" />
                
                {/* Testimonial Text */}
                <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Author */}
                <div className="pt-4">
                  <div className="text-lg font-semibold text-slate-900">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-orange-600">{testimonials[currentIndex].location}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border-2 border-emerald-200 hover:bg-emerald-50"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border-2 border-emerald-200 hover:bg-emerald-50"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-emerald-600"
                  : "bg-slate-300 hover:bg-emerald-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`border-2 transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-slate-100 hover:border-emerald-200 bg-white"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-emerald-600" />
                </div>
                
                <p className="text-slate-700 mb-4 line-clamp-3">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-emerald-600">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Limited Availability Notice */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 rounded-full border-2 border-orange-200">
            <span className="text-orange-700 font-semibold">
              📦 Plus que 47 kits disponibles - Offre limitée dans le temps
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;