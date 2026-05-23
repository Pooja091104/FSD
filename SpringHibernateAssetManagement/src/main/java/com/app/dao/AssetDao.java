package com.app.dao;

import com.app.model.Asset;

import java.util.List;

public interface AssetDao {

    List<Asset> findAll(int adminId);

    void save(Asset asset, int adminId);

    Asset getById(int id, int adminId);

    void update(Asset asset);

    void delete(int id);
}