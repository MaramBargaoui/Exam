package com.exam.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI backendOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Backend API - Order Management")
                        .description("REST API to manage customer orders, order lines and attachments (SQLite). "
                                + "Swagger UI: http://localhost:8080/swagger-ui.html | "
                                + "OpenAPI JSON: http://localhost:8080/api-docs | "
                                + "Frontend sync: npm run sync:api")
                        .version("1.0"));
    }
}
