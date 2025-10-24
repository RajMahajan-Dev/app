import React from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const CouponModal = ({ coupon, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    toast.success('Coupon code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="coupon-modal"
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
            data-testid="close-modal-button"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4">
            {coupon.logo_url && (
              <img 
                src={coupon.logo_url} 
                alt={coupon.store_name}
                className="w-16 h-16 object-contain rounded-xl bg-white p-2"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">{coupon.store_name}</h2>
              <p className="text-blue-100">{coupon.category}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{coupon.title}</h3>
            {coupon.featured && (
              <span className="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">
                🔥 Featured Deal
              </span>
            )}
          </div>

          {/* Coupon Code */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
            <p className="text-sm text-gray-700 mb-2 text-center">Coupon Code</p>
            <div className="flex items-center justify-between gap-4">
              <code className="flex-1 text-center font-mono font-bold text-blue-800 text-2xl">
                {coupon.code}
              </code>
              <Button
                onClick={handleCopyCode}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                data-testid="modal-copy-code-button"
              >
                {copied ? (
                  <><Check size={20} className="mr-2" /> Copied!</>
                ) : (
                  <><Copy size={20} className="mr-2" /> Copy Code</>
                )}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 leading-relaxed">{coupon.description}</p>
          </div>

          {/* Expiry Date */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Expires on:</span> {coupon.expiry_date}
            </p>
          </div>

          {/* Terms */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Valid for one-time use per user</li>
              <li>Cannot be combined with other offers</li>
              <li>Check merchant website for full terms</li>
              <li>CouponDeck is not responsible for merchant policies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;