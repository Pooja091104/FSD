package com.app.model;

import com.app.enums.AssetStatus;

public class Asset {

    private int id;

    private String assetName;

    private String assetModel;

    private AssetStatus status;

    public Asset() {
    }

    public Asset(
            String assetName,
            String assetModel,
            AssetStatus status
    ) {
        this.assetName = assetName;
        this.assetModel = assetModel;
        this.status = status;
    }

    public Asset(
            int id,
            String assetName,
            String assetModel,
            AssetStatus status
    ) {
        this.id = id;
        this.assetName = assetName;
        this.assetModel = assetModel;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public String getAssetModel() {
        return assetModel;
    }

    public void setAssetModel(String assetModel) {
        this.assetModel = assetModel;
    }

    public AssetStatus getStatus() {
        return status;
    }

    public void setStatus(
            AssetStatus status
    ) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", assetName='" + assetName + '\'' +
                ", assetModel='" + assetModel + '\'' +
                ", status=" + status +
                '}';
    }
}