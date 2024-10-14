// src/components/products/Products.js

// src/components/products/Products.js

/*import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';*/
//const imageurl='https://images.upgrad.com/8bf75c19-e51f-4597-b258-0a3548eabf99-Screenshot%202023-08-01%20at%2011.22.45%20AM.png';
//{/*image={product.image   || 'https://via.placeholder.com/150'}// Placeholder image */
/*const Products = ({isAdmin}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
 
 console.log("adm:"+isAdmin);
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    // Redirect to login if not authenticated
    if (!token) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Products</Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia style={{  height: '350px' }}
                component="img"
                alt={product.name}
                //height="140"
                
                image={product.image   || 'https://placehold.jp/100x100.png'}// Placeholder image
                title={product.name}
              />
              <CardContent>
                
                <Typography variant="h6">{product.name} </Typography>

                <Typography variant="h6">${product.price}</Typography>
                
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                {!isAdmin ?( <Button variant="contained" size="small" color="primary">BUY</Button>)
                :<>
                (<Button variant="contained" size="small" color="primary">Delete</Button>
                  <Button variant="contained" size="small" color="primary">Edit</Button>)
                  </>
                }
               
               

                
              
           
              </CardContent>
            </Card>
          </Grid>
        ))}s
      </Grid>
    </Container>
  );
};

export default Products;*/

import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Card, CardContent, CardMedia, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import { IconButton } from '@mui/material';
//import Editicon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
const Products = ({isAdmin} ) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('default');
  //const [isAdmin, setIsAdmin] = useState(true);  // Admin state
  const navigate = useNavigate();
 //token value give it directly.it expires aftersometime.so cant do any operations
  const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyODY0NTgwMSwiZXhwIjoxNzI4NjU0MjAxfQ.cFwzeREuUxdjQ67OYtFrMyZiEUH8iOiFH-jN3-maO4jRE4H92dzDyMlOFs-kVv-qlMwMUmaKboB8R2WabAFdJA';

 useEffect(() => {
     localStorage.setItem('x-auth-token', token); // Store the token
  if (!token) {
    navigate('/login');
  } else {
    fetchProducts();
  }
}, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
   
    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("prod"+isAdmin);

  

  // Category filtering
  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  // Sorting by price
  const sortProductsByPrice = (order) => {
    setSortOrder(order);
    let sortedProducts = [...products];

    if (order === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };
  //////////////////////////
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          
          'x-auth-token': token // Replace with your actual token logic
      },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Show alert message
      alert('Product deleted successfully!');
      navigate('/Products');
      // Update state to remove the deleted product from the list
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };
  /////////////////////////////

  // Filter products by selected category
  const displayedProducts = products.filter((product) => {
    return selectedCategory === 'ALL' || product.category === selectedCategory;
  });
  //const filteredProducts = products.filter(product =>
  //  product.name===searchTerm
//;
  return (
    <Container>
      {/* Category Tabs */}
      <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          color="primary"
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="product categories"
        >
          <ToggleButton value="ALL">ALL</ToggleButton>
          <ToggleButton value="APPAREL">APPAREL</ToggleButton>
          <ToggleButton value="ELECTRONICS">ELECTRONICS</ToggleButton>
          <ToggleButton value="FOOTWEAR">FOOTWEAR</ToggleButton>
          <ToggleButton value="PERSONAL CARE">PERSONAL CARE</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Sort Dropdown and Products Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Sort Dropdown */}
        <div style={{ marginRight: '20px' }}>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => sortProductsByPrice(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/*  */}
        <Grid container spacing={4} style={{ flexGrow: 1 }}>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          {displayedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card style={{width:300}}>
                <CardMedia
                  component="img"
                  height="200"
                  image={'https://placehold.jp/100x100.png' || 'https://placehold.jp/100x100.png'}// Placeholder image
                  alt={product.name}
                />
                <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' ,height:100}}>
                        <Typography variant="h6">{product.name}</Typography>
                       <Typography variant="h6" align="right">${product.price} </Typography>
                             </div>
                  <Typography>
                    {product.description}
                  </Typography>
                  <div>

                 
                 {isAdmin ? (
                    <>
                      
                      <div style={{display:'flex',gap:'10px'}}>
                       
                          <Link to={`/ProductDetails/${product.id}`} >
                         <Button variant="contained" color="primary">
                      BUY
                    </Button>
                    </Link>
                        
                       {/*} <Link to="/edit" >*/}
                        <Link to={`/edit/${product.id}`} >
                       <Button>Edit</Button>
                         </Link>
                     {/*  <Deleteicon style={{color:'grey',cursor:'pointer'}} />*/}
                     <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' ,padding: '5px 10px'}}>
                     🗑️ Delete
                     </button>
                   
                      </div>
                    </>
                  ) : (
                    <Link to={`/ProductDetails/${product.id}`} >
                    <Button variant="contained" color="primary" style={{ marginTop: '10px' ,width: '30px'}}>
                      BUY
                    </Button>
                    </Link>
                    
                  )}
                   </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Products;

