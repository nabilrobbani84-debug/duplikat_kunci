# Step 1: Build menggunakan Maven
FROM maven:3.8.4-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Run menggunakan OpenJDK 17
FROM openjdk:17-jdk-slim
COPY --from=build /target/duplikat-kunci-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "app.jar"]
