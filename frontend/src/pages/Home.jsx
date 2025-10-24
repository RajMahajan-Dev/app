import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CouponCard from '../components/CouponCard';
import CouponModal from '../components/CouponModal';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read search query from URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(decodeURIComponent(urlSearch));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
    fetchCoupons();
  }, []);

  useEffect(() => {
    filterCoupons();
  }, [coupons, selectedCategory, searchQuery]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(['All', ...response.data.categories]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/coupons`);
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCoupons = () => {
    let filtered = [...coupons];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c => c.store_name.toLowerCase().includes(query) ||
             c.title.toLowerCase().includes(query) ||
             c.category.toLowerCase().includes(query)
      );
    }

    setFilteredCoupons(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Update URL with search query
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Filter featured coupons based on search query
  const getFeaturedCoupons = () => {
    let featured = coupons.filter(c => c.featured);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      featured = featured.filter(
        c => c.store_name.toLowerCase().includes(query) ||
             c.title.toLowerCase().includes(query) ||
             c.category.toLowerCase().includes(query)
      );
    }
    
    return featured;
  };

  const featuredCoupons = getFeaturedCoupons();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
              data-testid="hero-heading"
            >
              Save More Every Day 💸
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10">
              Find the Best Coupons Instantly!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative" data-testid="search-container">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Search by brand, category, or keyword..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
                data-testid="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coupons */}
      {featuredCoupons.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900" data-testid="featured-heading">
              🔥 Featured Deals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCoupons.slice(0, 6).map(coupon => (
                <CouponCard 
                  key={coupon.id} 
                  coupon={coupon} 
                  onViewDetails={() => setSelectedCoupon(coupon)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Tabs & All Coupons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="All" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="flex flex-wrap justify-center gap-2 mb-12 bg-transparent" data-testid="category-tabs">
              {categories.map(cat => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-6 py-3 rounded-full text-sm font-medium border-2 border-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-blue-600 hover:border-blue-400"
                  data-testid={`category-tab-${cat.toLowerCase()}`}
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {loading ? (
              <div className="text-center py-20" data-testid="loading-state">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading coupons...</p>
              </div>
            ) : filteredCoupons.length === 0 ? (
              <div className="text-center py-20" data-testid="no-coupons-state">
                <p className="text-xl text-gray-600">No coupons found</p>
                <p className="text-gray-500 mt-2">Try adjusting your search or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="coupons-grid">
                {filteredCoupons.map(coupon => (
                  <CouponCard 
                    key={coupon.id} 
                    coupon={coupon} 
                    onViewDetails={() => setSelectedCoupon(coupon)}
                  />
                ))}
              </div>
            )}
          </Tabs>
        </div>
      </section>

      <Footer />
      
      {selectedCoupon && (
        <CouponModal 
          coupon={selectedCoupon} 
          onClose={() => setSelectedCoupon(null)} 
        />
      )}
    </div>
  );
};

export default Home;