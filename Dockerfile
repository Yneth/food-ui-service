FROM java:8-jre

ADD ./target/food-ui-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/food-ui-service.jar"]

EXPOSE 8090