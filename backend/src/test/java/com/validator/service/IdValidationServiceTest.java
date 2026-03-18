package com.validator.service;

import com.validator.enums.CitizenshipStatus;
import com.validator.enums.Gender;
import com.validator.model.IdInformation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

class IdValidationServiceTest {

    private IdValidationService idValidationService;

    @BeforeEach
    void setUp() {
        idValidationService = new IdValidationService();
    }

    @Test
    @DisplayName("Valid ID numbers should return true with complete information")
    void testValidIdNumbers() {
        // Test known valid ID numbers with correct checksums
        String[] validIds = {
            "8001010000083",  // Valid female ID
            "8001015009083"   // Valid male ID
        };

        for (String id : validIds) {
            IdInformation result = idValidationService.validateId(id);
            
            assertTrue(result.getChecksumValid() != null && result.getChecksumValid(), 
                String.format("ID %s should be valid", id));
            assertNotNull(result.getBirthDate(), 
                String.format("ID %s should have date of birth", id));
            assertNotNull(result.getGender(), 
                String.format("ID %s should have gender", id));
            assertNotNull(result.getCitizenship(), 
                String.format("ID %s should have citizenship status", id));
            assertTrue(result.getAge() >= 0, 
                String.format("ID %s should have valid age", id));
        }
    }

    @Test
    @DisplayName("Invalid ID numbers should return false with appropriate error messages")
    void testInvalidIdNumbers() {
        // Test invalid formats
        assertInvalidId("12345", "ID number must be exactly 13 digits");
        assertInvalidId("12345678901234", "ID number must be exactly 13 digits");
        assertInvalidId("20010148000.6", "ID number must contain only digits");
        assertInvalidId("2001O14800086", "ID number must contain only digits");
        assertInvalidId("200101480008 ", "ID number must contain only digits");
        assertInvalidId("", "ID number must be exactly 13 digits");
        assertInvalidId(null, "ID number must be exactly 13 digits");

        // Test invalid dates
        assertInvalidId("2013014800086", "Invalid date of birth"); // Invalid month
        assertInvalidId("2001324800086", "Invalid date of birth"); // Invalid day
        assertInvalidId("2302294800086", "Invalid date of birth"); // Invalid leap year
        assertInvalidId("2302304800086", "Invalid date of birth"); // Invalid Feb 30
        assertInvalidId("2304314800086", "Invalid date of birth"); // Invalid April 31

        // Test invalid checksum
        assertInvalidId("9001015000088", "Invalid checksum");
        assertInvalidId("9001015000086", "Invalid checksum");

        // Test invalid citizenship
        assertInvalidId("9001015000284", "Invalid citizenship status");
        assertInvalidId("9001015000981", "Invalid citizenship status");
    }

    private void assertInvalidId(String idNumber, String expectedErrorPattern) {
        IdInformation result = idValidationService.validateId(idNumber);
        
        assertFalse(result.getChecksumValid() != null && result.getChecksumValid(), 
                String.format("ID %s should be invalid", idNumber));
        assertEquals("Invalid ID", result.getStatus());
        assertTrue(result.getStatus().contains(expectedErrorPattern),
            String.format("ID %s should have error message containing '%s', but got '%s'", 
                idNumber, expectedErrorPattern, result.getStatus()));
    }

    @Test
    @DisplayName("Gender extraction should work correctly")
    void testGenderExtraction() {
        // Test female gender codes (0000-4999)
        IdInformation femaleResult = idValidationService.validateId("9001010000083");
        assertEquals(Gender.FEMALE, femaleResult.getGender());

        IdInformation femaleResult2 = idValidationService.validateId("9001014999089");
        assertEquals(Gender.FEMALE, femaleResult2.getGender());

        // Test male gender codes (5000-9999)
        IdInformation maleResult = idValidationService.validateId("9001015000087");
        assertEquals(Gender.MALE, maleResult.getGender());

        IdInformation maleResult2 = idValidationService.validateId("9001019999081");
        assertEquals(Gender.MALE, maleResult2.getGender());
    }

    @Test
    @DisplayName("Citizenship extraction should work correctly")
    void testCitizenshipExtraction() {
        // Test SA citizen (0)
        IdInformation citizenResult = idValidationService.validateId("9001015000087");
        assertEquals(CitizenshipStatus.SOUTH_AFRICAN, citizenResult.getCitizenship());

        // Test permanent resident (1)
        IdInformation residentResult = idValidationService.validateId("9001015001086");
        assertEquals(CitizenshipStatus.PERMANENT_RESIDENT, residentResult.getCitizenship());
    }

    @Test
    @DisplayName("Date of birth extraction should work correctly")
    void testDateOfBirthExtraction() {
        IdInformation result = idValidationService.validateId("8001015009087");
        
        assertNotNull(result.getBirthDate());
        assertEquals(1980, result.getBirthDate().getYear());
        assertEquals(1, result.getBirthDate().getMonthValue());
        assertEquals(1, result.getBirthDate().getDayOfMonth());
        
        // Age should be reasonable (assuming current year is 2024)
        assertTrue(result.getAge() >= 40 && result.getAge() <= 50);
    }

    @Test
    @DisplayName("Leap year validation should work correctly")
    void testLeapYearValidation() {
        // Valid leap year (2020)
        IdInformation validLeapYear = idValidationService.validateId("2002294800086");
        assertTrue(validLeapYear.getChecksumValid() != null && validLeapYear.getChecksumValid(), 
            "2020-02-29 should be valid (leap year)");

        // Invalid leap year (2023)
        IdInformation invalidLeapYear = idValidationService.validateId("2302294800086");
        assertFalse(invalidLeapYear.getChecksumValid() != null && invalidLeapYear.getChecksumValid(), "2023-02-29 should be invalid (not a leap year)");
    }

    @Test
    @DisplayName("Validation details should be populated correctly")
    void testValidationDetails() {
        IdInformation result = idValidationService.validateId("8001015009087");
        
        assertNotNull(result.getValidationDetails());
        // Note: ValidationDetails fields are private, accessed via Lombok getters
        // This test just ensures the validation details object is created
    }
}
