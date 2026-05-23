package com.app.dao_impl;

import com.app.dao.AuthDao;
import com.app.model.Admin;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Component;

@Component
public class AuthDaoImpl implements AuthDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Admin login(String name, String password) {

        Query query = entityManager.createQuery(
                "select a from Admin a where a.name=:name and a.password=:password"
        );

        query.setParameter("name", name);
        query.setParameter("password", password);

        return (Admin) query.getSingleResult();
    }
}