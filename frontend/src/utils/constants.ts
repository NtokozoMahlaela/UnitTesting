// Application constants
export const APP_CONFIG = {
  NAME: 'SA ID Validator',
  VERSION: '1.0.0',
  DESCRIPTION: 'Enterprise-grade South African ID validation service',
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: '/api/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Validation patterns
export const VALIDATION_PATTERNS = {
  ID_NUMBER: /^\d{13}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+27|0)[6-8][0-9]{8}$/,
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Chart colors
export const CHART_COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#EF4444', // red-500
  '#8B5CF6', // violet-500
  '#EC4899', // pink-500
  '#14B8A6', // teal-500
  '#F97316', // orange-500
] as const;

// Status codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Gender mapping
export const GENDER_MAPPING = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  UNKNOWN: 'UNKNOWN',
} as const;

// Citizenship mapping
export const CITIZENSHIP_MAPPING = {
  SOUTH_AFRICAN: 'SOUTH_AFRICAN',
  PERMANENT_RESIDENT: 'PERMANENT_RESIDENT',
  UNKNOWN: 'UNKNOWN',
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  INVALID_LENGTH: 'ID number must be exactly 13 digits',
  INVALID_FORMAT: 'ID number must contain only digits',
  INVALID_DATE: 'Invalid date of birth',
  INVALID_GENDER: 'Invalid gender code',
  INVALID_CITIZENSHIP: 'Invalid citizenship status',
  INVALID_CHECKSUM: 'Invalid checksum',
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
} as const;

// Toast notification types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  INITIAL_PAGE: 1,
} as const;

// File upload limits
export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['text/plain', 'text/csv', 'application/vnd.ms-excel'],
  MAX_ID_COUNT: 1000,
} as const;

// Cache settings
export const CACHE_SETTINGS = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  ANALYTICS_TTL: 10 * 60 * 1000, // 10 minutes
  USER_PREFERENCES_TTL: 60 * 60 * 1000, // 1 hour
} as const;
