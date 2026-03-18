package com.validator;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ValidateSaIdTest {
    @Test
    void validIdNumber1ShouldReturnTrue() {
        assertTrue(ValidateSaId.isIdNumberValid("2001014800086"));
    }

    @Test
    void validIdNumber2ShouldReturnTrue() {
        assertTrue(ValidateSaId.isIdNumberValid("2909035800085"));
    }

    @Test
    void testValidSaId() {
        assertTrue(ValidateSaId.isIdNumberValid("8001015009087"));
    }

    @Test
    void test0210075733084() {
        // Change the assertion if you expect this ID to be invalid
        assertTrue(ValidateSaId.isIdNumberValid("0210075733084"));
    }

    @Test
    void tooShortIdShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("12345"));
    }

    // TDD Step: Too long ID should return false

    // TDD Step: ID with non-numeric character should return false

    @Test
    void twelveDigitIdShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("123456789012")); // 12 digits
    }



    @Test
    void idWithDotShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("20010148000.6")); // Contains '.'
    }

    @Test
    void idWithLetterOShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("2001O14800086")); // Contains 'O'
    }

    @Test
    void invalidMonthShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("2013014800086")); // Invalid month (13)
    }

    @Test
    void invalidDayShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("2001324800086")); // Invalid day (32)
    }

    @Test
    void invalidLeapYearShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("2302294800086")); // Invalid February date (29 in non-leap year)
    }

    @Test
    void invalidChecksumShouldReturnFalse() {
        assertFalse(ValidateSaId.isIdNumberValid("9001015000088")); // Invalid checksum
    }


    @Test
    void invalidDatesShouldReturnFalse() {
        // Invalid month (13)
        assertFalse(ValidateSaId.isIdNumberValid("2013014800086"));
        
        // Invalid day (32)
        assertFalse(ValidateSaId.isIdNumberValid("2001324800086"));
        
        // Invalid February date (29 in non-leap year)
        assertFalse(ValidateSaId.isIdNumberValid("2302294800086"));
        
        // Invalid February date (30)
        assertFalse(ValidateSaId.isIdNumberValid("2302304800086"));
        
        // Invalid April day (31)
        assertFalse(ValidateSaId.isIdNumberValid("2304314800086"));
    }

    @Test
    void validDatesShouldBeAccepted() {
        // Valid regular date
        assertTrue(ValidateSaId.isIdNumberValid("2001014800086")); // January 1st
        
        // Valid end of month
        assertTrue(ValidateSaId.isIdNumberValid("2003314800086")); // March 31st
        
        // Valid February in leap year
        assertTrue(ValidateSaId.isIdNumberValid("2002294800086")); // February 29th, 2020
        
        // Valid February in non-leap year
        assertTrue(ValidateSaId.isIdNumberValid("2302284800086")); // February 28th, 2023
    }

    @Test
    void genderCodeValidation() {
        // Valid female codes (0000-4999)
        assertTrue(ValidateSaId.isIdNumberValid("9001010000083")); // 0000
        assertTrue(ValidateSaId.isIdNumberValid("9001012499082")); // 2499
        assertTrue(ValidateSaId.isIdNumberValid("9001014999089")); // 4999

        // Valid male codes (5000-9999)
        assertTrue(ValidateSaId.isIdNumberValid("9001015000087")); // 5000
        assertTrue(ValidateSaId.isIdNumberValid("9001017500089")); // 7500
        assertTrue(ValidateSaId.isIdNumberValid("9001019999082")); // 9999
    }

    @Test
    void citizenshipValidation() {
        // Valid citizenship statuses (0 for SA citizen, 1 for permanent resident)
        assertTrue(ValidateSaId.isIdNumberValid("9001015000087")); // 0 - SA citizen
        assertTrue(ValidateSaId.isIdNumberValid("9001015000184")); // 1 - Permanent resident

        // Invalid citizenship status
        assertFalse(ValidateSaId.isIdNumberValid("9001015000284")); // 2 - Invalid
        assertFalse(ValidateSaId.isIdNumberValid("9001015000981")); // 9 - Invalid
    }

    @Test
    void checksumValidation() {
        // Valid checksums
        assertTrue(ValidateSaId.isIdNumberValid("9001015000087"));  // Valid checksum
        assertTrue(ValidateSaId.isIdNumberValid("8001015009087"));  // Valid checksum
        
        // Invalid checksums
        assertFalse(ValidateSaId.isIdNumberValid("9001015000088")); // Invalid checksum
        assertFalse(ValidateSaId.isIdNumberValid("9001015000086")); // Invalid checksum
    }
}
