import React, { useState, useEffect } from 'react';
import editImage from '../image/edit.png';
import deleteImage from '../image/delete.png';
import './product.css';

  function ProductsAdmin() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searched, setSearched] = useState('');
    
    useEffect(() => {
      getProducts();
      getCategories();
    }, []);
    
    const getProducts = async () => {
      try {
        const response = await fetch('https://final-project-idzh.onrender.com/product');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error('Error retrieving products');
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const getCategories = async () => {
      try {
        const response = await fetch('https://final-project-idzh.onrender.com/category');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error('Error retrieving categories');
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleDelete = async (productId) => {
      try {
        const response = await fetch(`https://final-project-idzh.onrender.com/product/${productId}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          console.log('Product deleted successfully');
          getProducts(); // Refresh the product list
        } else {
          throw new Error('Error deleting product');
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleEdit = (productId) => {
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            isEditing: !product.isEditing,
            editedFields: { ...product },
          };
        }
        return product;
      });
    
      setProducts(updatedProducts);
    };

    
    const handleInputChange = (productId, field, value) => {
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            editedFields: {
              ...product.editedFields,
              [field]: value,
            },
          };
        }
        return product;
      });
      setProducts(updatedProducts);
    };
    const handleCategoryChange = (productId, categoryId) => {
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            editedFields: {
              ...product.editedFields,
              categoryId,
            },
          };
        }
        return product;
      });
      
      setProducts(updatedProducts);
    };
    
    const handleImageSelect = (productId, e) => {
      const file = e.target.files[0];
      setSelectedImage(file);
    };
    
    const handleSave = async (productId) => {
      const updatedProduct = products.find((product) => product._id === productId);
      
      if (!updatedProduct) {
        return;
      }
      
      const { editedFields } = updatedProduct;
      
      const formData = new FormData();
      for (const field in editedFields) {
        formData.append(field, editedFields[field]);
      }
      
      if (selectedImage) {
        formData.append('file', selectedImage);
      }
      
      try {
        const response = await fetch(`https://final-project-idzh.onrender.com/product/${productId}`, {
          method: 'PATCH',
          body: formData,
        });
        
        if (response.ok) {
          console.log('Product updated successfully');
          getProducts(); // Refresh the product list
        } else {
          throw new Error('Error updating product');
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleSearchChange = (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
      );
      setSearched(filteredProducts);
    };
    
    const show = searched ? searched : products;
    
    const handleAddProduct = () => {
      setShowAddForm(!showAddForm);
    };
    
    return (
      <div className="products-admin">
        <h1>Products</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by product name"
            onChange={handleSearchChange}
          />
        </div>
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Sale</th>
              <th>Final Price</th>
              <th>Description</th>
              <th>Prescription</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {show.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.isEditing ? (
                    <input
                      type="text"
                      value={product.editedFields.productName}
                      onChange={(e) =>
                        handleInputChange(product._id, 'productName', e.target.value)
                      }
                    />
                  ) : (
                    product.productName
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <select
                      value={product.editedFields.categoryId}
                      onChange={(e) =>
                        handleCategoryChange(product._id, e.target.value)
                      }
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    categories.find((category) => category._id === product.categoryId)?.categoryName ||
                    ''
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <input
                      type="number"
                      value={product.editedFields.productQuantity}
                      onChange={(e) =>
                        handleInputChange(product._id, 'productQuantity', e.target.value)
                      }
                    />
                  ) : (
                    product.productQuantity
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <input
                      type="number"
                      value={product.editedFields.productPrice}
                      onChange={(e) =>
                        handleInputChange(product._id, 'productPrice', e.target.value)
                      }
                    />
                  ) : (
                    product.productPrice
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <input
                      type="number"
                      value={product.editedFields.sale}
                      onChange={(e) =>
                        handleInputChange(product._id, 'sale', e.target.value)
                      }
                    />
                  ) : (
                    product.sale
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <input
                      type="number"
                      value={product.editedFields.finalPrice}
                      onChange={(e) =>
                        handleInputChange(product._id, 'finalPrice', e.target.value)
                      }
                    />
                  ) : (
                    product.finalPrice
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <input
                      type="text"
                      value={product.editedFields.productDescription}
                      onChange={(e) =>
                        handleInputChange(product._id, 'productDescription', e.target.value)
                      }
                    />
                  ) : (
                    product.productDescription
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <input
                      type="text"
                      value={product.editedFields.prescription}
                      onChange={(e) =>
                        handleInputChange(product._id, 'prescription', e.target.value)
                      }
                    />
                  ) : (
                    <span>{product.prescription ? 'Yes' : 'No'}</span>
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <input type="file" onChange={(e) => handleImageSelect(product._id, e)} />
                  ) : (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="product-image"
                    />
                  )}
                </td>
                <td>
                  {product.isEditing ? (
                    <>
                      <button className="dash-save" onClick={() => handleSave(product._id)}>
                        Save
                      </button>
                      <button className="dash-cancel" onClick={() => handleEdit(product._id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(product._id)}>
                        <img src={editImage} alt="Edit" className="action-icon" />
                      </button>
                      <button onClick={() => handleDelete(product._id)}>
                        <img src={deleteImage} alt="Delete" className="action-icon" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default ProductsAdmin;





