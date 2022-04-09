package bredex.f1applicationbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jdbc.JdbcRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class , JdbcRepositoriesAutoConfiguration.class},scanBasePackages={
		"bredex.f1applicationbackend",
		"bredex.f1applicationbackend.config",
		"bredex.f1applicationbackend.config.security"
})
@EnableJpaRepositories
public class F1ApplicationBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(F1ApplicationBackendApplication.class, args);
	}

}
