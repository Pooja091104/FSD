package com.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration

@ComponentScan(basePackages = "com.app")

@EnableTransactionManagement

public class AppConfig {

    @Bean
    public DataSource getDbConnection(){

        DriverManagerDataSource dataSource =
                new DriverManagerDataSource();

        dataSource.setUrl(
                "jdbc:mysql://localhost:3308/asset_management"
        );

        dataSource.setUsername("root");

        dataSource.setPassword("root");

        dataSource.setDriverClassName(
                "com.mysql.cj.jdbc.Driver"
        );

        return dataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean
    getEntityManagerFactory(DataSource dataSource){

        LocalContainerEntityManagerFactoryBean emf =
                new LocalContainerEntityManagerFactoryBean();

        emf.setDataSource(dataSource);

        emf.setPackagesToScan("com.app.model");

        emf.setJpaVendorAdapter(
                new HibernateJpaVendorAdapter()
        );

        Properties properties = new Properties();

        properties.setProperty(
                "hibernate.hbm2ddl.auto",
                "update"
        );

        emf.setJpaProperties(properties);

        return emf;
    }

    @Bean
    public JpaTransactionManager
    jpaTransactionManager(
            LocalContainerEntityManagerFactoryBean emf
    ){

        JpaTransactionManager transactionManager =
                new JpaTransactionManager();

        transactionManager.setEntityManagerFactory(
                emf.getObject()
        );

        return transactionManager;
    }
}