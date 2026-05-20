import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axiosFetch from "../../Helper/Axios";

export const ListProduct = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Fresh Vegetables");

  const fatchData = async () => {
    const response = await axiosFetch({
      "url": "product/",
      "method": "GET",
    });
    console.log(response.data);
    setData(response.data || []);
  };

  useEffect(() => {
    fatchData();
  }, []);

  const getProductCategory = (product) => {
    const name = (product.productName || "").toLowerCase();
    
    // Dairy Products
    if (name.includes("milk") || name.includes("egg") || name.includes("honey") || name.includes("butter") || name.includes("cheese") || name.includes("yogurt")) {
      return "Dairy Products";
    }
    // Fish & Meat
    if (name.includes("salmon") || name.includes("fish") || name.includes("meat") || name.includes("chicken") || name.includes("beef") || name.includes("seafood") || name.includes("prawn")) {
      return "Fish & Meat";
    }
    // Healthy Fruit
    if (name.includes("orange") || name.includes("lime") || name.includes("lemon") || name.includes("watermelon") || name.includes("strawberr") || name.includes("pomegranate") || name.includes("banana") || name.includes("apple") || name.includes("mango") || name.includes("grape") || name.includes("berry") || name.includes("fruit")) {
      return "Healthy Fruit";
    }
    // Default: Fresh Vegetables
    return "Fresh Vegetables";
  };

  const filteredData = data.filter(item => getProductCategory(item) === activeCategory);

  return (
    <>
      <section id="products" className="section product">
        <div className="container">
          <p className="section-subtitle"> -- Organic Products --</p>
          <h2 className="h2 section-title">All Organic Products</h2>
          
          <ul className="filter-list">
            <li>
              <button 
                className={`filter-btn ${activeCategory === "Fresh Vegetables" ? "active" : ""}`}
                onClick={() => setActiveCategory("Fresh Vegetables")}
              >
                <img
                  src="./images/filter-1.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-1-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Fresh Vegetables</p>
              </button>
            </li>
            
            <li>
              <button 
                className={`filter-btn ${activeCategory === "Fish & Meat" ? "active" : ""}`}
                onClick={() => setActiveCategory("Fish & Meat")}
              >
                <img
                  src="./images/filter-2.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-2-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Fish &amp; Meat</p>
              </button>
            </li>
            
            <li>
              <button 
                className={`filter-btn ${activeCategory === "Healthy Fruit" ? "active" : ""}`}
                onClick={() => setActiveCategory("Healthy Fruit")}
              >
                <img
                  src="./images/filter-3.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-3-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Healthy Fruit</p>
              </button>
            </li>
            
            <li>
              <button 
                className={`filter-btn ${activeCategory === "Dairy Products" ? "active" : ""}`}
                onClick={() => setActiveCategory("Dairy Products")}
              >
                <img
                  src="./images/filter-1.png"
                  width={20}
                  alt=""
                  className="default"
                />
                <img
                  src="./images/filter-1-active.png"
                  width={20}
                  alt=""
                  className="color"
                />
                <p className="filter-text">Dairy Products</p>
              </button>
            </li>
          </ul>
          
          <ul className="grid-list">
            {filteredData.map((item) => 
               <ProductCard 
                 key={item.productid} 
                 id={item.productid} 
                 name={item.productName} 
                 description={item.description} 
                 price={item.price} 
                 img={item.img} 
               />
            )}
            {filteredData.length === 0 && (
              <div className="w-100 text-center py-5" style={{ gridColumn: "1 / -1" }}>
                <p style={{ color: "var(--text-secondary, #777)", fontSize: "1.1rem" }}>
                  No organic products available in this category yet. Check back soon!
                </p>
              </div>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};
