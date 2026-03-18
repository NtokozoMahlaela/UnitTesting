package com.validator.controller;

import com.validator.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Analytics and reporting API")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @Operation(summary = "Get validation overview", 
               description = "Returns overall validation statistics including total counts and rates")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Analytics retrieved successfully"),
        @ApiResponse(responseCode = "403", description = "Access denied"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getValidationOverview() {
        log.info("Retrieving validation overview analytics");
        Map<String, Object> overview = analyticsService.getValidationOverview();
        return ResponseEntity.ok(overview);
    }

    @Operation(summary = "Get gender distribution", 
               description = "Returns distribution of validations by gender")
    @GetMapping("/gender-distribution")
    public ResponseEntity<Map<String, Long>> getGenderDistribution() {
        log.info("Retrieving gender distribution analytics");
        Map<String, Long> distribution = analyticsService.getGenderDistribution();
        return ResponseEntity.ok(distribution);
    }

    @Operation(summary = "Get citizenship distribution", 
               description = "Returns distribution of validations by citizenship status")
    @GetMapping("/citizenship-distribution")
    public ResponseEntity<Map<String, Long>> getCitizenshipDistribution() {
        log.info("Retrieving citizenship distribution analytics");
        Map<String, Long> distribution = analyticsService.getCitizenshipDistribution();
        return ResponseEntity.ok(distribution);
    }

    @Operation(summary = "Get birth year distribution", 
               description = "Returns distribution of validations by birth year")
    @GetMapping("/birth-year-distribution")
    public ResponseEntity<Map<String, Long>> getBirthYearDistribution() {
        log.info("Retrieving birth year distribution analytics");
        Map<String, Long> distribution = analyticsService.getBirthYearDistribution();
        return ResponseEntity.ok(distribution);
    }

    @Operation(summary = "Get monthly trends", 
               description = "Returns monthly validation trends for the past 12 months")
    @GetMapping("/monthly-trends")
    public ResponseEntity<Map<String, Long>> getMonthlyTrends() {
        log.info("Retrieving monthly trends analytics");
        Map<String, Long> trends = analyticsService.getMonthlyTrends();
        return ResponseEntity.ok(trends);
    }

    @Operation(summary = "Get recent activity", 
               description = "Returns validation activity for the last 24 hours, 7 days, and 30 days")
    @GetMapping("/recent-activity")
    public ResponseEntity<Map<String, Object>> getRecentActivity() {
        log.info("Retrieving recent activity analytics");
        Map<String, Object> activity = analyticsService.getRecentActivity();
        return ResponseEntity.ok(activity);
    }

    @Operation(summary = "Get all analytics", 
               description = "Returns comprehensive analytics data including all metrics")
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllAnalytics() {
        log.info("Retrieving comprehensive analytics data");
        
        Map<String, Object> allAnalytics = new HashMap<>();
        allAnalytics.put("overview", analyticsService.getValidationOverview());
        allAnalytics.put("genderDistribution", analyticsService.getGenderDistribution());
        allAnalytics.put("citizenshipDistribution", analyticsService.getCitizenshipDistribution());
        allAnalytics.put("birthYearDistribution", analyticsService.getBirthYearDistribution());
        allAnalytics.put("monthlyTrends", analyticsService.getMonthlyTrends());
        allAnalytics.put("recentActivity", analyticsService.getRecentActivity());
        
        return ResponseEntity.ok(allAnalytics);
    }
}
