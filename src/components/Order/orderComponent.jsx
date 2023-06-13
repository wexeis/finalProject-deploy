import React, { useEffect, useState, useContext } from 'react';
import './order.css';
import CartContext from '../Cart/CartContext';
import { useNavigate } from 'react-router';

export default function Order() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [cartData, setCartData] = useState([]);
  const { UserId, data,fetchData } = useContext(CartContext);
  const{ cart, setCart } =useContext(CartContext)
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (window.location.pathname === '/order') {
  //     fetchData();
  //   }
  // }, [window.location.pathname]);

  useEffect(() => {
    fetchData();
\    setCartData(data);
  }, [data]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const handleDeleteACart = () => {
    fetch(`https://final-project-idzh.onrender.com/cart/${UserId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete cart');
        }
        return response.json();
      })
      .then((data) => {

        // console.log('Cart deleted:', data);
        setCart({ userId: '', products: [] })

      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setShippingAddress(event.target.value);
  };

    const handleConfirmOrder = () => {
      if (!phoneNumber || !shippingAddress) {
        alert('Please enter both phone number and shipping address.');
        return;}
      const userId = UserId;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          phoneNumber,
          shippingAddress,
        }),
      };
        // fetch(`https://final-project-idzh.onrender.com/order/`, requestOptions)
      fetch(`http://localhost:5000/order/`, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log('Order confirmed!');
            console.log(response)
            setCart({ userId: '', products: [] })
  // navigate('/user')
          } else {
            console.log('Error confirming order:', response.status);
          }
          // console.log(requestOptions);
        })
        .catch((error) => {
          console.log('Error confirming order:', error);
        });
    };

    const handleCancelOrder = () => {
      
            setCart({ userId: '', products: [] })

    };


  // const calculateTotal = () => {
  //   const total = data.reduce((acc, order) => {
  //     return (
  //       acc +
  //       order.products.reduce((acc, product) => {
  //         return acc + product.finalPrice;
  //       }, 0)
  //     );
  //   }, 0);

  //   return total;
  // };
  // console.log(cartData[0].products.length)

  // const calculateTotal = () =>{
  //   let total = 0;
  //   for(let i = 0; i< cartData[0].products.length; i++){
  //     total = total + cartData[0].products[i].finalPrice * cartData[0].products[i].quantity
  //     }
  //     return total
  // }

  return (
    <div className="order-page">
      <h1 className="order-page__title">Order</h1>
      {/* <hr className='line'/> */}
      <span className="spn">
        You have&nbsp;
        <span className="allqty">
          {cartData.reduce(
            (acc, order) =>
              acc +
              order.products.reduce(
                (acc, product) => acc + product.quantity,
                0
              ),
            0
          )}
        </span>
        &nbsp;items in your cart.
      </span>
      <div className="container_order">
        <div className="left-side">
          <div className="product-details">
            {cartData.map((order) => (
              <div key={order.id} className="order-page_orderleft">
                {order.products.map((product) => (
                  <div key={product.product} className="items">
                    <p className="order-page__product-name">
                      Product Name: {product.productName}
                    </p>
                    <p className="order-page__product-quantity">
                      Quantity: {product.quantity}
                    </p>
                    <p className="order-page__product-price">
                      Price: {product.finalPrice * product.quantity }
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="right-side">
          <div className="order-info">
            <span className="order-info_title">Order Details</span>
            <hr className="line-right" />
            <div className="form-group">
              <div className="phn">
                <label className="radio">Phone number :</label>{' '}
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="form-control"
                />
              </div>
              <div className="adrs">
                <label className="radio">Address :</label>{' '}
                <input
                  type="text"
                  placeholder="Enter shipping address"
                  value={shippingAddress}
                  onChange={handleAddressChange}
                  className="form-control"
                />
              </div>
            </div>
            <hr className="line" />
            <div className="payment ">
              <span>Cache on Delivery </span>
            </div>
            <div className="order-page__bill">
              {/* <p>Total: {calculateTotal()}&nbsp; $</p> */}
            </div>
            <hr className="line" />
            <div className="btn_dev">
              <button onClick={handleConfirmOrder} className="confirm-button">
                Confirm Order
              </button>
              <button
                onClick={() => {
                  handleDeleteACart();
                  fetchData();
                }}
                className="cancel-button"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}