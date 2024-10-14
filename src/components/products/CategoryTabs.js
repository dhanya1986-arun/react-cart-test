import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
//import { Typography } from '@mui/material';

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={handleCategoryChange}
        aria-label="product categories"
      >
        <ToggleButton value="All" aria-label="all products">
          All 
        </ToggleButton>
        <ToggleButton value="Apparel" aria-label="clothing">
          Apparel
        </ToggleButton>
        <ToggleButton value="electronics" aria-label="electronics">
          Electronics
        </ToggleButton>
        
        <ToggleButton value="personalcare" aria-label="accessories">
          Personal Care
        </ToggleButton>
      </ToggleButtonGroup>

    { /* <Typography variant="h6" style={{ marginTop: '20px' }}>
        Selected Category: {selectedCategory}
      </Typography>*/}
    </div>
  );
};

export default CategoryTabs;
