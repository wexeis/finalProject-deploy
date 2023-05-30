import React, { useEffect, useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import './CartComponent.css';
import CartContext from './CartContext';
import { useNavigate } from 'react-router-dom';
export default function CartComponent() {
  const{ cart, setCart } =useContext(CartContext)

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getTotalPrice = () => {
    return cart.products.reduce((total, item) => total + item.total, 0);
  };

  const handleRemoveItem = (itemId) => {
    setCart({
      ...cart,
      products: cart.products.filter((item) => item.productId !== itemId),
    });
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    setCart({
      ...cart,
      products: cart.products.map((item) => {
        if (item.productId === itemId) {
          return { ...item, quantity: newQuantity, total: item.price * newQuantity };
        }
        return item;
      }),
    });
  };
  const handleCreatingCart = async (productId, productName, finalPrice) => {
    try {
      const response = await fetch('https://final-project-idzh.onrender.com/cart/ ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: cart.userId, 
          products: cart.products
        }),
        
      });
      const data = await response.json();
      // console.log(data);
     
      localStorage.getItem('loggedIn')? navigate('/order'): navigate('/login') 
      setCart({userId: '',
               products:[] })
     
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Cart</h1>
      <table className="cart-page__table">
        <thead>
          <tr>
            <th className="cart-page__table-header">Name</th>
            <th className="cart-page__table-header">Price</th>
            <th className="cart-page__table-header">Quantity</th>
            <th className="cart-page__table-header">Total</th>
            <th className="cart-page__table-header"></th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((product) => (
            <tr key={product.productId} className="cart-page__table-row">
              <td className="cart-page__table-cell">{product.productName}</td>
              <td className="cart-page__table-cell">${parseFloat(product.finalPrice).toFixed(2)}</td>
              <td className="cart-page__table-cell">
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(event) => handleQuantityChange(product.productId, parseInt(event.target.value))}
                  className="cart-page__quantity-input"
                />
              </td>
              <td className="cart-page__table-cell">${parseFloat(product.finalPrice * product.quantity).toFixed(2)}</td>
              <td className="cart-page__table-cell">
                <button className="cart-page__remove-button" onClick={() => handleRemoveItem(product.productId)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="cart-page_table-cell cart-page_table-cell--total">Total</td>
            <td className="cart-page_table-cell cart-page_table-cell--total"></td>
            <td className="cart-page_table-cell cart-page_table-cell--total"></td>
            <td className="cart-page_table-cell cart-page_table-cell--total">${getTotalPrice()}</td>
            <td className="cart-page_table-cell cart-page_table-cell--total"></td>
          </tr>
          <tr>
            <td className="cart-page__table-cell" colSpan="5">
            <button className="cart-page__checkout-button" onClick={handleCreatingCart}>

 Proceed to Checkout
</button>

            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
          }