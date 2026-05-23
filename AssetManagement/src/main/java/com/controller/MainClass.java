package com.controller;

import com.config.HibernateConfig;
import com.enums.AssetStatus;
import com.exception.ResourceNotFoundException;
import com.model.Admin;
import com.model.Asset;
import com.model.Category;
import com.service.AssetService;
import com.service.AuthService;
import jakarta.persistence.NoResultException;
import org.hibernate.Session;

import java.util.List;
import java.util.Scanner;

public class MainClass {

    public static void main(String[] args) {

        Session session =
                HibernateConfig
                        .getSessionFactory()
                        .openSession();

        Scanner sc = new Scanner(System.in);

        AssetService assetService =
                new AssetService(session);

        AuthService authService =
                new AuthService(session);

        System.out.println("----- ADMIN LOGIN -----");

        System.out.println("Enter Name:");
        String name = sc.next();

        System.out.println("Enter Password:");
        String password = sc.next();

        try{

            Admin adminLogin =
                    authService.login(name,password);

            System.out.println(
                    "Welcome " +
                            adminLogin.getName()
            );

            while(true){

                System.out.println("\n1. Add Asset");
                System.out.println("2. Delete Asset");
                System.out.println("3. View All Assets");
                System.out.println("4. Update Asset");
                System.out.println("0. Exit");

                int op = sc.nextInt();

                if(op == 0)
                    break;

                switch(op){

                    case 1:

                        Asset asset = new Asset();

                        sc.nextLine();

                        System.out.println("Enter Asset Name:");
                        asset.setAssetName(sc.nextLine());

                        System.out.println("Enter Asset Model:");
                        asset.setAssetModel(sc.nextLine());

                        System.out.println("Enter Status:");
                        asset.setStatus(
                                AssetStatus.valueOf(
                                        sc.next().toUpperCase()
                                )
                        );

                        System.out.println("Enter Category ID:");
                        int categoryId = sc.nextInt();

                        Category category =
                                session.find(
                                        Category.class,
                                        categoryId
                                );

                        asset.setCategory(category);

                        asset.setAdmin(adminLogin);

                        assetService.insert(asset);

                        System.out.println("Asset Added");

                        break;

                    case 2:

                        System.out.println("Enter Asset ID:");

                        int id = sc.nextInt();

                        try{

                            assetService.deleteRecord(id);

                            System.out.println("Asset Deleted");
                        }

                        catch(ResourceNotFoundException e){

                            System.out.println(e.getMessage());
                        }

                        break;

                    case 3:

                        List<Asset> list =
                                assetService.getAllAssets();

                        list.forEach(System.out::println);

                        break;

                    case 4:

                        System.out.println("Enter Asset ID:");

                        id = sc.nextInt();

                        try{

                            asset =
                                    assetService.getById(id);

                            sc.nextLine();

                            System.out.println("Enter New Asset Name:");

                            asset.setAssetName(sc.nextLine());

                            System.out.println("Enter New Asset Model:");

                            asset.setAssetModel(sc.nextLine());

                            System.out.println("Enter New Status:");

                            asset.setStatus(
                                    AssetStatus.valueOf(
                                            sc.next().toUpperCase()
                                    )
                            );

                            assetService.insert(asset);

                            System.out.println("Asset Updated");
                        }

                        catch(ResourceNotFoundException e){

                            System.out.println(e.getMessage());
                        }

                        break;

                    default:

                        System.out.println("Invalid Option");
                }
            }
        }

        catch(NoResultException e){

            System.out.println("Invalid Login");
        }

        sc.close();
        session.close();
    }
}