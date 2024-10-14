// src/components/search/ProductSearch.js
// src/components/search/ProductSearch.js

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProductSearch = ({ setProducts }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products?search=${query}`);
    if (response.ok) {
      const data = await response.json();
      setProducts(data); // Assuming the API returns a list of products
    } else {
      console.error('Error fetching products');
      setProducts([]); // Clear products on error
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} display="flex" alignItems="center" marginBottom={2}>
      <TextField
        variant="outlined"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default ProductSearch;
