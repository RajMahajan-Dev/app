import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import CouponForm from '../components/CouponForm';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchCoupons();
  }, [navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('admin_token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/coupons`);
      setCoupons(response.data);
    } catch (error) {
      toast.error('Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (couponId) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    
    try {
      await axios.delete(`${API}/admin/coupons/${couponId}`, getAuthHeader());
      toast.success('Coupon deleted successfully');
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to delete coupon');
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCoupon(null);
    fetchCoupons();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white" data-testid="admin-dashboard-heading">CouponDeck Admin</h1>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                data-testid="add-coupon-button"
              >
                <Plus size={20} className="mr-2" />
                Add Coupon
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                data-testid="logout-button"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20" data-testid="loading-state">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-400">Loading coupons...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-20" data-testid="no-coupons-state">
            <p className="text-xl text-gray-400">No coupons yet</p>
            <p className="text-gray-500 mt-2">Click "Add Coupon" to create your first one</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="admin-coupons-grid">
            {coupons.map(coupon => (
              <div 
                key={coupon.id} 
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500"
                data-testid={`admin-coupon-card-${coupon.id}`}
              >
                {coupon.logo_url && (
                  <img 
                    src={coupon.logo_url} 
                    alt={coupon.store_name}
                    className="w-16 h-16 object-contain mb-4 rounded-lg bg-white p-2"
                  />
                )}
                <h3 className="text-lg font-semibold text-white mb-2">{coupon.store_name}</h3>
                <p className="text-gray-300 mb-3">{coupon.title}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-mono">
                    {coupon.code}
                  </span>
                  {coupon.featured && (
                    <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-4">Expires: {coupon.expiry_date}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(coupon)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    data-testid={`edit-coupon-${coupon.id}`}
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(coupon.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20"
                    data-testid={`delete-coupon-${coupon.id}`}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <CouponForm 
          coupon={editingCoupon} 
          onClose={handleFormClose} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;