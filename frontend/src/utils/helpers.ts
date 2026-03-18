import type { IdInformation } from '../types/api';
import { VALIDATION_PATTERNS, CHART_COLORS } from './constants';

// ID Number validation helpers
export const validateIdNumberFormat = (idNumber: string): boolean => {
  return VALIDATION_PATTERNS.ID_NUMBER.test(idNumber);
};

export const formatIdNumber = (idNumber: string): string => {
  if (!idNumber || idNumber.length !== 13) return idNumber;
  
  // Format as YYMMDD SSSS C AZ
  return `${idNumber.slice(0, 2)}${idNumber.slice(2, 4)}${idNumber.slice(4, 6)} ${idNumber.slice(6, 10)} ${idNumber.slice(10, 11)} ${idNumber.slice(11)}`;
};

export const maskIdNumber = (idNumber: string): string => {
  if (!idNumber || idNumber.length < 6) return 'INVALID';
  return idNumber.substring(0, 6) + '******';
};

// Date helpers
export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

export const calculateAge = (dateString?: string): number => {
  if (!dateString) return 0;
  
  try {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    return 0;
  }
};

// Chart data helpers
export const transformGenderData = (genderData: Record<string, number>) => {
  return Object.entries(genderData).map(([name, value], index) => ({
    name,
    value,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));
};

export const transformCitizenshipData = (citizenshipData: Record<string, number>) => {
  return Object.entries(citizenshipData).map(([name, value]) => ({
    name: name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value,
  }));
};

export const transformBirthYearData = (birthYearData: Record<string, number>, limit: number = 10) => {
  return Object.entries(birthYearData)
    .sort(([a], [b]) => Number(a) - Number(b))
    .slice(-limit)
    .map(([year, count]) => ({
      year: parseInt(year),
      count,
    }));
};

export const transformMonthlyData = (monthlyData: Record<string, number>) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return Object.entries(monthlyData)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([month, count]) => ({
      month: monthNames[parseInt(month) - 1] || `Month ${month}`,
      count,
    }));
};

// Validation result helpers
export const getValidationStatusColor = (isValid: boolean): string => {
  return isValid ? 'text-green-600' : 'text-red-600';
};

export const getValidationStatusBgColor = (isValid: boolean): string => {
  return isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
};

export const getValidationStatusIcon = (isValid: boolean) => {
  // This would return an icon component, but for now we'll return a string
  return isValid ? '✓' : '✗';
};

// File processing helpers
export const processTextFile = (content: string): string[] => {
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

export const extractValidIdNumbers = (lines: string[]): string[] => {
  return lines.filter(line => VALIDATION_PATTERNS.ID_NUMBER.test(line));
};

// Error handling helpers
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  
  return 'An unexpected error occurred';
};

// Local storage helpers
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail
    }
  },
  
  getJSON: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  setJSON: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail
    }
  },
};

// Debounce helper
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle helper
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Number formatting helpers
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-ZA').format(num);
};

export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

// URL helpers
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  const url = new URL(endpoint, window.location.origin);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  
  return url.toString();
};

// Class name helper for conditional styling
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
