package com.vti.springdatajpa.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Once this is added, you’ll see your custom metadata at:
 *
 * http://localhost:8080/swagger-ui.html
 *
 * or http://localhost:8080/swagger-ui/index.html
 *
 * And the OpenAPI JSON spec at:
 *
 * http://localhost:8080/v3/api-docs
 */
@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("My API")
                        .description("This is a sample Spring Boot 3.3.5 REST API with Swagger documentation")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Your Name")
                                .email("your.email@example.com")
                                .url("https://your-website.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")));
    }
}