package com.app.dao_impl;

import com.app.dao.CategoryDao;
import com.app.model.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryDaoImpl implements CategoryDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Category> getAll() {

        TypedQuery<Category> query =
                entityManager.createQuery(
                        "select c from Category c",
                        Category.class
                );

        return query.getResultList();
    }
}