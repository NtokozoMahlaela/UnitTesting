# Use a build stage with Gradle
FROM gradle:8-jdk17 AS build

# Set working directory
WORKDIR /app

# Copy gradle wrapper first for better caching
COPY gradlew gradlew.bat ./
COPY gradle ./gradle

# Copy gradle files and download dependencies
COPY build.gradle settings.gradle ./
RUN ./gradlew dependencies --configuration compileClasspath

# Copy source code
COPY src ./src

# Build the application
RUN ./gradlew clean build -x test

# Use a runtime stage with OpenJDK
FROM eclipse-temurin:17-jre-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Create non-root user
RUN addgroup -S appgroup && adduser -S -G appgroup appuser
RUN chown -R appuser:appgroup /app
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
