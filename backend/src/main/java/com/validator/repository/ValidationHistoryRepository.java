package com.validator.repository;

import com.validator.entity.ValidationHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ValidationHistoryRepository extends JpaRepository<ValidationHistory, Long> {
    
    Optional<ValidationHistory> findByIdNumber(String idNumber);
    
    List<ValidationHistory> findByIdNumberContaining(String idNumber);
    
    Page<ValidationHistory> findByIsValid(Boolean isValid, Pageable pageable);
    
    Page<ValidationHistory> findByValidationTimestampBetween(
            LocalDateTime startTime, 
            LocalDateTime endTime, 
            Pageable pageable
    );
    
    @Query("SELECT COUNT(v) FROM ValidationHistory v WHERE v.isValid = true")
    long countValidValidations();
    
    @Query("SELECT COUNT(v) FROM ValidationHistory v WHERE v.isValid = false")
    long countInvalidValidations();
    
    @Query("SELECT v.gender, COUNT(v) FROM ValidationHistory v WHERE v.isValid = true GROUP BY v.gender")
    List<Object[]> countByGender();
    
    @Query("SELECT v.citizenshipStatus, COUNT(v) FROM ValidationHistory v WHERE v.isValid = true GROUP BY v.citizenshipStatus")
    List<Object[]> countByCitizenshipStatus();
    
    @Query("SELECT FUNCTION('YEAR', v.dateOfBirth), COUNT(v) FROM ValidationHistory v WHERE v.isValid = true GROUP BY FUNCTION('YEAR', v.dateOfBirth) ORDER BY FUNCTION('YEAR', v.dateOfBirth)")
    List<Object[]> countByBirthYear();
    
    @Query("SELECT FUNCTION('MONTH', v.validationTimestamp), COUNT(v) FROM ValidationHistory v WHERE v.validationTimestamp >= :startDate GROUP BY FUNCTION('MONTH', v.validationTimestamp)")
    List<Object[]> countByMonth(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT v FROM ValidationHistory v WHERE v.clientIp = :clientIp ORDER BY v.validationTimestamp DESC")
    List<ValidationHistory> findByClientIp(@Param("clientIp") String clientIp);
    
    @Query("SELECT COUNT(v) FROM ValidationHistory v WHERE v.validationTimestamp >= :date")
    long countValidationsSince(@Param("date") LocalDateTime date);
}
