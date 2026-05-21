package com.app.dao;

import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Asset;

import java.util.List;

public interface AssetDao {

    void insert(Asset asset);

    List<Asset> getAll();

    Asset getById(int id);

    void deleteById(int id)
            throws ResourceNotFoundException;

    void update(Asset asset);
}