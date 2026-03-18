package com.validator.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum CitizenshipStatus {
    SOUTH_AFRICAN("South African Citizen"),
    PERMANENT_RESIDENT("Permanent Resident"),
    UNKNOWN("Unknown");

    private final String displayName;

    CitizenshipStatus(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static CitizenshipStatus fromString(String value) {
        if (value == null) return UNKNOWN;
        
        for (CitizenshipStatus status : CitizenshipStatus.values()) {
            if (status.displayName.equalsIgnoreCase(value) || 
                status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        return UNKNOWN;
    }
}
