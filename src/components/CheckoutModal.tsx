import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import { 
  X, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Building2, 
  Phone, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    createOrder, 
    clearCart,
    generateOrderWhatsAppUrl,
    storeInfo
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [notes, setNotes] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isCheckoutOpen) return null;

  const validate = () => {
    if (!fullName.trim()) return 'Veuillez saisir votre nom complet.';
    if (!phone.trim()) return 'Veuillez renseigner votre numéro de téléphone marocain.';
    if (deliveryMethod === 'delivery' && !address.trim()) return 'Veuillez renseigner votre adresse de livraison.';
    return null;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    const order = createOrder(
      {
        customerName: fullName,
        phone,
        whatsapp: whatsapp || phone,
        city,
        address: deliveryMethod === 'pickup' ? 'Retrait en magasin : 67 Rue Aziz BELLAL, Casablanca' : address,
        district: district || (deliveryMethod === 'pickup' ? 'Magasin Casablanca Shopping' : 'Centre'),
        notes: `${deliveryMethod === 'pickup' ? '[Retrait en magasin Casablanca]' : '[Livraison à domicile]'} ${notes}`,
      },
      'form'
    );

    setSubmittedOrder(order);
    clearCart();
    setIsSubmitting(false);
  };

  const handleWhatsAppCheckoutDirect = () => {
    const error = validate();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError('');

    const order = createOrder(
      {
        customerName: fullName,
        phone,
        whatsapp: whatsapp || phone,
        city,
        address: deliveryMethod === 'pickup' ? 'Retrait en magasin : 67 Rue Aziz BELLAL, Casablanca' : address,
        district: district || 'Casablanca',
        notes: `${deliveryMethod === 'pickup' ? '[Retrait en magasin]' : '[Livraison]'} ${notes}`,
      },
      'whatsapp'
    );

    setSubmittedOrder(order);
    clearCart();

    const whatsappUrl = generateOrderWhatsAppUrl(order);
    window.open(whatsappUrl, '_blank');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setSubmittedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-serif text-2xl font-normal text-neutral-950">
              {submittedOrder ? 'Commande Confirmée' : 'Finaliser votre commande'}
            </h2>
            <p className="text-xs text-neutral-500 font-sans mt-0.5">
              Casablanca Shopping · Magasin de vêtements au 67 Rue Aziz BELLAL
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-neutral-400 hover:text-neutral-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submittedOrder ? (
            /* Order Success State */
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-neutral-950 font-normal">
                  Merci {submittedOrder.customerName} !
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Votre commande <strong className="text-neutral-900">#{submittedOrder.orderNumber}</strong> a bien été enregistrée par notre équipe.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="bg-neutral-50 border border-neutral-200 p-5 text-left text-xs text-neutral-700 space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Numéro de commande :</span>
                  <span className="font-mono font-bold text-neutral-900">#{submittedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Téléphone / WhatsApp :</span>
                  <span className="font-semibold text-neutral-900">{submittedOrder.whatsapp}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Mode choisi :</span>
                  <span className="font-medium text-neutral-900">
                    {submittedOrder.address.includes('Retrait') ? 'Retrait au magasin (67 Rue Aziz BELLAL)' : `Livraison : ${submittedOrder.district}, ${submittedOrder.city}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-950 pt-1">
                  <span>Total à régler :</span>
                  <span>{submittedOrder.totalAmount} MAD</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <a
                  href={generateOrderWhatsAppUrl(submittedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer la confirmation sur WhatsApp</span>
                </a>

                <button
                  onClick={handleClose}
                  className="py-3 px-6 border border-neutral-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50 transition-colors"
                >
                  Fermer & Continuer
                </button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handleSubmitForm} className="space-y-6">
              
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Delivery method tabs */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
                  Mode de réception
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 text-left border text-xs transition-all flex items-start gap-2.5 ${
                      deliveryMethod === 'pickup'
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Retrait au magasin</span>
                      <span className="text-[10px] opacity-80 block mt-0.5">
                        67 Rue Aziz BELLAL, Casablanca (Gratuit)
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-3 text-left border text-xs transition-all flex items-start gap-2.5 ${
                      deliveryMethod === 'delivery'
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Livraison à domicile</span>
                      <span className="text-[10px] opacity-80 block mt-0.5">
                        Casablanca & autres villes du Maroc
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Info Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Yasmine El Fassi"
                    className="w-full text-xs p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Numéro de Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 XX XX XX XX / +212 ..."
                    className="w-full text-xs p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Numéro WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Si différent du téléphone"
                    className="w-full text-xs p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950 bg-white"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Mohammédia">Mohammédia</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Fès">Fès</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Autre ville (Maroc)">Autre ville (Maroc)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Quartier (Casablanca ou localité)
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Ex: Maârif, Gauthier, Bourgogne, Racine, Anfa, etc."
                    className="w-full text-xs p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-neutral-700 mb-1 font-medium">
                      Adresse complète de livraison <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rue, Numéro d'immeuble, étage, appartement..."
                      className="w-full text-xs p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950"
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-700 mb-1 font-medium">
                    Instructions / Notes spéciales
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Horaires d'appel préférés, précision de taille..."
                    className="w-full text-xs p-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-950 resize-none"
                  />
                </div>
              </div>

              {/* Order Items Recap */}
              <div className="bg-neutral-50 p-4 border border-neutral-200">
                <span className="block text-xs uppercase tracking-wider font-semibold text-neutral-700 mb-2">
                  Récapitulatif de vos articles ({cart.length})
                </span>
                <div className="max-h-36 overflow-y-auto space-y-2 divide-y divide-neutral-200 text-xs">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex justify-between items-center">
                      <div>
                        <span className="font-medium text-neutral-900">{item.product.name}</span>
                        <div className="text-[11px] text-neutral-500">
                          {item.selectedSize} · {item.selectedColor.name} · Qté: {item.quantity}
                        </div>
                      </div>
                      <span className="font-bold text-neutral-950">
                        {item.product.price * item.quantity} MAD
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-200 flex justify-between items-center text-sm font-bold text-neutral-950">
                  <span>Total à régler</span>
                  <span>{cartSubtotal} MAD</span>
                </div>
              </div>

              {/* Payment Notice according to specs */}
              <div className="text-xs text-neutral-600 bg-neutral-100/70 p-3 border border-neutral-200 space-y-1">
                <div className="flex items-center gap-2 font-medium text-neutral-900">
                  <CreditCard className="w-4 h-4 text-neutral-700" />
                  <span>Modalités de paiement au Maroc</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Paiement à la livraison (Cash on Delivery) ou règlement directement en boutique au 67 Rue Aziz BELLAL. Le paiement en ligne par carte bancaire marocaine/internationale sera activé prochainement.
                </p>
              </div>

              {/* Two Submission Options */}
              <div className="space-y-3 pt-2">
                {/* Option 1: WhatsApp instant order */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckoutDirect}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Option 1 — Commander directement via WhatsApp</span>
                </button>

                {/* Option 2: Form submit stored in backend */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Option 2 — Valider la commande sur le site</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
