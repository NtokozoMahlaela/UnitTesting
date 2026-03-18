import axios from 'axios';
import { IdInformation, AnalyticsData, ValidateIdRequest, ValidateBatchRequest, HealthResponse } from '../types/api';

// Create axios instance with environment-based configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access - please login');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error - please try again later');
    }
    return Promise.reject(error);
  }
);

// API Service Class
export class ApiService {
  // ID Validation Endpoints
  static async validateId(request: ValidateIdRequest): Promise<IdInformation> {
    const response = await api.post<IdInformation>('/api/id-validation/validate', request);
    return response.data;
  }

  static async validateBatch(request: ValidateBatchRequest): Promise<IdInformation[]> {
    const response = await api.post<IdInformation[]>('/api/id-validation/validate-batch', request);
    return response.data;
  }

  static async quickCheck(idNumber: string): Promise<{ idNumber: string; valid: boolean }> {
    const response = await api.get<{ idNumber: string; valid: boolean }>(`/api/id-validation/check/${idNumber}`);
    return response.data;
  }

  static async getHealth(): Promise<HealthResponse> {
    const response = await api.get<HealthResponse>('/api/health');
    return response.data;
  }

  // Analytics Endpoints
  static async getAnalyticsOverview(): Promise<AnalyticsData['overview']> {
    const response = await api.get<AnalyticsData['overview']>('/api/analytics/overview');
    return response.data;
  }

  static async getGenderDistribution(): Promise<AnalyticsData['genderDistribution']> {
    const response = await api.get<AnalyticsData['genderDistribution']>('/api/analytics/gender-distribution');
    return response.data;
  }

  static async getCitizenshipDistribution(): Promise<AnalyticsData['citizenshipDistribution']> {
    const response = await api.get<AnalyticsData['citizenshipDistribution']>('/api/analytics/citizenship-distribution');
    return response.data;
  }

  static async getBirthYearDistribution(): Promise<AnalyticsData['birthYearDistribution']> {
    const response = await api.get<AnalyticsData['birthYearDistribution']>('/api/analytics/birth-year-distribution');
    return response.data;
  }

  static async getMonthlyTrends(): Promise<AnalyticsData['monthlyTrends']> {
    const response = await api.get<AnalyticsData['monthlyTrends']>('/api/analytics/monthly-trends');
    return response.data;
  }

  static async getRecentActivity(): Promise<AnalyticsData['recentActivity']> {
    const response = await api.get<AnalyticsData['recentActivity']>('/api/analytics/recent-activity');
    return response.data;
  }

  static async getAllAnalytics(): Promise<AnalyticsData> {
    const response = await api.get<AnalyticsData>('/api/analytics/all');
    return response.data;
  }
}

// Export individual methods for convenience
export const {
  validateId,
  validateBatch,
  quickCheck,
  getHealth,
  getAnalyticsOverview,
  getGenderDistribution,
  getCitizenshipDistribution,
  getBirthYearDistribution,
  getMonthlyTrends,
  getRecentActivity,
  getAllAnalytics,
} = ApiService;

// Export default api instance for custom requests
export default api;
