import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-6 mb-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              data-testid="footer-instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              data-testid="footer-linkedin"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              data-testid="footer-github"
            >
              <Github size={20} />
            </a>
          </div>

          <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-white" data-testid="footer-privacy">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/" className="hover:text-white" data-testid="footer-terms">
              Terms & Conditions
            </Link>
          </div>

          <p className="text-gray-400 text-center" data-testid="footer-copyright">
            © 2025 CouponDeck | Built by Raj Mahajan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;