import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ApiService } from '../services/api';
import type { IdInformation, AnalyticsData, ValidateIdRequest, ValidateBatchRequest } from '../types/api';

// Custom hooks for API calls with proper TypeScript typing

// ID Validation Hooks
export const useValidateId = (options?: UseMutationOptions<IdInformation, Error, ValidateIdRequest>) => {
  return useMutation<IdInformation, Error, ValidateIdRequest>({
    mutationFn: (request) => ApiService.validateId(request),
    ...options,
  });
};

export const useValidateBatch = (options?: UseMutationOptions<IdInformation[], Error, ValidateBatchRequest>) => {
  return useMutation<IdInformation[], Error, ValidateBatchRequest>({
    mutationFn: (request) => ApiService.validateBatch(request),
    ...options,
  });
};

export const useQuickCheck = (idNumber: string, options?: UseQueryOptions<{ idNumber: string; valid: boolean }, Error>) => {
  return useQuery<{ idNumber: string; valid: boolean }, Error>({
    queryKey: ['quickCheck', idNumber],
    queryFn: () => ApiService.quickCheck(idNumber),
    enabled: !!idNumber,
    ...options,
  });
};

export const useHealthCheck = (options?: UseQueryOptions<{ status: string; service: string; version: string }, Error>) => {
  return useQuery<{ status: string; service: string; version: string }, Error>({
    queryKey: ['health'],
    queryFn: () => ApiService.getHealth(),
    refetchInterval: 30000, // Refetch every 30 seconds
    ...options,
  });
};

// Analytics Hooks
export const useAnalyticsOverview = (options?: UseQueryOptions<AnalyticsData['overview'], Error>) => {
  return useQuery<AnalyticsData['overview'], Error>({
    queryKey: ['analytics', 'overview'],
    queryFn: () => ApiService.getAnalyticsOverview(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useGenderDistribution = (options?: UseQueryOptions<AnalyticsData['genderDistribution'], Error>) => {
  return useQuery<AnalyticsData['genderDistribution'], Error>({
    queryKey: ['analytics', 'gender'],
    queryFn: () => ApiService.getGenderDistribution(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useCitizenshipDistribution = (options?: UseQueryOptions<AnalyticsData['citizenshipDistribution'], Error>) => {
  return useQuery<AnalyticsData['citizenshipDistribution'], Error>({
    queryKey: ['analytics', 'citizenship'],
    queryFn: () => ApiService.getCitizenshipDistribution(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useBirthYearDistribution = (options?: UseQueryOptions<AnalyticsData['birthYearDistribution'], Error>) => {
  return useQuery<AnalyticsData['birthYearDistribution'], Error>({
    queryKey: ['analytics', 'birthYear'],
    queryFn: () => ApiService.getBirthYearDistribution(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useMonthlyTrends = (options?: UseQueryOptions<AnalyticsData['monthlyTrends'], Error>) => {
  return useQuery<AnalyticsData['monthlyTrends'], Error>({
    queryKey: ['analytics', 'monthly'],
    queryFn: () => ApiService.getMonthlyTrends(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const useRecentActivity = (options?: UseQueryOptions<AnalyticsData['recentActivity'], Error>) => {
  return useQuery<AnalyticsData['recentActivity'], Error>({
    queryKey: ['analytics', 'recent'],
    queryFn: () => ApiService.getRecentActivity(),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // Refetch every minute
    ...options,
  });
};

export const useAllAnalytics = (options?: UseQueryOptions<AnalyticsData, Error>) => {
  return useQuery<AnalyticsData, Error>({
    queryKey: ['analytics', 'all'],
    queryFn: () => ApiService.getAllAnalytics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// Utility hook for combining multiple analytics queries
export const useAnalyticsDashboard = () => {
  const overview = useAnalyticsOverview();
  const genderDistribution = useGenderDistribution();
  const citizenshipDistribution = useCitizenshipDistribution();
  const birthYearDistribution = useBirthYearDistribution();
  const monthlyTrends = useMonthlyTrends();
  const recentActivity = useRecentActivity();

  return {
    overview,
    genderDistribution,
    citizenshipDistribution,
    birthYearDistribution,
    monthlyTrends,
    recentActivity,
    isLoading: overview.isLoading || genderDistribution.isLoading || citizenshipDistribution.isLoading || 
              birthYearDistribution.isLoading || monthlyTrends.isLoading || recentActivity.isLoading,
    isError: overview.isError || genderDistribution.isError || citizenshipDistribution.isError || 
             birthYearDistribution.isError || monthlyTrends.isError || recentActivity.isError,
    refetchAll: () => {
      overview.refetch();
      genderDistribution.refetch();
      citizenshipDistribution.refetch();
      birthYearDistribution.refetch();
      monthlyTrends.refetch();
      recentActivity.refetch();
    },
  };
};
