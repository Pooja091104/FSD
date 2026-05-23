package com.config;

import com.model.Admin;
import com.model.Asset;
import com.model.Category;
import com.model.Employee;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {

        if(sessionFactory == null){

            Configuration configuration = new Configuration();

            configuration.setProperty(
                    "hibernate.connection.url",
                    "jdbc:mysql://localhost:3308/asset_management?createDatabaseIfNotExist=true"
            );

            configuration.setProperty(
                    "hibernate.connection.username",
                    "root"
            );

            configuration.setProperty(
                    "hibernate.connection.password",
                    "root"
            );

            configuration.setProperty(
                    "hibernate.connection.driver_class",
                    "com.mysql.cj.jdbc.Driver"
            );

            configuration.setProperty(
                    "hibernate.dialect",
                    "org.hibernate.dialect.MySQLDialect"
            );

            configuration.setProperty(
                    "hibernate.hbm2ddl.auto",
                    "update"
            );

            configuration.addAnnotatedClass(Asset.class);
            configuration.addAnnotatedClass(Category.class);
            configuration.addAnnotatedClass(Admin.class);
            configuration.addAnnotatedClass(Employee.class);

            sessionFactory =
                    configuration.buildSessionFactory();
        }


        return sessionFactory;
    }
    public static void closeFactory(){

        sessionFactory.close();
    }
}
