import React, { useState, useEffect, useContext } from "react";
import './shopComponent.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import CartContext from "../Cart/CartContext";
import ProductPopup from "./ProductPopup";

function ShopComponent() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { cart, handleAddProduct, setCart, UserId } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://final-project-idzh.onrender.com/product');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/category');
        const jsonData = await response.json();
        setCat(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredData = selectedCategory
    ? data.filter(product => product.categoryId === selectedCategory)
    : data;

  const doubleSearch = searchData
    ? filteredData.filter(product => product.productName.toLowerCase().includes(searchData.toLowerCase()))
    : filteredData;

  return (
    <div>
      <div className="search-shop">
        <div className="search-input-wrapper">
          <input
            type="search"
            placeholder="Search for your item"
            className="search-input"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <div className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>

      <div className="shop_product">
        <div className="hamburger">
          <div className="sideBar_products">
            <div className="div_color">
              <div className="list_categories">
                <div className="list_category">
                  <ul>
                    <li className="li_category" onClick={() => handleCategoryClick(null)}>All Products</li>
                    {cat.map((category, key) => (
                      <li
                        className={`li_category ${selectedCategory === category.categoryId ? 'selected' : ''}`}
                        key={key}
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        <span>{category.categoryName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="product_search">
              {doubleSearch.map((product, key) => (
                <figure
                  className="product-card"
                  key={product._id}
                  style={{ display: product.productQuantity ? 0 : "none" }}
                >
                  <img
                    src={product.productImage}
                    alt="Face mask"
                    className="product-card__image"
                    onClick={() => handleProductClick(product)}
                  />
                  <figcaption className="product-card__caption">
                    <header className="product-card__header">
                      <h2 className="product-card__title">{product.productName}</h2>
                          
                      <p className="product-card__subtitle">{product.categoryId}</p>
                    </header>
                    <footer className="product-card__footer">
                      <span className="product-card__price">Price: {product.finalPrice} $</span>
                      <button className="product-card__button" onClick={() => handleAddProduct(UserId, product._id, product.productName, 1, product.finalPrice, product.productImage)}>
                        <i className="product-card__icon ri-add-line"></i>
                      </button>
                    </footer>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default ShopComponent;
