package com.validator;

import java.time.YearMonth;
import java.time.DateTimeException;

public class ValidateSaId {
    private static final int VALID_ID_LENGTH = 13;
    private static final int FEMALE_GENDER_CODE_MAX = 4999;
    private static final int GENDER_CODE_MAX = 9999;

    public static boolean isIdNumberValid(String idNumber) {
        // Check length
        if (idNumber == null || idNumber.length() != VALID_ID_LENGTH) {
            return false;
        }

        // Check if all characters are numeric
        if (!idNumber.matches("\\d+")) {
            return false;
        }

        try {
            // Extract components
            int year = Integer.parseInt(idNumber.substring(0, 2));
            int month = Integer.parseInt(idNumber.substring(2, 4));
            int day = Integer.parseInt(idNumber.substring(4, 6));
            int genderCode = Integer.parseInt(idNumber.substring(6, 10));
            int citizenshipStatus = Integer.parseInt(idNumber.substring(10, 11));

            // Validate date components
            // Validate month (1-12)
            if (month < 1 || month > 12) {
                return false;
            }

            // Convert 2-digit year to 4-digit year
            // Assuming years 00-29 are 2000-2029, and 30-99 are 1930-1999
            int fullYear = year < 30 ? 2000 + year : 1900 + year;

            // Get the length of the month
            int daysInMonth = YearMonth.of(fullYear, month).lengthOfMonth();

            // Validate day
            if (day < 1 || day > daysInMonth) {
                return false;
            }

            // Validate gender code (0000-9999)
            if (genderCode < 0 || genderCode > GENDER_CODE_MAX) {
                return false;
            }

            // Validate citizenship status (0 or 1)
            if (citizenshipStatus != 0 && citizenshipStatus != 1) {
                return false;
            }

            // Validate checksum using Luhn algorithm
            return validateLuhnChecksum(idNumber);

        } catch (DateTimeException | NumberFormatException e) {
            return false;
        }
    }

    private static boolean validateLuhnChecksum(String idNumber) {
        int sum = 0;
        boolean alternate = false;

        // Process digits from right to left
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

        // Calculate check digit
        int calculatedChecksum = (10 - (sum % 10)) % 10;
        int providedChecksum = Character.getNumericValue(idNumber.charAt(idNumber.length() - 1));

        return calculatedChecksum == providedChecksum;
    }

    public static void main(String[] args) {
        String idToTest;
        if (args.length > 0) {
            idToTest = args[0];
        } else {
            idToTest = "0210075733084"; // default
        }

        System.out.println("Testing ID: " + idToTest);
        System.out.println("Is valid: " + isIdNumberValid(idToTest));

        if (idToTest.length() == 13 && idToTest.matches("\\d+")) {
            // Break down the components
            System.out.println("\nBreaking down the ID number:");
            System.out.println("Date of Birth: " + idToTest.substring(0, 6) + " (YYMMDD)");

            int genderCode = Integer.parseInt(idToTest.substring(6, 10));
            System.out.println("Gender Code: " + genderCode + " (" + (genderCode <= FEMALE_GENDER_CODE_MAX ? "Female" : "Male") + ")");

            char citizenshipStatus = idToTest.charAt(10);
            System.out.println("Citizenship Status: " + citizenshipStatus + " (" + (citizenshipStatus == '0' ? "SA Citizen" : "Permanent Resident") + ")");

            System.out.println("Check Digits: " + idToTest.substring(11));
        } else {
            System.out.println("Unable to break down ID number: input not 13 digits or contains non-numeric characters.");
        }
    }
}
