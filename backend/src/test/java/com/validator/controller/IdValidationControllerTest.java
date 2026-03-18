package com.validator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.validator.model.IdInformation;
import com.validator.service.IdValidationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(IdValidationController.class)
class IdValidationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IdValidationService idValidationService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void validateId_ValidId_ReturnsValidationResult() throws Exception {
        // Arrange
        IdInformation mockResult = createValidIdInformation();
        when(idValidationService.validateId(any())).thenReturn(mockResult);

        Map<String, String> request = new HashMap<>();
        request.put("idNumber", "8001015009087");

        // Act & Assert
        mockMvc.perform(post("/api/v1/id-validation/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.valid").value(true))
                .andExpect(jsonPath("$.idNumber").value("8001015009087"))
                .andExpect(jsonPath("$.gender").value("MALE"))
                .andExpect(jsonPath("$.citizenshipStatus").value("SOUTH_AFRICAN"));
    }

    @Test
    void validateId_InvalidId_ReturnsValidationError() throws Exception {
        // Arrange
        IdInformation mockResult = createInvalidIdInformation();
        when(idValidationService.validateId(any())).thenReturn(mockResult);

        Map<String, String> request = new HashMap<>();
        request.put("idNumber", "12345");

        // Act & Assert
        mockMvc.perform(post("/api/v1/id-validation/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.valid").value(false))
                .andExpect(jsonPath("$.validationMessage").exists());
    }

    @Test
    void validateBatch_ValidIds_ReturnsBatchResults() throws Exception {
        // Arrange
        List<IdInformation> mockResults = Arrays.asList(
            createValidIdInformation(),
            createInvalidIdInformation()
        );
        when(idValidationService.validateId(any()))
            .thenReturn(mockResults.get(0))
            .thenReturn(mockResults.get(1));

        Map<String, List<String>> request = new HashMap<>();
        request.put("idNumbers", Arrays.asList("8001015009087", "12345"));

        // Act & Assert
        mockMvc.perform(post("/api/v1/id-validation/validate-batch")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].valid").value(true))
                .andExpect(jsonPath("$[1].valid").value(false));
    }

    @Test
    void quickCheck_ValidId_ReturnsTrue() throws Exception {
        // Arrange
        IdInformation mockResult = createValidIdInformation();
        when(idValidationService.validateId(any())).thenReturn(mockResult);

        // Act & Assert
        mockMvc.perform(get("/api/v1/id-validation/check/8001015009087"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.idNumber").value("8001015009087"))
                .andExpect(jsonPath("$.valid").value(true));
    }

    @Test
    void quickCheck_InvalidId_ReturnsFalse() throws Exception {
        // Arrange
        IdInformation mockResult = createInvalidIdInformation();
        when(idValidationService.validateId(any())).thenReturn(mockResult);

        // Act & Assert
        mockMvc.perform(get("/api/v1/id-validation/check/12345"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.idNumber").value("12345"))
                .andExpect(jsonPath("$.valid").value(false));
    }

    @Test
    void health_ReturnsHealthStatus() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/v1/id-validation/health"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.service").value("ID Validation Service"))
                .andExpect(jsonPath("$.version").value("1.0.0"));
    }

    @Test
    void validateId_MissingRequestBody_ReturnsBadRequest() throws Exception {
        // Act & Assert
        mockMvc.perform(post("/api/v1/id-validation/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void validateBatch_EmptyList_ReturnsEmptyResults() throws Exception {
        // Arrange
        Map<String, List<String>> request = new HashMap<>();
        request.put("idNumbers", Arrays.asList());

        // Act & Assert
        mockMvc.perform(post("/api/v1/id-validation/validate-batch")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }

    private IdInformation createValidIdInformation() {
        return IdInformation.builder()
                .idNumber("8001015009087")
                .birthDate(java.time.LocalDate.of(1980, 1, 1))
                .age(44)
                .gender(com.validator.enums.Gender.MALE)
                .citizenship(com.validator.enums.CitizenshipStatus.SOUTH_AFRICAN)
                .checksumValid(true)
                .status("Valid ID")
                .validationDetails(createValidValidationDetails())
                .build();
    }

    private IdInformation createInvalidIdInformation() {
        return IdInformation.builder()
                .idNumber("12345")
                .checksumValid(false)
                .status("Invalid ID")
                .validationDetails(createInvalidValidationDetails())
                .build();
    }

    private IdInformation.ValidationDetails createValidValidationDetails() {
        return IdInformation.ValidationDetails.builder()
                .validLength(true)
                .validFormat(true)
                .validDate(true)
                .validGenderCode(true)
                .validCitizenship(true)
                .validChecksum(true)
                .build();
    }

    private IdInformation.ValidationDetails createInvalidValidationDetails() {
        return IdInformation.ValidationDetails.builder()
                .validLength(false)
                .validFormat(false)
                .validDate(false)
                .validGenderCode(false)
                .validCitizenship(false)
                .validChecksum(false)
                .errorMessage("ID number must be exactly 13 digits")
                .build();
    }
}
