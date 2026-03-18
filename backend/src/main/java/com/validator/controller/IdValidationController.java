package com.validator.controller;

import com.validator.model.IdInformation;
import com.validator.service.IdValidationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/id-validation")
@RequiredArgsConstructor
@Tag(name = "ID Validation", description = "South African ID number validation API")
public class IdValidationController {

    private final IdValidationService idValidationService;

    @Operation(summary = "Validate a single South African ID number", 
               description = "Validates a South African ID number and extracts detailed information")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "ID validation completed successfully",
                    content = @Content(schema = @Schema(implementation = IdInformation.class))),
        @ApiResponse(responseCode = "400", description = "Invalid ID number format"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/validate")
    public ResponseEntity<IdInformation> validateId(
            @Parameter(description = "ID number to validate", required = true)
            @Valid @RequestBody Map<String, String> request) {
        
        String idNumber = request.get("idNumber");
        log.info("Received validation request for ID number: {}", maskIdNumber(idNumber));
        
        IdInformation result = idValidationService.validateId(idNumber);
        
        if (result.getChecksumValid() != null && result.getChecksumValid()) {
            log.info("ID number {} is valid", maskIdNumber(idNumber));
        } else {
            log.warn("ID number {} is invalid: {}", maskIdNumber(idNumber), result.getStatus());
        }
        
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Validate multiple ID numbers", 
               description = "Validates multiple South African ID numbers in a single request")
    @PostMapping("/validate-batch")
    public ResponseEntity<List<IdInformation>> validateBatch(
            @Parameter(description = "List of ID numbers to validate", required = true)
            @Valid @RequestBody Map<String, List<String>> request) {
        
        List<String> idNumbers = request.get("idNumbers");
        log.info("Received batch validation request for {} ID numbers", idNumbers.size());
        
        List<IdInformation> results = idNumbers.stream()
                .map(idValidationService::validateId)
                .toList();
        
        long validCount = results.stream().mapToLong(r -> r.getChecksumValid() != null && r.getChecksumValid() ? 1 : 0).sum();
        log.info("Batch validation completed: {}/{} ID numbers are valid", validCount, idNumbers.size());
        
        return ResponseEntity.ok(results);
    }

    @Operation(summary = "Quick validation check", 
               description = "Returns only the validation status (true/false) for an ID number")
    @GetMapping("/check/{idNumber}")
    public ResponseEntity<Map<String, Object>> quickCheck(
            @Parameter(description = "ID number to check", required = true)
            @PathVariable String idNumber) {
        
        IdInformation result = idValidationService.validateId(idNumber);
        boolean isValid = result.getChecksumValid() != null && result.getChecksumValid();
        
        Map<String, Object> response = new HashMap<>();
        response.put("idNumber", idNumber);
        response.put("valid", isValid);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Health check endpoint", 
               description = "Returns the health status of the validation service")
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "ID Validation Service",
            "version", "1.0.0"
        ));
    }

    private String maskIdNumber(String idNumber) {
        if (idNumber == null || idNumber.length() < 6) return "INVALID";
        return idNumber.substring(0, 6) + "******";
    }
}
