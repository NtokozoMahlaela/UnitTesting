import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useValidateId } from '../hooks/useApi';
import type { IdInformation } from '../types/api';

const ValidationPage: React.FC = () => {
  const [idNumber, setIdNumber] = useState('');
  const [result, setResult] = useState<IdInformation | null>(null);

  const validateMutation = useValidateId({
    onSuccess: (data) => {
      setResult(data);

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

  const formatDate = (date?: string) => {
    if (!date) return 'N/A';

    return new Date(date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6"
          >
            <Shield className="w-4 h-4 mr-2" />
            Secure ID Validation
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Validate South African ID
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter a 13-digit South African ID number for instant validation and detailed information extraction
          </p>
        </motion.div>

        {/* Validation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-800 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                  Enter ID Number
                </label>
                <p className="text-sm text-gray-600">
                  Please enter a valid 13-digit South African ID number
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    value={idNumber}
                    onChange={(e) =>
                      setIdNumber(
                        e.target.value
                          .replace(/\D/g, '')
                          .slice(0, 13)
                      )
                    }
                    placeholder="0000000000000"
                    className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-mono"
                    maxLength={13}
                    disabled={validateMutation.isPending}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {validateMutation.isPending ? (
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    ) : idNumber.length === 13 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 text-gray-400">{idNumber.length}/13</div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleValidate}
                  disabled={validateMutation.isPending || idNumber.length !== 13}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[140px]"
                >
                  {validateMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    'Validate'
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div
              className={`bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden ${
                result.checksumValid
                  ? 'ring-2 ring-green-500/20'
                  : 'ring-2 ring-red-500/20'
              }`}
            >
              {/* Result Header */}
              <div
                className={`p-6 ${
                  result.checksumValid
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {result.checksumValid ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <XCircle className="h-8 w-8 text-white" />
                    )}
                    <h2 className="text-2xl font-bold text-white">
                      {result.checksumValid
                        ? 'Valid South African ID'
                        : 'Invalid ID Number'}
                    </h2>
                  </div>
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white font-medium">
                      {result.checksumValid ? '✓ Verified' : '✗ Failed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Content */}
              <div className="p-8">
                {result.checksumValid ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Date of Birth</h3>
                            <p className="text-gray-600">Birth information</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatDate(result.birthDate)}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Age</h3>
                            <p className="text-gray-600">Current age</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.age} years old
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Gender</h3>
                            <p className="text-gray-600">Biological gender</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.gender}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                            <Flag className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Citizenship</h3>
                            <p className="text-gray-600">Citizenship status</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.citizenship}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                            <Star className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Zodiac Sign</h3>
                            <p className="text-gray-600">Birth zodiac sign</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {result.zodiacSign}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">ID Number</h3>
                            <p className="text-gray-600">Validated ID</p>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-gray-900 font-mono">
                          {result.idNumber}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">Checksum</h3>
                            <p className="text-gray-600">Validation status</p>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          ✓ Valid
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                      <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Invalid ID Number</h3>
                    <p className="text-xl text-red-600 bg-red-50 inline-block px-6 py-3 rounded-xl border border-red-200">
                      {result.status}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ValidationPage;