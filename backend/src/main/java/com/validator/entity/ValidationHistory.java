package com.validator.entity;

import com.validator.enums.CitizenshipStatus;
import com.validator.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "validation_history")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValidationHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "id_number", nullable = false, length = 13)
    private String idNumber;
    
    @Column(name = "is_valid", nullable = false)
    private Boolean isValid;
    
    @Column(name = "validation_message", columnDefinition = "TEXT")
    private String validationMessage;
    
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    
    @Column(name = "age")
    private Integer age;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "citizenship_status")
    private CitizenshipStatus citizenshipStatus;
    
    @Column(name = "is_south_african_citizen")
    private Boolean isSouthAfricanCitizen;
    
    @Column(name = "zodiac_sign", length = 20)
    private String zodiacSign;
    
    @Column(name = "generation", length = 30)
    private String generation;
    
    @Column(name = "is_adult")
    private Boolean isAdult;
    
    @Column(name = "is_senior_citizen")
    private Boolean isSeniorCitizen;
    
    @Column(name = "client_ip", length = 45)
    private String clientIp;
    
    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;
    
    @Column(name = "validation_timestamp", nullable = false)
    private LocalDateTime validationTimestamp;
    
    @Column(name = "processing_time_ms")
    private Long processingTimeMs;
    
    @PrePersist
    protected void onCreate() {
        if (validationTimestamp == null) {
            validationTimestamp = LocalDateTime.now();
        }
    }
}
