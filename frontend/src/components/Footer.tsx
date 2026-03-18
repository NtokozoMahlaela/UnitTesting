import React from 'react';
import { Shield, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Mobile Summary - Shows first on mobile, hidden on desktop */}
        <div className="md:hidden space-y-6 pb-8 border-b border-gray-800">
          {/* Brand and Description */}
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <div>
              <h3 className="text-xl font-bold">SA ID Validator</h3>
              <p className="text-sm text-gray-400">Enterprise-grade ID validation service</p>
            </div>
          </div>

          {/* Quick Contact & Links Summary */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="/validate" className="hover:text-white transition-colors">Validate ID</a></li>
                <li><a href="/analytics" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Contact</h4>
              <div className="space-y-1 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span className="text-xs">support@idvalidator.com</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span className="text-xs">+27 12 345 6789</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">Johannesburg, SA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Tech Stack */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@idvalidator.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="text-xs text-gray-400">
              <span>Built with: Spring Boot, React, PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Desktop Full Footer - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SA ID Validator</span>
            </div>
            <p className="text-gray-400">
              Enterprise-grade South African ID validation service with comprehensive analytics and API integration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/validate" className="hover:text-white transition-colors">Validate ID</a></li>
              <li><a href="/analytics" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/api/docs" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@idvalidator.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+27 12 345 6789</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@idvalidator.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p>Built with modern technology:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Spring Boot</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">PostgreSQL</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">Redis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Responsive */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} SA ID Validator. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/security" className="text-gray-400 hover:text-white text-sm transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
