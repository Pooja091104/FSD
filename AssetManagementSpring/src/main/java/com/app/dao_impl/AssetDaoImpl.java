package com.app.dao_impl;

import com.app.dao.AssetDao;
import com.app.enums.AssetStatus;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Asset;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AssetDaoImpl
        implements AssetDao {

    private final JdbcTemplate jdbcTemplate;

    public AssetDaoImpl(
            JdbcTemplate jdbcTemplate
    ) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Asset> mapper(){

        return (rs, num) -> {

            return new Asset(

                    rs.getInt("id"),

                    rs.getString("assetName"),

                    rs.getString("assetModel"),

                    AssetStatus.valueOf(
                            rs.getString("status")
                    )
            );
        };
    }

    @Override
    public void insert(Asset asset) {

        String sql =
                "insert into asset(assetName, assetModel, status) values(?,?,?)";

        jdbcTemplate.update(
                sql,
                asset.getAssetName(),
                asset.getAssetModel(),
                asset.getStatus().toString()
        );

        System.out.println("Asset Added");
    }

    @Override
    public List<Asset> getAll() {

        String sql =
                "select * from asset";

        return jdbcTemplate.query(
                sql,
                mapper()
        );
    }

    @Override
    public Asset getById(int id) {

        String sql =
                "select * from asset where id=?";

        return jdbcTemplate.queryForObject(
                sql,
                mapper(),
                id
        );
    }

    @Override
    public void deleteById(int id)
            throws ResourceNotFoundException {

        String sql =
                "delete from asset where id=?";

        int rows =
                jdbcTemplate.update(sql, id);

        if(rows == 0){

            throw new ResourceNotFoundException(
                    "Invalid Asset ID"
            );
        }

        System.out.println("Asset Deleted");
    }

    @Override
    public void update(Asset asset) {

        String sql =
                "update asset set assetName=?, assetModel=?, status=? where id=?";

        jdbcTemplate.update(
                sql,
                asset.getAssetName(),
                asset.getAssetModel(),
                asset.getStatus().toString(),
                asset.getId()
        );

        System.out.println("Asset Updated");
    }
}