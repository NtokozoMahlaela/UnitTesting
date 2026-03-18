package com.validator.service;

import com.validator.repository.ValidationHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ValidationHistoryRepository validationHistoryRepository;

    @Cacheable(value = "analytics", key = "'overview'")
    public Map<String, Object> getValidationOverview() {
        log.debug("Generating validation overview analytics");
        
        long totalValid = validationHistoryRepository.countValidValidations();
        long totalInvalid = validationHistoryRepository.countInvalidValidations();
        long totalValidations = totalValid + totalInvalid;
        
        Map<String, Object> overview = new HashMap<>();
        overview.put("totalValidations", totalValidations);
        overview.put("validCount", totalValid);
        overview.put("invalidCount", totalInvalid);
        overview.put("validityRate", totalValidations > 0 ? (double) totalValid / totalValidations * 100 : 0);
        overview.put("invalidityRate", totalValidations > 0 ? (double) totalInvalid / totalValidations * 100 : 0);
        
        return overview;
    }

    @Cacheable(value = "analytics", key = "'genderDistribution'")
    public Map<String, Long> getGenderDistribution() {
        log.debug("Generating gender distribution analytics");
        
        List<Object[]> genderData = validationHistoryRepository.countByGender();
        Map<String, Long> genderDistribution = new HashMap<>();
        
        for (Object[] data : genderData) {
            genderDistribution.put(data[0].toString(), (Long) data[1]);
        }
        
        return genderDistribution;
    }

    @Cacheable(value = "analytics", key = "'citizenshipDistribution'")
    public Map<String, Long> getCitizenshipDistribution() {
        log.debug("Generating citizenship distribution analytics");
        
        List<Object[]> citizenshipData = validationHistoryRepository.countByCitizenshipStatus();
        Map<String, Long> citizenshipDistribution = new HashMap<>();
        
        for (Object[] data : citizenshipData) {
            citizenshipDistribution.put(data[0].toString(), (Long) data[1]);
        }
        
        return citizenshipDistribution;
    }

    @Cacheable(value = "analytics", key = "'birthYearDistribution'")
    public Map<String, Long> getBirthYearDistribution() {
        log.debug("Generating birth year distribution analytics");
        
        List<Object[]> birthYearData = validationHistoryRepository.countByBirthYear();
        Map<String, Long> birthYearDistribution = new HashMap<>();
        
        for (Object[] data : birthYearData) {
            birthYearDistribution.put(data[0].toString(), (Long) data[1]);
        }
        
        return birthYearDistribution;
    }

    @Cacheable(value = "analytics", key = "'monthlyTrends'")
    public Map<String, Long> getMonthlyTrends() {
        log.debug("Generating monthly trends analytics");
        
        LocalDateTime startDate = LocalDateTime.now().minusMonths(12);
        List<Object[]> monthlyData = validationHistoryRepository.countByMonth(startDate);
        Map<String, Long> monthlyTrends = new HashMap<>();
        
        for (Object[] data : monthlyData) {
            monthlyTrends.put(data[0].toString(), (Long) data[1]);
        }
        
        return monthlyTrends;
    }

    @Cacheable(value = "analytics", key = "'recentActivity'")
    public Map<String, Object> getRecentActivity() {
        log.debug("Generating recent activity analytics");
        
        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
        LocalDateTime last7Days = LocalDateTime.now().minusDays(7);
        LocalDateTime last30Days = LocalDateTime.now().minusDays(30);
        
        long last24HourCount = validationHistoryRepository.countValidationsSince(last24Hours);
        long last7DayCount = validationHistoryRepository.countValidationsSince(last7Days);
        long last30DayCount = validationHistoryRepository.countValidationsSince(last30Days);
        
        Map<String, Object> recentActivity = new HashMap<>();
        recentActivity.put("last24Hours", last24HourCount);
        recentActivity.put("last7Days", last7DayCount);
        recentActivity.put("last30Days", last30DayCount);
        
        return recentActivity;
    }
}
