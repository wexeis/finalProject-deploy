import React from "react";
import "./ProductPopup.css";

function ProductPopup({ product, onClose }) {
  return (
    <div className="product-popup">
      <div className="product-popup__content">
        <button className="product-popup__close-button" onClick={onClose}>
          X
        </button>
        <div className="product-popup__image-container">
          <img
            src={product.productImage}
            alt={product.productName}
            className="product-popup__image"
          />
        </div>
        <div className="product-popup__details">
          <h2 className="product-popup__title">{product.productName}</h2>
          <p className="product-popup__description">{product.productDescription}</p>
          <p className="product-popup__price">Price: {product.finalPrice} $</p>
          <button className="product-popup__add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
