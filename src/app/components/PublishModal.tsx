import { useState } from 'react';
import { Camera, MapPin, Euro, Info, X, Sparkles, CheckCircle2, Tag, Phone, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'sell' | 'buy';
}

const FORBIDDEN = ['gratuit', 'gratis', 'free', '0€', 'zéro euro', 'faire offre', 'best offer', 'à discuter', 'te bespreken', 'prix sur demande'];

const CATEGORIES = [
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'jouets', label: 'Jouets & Collectibles', emoji: '🧸' },
  { id: 'sport', label: 'Sport & Outdoor', emoji: '🚴' },
  { id: 'equestre', label: 'Équestre', emoji: '🐎' },
  { id: 'arts', label: 'Arts & Création', emoji: '🎨' },
  { id: 'photo', label: 'Photo & Vidéo', emoji: '📷' },
  { id: 'musique', label: 'Musique', emoji: '🎸' },
  { id: 'jardin', label: 'Jardin & Nature', emoji: '🌱' },
];

export function PublishModal({ isOpen, onClose, type }: PublishModalProps) {
  const { userStatus } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    negotiable: false,
    category: '',
    photo: null as string | null,
    showPhone: true,
    location: 'Bruxelles, Belgique',
  });
  const [iaLoading, setIaLoading] = useState(false);
  const [iaGenerated, setIaGenerated] = useState(false);

  const TOTAL_STEPS = type === 'sell' ? 6 : 5;

  if (!isOpen) return null;

  // Must be registered
  if (userStatus === 'guest') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
        >
          <div className="w-16 h-16 bg-[#FFC107]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-[#a07800]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Inscription requise</h2>
          <p className="text-gray-500 text-sm mb-6">
            Pour publier une {type === 'sell' ? 'annonce' : 'demande'} sur Obicaz, vous devez être membre du club.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => { onClose(); navigate('/auth'); }}
              className="w-full bg-[#FFC107] hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition"
            >
              Rejoindre le club
            </button>
            <button onClick={onClose} className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 text-sm">
              Annuler
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const validateForbidden = (text: string): boolean => {
    const lower = text.toLowerCase();
    const found = FORBIDDEN.find(f => lower.includes(f));
    if (found) {
      toast.error(`Le terme "${found}" est interdit dans les annonces Obicaz`);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && type === 'sell' && !formData.photo) {
      toast.error('Au moins une photo est obligatoire pour vendre');
      return;
    }
    if (step === 3) {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 1) {
        toast.error('Le prix minimum est de 1€ — les objets doivent avoir un prix');
        return;
      }
    }
    if (step === 4) {
      if (!formData.title.trim()) { toast.error('Le titre est obligatoire'); return; }
      if (!validateForbidden(formData.title)) return;
      if (formData.description && !validateForbidden(formData.description)) return;
      if (!formData.category) { toast.error('Choisissez une catégorie'); return; }
    }

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      toast.success(type === 'sell' ? 'Annonce publiée avec succès ! Elle apparaît maintenant sur le Radar.' : 'Demande publiée ! Les vendeurs peuvent vous contacter.');
      onClose();
      setStep(1);
      setFormData({ title: '', description: '', price: '', negotiable: false, category: '', photo: null, showPhone: true, location: 'Bruxelles, Belgique' });
      setIaGenerated(false);
    }
  };

  const handleIaGenerate = () => {
    if (!formData.photo) { toast.error('Ajoutez une photo d\'abord'); return; }
    setIaLoading(true);
    setTimeout(() => {
      setIaLoading(false);
      setIaGenerated(true);
      setFormData(prev => ({
        ...prev,
        title: 'PlayStation 5 avec 2 manettes DualSense',
        description: 'Console PS5 en très bon état. Inclut 2 manettes DualSense et les câbles d\'origine. Vendu suite à un double emploi.',
        category: 'gaming',
      }));
      toast.success('IA : titre, description et catégorie générés. Vérifiez et ajustez si besoin.');
    }, 1800);
  };

  const renderStep = () => {
    switch (step) {
      // ── STEP 1: PHOTO ──
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {type === 'sell' ? '📸 Photos de l\'objet' : '📸 Photo (optionnelle)'}
            </h3>
            <p className="text-sm text-gray-500">{type === 'sell' ? '1 photo minimum requise.' : 'Une photo aide les vendeurs à mieux vous répondre.'}</p>
            <div
              className={`border-2 border-dashed rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer transition-all ${formData.photo ? 'border-[#FFC107] bg-yellow-50' : 'border-gray-200 hover:border-[#FFC107] bg-gray-50'}`}
              onClick={() => setFormData({ ...formData, photo: 'uploaded' })}
            >
              {formData.photo ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="w-10 h-10 text-[#a07800] mb-2" />
                  <span className="font-semibold text-[#a07800]">Photo ajoutée ✓</span>
                  <span className="text-xs text-gray-400 mt-1">Cliquez pour changer</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Camera className="w-10 h-10 mb-2" />
                  <span className="font-medium">Prendre ou importer une photo</span>
                  <span className="text-xs mt-1">JPG, PNG — max 10 Mo</span>
                </div>
              )}
            </div>
          </div>
        );

      // ── STEP 2: IA (sell only) or PRICE (buy) ──
      case 2:
        if (type === 'sell') {
          return (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#a07800]" /> Génération par IA
              </h3>
              <p className="text-sm text-gray-500">L'IA analyse votre photo et propose un titre, une description et une catégorie. Vous validez et ajustez.</p>
              <div className={`rounded-2xl border p-5 ${iaGenerated ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                {iaGenerated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                      <CheckCircle2 className="w-4 h-4" /> Contenu généré — vérifiez à l'étape suivante
                    </div>
                    <p className="text-xs text-gray-500 bg-amber-50 border border-amber-200 rounded-lg p-2">
                      ⚠️ L'estimation de prix est indicative. Vous définissez votre prix librement (min. 1€).
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <Sparkles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Cliquez pour lancer l'analyse IA de votre photo</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleIaGenerate}
                disabled={iaLoading || iaGenerated}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                {iaLoading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyse en cours…</>
                ) : iaGenerated ? (
                  <><CheckCircle2 className="w-4 h-4" /> Généré avec succès</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Analyser avec l'IA</>
                )}
              </button>
              <p className="text-xs text-gray-400 text-center">Vous pouvez sauter cette étape et remplir manuellement.</p>
            </div>
          );
        }
        // buy → price
        return renderPriceStep();

      // ── STEP 3: PRICE (sell) ──
      case 3:
        if (type === 'sell') return renderPriceStep();
        return renderDetailsStep();

      // ── STEP 4: DETAILS (sell) / PHONE (buy) ──
      case 4:
        if (type === 'sell') return renderDetailsStep();
        return renderPhoneStep();

      // ── STEP 5: PHONE (sell) / LOCATION (buy) ──
      case 5:
        if (type === 'sell') return renderPhoneStep();
        return renderLocationStep();

      // ── STEP 6: LOCATION (sell only) ──
      case 6:
        return renderLocationStep();

      default:
        return null;
    }
  };

  const renderPriceStep = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">
        {type === 'sell' ? '💶 Votre prix de vente' : '💶 Votre budget'}
      </h3>
      <div className="relative flex items-center">
        <input
          type="number"
          min="1"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="0"
          className="w-full text-5xl font-black text-center border-b-2 border-gray-200 focus:border-[#FFC107] py-4 outline-none transition-colors bg-transparent pr-12"
          autoFocus
        />
        <Euro className="absolute right-0 w-8 h-8 text-gray-400" />
      </div>
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800">Prix minimum : <strong>1€</strong>. Les offres "à discuter" sont interdites sur Obicaz.</p>
      </div>
      {type === 'sell' && (
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            onClick={() => setFormData({ ...formData, negotiable: !formData.negotiable })}
            className={`w-10 h-6 rounded-full transition-colors flex items-center ${formData.negotiable ? 'bg-[#FFC107]' : 'bg-gray-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${formData.negotiable ? 'translate-x-4' : ''}`} />
          </div>
          <span className="text-sm font-medium text-gray-700">Prix négociable</span>
        </label>
      )}
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">📝 Titre & description</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre de l'annonce <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder={type === 'sell' ? 'Ex : Vélo Specialized Allez 54cm...' : 'Ex : Cherche machine à coudre Singer...'}
          className="w-full border-2 border-gray-200 focus:border-[#FFC107] rounded-xl px-4 py-3 outline-none transition"
          autoFocus
        />
        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
          <Info className="w-3 h-3" /> Mots interdits : "gratuit", "faire offre", "à discuter", "prix sur demande"
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Décrivez l'objet : état, caractéristiques, inclus..."
          rows={3}
          className="w-full border-2 border-gray-200 focus:border-[#FFC107] rounded-xl px-4 py-3 outline-none transition resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFormData({ ...formData, category: cat.id })}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition ${formData.category === cat.id ? 'bg-[#FFC107] border-yellow-400 text-gray-900' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPhoneStep = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <Phone className="w-5 h-5" /> Affichage du téléphone
      </h3>
      <p className="text-sm text-gray-500">
        Votre numéro belge vérifié peut être affiché aux membres vérifiés. Sinon, les contacts se font uniquement via la messagerie interne.
      </p>
      <div
        onClick={() => setFormData({ ...formData, showPhone: !formData.showPhone })}
        className={`cursor-pointer rounded-2xl border-2 p-5 transition ${formData.showPhone ? 'border-[#FFC107] bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-900 mb-0.5">
              {formData.showPhone ? 'Numéro visible aux membres vérifiés' : 'Contact par messagerie uniquement'}
            </div>
            <div className="text-sm text-gray-500">
              {formData.showPhone
                ? 'Votre numéro +32... sera visible uniquement pour les membres avec téléphone vérifié.'
                : 'Les acheteurs vous contacteront via l\'inbox Obicaz. Vous gardez l\'anonymat.'}
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${formData.showPhone ? 'bg-[#FFC107]' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.showPhone ? 'translate-x-5' : ''}`} />
          </div>
        </div>
      </div>
      {formData.showPhone && userStatus !== 'verified' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          Vérifiez votre compte pour que votre numéro soit affiché.
        </div>
      )}
    </div>
  );

  const renderLocationStep = () => (
    <div className="space-y-4 text-center">
      <h3 className="text-xl font-bold text-gray-900">📍 Localisation</h3>
      <div className="w-20 h-20 bg-[#FFC107]/15 rounded-full flex items-center justify-center mx-auto animate-pulse">
        <MapPin className="w-10 h-10 text-[#a07800]" />
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
        <div className="font-semibold text-gray-900 mb-1">{formData.location}</div>
        <div className="text-sm text-gray-400">Localisation approximative détectée</div>
      </div>
      <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
        <Info className="w-3 h-3" /> Seul le quartier est visible. Votre adresse exacte reste privée.
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4 backdrop-blur-sm">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
          <div className="flex gap-1 flex-1">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i + 1 <= step ? 'bg-[#FFC107]' : 'bg-gray-200'}`} />
            ))}
          </div>
          <div className="ml-4 flex items-center gap-2">
            <span className="text-xs text-gray-400">{step}/{TOTAL_STEPS}</span>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 shrink-0 flex gap-3">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition">
              Retour
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-[#FFC107] hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition active:scale-95"
          >
            {step === TOTAL_STEPS ? (type === 'sell' ? 'Publier l\'annonce' : 'Publier la demande') : 'Continuer'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}