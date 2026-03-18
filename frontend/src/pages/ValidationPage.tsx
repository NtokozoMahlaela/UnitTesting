import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  User,
  Flag,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Sparkles,
  Loader2,
  Star,
  Users,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useValidateId } from '../hooks/useApi';
import type { IdInformation } from '../types/api';

const ValidationPage: React.FC = () => {
  const [idNumber, setIdNumber] = useState('');
  const [result, setResult] = useState<IdInformation | null>(null);
  const [showResults, setShowResults] = useState(false);

  const validateMutation = useValidateId({
    onSuccess: (data) => {
      setResult(data);
      setShowResults(true);

      if (data?.checksumValid) {
        toast.success('ID number is valid!');
      } else {
        toast.error(`Invalid ID: ${data?.status}`);
      }
    },
    onError: () => {
      toast.error('Validation failed. Please try again.');
    },
  });

  const handleValidate = () => {
    if (!idNumber.trim()) {
      toast.error('Please enter an ID number');
      return;
    }

    if (!/^\d{13}$/.test(idNumber)) {
      toast.error('ID number must be exactly 13 digits');
      return;
    }

    validateMutation.mutate({ idNumber });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            South African ID Validator
          </h1>
          <p className="text-xl text-gray-600">
            Validate South African ID numbers with advanced analytics
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col space-y-6">
              <div>
                <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  South African ID Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="idNumber"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 13-digit ID number (e.g., 8001010000083)"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    maxLength={13}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Sparkles className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleValidate}
                disabled={validateMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {validateMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Validating...</span>
                  </div>
                ) : (
                  <span>Validate ID Number</span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results Popup Modal */}
        <AnimatePresence>
          {showResults && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowResults(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`relative p-6 ${
                    result.checksumValid
                      ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600'
                      : 'bg-gradient-to-r from-red-600 via-pink-600 to-rose-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex items-center space-x-3"
                    >
                      <motion.div
                        animate={{ 
                          rotate: result.checksumValid ? [0, 10, -10, 10, -10, 0] : [0, 10, -10, 10, -10, 0],
                          scale: result.checksumValid ? [1, 1.1, 1] : [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        {result.checksumValid ? (
                          <CheckCircle className="h-8 w-8 text-white drop-shadow-lg" />
                        ) : (
                          <XCircle className="h-8 w-8 text-white drop-shadow-lg" />
                        )}
                      </motion.div>
                      <div>
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="text-2xl font-bold text-white tracking-tight"
                        >
                          {result.checksumValid
                            ? 'Valid South African ID'
                            : 'Invalid ID Number'}
                        </motion.h2>
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="text-green-100 text-sm mt-1"
                        >
                          {result.checksumValid 
                            ? 'All validation checks passed successfully' 
                            : 'ID number validation failed'}
                        </motion.p>
                      </div>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowResults(false)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                    >
                      <X className="h-5 w-5 text-white" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Modal Content */}
                <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                  {result.checksumValid ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {/* Birth Date Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)"
                        }}
                        className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform"
                          >
                            <Calendar className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Birth Date</h3>
                            <p className="text-gray-600">Date of birth</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {formatDate(result.birthDate)}
                        </p>
                      </motion.div>

                      {/* Age Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)"
                        }}
                        className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform"
                          >
                            <Clock className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Age</h3>
                            <p className="text-gray-600">Current age</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {result.age} years old
                        </p>
                      </motion.div>

                      {/* Age Category Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)"
                        }}
                        className="group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform"
                          >
                            <Users className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Age Category</h3>
                            <p className="text-gray-600">Demographic category</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {result.ageCategory}
                        </p>
                      </motion.div>

                      {/* Gender Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.3)"
                        }}
                        className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform"
                          >
                            <User className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Gender</h3>
                            <p className="text-gray-600">Biological gender</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          {result.gender}
                        </p>
                      </motion.div>

                      {/* Citizenship Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.0 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.3)"
                        }}
                        className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform"
                          >
                            <Flag className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Citizenship</h3>
                            <p className="text-gray-600">Citizenship status</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {result.citizenship}
                        </p>
                      </motion.div>

                      {/* Zodiac Sign Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.3)"
                        }}
                        className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform"
                          >
                            <Star className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Zodiac Sign</h3>
                            <p className="text-gray-600">Birth zodiac sign</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {result.zodiacSign}
                        </p>
                      </motion.div>

                      {/* ID Number Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.3)"
                        }}
                        className="group bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform"
                          >
                            <Shield className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">ID Number</h3>
                            <p className="text-gray-600">Validated ID</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-gray-900 font-mono group-hover:text-cyan-600 transition-colors">
                          {result.idNumber}
                        </p>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="inline-flex items-center space-x-3 mb-6"
                      >
                        <XCircle className="h-12 w-12 text-red-500" />
                        <h3 className="text-2xl font-bold text-gray-900">Invalid ID Number</h3>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                        className="text-xl text-red-600 bg-red-50 inline-block px-6 py-3 rounded-xl border border-red-200"
                      >
                        {result.status}
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ValidationPage;
