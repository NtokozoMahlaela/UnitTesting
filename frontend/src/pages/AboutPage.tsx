import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Code, Database, Zap, Users, CheckCircle, Globe, Lock } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Validation',
      description: 'Enterprise-grade security with JWT authentication and encrypted data transmission.',
      details: ['OAuth 2.0 authentication', 'End-to-end encryption', 'GDPR compliant']
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed with sub-second response times and 99.9% uptime.',
      details: ['Redis caching', 'Load balancing', 'CDN integration']
    },
    {
      icon: Database,
      title: 'Scalable Architecture',
      description: 'Built to handle millions of validations with horizontal scaling capabilities.',
      details: ['PostgreSQL database', 'Microservices architecture', 'Auto-scaling']
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Comprehensive API documentation and SDKs for easy integration.',
      details: ['RESTful API', 'OpenAPI documentation', 'Multiple SDKs']
    },
  ];

  const technologies = [
    { name: 'Spring Boot', icon: '🍃', description: 'Enterprise Java framework' },
    { name: 'React', icon: '⚛️', description: 'Modern frontend library' },
    { name: 'PostgreSQL', icon: '🐘', description: 'Relational database' },
    { name: 'Redis', icon: '🔴', description: 'In-memory caching' },
    { name: 'Docker', icon: '🐳', description: 'Containerization' },
    { name: 'GitHub Actions', icon: '🤖', description: 'CI/CD pipeline' },
  ];

  const validationRules = [
    '13-digit format validation',
    'Date of birth verification (including leap years)',
    'Gender code extraction and validation',
    'Citizenship status verification',
    'Luhn checksum validation',
    'Real-time validation with caching',
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About SA ID Validator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive, enterprise-grade solution for validating South African ID numbers 
          with detailed information extraction and advanced analytics.
        </p>
      </motion.section>

      {/* Features Grid */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="text-gray-600 mt-2">Built with modern technology and best practices</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Validation Rules */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Validation Rules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Validate</h3>
            <ul className="space-y-3">
              {validationRules.map((rule, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Extracted Information</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Date of birth and age calculation</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <span>Gender determination</span>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-blue-600" />
                <span>Citizenship status</span>
              </div>
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-blue-600" />
                <span>Zodiac sign and generation</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technology Stack */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Technology Stack</h2>
          <p className="text-gray-600 mt-2">Powered by modern, reliable technologies</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl mb-3">{tech.icon}</div>
              <h3 className="font-semibold text-gray-900">{tech.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Try our validator now or explore our API documentation for integration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/validate"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Try Validator
          </Link>
          <Link
            to="/api/docs"
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-200"
          >
            View API Docs
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
