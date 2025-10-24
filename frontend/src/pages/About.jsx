import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-gray-900" data-testid="about-heading">
              About CouponDeck
            </h1>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 sm:p-12 shadow-lg border border-blue-100">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      CouponDeck helps you save more by collecting verified and working coupon codes every day. 
                      We believe everyone deserves to get the best deals without the hassle of searching through 
                      dozens of websites.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900">What We Offer</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      100% free and user-friendly platform with daily updated coupons across multiple categories 
                      including Fashion, Food, Electronics, Travel, and more. Every coupon is verified before being 
                      added to ensure you get working deals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900">Our Promise</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      We're committed to keeping CouponDeck completely free, ad-light, and focused on delivering 
                      value to our users. Your savings are our success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;