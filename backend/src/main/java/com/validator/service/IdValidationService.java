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
            // Extract components: YYMMDDSSSSCAZ
            int year = Integer.parseInt(idNumber.substring(0, 2));
            int month = Integer.parseInt(idNumber.substring(2, 4));
            int day = Integer.parseInt(idNumber.substring(4, 6));
            int genderCode = Integer.parseInt(idNumber.substring(6, 10));
            int citizenshipCode = Integer.parseInt(idNumber.substring(10, 11));

            // Validate date
            LocalDate birthDate = validateAndCreateDate(year, month, day);
            if (birthDate == null) {
                return createInvalidId(idNumber, "Invalid date of birth", idBuilder);
            }

            // Validate gender
            Gender gender = validateGender(genderCode);
            if (gender == Gender.UNKNOWN) {
                return createInvalidId(idNumber, "Invalid gender code", idBuilder);
            }

            // Validate citizenship
            CitizenshipStatus citizenship = validateCitizenship(citizenshipCode);
            if (citizenship == CitizenshipStatus.UNKNOWN) {
                return createInvalidId(idNumber, "Invalid citizenship status", idBuilder);
            }

            // Validate checksum (South African Luhn variant)
            boolean checksumValid = validateChecksum(idNumber);

            // Age
            int age = Period.between(birthDate, LocalDate.now()).getYears();
            String zodiacSign = calculateZodiacSign(birthDate);
            String ageCategory = calculateAgeCategory(age);

            // Validation details
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
                    .ageCategory(ageCategory)
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

    // ------------------- Helper Methods -------------------

    private boolean isValidLength(String idNumber) {
        return idNumber != null && idNumber.length() == VALID_ID_LENGTH;
    }

    private boolean isNumeric(String idNumber) {
        return idNumber != null && idNumber.matches("\\d+");
    }

    private LocalDate validateAndCreateDate(int year, int month, int day) {
        int fullYear = convertToFullYear(year);
        try {
            int daysInMonth = YearMonth.of(fullYear, month).lengthOfMonth();
            if (day < 1 || day > daysInMonth) return null;
            return LocalDate.of(fullYear, month, day);
        } catch (Exception e) {
            return null;
        }
    }

    private int convertToFullYear(int twoDigitYear) {
        int currentYear = LocalDate.now().getYear();
        int century = currentYear / 100 * 100;
        return (twoDigitYear > currentYear % 100) ? (century - 100 + twoDigitYear) : (century + twoDigitYear);
    }

    private Gender validateGender(int genderCode) {
        if (genderCode >= 0 && genderCode <= FEMALE_GENDER_CODE_MAX) return Gender.FEMALE;
        if (genderCode >= MALE_GENDER_CODE_MIN && genderCode <= MALE_GENDER_CODE_MAX) return Gender.MALE;
        return Gender.UNKNOWN;
    }

    private CitizenshipStatus validateCitizenship(int code) {
        return switch (code) {
            case 0 -> CitizenshipStatus.SOUTH_AFRICAN;
            case 1 -> CitizenshipStatus.PERMANENT_RESIDENT;
            default -> CitizenshipStatus.UNKNOWN;
        };
    }

    private boolean validateChecksum(String idNumber) {
        // South African ID checksum algorithm (exact specification)
        // Use first 12 digits only (positions 0-11)
        String first12Digits = idNumber.substring(0, 12);
        int lastDigit = Character.getNumericValue(idNumber.charAt(12));
        
        // Step 1: Sum all digits in odd positions (1, 3, 5, 7, 9, 11) - indices 0,2,4,6,8,10
        int oddSum = 0;
        for (int i = 0; i < 12; i += 2) {
            oddSum += Character.getNumericValue(first12Digits.charAt(i));
        }
        
        // Step 2: Concatenate all digits in even positions (2, 4, 6, 8, 10, 12) - indices 1,3,5,7,9,11
        StringBuilder evenDigits = new StringBuilder();
        for (int i = 1; i < 12; i += 2) {
            evenDigits.append(first12Digits.charAt(i));
        }
        
        // Step 3: Multiply the concatenated even digits by 2
        int evenNumber = Integer.parseInt(evenDigits.toString());
        int multiplied = evenNumber * 2;
        
        // Step 4: Sum all digits of the result
        int multipliedSum = 0;
        int temp = multiplied;
        while (temp > 0) {
            multipliedSum += temp % 10;
            temp /= 10;
        }
        
        // Step 5: Add odd sum and multiplied sum
        int totalSum = oddSum + multipliedSum;
        
        // Step 6: Calculate check digit - if total sum ends with 0, check digit is 0, otherwise 10 - (last digit of total sum)
        int calculatedCheckDigit;
        int lastDigitOfTotalSum = totalSum % 10;
        if (lastDigitOfTotalSum == 0) {
            calculatedCheckDigit = 0;
        } else {
            calculatedCheckDigit = 10 - lastDigitOfTotalSum;
        }
        
        // Step 7: Compare calculated check digit with last digit
        return calculatedCheckDigit == lastDigit;
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
        int m = birthDate.getMonthValue(), d = birthDate.getDayOfMonth();
        if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "Aries";
        if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "Taurus";
        if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return "Gemini";
        if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return "Cancer";
        if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "Leo";
        if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "Virgo";
        if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return "Libra";
        if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return "Scorpio";
        if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return "Sagittarius";
        if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return "Capricorn";
        if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "Aquarius";
        return "Pisces";
    }

    private String calculateAgeCategory(int age) {
        if (age >= 65) return "Senior Citizen";
        if (age >= 18) return "Adult";
        if (age >= 13) return "Teenager";
        if (age >= 6) return "Child";
        return "Toddler";
    }
}