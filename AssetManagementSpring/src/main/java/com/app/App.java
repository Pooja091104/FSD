package com.app;

import com.app.config.AppConfig;
import com.app.dao.AssetDao;
import com.app.dao_impl.AssetDaoImpl;
import com.app.enums.AssetStatus;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Asset;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.Scanner;

public class App {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(
                        AppConfig.class
                );

        Scanner sc = new Scanner(System.in);

        AssetDao assetDao =
                context.getBean(AssetDaoImpl.class);

        while(true){

            System.out.println("1. Add Asset");
            System.out.println("2. Delete Asset");
            System.out.println("3. Update Asset");
            System.out.println("4. View All Assets");
            System.out.println("5. Get Asset By ID");
            System.out.println("0. Exit");

            int op = sc.nextInt();

            if(op == 0)
                break;

            switch(op){

                case 1:

                    Asset asset = new Asset();

                    sc.nextLine();

                    System.out.println(
                            "Enter Asset Name:"
                    );

                    asset.setAssetName(
                            sc.nextLine()
                    );

                    System.out.println(
                            "Enter Asset Model:"
                    );

                    asset.setAssetModel(
                            sc.nextLine()
                    );

                    System.out.println(
                            "Enter Status:"
                    );

                    asset.setStatus(
                            AssetStatus.valueOf(
                                    sc.next().toUpperCase()
                            )
                    );

                    assetDao.insert(asset);

                    break;

                case 2:

                    System.out.println(
                            "Enter Asset ID:"
                    );

                    int id = sc.nextInt();

                    try{

                        assetDao.deleteById(id);
                    }

                    catch(ResourceNotFoundException e){

                        System.out.println(
                                e.getMessage()
                        );
                    }

                    break;

                case 3:

                    System.out.println(
                            "Enter Asset ID:"
                    );

                    id = sc.nextInt();

                    try{

                        Asset existingAsset =
                                assetDao.getById(id);

                        System.out.println(
                                existingAsset
                        );

                        sc.nextLine();

                        System.out.println(
                                "Enter New Asset Name:"
                        );

                        existingAsset.setAssetName(
                                sc.nextLine()
                        );

                        System.out.println(
                                "Enter New Asset Model:"
                        );

                        existingAsset.setAssetModel(
                                sc.nextLine()
                        );

                        System.out.println(
                                "Enter New Status:"
                        );

                        existingAsset.setStatus(
                                AssetStatus.valueOf(
                                        sc.next().toUpperCase()
                                )
                        );

                        assetDao.update(existingAsset);
                    }

                    catch(
                            EmptyResultDataAccessException e
                    ){

                        System.out.println(
                                "Invalid Asset ID"
                        );
                    }

                    break;

                case 4:

                    assetDao
                            .getAll()
                            .forEach(System.out::println);

                    break;

                case 5:

                    System.out.println(
                            "Enter Asset ID:"
                    );

                    id = sc.nextInt();

                    try{

                        Asset asset1 =
                                assetDao.getById(id);

                        System.out.println(asset1);
                    }

                    catch(
                            EmptyResultDataAccessException e
                    ){

                        System.out.println(
                                "Invalid Asset ID"
                        );
                    }

                    break;

                default:

                    System.out.println(
                            "Invalid Option"
                    );
            }
        }

        sc.close();

        context.close();
    }
}