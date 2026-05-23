package com.app;

import com.app.config.AppConfig;
import com.app.dao.AssetDao;
import com.app.dao.AuthDao;
import com.app.dao_impl.AssetDaoImpl;
import com.app.dao_impl.AuthDaoImpl;
import com.app.enums.AssetStatus;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Admin;
import com.app.model.Asset;
import com.app.model.Category;
import jakarta.persistence.NoResultException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.Scanner;

public class App {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        AuthDao authDao = context.getBean(AuthDao.class);

        AssetDao assetDao = context.getBean(AssetDao.class);

        Scanner sc = new Scanner(System.in);

        System.out.println("-------- ASSET MANAGEMENT LOGIN --------");

        System.out.println("Enter Admin Name");
        String name = sc.next();

        System.out.println("Enter Password");
        String password = sc.next();

        try {

            Admin admin = authDao.login(name, password);

            System.out.println("Welcome " + admin.getName());

            while (true) {

                System.out.println("\n1. Add Asset");
                System.out.println("2. Delete Asset");
                System.out.println("3. View All Assets");
                System.out.println("4. Update Asset");

                System.out.println("0. Exit");

                int op = sc.nextInt();

                if (op == 0) {
                    break;
                }

                switch (op) {

                    case 1:

                        sc.nextLine();

                        System.out.println("Enter Asset Name");
                        String assetName = sc.nextLine();

                        System.out.println("Enter Asset Model");
                        String assetModel = sc.nextLine();

                        System.out.println("Enter Status");
                        String status = sc.next();

                        System.out.println("Enter Category Id");
                        int categoryId = sc.nextInt();

                        Category category = new Category();
                        category.setId(categoryId);

                        Asset asset = new Asset();

                        asset.setAssetName(assetName);
                        asset.setAssetModel(assetModel);
                        asset.setStatus(
                                AssetStatus.valueOf(status)
                        );
                        asset.setCategory(category);

                        assetDao.save(asset, admin.getId());

                        System.out.println("Asset Added");

                        break;

                    case 2:

                        System.out.println("Enter Asset Id");
                        int deleteId = sc.nextInt();

                        try {

                            assetDao.delete(deleteId);

                            System.out.println("Asset Deleted");

                        } catch (ResourceNotFoundException e) {

                            System.out.println(e.getMessage());
                        }

                        break;

                    case 3:

                        System.out.println("------ ALL ASSETS ------");

                        assetDao.findAll(admin.getId())
                                .forEach(System.out::println);

                        break;

                    case 4:

                        System.out.println("Enter Asset Id To Update");

                        int updateId = sc.nextInt();

                        try {

                            Asset updateAsset =
                                    assetDao.getById(
                                            updateId,
                                            admin.getId()
                                    );

                            sc.nextLine();

                            System.out.println("Enter New Asset Name");
                            String newName = sc.nextLine();

                            System.out.println("Enter New Asset Model");
                            String newModel = sc.nextLine();

                            System.out.println("Enter New Status");
                            String newStatus = sc.next();

                            updateAsset.setAssetName(newName);
                            updateAsset.setAssetModel(newModel);

                            updateAsset.setStatus(
                                    AssetStatus.valueOf(newStatus)
                            );

                            assetDao.update(updateAsset);

                            System.out.println("Asset Updated");

                        } catch (ResourceNotFoundException e) {

                            System.out.println(e.getMessage());
                        }

                        break;

                    default:

                        System.out.println("Invalid Option");
                }
            }

        } catch (NoResultException e) {

            System.out.println("Invalid Credentials");
        }

        sc.close();

        context.close();
    }
}