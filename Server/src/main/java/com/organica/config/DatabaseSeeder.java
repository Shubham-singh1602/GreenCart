package com.organica.config;

import com.organica.entities.Product;
import com.organica.repositories.ProductRepo;
import com.organica.services.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepo productRepo;

    @Override
    public void run(String... args) throws Exception {
        if (productRepo.count() == 0) {
            System.out.println("No products found in the database. Seeding initial products...");

            List<Product> products = new ArrayList<>();

            // product-1.png = Orange
            products.add(createProduct(
                    "Fresh Organic Oranges",
                    "Juicy, vitamin C-packed organic oranges sourced from sun-drenched orchards.",
                    55.0f,
                    1.0f,
                    "/images/product-1.png"
            ));

            // product-2.png = Lime
            products.add(createProduct(
                    "Fresh Organic Limes",
                    "Tangy and zesty organic limes, perfect for cooking, juicing and cocktails.",
                    40.0f,
                    0.5f,
                    "/images/product-2.png"
            ));

            // product-3.png = Watermelon
            products.add(createProduct(
                    "Organic Watermelon",
                    "Sweet, refreshing organic watermelon — nature's perfect summer hydration.",
                    80.0f,
                    2.5f,
                    "/images/product-3.png"
            ));

            // product-4.png = Strawberries
            products.add(createProduct(
                    "Fresh Red Strawberries",
                    "Luscious and ripe organic strawberries, handpicked at peak sweetness.",
                    120.0f,
                    0.25f,
                    "/images/product-4.png"
            ));

            // product-5.png = Pomegranate
            products.add(createProduct(
                    "Fresh Pomegranate",
                    "Antioxidant-rich organic pomegranates with deep ruby-red arils bursting with flavor.",
                    150.0f,
                    0.6f,
                    "/images/product-5.png"
            ));

            // product-6.png = Red Onion
            products.add(createProduct(
                    "Organic Red Onions",
                    "Sharp, flavourful organic red onions — a kitchen essential for every home.",
                    35.0f,
                    1.0f,
                    "/images/product-6.png"
            ));

            // product-7.png = Broccoli
            products.add(createProduct(
                    "Fresh Organic Broccoli",
                    "Nutrient-dense organic broccoli florets, crisp and perfect for steaming or stir-frying.",
                    60.0f,
                    0.5f,
                    "/images/product-7.png"
            ));

            // product-8.png = Spinach
            products.add(createProduct(
                    "Fresh Spinach Leaves",
                    "Tender, iron-rich organic spinach leaves — washed and ready to enjoy.",
                    35.0f,
                    0.25f,
                    "/images/product-8.png"
            ));

            // Dairy Products — generated images
            products.add(createProduct(
                    "Fresh Whole Milk",
                    "Pasteurized, grass-fed organic milk, packed with goodness and creamy flavor.",
                    80.0f,
                    1.0f,
                    "/images/product-milk.png"
            ));

            products.add(createProduct(
                    "Fresh Organic Eggs",
                    "Farm-fresh, free-range organic brown eggs, perfect for a healthy breakfast.",
                    95.0f,
                    0.5f,
                    "/images/product-eggs.png"
            ));

            products.add(createProduct(
                    "Pure Organic Honey",
                    "100% pure, unfiltered organic honey sourced from local wildflower apiaries.",
                    220.0f,
                    0.4f,
                    "/images/product-honey.png"
            ));

            productRepo.saveAll(products);
            System.out.println("Successfully seeded 11 organic products!");
        } else {
            System.out.println("Product database already contains data. Skipping seeding.");
        }
    }

    private Product createProduct(String name, String description, float price, float weight, String imgPath) {
        Product product = new Product();
        product.setProductName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setWeight(weight);

        // Compress image path string to match standard bytes format
        byte[] pathBytes = imgPath.getBytes(StandardCharsets.UTF_8);
        product.setImg(ProductServiceImpl.compressBytes(pathBytes));

        return product;
    }
}
