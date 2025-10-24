import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { X, Upload } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CouponForm = ({ coupon, onClose }) => {
  const [formData, setFormData] = useState({
    store_name: coupon?.store_name || '',
    logo_url: coupon?.logo_url || '',
    title: coupon?.title || '',
    code: coupon?.code || '',
    description: coupon?.description || '',
    category: coupon?.category || 'Fashion',
    expiry_date: coupon?.expiry_date || '',
    featured: coupon?.featured || false
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = ['Fashion', 'Food', 'Electronics', 'Travel', 'Beauty', 'Health', 'Home', 'Education'];

  const getAuthHeader = () => {
    const token = localStorage.getItem('admin_token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(
        `${API}/admin/upload-logo`,
        formData,
        {
          ...getAuthHeader(),
          headers: {
            ...getAuthHeader().headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setFormData(prev => ({ ...prev, logo_url: response.data.url }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.store_name || !formData.title || !formData.code || !formData.description || !formData.expiry_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      if (coupon) {
        await axios.put(
          `${API}/admin/coupons/${coupon.id}`,
          formData,
          getAuthHeader()
        );
        toast.success('Coupon updated successfully');
      } else {
        await axios.post(
          `${API}/admin/coupons`,
          formData,
          getAuthHeader()
        );
        toast.success('Coupon created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save coupon');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="coupon-form-modal"
    >
      <div 
        className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-900 p-6 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white" data-testid="coupon-form-heading">
            {coupon ? 'Edit Coupon' : 'Add New Coupon'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white"
            data-testid="close-form-button"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Store Name *</label>
            <input
              type="text"
              value={formData.store_name}
              onChange={(e) => setFormData({...formData, store_name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border-2 border-gray-600 text-white focus:border-blue-500 focus:outline-none"
              placeholder="e.g., Amazon, Flipkart"
              data-testid="form-store-name"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Store Logo</label>
            <div className="flex items-center gap-4">
              {formData.logo_url && (
                <img 
                  src={formData.logo_url} 
                  alt="Logo preview"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2"
                />
              )}
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="form-logo-upload"
                />
                <div className="cursor-pointer px-4 py-3 rounded-xl bg-gray-700 border-2 border-gray-600 text-gray-300 hover:border-blue-500 flex items-center gap-2">
                  <Upload size={20} />
                  {uploading ? 'Uploading...' : 'Upload Logo'}
                </div>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Offer Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border-2 border-gray-600 text-white focus:border-blue-500 focus:outline-none"
              placeholder="e.g., Flat 30% Off on Electronics"
              data-testid="form-title"
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Coupon Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border-2 border-gray-600 text-white font-mono focus:border-blue-500 focus:outline-none"
              placeholder="e.g., SAVE30"
              data-testid="form-code"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border-2 border-gray-600 text-white focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Describe the offer details..."
              data-testid="form-description"
            />
          </div>

          {/* Category & Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border-2 border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                data-testid="form-category"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date *</label>
              <input
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border-2 border-gray-600 text-white focus:border-blue-500 focus:outline-none"
                data-testid="form-expiry-date"
              />
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
              data-testid="form-featured"
            />
            <label htmlFor="featured" className="text-gray-300">
              Mark as Featured
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-lg font-medium"
            data-testid="form-submit-button"
          >
            {saving ? 'Saving...' : coupon ? 'Update Coupon' : 'Create Coupon'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CouponForm;