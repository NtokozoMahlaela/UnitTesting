// API Response Types
export interface IdInformation {
  idNumber: string;
  birthDate: string;
  age: number;
  gender: string;
  citizenship: string;
  zodiacSign: string;
  checksumValid: boolean;
  status: string;
  validationDetails?: ValidationDetails;
}

export interface ValidationDetails {
  validLength: boolean;
  validFormat: boolean;
  validDate: boolean;
  validGenderCode: boolean;
  validCitizenship: boolean;
  validChecksum: boolean;
  errorMessage?: string;
}

export interface AnalyticsData {
  overview: {
    totalValidations: number;
    validCount: number;
    invalidCount: number;
    validityRate: number;
    invalidityRate: number;
  };
  genderDistribution: Record<string, number>;
  citizenshipDistribution: Record<string, number>;
  birthYearDistribution: Record<string, number>;
  monthlyTrends: Record<string, number>;
  recentActivity: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// API Request Types
export interface ValidateIdRequest {
  idNumber: string;
}

export interface ValidateBatchRequest {
  idNumbers: string[];
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
}
