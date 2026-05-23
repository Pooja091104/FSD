package com.app.model;

import com.app.enums.AssetStatus;
import jakarta.persistence.*;

@Entity

public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;

    private String assetModel;

    private String assetName;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    @ManyToOne
    private Admin admin;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Employee employee;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAssetModel() {
        return assetModel;
    }

    public void setAssetModel(String assetModel) {
        this.assetModel = assetModel;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public AssetStatus getStatus() {
        return status;
    }

    public void setStatus(AssetStatus status) {
        this.status = status;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", assetModel='" + assetModel + '\'' +
                ", assetName='" + assetName + '\'' +
                ", status=" + status +
                '}';
    }
}