package com.validator.service;

import com.validator.model.IdInformation;
import com.validator.enums.Gender;
import com.validator.enums.CitizenshipStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.Period;

@Slf4j
@Service
public class IdValidationService {

    private static final int VALID_ID_LENGTH = 13;
    private static final int FEMALE_GENDER_CODE_MAX = 4999;
    private static final int MALE_GENDER_CODE_MIN = 5000;
    private static final int MALE_GENDER_CODE_MAX = 9999;

    @Cacheable(value = "idValidation", key = "#idNumber")
    public IdInformation validateId(String idNumber) {
        log.debug("Validating ID number: {}", maskIdNumber(idNumber));
        
        IdInformation.IdInformationBuilder idBuilder = IdInformation.builder();
        
        // Basic validation
        if (!isValidLength(idNumber)) {
            return createInvalidId(idNumber, "ID number must be exactly 13 digits", idBuilder);
        }
        
        if (!isNumeric(idNumber)) {
            return createInvalidId(idNumber, "ID number must contain only digits", idBuilder);
        }
        
        try {
            // Extract components from YYMMDDSSSSCAZ format
            int year = Integer.parseInt(idNumber.substring(0, 2));
            int month = Integer.parseInt(idNumber.substring(2, 4));
            int day = Integer.parseInt(idNumber.substring(4, 6));
            int genderCode = Integer.parseInt(idNumber.substring(6, 10));
            int citizenshipCode = Integer.parseInt(idNumber.substring(10, 11));
            
            // Validate date (YYMMDD)
            LocalDate birthDate = validateAndCreateDate(year, month, day);
            if (birthDate == null) {
                return createInvalidId(idNumber, "Invalid date of birth", idBuilder);
            }
            
            // Validate gender (SSSS - digits 7-10)
            Gender gender = validateGender(genderCode);
            if (gender == Gender.UNKNOWN) {
                return createInvalidId(idNumber, "Invalid gender code", idBuilder);
            }
            
            // Validate citizenship (C - digit 11)
            CitizenshipStatus citizenship = validateCitizenship(citizenshipCode);
            if (citizenship == CitizenshipStatus.UNKNOWN) {
                return createInvalidId(idNumber, "Invalid citizenship status", idBuilder);
            }
            
            // Validate checksum (Z - digit 13)
            boolean checksumValid = validateChecksum(idNumber);
            
            // Calculate age
            int age = Period.between(birthDate, LocalDate.now()).getYears();
            
            // Calculate zodiac sign
            String zodiacSign = calculateZodiacSign(birthDate);
            
            // Create validation details
            IdInformation.ValidationDetails validationDetails = new IdInformation.ValidationDetails();
            validationDetails.setValidLength(true);
            validationDetails.setValidFormat(true);
            validationDetails.setValidDate(true);
            validationDetails.setValidGenderCode(true);
            validationDetails.setValidCitizenship(true);
            validationDetails.setValidChecksum(checksumValid);
            
            return idBuilder
                .idNumber(idNumber)
                .birthDate(birthDate)
                .age(age)
                .gender(gender)
                .citizenship(citizenship)
                .zodiacSign(zodiacSign)
                .checksumValid(checksumValid)
                .status(checksumValid ? "Valid ID" : "Invalid ID")
                .validationDetails(validationDetails)
                .build();
                
        } catch (NumberFormatException e) {
            log.error("Error parsing ID number components", e);
            return createInvalidId(idNumber, "Invalid ID number format", idBuilder);
        }
    }
    
    private boolean isValidLength(String idNumber) {
        return idNumber != null && idNumber.length() == VALID_ID_LENGTH;
    }
    
    private boolean isNumeric(String idNumber) {
        return idNumber != null && idNumber.matches("\\d+");
    }
    
    private LocalDate validateAndCreateDate(int year, int month, int day) {
        // Validate month
        if (month < 1 || month > 12) {
            return null;
        }
        
        // Convert 2-digit year to 4-digit year
        int fullYear = convertToFullYear(year);
        
        try {
            // Validate day using YearMonth to handle month lengths and leap years
            int daysInMonth = YearMonth.of(fullYear, month).lengthOfMonth();
            if (day < 1 || day > daysInMonth) {
                return null;
            }
            
            return LocalDate.of(fullYear, month, day);
        } catch (Exception e) {
            return null;
        }
    }
    
    private int convertToFullYear(int twoDigitYear) {
        // Assuming current year is 2024, so:
        // 00-24 -> 2000-2024
        // 25-99 -> 1925-1999
        int currentCenturyStart = 2000;
        int lastCenturyStart = 1900;
        int currentYear = LocalDate.now().getYear() % 100;
        
        return twoDigitYear <= currentYear ? 
            currentCenturyStart + twoDigitYear : 
            lastCenturyStart + twoDigitYear;
    }
    
    private Gender validateGender(int genderCode) {
        if (genderCode >= 0 && genderCode <= FEMALE_GENDER_CODE_MAX) {
            return Gender.FEMALE;
        } else if (genderCode >= MALE_GENDER_CODE_MIN && genderCode <= MALE_GENDER_CODE_MAX) {
            return Gender.MALE;
        }
        return Gender.UNKNOWN;
    }
    
    private CitizenshipStatus validateCitizenship(int citizenshipCode) {
        return switch (citizenshipCode) {
            case 0 -> CitizenshipStatus.SOUTH_AFRICAN;
            case 1 -> CitizenshipStatus.PERMANENT_RESIDENT;
            default -> CitizenshipStatus.UNKNOWN;
        };
    }
    
    private boolean validateChecksum(String idNumber) {
        // Implement South African ID checksum validation using Luhn algorithm
        int sum = 0;
        boolean alternate = false;
        
        // Process digits from right to left (excluding the check digit)
        for (int i = idNumber.length() - 2; i >= 0; i--) {
            int digit = Character.getNumericValue(idNumber.charAt(i));
            
            if (alternate) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            alternate = !alternate;
        }
        
        // Calculate check digit using Luhn algorithm
        int calculatedChecksum = (10 - (sum % 10)) % 10;
        int providedChecksum = Character.getNumericValue(idNumber.charAt(idNumber.length() - 1));
        
        return calculatedChecksum == providedChecksum;
    }
    
    private IdInformation createInvalidId(String idNumber, String message, 
                                        IdInformation.IdInformationBuilder idBuilder) {
        IdInformation.ValidationDetails validationDetails = new IdInformation.ValidationDetails();
        validationDetails.setErrorMessage(message);
        
        return idBuilder
            .idNumber(idNumber)
            .checksumValid(false)
            .status("Invalid ID")
            .validationDetails(validationDetails)
            .build();
    }
    
    private String maskIdNumber(String idNumber) {
        if (idNumber == null || idNumber.length() < 6) return "INVALID";
        return idNumber.substring(0, 6) + "******";
    }
    
    private String calculateZodiacSign(LocalDate birthDate) {
        int month = birthDate.getMonthValue();
        int day = birthDate.getDayOfMonth();
        
        if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
            return "Aries";
        } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
            return "Taurus";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gemini";
        } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
            return "Cancer";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
            return "Leo";
        } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
            return "Virgo";
        } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
            return "Libra";
        } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
            return "Scorpio";
        } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
            return "Sagittarius";
        } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
            return "Capricorn";
        } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
            return "Aquarius";
        } else {
            return "Pisces";
        }
    }
}
