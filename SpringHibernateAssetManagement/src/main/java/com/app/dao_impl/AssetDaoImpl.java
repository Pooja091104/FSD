package com.app.dao_impl;

import com.app.dao.AssetDao;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Admin;
import com.app.model.Asset;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
public class AssetDaoImpl implements AssetDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Asset> findAll(int adminId) {

        TypedQuery<Asset> query =
                entityManager.createQuery(
                        "select a from Asset a where a.admin.id=:id",
                        Asset.class
                );

        query.setParameter("id", adminId);

        return query.getResultList();
    }

    @Override
    public void save(Asset asset, int adminId) {

        Admin admin =
                entityManager.find(Admin.class, adminId);

        asset.setAdmin(admin);

        entityManager.persist(asset);
    }
    @Override

   public Asset getById(int id, int adminId) {

        Asset asset =
                entityManager.find(Asset.class, id);

        if(asset == null){

            throw new ResourceNotFoundException(
                    "Invalid Asset ID"
            );
        }

        return asset;
    }

    @Override
    public void update(Asset asset) {

        entityManager.merge(asset);
    }

    @Override
    public void delete(int id) {

        Asset asset =
                entityManager.find(Asset.class, id);

        if(asset == null){

            throw new ResourceNotFoundException(
                    "Invalid Asset ID"
            );
        }

        entityManager.remove(asset);
    }
}