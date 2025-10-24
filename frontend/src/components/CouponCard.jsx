import React, { useState } from 'react';
import { Copy, Check, Clock, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const CouponCard = ({ coupon, onViewDetails }) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    toast.success('Coupon code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpiringSoon = () => {
    const expiryDate = new Date(coupon.expiry_date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  return (
    <div 
      className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all group"
      data-testid={`coupon-card-${coupon.id}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {coupon.logo_url && (
            <img 
              src={coupon.logo_url} 
              alt={coupon.store_name}
              className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-2"
            />
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{coupon.store_name}</h3>
            <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Tag size={12} />
              {coupon.category}
            </span>
          </div>
        </div>
        {coupon.featured && (
          <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-semibold">
            🔥 Featured
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-gray-700 font-medium mb-4 line-clamp-2">{coupon.title}</p>

      {/* Code Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4">
        {!showCode ? (
          <Button
            onClick={() => setShowCode(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            data-testid={`reveal-code-${coupon.id}`}
          >
            Reveal Code
          </Button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <code className="flex-1 text-center font-mono font-bold text-blue-800 text-lg">
              {coupon.code}
            </code>
            <Button
              onClick={handleCopyCode}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid={`copy-code-${coupon.id}`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        )}
      </div>

      {/* Expiry */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 flex items-center gap-1">
          <Clock size={14} />
          Expires: {coupon.expiry_date}
        </span>
        {isExpiringSoon() && (
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
            ⏰ Expiring Soon
          </span>
        )}
      </div>

      {/* View Details */}
      <button
        onClick={onViewDetails}
        className="mt-4 w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
        data-testid={`view-details-${coupon.id}`}
      >
        View Details →
      </button>
    </div>
  );
};

export default CouponCard;