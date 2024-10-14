
import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import './AddProduct.css'; // Import your CSS file for styling

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [manufacturer, setManufacturer] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  
  const token=localStorage.getItem('x-auth-token');
  console.log("addtoken:"+token);
    const fetchCategories = async () => {
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products/categories'); 
      const data = await response.json();
      const categories = data.map(category => ({
        value: category,
        label: category,
      }));
      setCategoryOptions(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (newValue) => {
    setSelectedCategory(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryId = selectedCategory ? selectedCategory.value : null;

    // Example: Process form submission logic here
    const productData = {
      name: productName,
      category: categoryId,
      manufacturer,
      availableItems: parseInt(availableItems),
      price: parseFloat(price),
      imageUrl,
      description,
    };

    console.log('Product Data:', productData);
   // const token = localStorage.getItem('x-auth-token');
    //const token1=Response.headers.getItem('X-auth-token')
    //const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyNzUyOTU5NCwiZXhwIjoxNzI3NTM3OTk0fQ.4N754S6XTm1Sdx75807m2bW-GsuZ8TeIgmAzMPNgyRC8XtxfvpMdf2tUhMthSwpX23QtGuqu6HFmnbpSEZlCLQ';
          
    // Here you can send productData to your API
    try {
      //console.log("token1"+token);
      await fetch('https://dev-project-ecommerce.upgrad.dev/api/products', { // Replace with your API URL
        method: 'POST',
        headers: {
         
          'Content-Type': 'application/json',
         'x-auth-token':token
          //'Authorization': `Bearer <token>`,
         // 'x-auth-token':token,
        
        },
        body: JSON.stringify(productData),
        
      });
     // console.log("token2"+token);
      // Reset form after submission
      setProductName('');
      setSelectedCategory(null);
      setManufacturer('');
      setAvailableItems('');
      setPrice('');
      setImageUrl('');
      setDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <CreatableSelect
          id="category"
          isClearable
          options={categoryOptions}
          onChange={handleCategoryChange}
          value={selectedCategory}
          placeholder="Select or create a category"
        />
      </div>
      <div className="form-group">
        <label htmlFor="manufacturer">Manufacturer:</label>
        <input
          type="text"
          id="manufacturer"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="availableItems">Available Items:</label>
        <input
          type="number"
          id="availableItems"
          value={availableItems}
          onChange={(e) => setAvailableItems(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Product Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;

