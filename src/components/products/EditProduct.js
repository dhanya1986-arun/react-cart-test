/*import React, { useState, useEffect } from 'react';

const EditProduct = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  console.log("productIdtest"+productId);
  const token = localStorage.getItem('token'); // Ensure your token is managed correctly
  console.log("token"+token);
  useEffect(() => {
    const fetchProduct = async () => {
        try {
      const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`, {
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
           'x-auth-token':token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      console.log(data);
      setProduct(data);
      setProductName(data.name);
      setSelectedCategory(data.category);
      setManufacturer(data.manufacturer);
      setAvailableItems(data.availableItems);
      setPrice(data.price);
      setImageUrl(data.imageUrl);
      setDescription(data.description);
    }catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: productName,
      category: selectedCategory,
      manufacturer,
      availableItems: parseInt(availableItems),
      price: parseFloat(price),
      imageUrl,
      description,
    };

    try {
      const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${token}`,
         
           'x-auth-token':token,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const result = await response.json();
      console.log('Product updated:', result);
      setMessage('Product updated successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete product ${productName}?`)) {
      try {
        const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setMessage(`Product ${productName} deleted successfully`);
        // Optionally, redirect or reset the state after deletion
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Manufacturer:</label>
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Available Items:</label>
          <input
            type="number"
            value={availableItems}
            onChange={(e) => setAvailableItems(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Product</button>
        <button type="button" onClick={handleDelete}>Delete Product</button>
      </form>
    </div>
  );
};

export default EditProduct;*/
// UpdateProduct.jsx
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


const token=localStorage.getItem('x-auth-token');
console.log("edit-tok"+token);
//const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyODYzOTQ4NywiZXhwIjoxNzI4NjQ3ODg3fQ.bBSTJZaVBZCprVifjH93-yKaVmJ46y3z1f1rRokCpasHQnMxK3MjhzbuN1FN7BncvVeGZGI_KSheiQeazz5doA';
const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        price: '',
        description: '',
        manufacturer: '',
        availableItems: '',
        imageUrl: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
                    headers: {
                        'x-auth-token': token, // Replace with your actual token logic
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching product');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token, // Replace with your actual token logic
                },
                body: JSON.stringify(product)
            });

            if (!response.ok) {
                throw new Error('Error updating product');
            }

            const data = await response.json();
            setProduct(data);
            console.log('Product updated:', data);
            alert('Product updated successfully!');
            navigate('/Products');
            // Optionally redirect or reset form after successful update
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Product</h1>
            <input 
                type="text" 
                name="name" 
                value={product.name} 
                onChange={handleChange} 
                placeholder="Product Name" 
                required 
            />
            <input 
                type="text" 
                name="category" 
                value={product.category} 
                onChange={handleChange} 
                placeholder="Category" 
                required 
            />
            <input 
                type="number" 
                name="price" 
                value={product.price} 
                onChange={handleChange} 
                placeholder="Price" 
                required 
            />
            <textarea 
                name="description" 
                value={product.description} 
                onChange={handleChange} 
                placeholder="Description" 
                required 
            />
            <input 
                type="text" 
                name="manufacturer" 
                value={product.manufacturer} 
                onChange={handleChange} 
                placeholder="Manufacturer" 
                required 
            />
            <input 
                type="number" 
                name="availableItems" 
                value={product.availableItems} 
                onChange={handleChange} 
                placeholder="Available Items" 
                required 
            />
             <input 
                type="text" 
                name="imageUrl" 
                value={product.imageUrl} 
                onChange={handleChange} 
                placeholder="Image Url" 
                required 
            />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;

