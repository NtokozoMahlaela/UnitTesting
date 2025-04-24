# South African ID Number Validator

## Overview
This project implements a **South African ID number validator** in Java, following the principles of **Test-Driven Development (TDD)**. The validator checks if a given ID number is valid according to the official South African rules, including format, date, gender, citizenship, and checksum validation.

## Features
- **13-digit format check**: Ensures the ID is exactly 13 digits long.
- **Date validation**: Checks that the YYMMDD portion represents a valid date (including leap years).
- **Gender code validation**: Validates the SSSS portion (0000-4999 for females, 5000-9999 for males).
- **Citizenship status validation**: Checks that the citizenship digit is 0 (SA citizen) or 1 (permanent resident).
- **Luhn checksum validation**: Ensures the last digit is a valid Luhn checksum for the first 12 digits.

## TDD Methodology
The project strictly follows the TDD cycle:
1. **RED**: Write a failing test for a new rule or feature.
2. **GREEN**: Write just enough code to make the test pass.
3. **REFACTOR**: Clean up the code while ensuring all tests still pass.

Each validation rule was implemented by first writing a failing test, then making it pass, and finally refactoring for clarity and maintainability.

## Validation Rules
The validator enforces the following rules for a valid South African ID:
1. **Format**: 13 digits, structured as `YYMMDDSSSSCAZ`.
2. **Date of Birth (YYMMDD)**: Must be a valid date (supports leap years).
3. **Gender Code (SSSS)**: 0000-4999 for females, 5000-9999 for males.
4. **Citizenship (C)**: 0 = SA citizen, 1 = permanent resident.
5. **Checksum (Z)**: Must match the Luhn algorithm result for the first 12 digits.

## Project Structure
```
validate_sa_id/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/validator/ValidateSaId.java         # Main validator logic
│   └── test/
│       └── java/
│           └── com/validator/ValidateSaIdTest.java     # JUnit 5 test suite
├── build.gradle                                        # Gradle build file
├── README.md                                           # This file
```

## Usage
### 1. Run the Validator from Command Line
You can run the validator with a specific ID number:
```sh
cd validate_sa_id
./gradlew run --args="2001014800086"
```
Or run the main method from your IDE.

### 2. Run the Tests
To run all tests and view the results:
```sh
./gradlew clean test
```
Test results can be viewed in the HTML report at:
```
build/reports/tests/test/index.html
```

## Example Valid and Invalid IDs
| ID Number        | Expected Result | Reason                        |
|------------------|----------------|-------------------------------|
| 2001014800086    | true           | Valid ID                      |
| 2909035800085    | true           | Valid ID                      |
| 12345            | false          | Too short                     |
| 12345678901234   | false          | Too long                      |
| 2001014A00086    | false          | Contains non-numeric character|
| 2013014800086    | false          | Invalid month (13)            |
| 9001015000088    | false          | Invalid checksum              |

## How to Add New Validation Rules
1. Write a failing test in `ValidateSaIdTest.java` for the new rule.
2. Implement the rule in `ValidateSaId.java` until the test passes.
3. Refactor if needed, and ensure all tests still pass.

## Dependencies
- Java 8 or higher
- JUnit 5 (Jupiter)
- Gradle

## Contributing
Contributions are welcome! Please follow the TDD cycle for any new features or bug fixes. Open an issue or submit a pull request.

## License
This project is released under the MIT License.
