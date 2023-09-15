package com.microservices.apigateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {
    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder){
        return builder.routes()
        .route(p -> p.path("/user-service/**")
                    .filters(f -> f.rewritePath("/user-service/(?<segment>.*)", "/${segment}"))
                .uri("lb://user-service"))
        .route(p -> p.path("/movie-service/**")
                    .filters(f -> f.rewritePath("/movie-service/(?<segment>.*)", "/${segment}"))   
                .uri("lb://movie-service"))
        .build();
    }
}
