import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Check, X, Shield, AlertCircle, Download } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LicenseVerification = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [productPermalink, setProductPermalink] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verifyLicense = async () => {
    if (!licenseKey.trim()) {
      setError('Veuillez saisir une clé de licence');
      return;
    }

    if (!productPermalink.trim()) {
      setError('Veuillez saisir le nom du produit');
      return;
    }

    setLoading(true);
    setError(null);
    setVerificationResult(null);
    
    try {
      const response = await axios.post(`${API}/gumroad/verify-license`, {
        license_key: licenseKey,
        permalink: productPermalink
      });
      
      setVerificationResult(response.data);
    } catch (err) {
      setError('Erreur lors de la vérification de la licence');
      console.error('License verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLicenseKey('');
    setProductPermalink('');
    setVerificationResult(null);
    setError(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-2 rounded-full mb-4">
            <Shield className="h-5 w-5 text-orange-600" />
            <span className="text-orange-700 font-semibold">Vérification de Licence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Vérifiez votre{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Licence
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Validez votre achat et accédez à vos templates Airbnb
          </p>
        </div>

        <Card className="border-2 border-slate-200 shadow-xl">
          <CardHeader className="text-center pb-6">
            <h3 className="text-xl font-semibold text-slate-900">
              Validation de votre achat
            </h3>
            <p className="text-slate-600 mt-2">
              Saisissez votre clé de licence reçue après l'achat
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Clé de licence *
                </label>
                <Input
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="font-mono"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Reçue par email après votre achat
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Template acheté *
                </label>
                <select
                  value={productPermalink}
                  onChange={(e) => setProductPermalink(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un template</option>
                  <option value="AirbnbTemplateStudio">Template Studio (19€)</option>
                  <option value="AirbnbTemplateAppartement">Template Appartement (29€)</option>
                  <option value="AirbnbTemplateMaison">Template Maison (39€)</option>
                  <option value="KitTemplateAirbnb">Kit Complet (67€)</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button 
                onClick={verifyLicense}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Vérification...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Vérifier la licence
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="px-6"
              >
                Reset
              </Button>
            </div>

            {verificationResult && (
              <div className="mt-6 p-6 border rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  {verificationResult.success ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        Licence Valide
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                      <Badge className="bg-red-100 text-red-700">
                        Licence Invalide
                      </Badge>
                    </div>
                  )}
                </div>

                {verificationResult.success && verificationResult.purchase && (
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-slate-700">Produit :</span>
                        <p className="text-slate-600">{verificationResult.purchase.product_name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Date d'achat :</span>
                        <p className="text-slate-600">
                          {new Date(verificationResult.purchase.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Email :</span>
                        <p className="text-slate-600">{verificationResult.purchase.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Utilisations :</span>
                        <p className="text-slate-600">{verificationResult.uses || 0} / illimitées</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Download className="h-5 w-5 text-green-600" />
                          <span className="text-green-700 font-medium">
                            Votre template est prêt à télécharger !
                          </span>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => window.open(verificationResult.purchase.download_url, '_blank')}
                        >
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!verificationResult.success && (
                  <div className="text-sm text-slate-600">
                    <p>{verificationResult.message || 'Licence invalide ou expirée'}</p>
                    <p className="mt-2">
                      <strong>Besoin d'aide ?</strong> Contactez-nous à{' '}
                      <a 
                        href="mailto:anthony@superhote-methode.fr" 
                        className="text-emerald-600 hover:underline"
                      >
                        anthony@superhote-methode.fr
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Besoin d'aide ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-slate-900 mb-2">Où trouver ma clé ?</h4>
              <p>Votre clé de licence se trouve dans l'email de confirmation envoyé après votre achat Gumroad.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-slate-900 mb-2">Problème de téléchargement ?</h4>
              <p>Vérifiez vos emails et dossier spam. La clé est valide 30 jours après l'achat.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-slate-900 mb-2">Support technique</h4>
              <p>Contactez Anthony directement pour toute assistance : response garantie sous 24h.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseVerification;