package com.service;

import com.model.Admin;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class AuthService {

    private final Session session;

    public AuthService(Session session) {
        this.session = session;
    }

    public Admin login(String name,String password){

        Transaction tx =
                session.beginTransaction();

        Admin admin =
                session.createQuery(
                                "from Admin where name=:name and password=:password",
                                Admin.class
                        )
                        .setParameter("name",name)
                        .setParameter("password",password)
                        .getSingleResult();

        tx.commit();

        return admin;
    }
}