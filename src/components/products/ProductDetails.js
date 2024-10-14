import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
//import { alignProperty } from '@mui/material/styles/cssUtils';
const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  //const history = useHistory();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching product details.');
      }
    };

    fetchProductDetails();
  }, [id]);
  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value > 0) {
      setQuantity(value);
      setError(''); // Clear any previous error
    } else {
      setError('Quantity must be a positive integer.');
    }
  };

  const handlePurchase = (id) => {
   
    // Logic for handling purchase can be implemented here
   // console.log(`Purchasing ${quantity} of ${product?.name}`);
   navigate(`/CreateOrder/${product.id}`,{state:{quantity}});
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

 
return (
  <container>
     <div style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
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
 
  <div style={styles.container}>
   {/*} <img src={product.imageUrl  || 'https://placehold.jp/100x100.png'} alt={product.name} style={styles.image} />*/}
    <img src={'https://placehold.jp/300x100.png' ||product.imageUrl   } alt={product.name} style={styles.image} />
    <div style={styles.details}>
      <div style={{display:'flex'}}>
      <h1>{product.name}</h1>
      <p style={styles.availableQuantity}><strong >Available Items:</strong> {product.availableItems}</p>
      </div>
      <p><strong>Category:</strong> {product.category}</p>
      
      <p> {product.description}</p>
      <p style={{color:'red',font:'initial'}}> ${product.price.toFixed(2)}</p>
      <div style={styles.quantityContainer}>
       {/*} <label htmlFor='Enter quantity'></label>
          Quantity:
          <input 
            type="number" 
            id="Enter Quantity"
            value={quantity} 
            onChange={handleQuantityChange} 
            min="1" 
            style={styles.quantityInput} 
          />*/}
           <TextField
          label="Enter Quantity"
          id="Enter Quantity"
          value={quantity} 
          onChange={handleQuantityChange} 
          size="small"
          
        />
          
        
      </div>
      <button onClick={handlePurchase} style={styles.orderButton}>
      Place Order
        </button>
      </div>
    </div>
    </container>
  );
};
  

const styles = {
  container: {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    maxWidth: '800px',
    margin: 'auto',
    
  },
  availableQuantity: {
    display: 'inline-block',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  padding: '8px 20px',
    textAlign: 'center',
    marginLeft:'10px',
   
    //marginBottom:'5px',
  },
 
  image: {
    maxWidth: '300px',
    maxHeight: '300px',
    objectFit: 'cover',
    marginRight: '16px',
  },
  details: {
    flex: 1,
  },
  quantityContainer: {
    margin: '10px 0',
  },
  quantityInput: {
    marginLeft: '10px',
    width: '60px',
  },
  orderButton: {
    padding: '5px 10px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    width:'130px',
    marginRight:'5px',
  },
};
export default ProductDetails;

 