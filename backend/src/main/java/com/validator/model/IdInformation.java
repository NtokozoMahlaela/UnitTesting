package com.validator.model;

import com.validator.enums.Gender;
import com.validator.enums.CitizenshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IdInformation {
    private String idNumber;
    private LocalDate birthDate;
    private Integer age;
    private String ageCategory;
    private Gender gender;
    private CitizenshipStatus citizenship;
    private String zodiacSign;
    private Boolean checksumValid;
    private String status;
    
    // Validation details for debugging
    private ValidationDetails validationDetails;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ValidationDetails {
        private boolean validLength;
        private boolean validFormat;
        private boolean validDate;
        private boolean validGenderCode;
        private boolean validCitizenship;
        private boolean validChecksum;
        private String errorMessage;
    }
}
