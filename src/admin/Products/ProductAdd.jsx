import React, { useState } from 'react';
import axios from 'axios';
import "./productAdd.css"

  function ProductsAdd() {
    const [productName, setProductName] = useState('');
    const [dosage, setDosage] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [sale, setSale] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [perscription, setPerscription] = useState('');
  
    const handleImageSelect = (e) => {
      setProductImage(e.target.files[0]);
    };
  
    const handleAddProduct = async () => {
      try {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('dosage', dosage);
        formData.append('file', productImage);
        formData.append('categoryId', categoryId);
        formData.append('sale', sale);
        formData.append('productPrice', productPrice);
        formData.append('productQuantity', productQuantity);
        formData.append('perscription', perscription);
        console.log(formData)
        await axios.post('hhttps://final-project-idzh.onrender.com/product', formData , {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          
        });
        console.log('Product added successfully');
        // Reset the form fields
        setProductName('');
        setDosage('');
        setProductImage(null);
        setCategoryId('');
        setSale('');
        setProductPrice('');
        setProductQuantity('');
        setPerscription('');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  
    return (
      <div className="productForm-XY8S12">
      <h1 className="formTitle-AB7C45">Add Product</h1>
      <label className="formLabel-CDE345">
        Product Name:
        <input className="formInput-789D2E" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </label>
      <br />
      <label className="formLabel-FG6H12">
        Dosage:
        <input className="formInput-IJKL34" type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} />
      </label>
      <br />
      <label className="formLabel-MNOP56">
        Product Image:
        <input className="formInput-QRST78" type="file" onChange={handleImageSelect} />
      </label>
      <br />
      <label className="formLabel-UVWX90">
        Category ID:
        <input className="formInput-YZ1234" type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      </label>
      <br />
      <label className="formLabel-567ABC">
        Sale:
        <input className="formInput-DEF789" type="number" value={sale} onChange={(e) => setSale(e.target.value)} />
      </label>
      <br />
      <label className="formLabel-GHIJKL">
        Product Price:
        <input className="formInput-MNOPQR" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      </label>
      <br />
      <label className="formLabel-STUVWX">
        Product Quantity:
        <input className="formInput-YZ1234" type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
      </label>
      <br />
      <label className="formLabel-567DEF">
        Prescription:
        <input className="formInput-GHIJKL" type="text" value={perscription} onChange={(e) => setPerscription(e.target.value)} />
      </label>
      <br />
      <button className="submitButton-789MNO" onClick={handleAddProduct}>Add Product</button>
    </div>
    
    );
  }
  
export default ProductsAdd;