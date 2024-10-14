// src/components/products/SearchBar.js

// src/components/products/SearchBar.js

import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import NavBar from './components/navbar/NavBar';
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', margin: 2 }}>
       
      <TextField
        label="Search Products"
        variant="outlined"
        
        onChange={(e) => setQuery(e.target.value)}
        sx={{ flexGrow: 1, marginRight: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary">Search</Button>
    </Box>
  );
};

export default SearchBar;
