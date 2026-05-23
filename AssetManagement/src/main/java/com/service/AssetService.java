package com.service;

import com.exception.ResourceNotFoundException;
import com.model.Asset;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class AssetService {

    private final Session session;

    public AssetService(Session session) {
        this.session = session;
    }

    public void insert(Asset asset){

        Transaction tx =
                session.beginTransaction();

        session.persist(asset);

        tx.commit();
    }

    public List<Asset> getAllAssets(){

        Transaction tx =
                session.beginTransaction();

        List<Asset> list =
                session
                        .createQuery(
                                "from Asset",
                                Asset.class
                        )
                        .list();

        tx.commit();

        return list;
    }

    public Asset getById(int id){

        Transaction tx =
                session.beginTransaction();

        Asset asset =
                session.find(Asset.class,id);

        tx.commit();

        if(asset == null){

            throw new ResourceNotFoundException(
                    "Asset ID not found"
            );
        }

        return asset;
    }

    public void deleteRecord(int id){

        Transaction tx =
                session.beginTransaction();

        Asset asset =
                session.find(Asset.class,id);

        if(asset == null){

            tx.commit();

            throw new ResourceNotFoundException(
                    "Asset ID not found"
            );
        }

        session.remove(asset);

        tx.commit();
    }
}