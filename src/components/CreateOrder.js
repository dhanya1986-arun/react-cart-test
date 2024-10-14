// src/components/CreateOrder.js

import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  Snackbar,
} from '@mui/material';

// src/CreateOrder.js
import { useParams,useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const steps = ['Items', 'Address Details', 'Confirm Order'];

const token=localStorage.getItem('x-auth-token');
console.log("order-tok:"+token);

const CreateOrder = () => {
  const { id } = useParams();
  const location = useLocation(); 
  const navigate = useNavigate();// Hook to access location
  const { quantity } = location.state || {};
    console.log("q"+quantity);
  const [activeStep, setActiveStep] = useState(1);
 
  const [products, setProducts] = useState([]);
  //const [quantity, setQuantity] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState({
    name: '',
    contactNumber: '',
    street: '',
    city: '',
    landmark: '',
    state: '',
    zipcode: '',
  });
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchAddresses();
  }, []);
  
 
 
  const fetchAddresses = async () => {
    const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':token,
      },
      
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (response.status === 401) {
    // Handle the unauthorized case, e.g., log out the user or redirect to login
    alert('Session expired. Please log in again.');
    // Optionally redirect to the login page
   // navigate('/login'); // if using react-router
}
    const data = await response.json();
    setAddresses(data);
  };
  ////////////
  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${id}`, {
              method: 'GET',
                headers: {
                    'x-auth-token': token, // Replace with your actual token logic
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching product');
            }

            const data = await response.json();
            setProducts(data);
           
        } catch (error) {
            console.log('Error:', error);
        }
    };

    fetchProduct();
},[id] );
  /////
 console.log("id");

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleNewAddressChange = (event) => {
    setNewAddress({
      ...newAddress,
      [event.target.name]: event.target.value,
    });
  };

  const saveAddress = async () => {
    const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':token,
      },
      body: JSON.stringify(newAddress),
    });
    if (response.ok) {
      setSnackbarMessage('Address saved successfully!');
      fetchAddresses();
      setNewAddress({
        name: '',
        contactNumber: '',
        street: '',
        city: '',
        landmark: '',
        state: '',
        zipcode: '',
      });
    } else {
      setSnackbarMessage('Failed to save address.');
    }
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      setError('Please select an address!');
      return;
    }
    
    const response = await fetch(' https://dev-project-ecommerce.upgrad.dev/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':token,
      },
      body: JSON.stringify({quantity: quantity, address: selectedAddress ,product:id}),
     // body: JSON.stringify({ addresses})
    });
    console.log("test1"+response.data);
    if (response.ok) {
      setSnackbarMessage('Order placed successfully!');
      // Redirect to products page (update accordingly)
      setActiveStep(0);
      alert('Order placed successfully!');
      navigate('/products'); // Reset stepper
    } else {
      setSnackbarMessage('Failed to place order.');
    }
   
  };

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      setError('Please select an address!');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
     {/*}{activeStep === 0 && <div>Product Details Here</div>}*/}
      {activeStep === 1 && (
        <div>
          <h2>Address Details</h2>
          <TextField
            select
            label="Select Address"
            value={selectedAddress}
            onChange={handleAddressChange}
            fullWidth
          >
            {addresses.map((address) => (
              <MenuItem key={address.id} value={address.id}>
                {address.street}, {address.city}, {address.state}
              </MenuItem>
            ))}
            
      
     
  
          </TextField>
          <h3>Or Add a New Address</h3>
          <TextField
            name="name"
            label="Name"
            value={newAddress.name}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <TextField
            name="contactNumber"
            label="Contact Number"
            value={newAddress.contactNumber}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <TextField
            name="street"
            label="Street"
            value={newAddress.street}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <TextField
            name="city"
            label="City"
            value={newAddress.city}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <TextField
            name="landmark"
            label="Landmark"
            value={newAddress.landmark}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <TextField
            name="state"
            label="State"
            value={newAddress.state}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <TextField
            name="zipcode"
            label="Zipcode"
            value={newAddress.zipcode}
            onChange={handleNewAddressChange}
            fullWidth
          />
          <Button onClick={saveAddress}>Save Address</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
      {activeStep === 2 && (
        <div>
          <div  style={{ display: 'flex',gap: '800px'  }}>
          <div >
            <ul ><p  >
           
             <li>
                <h2  style={{ textAlign: 'left' }}>{products.name}</h2>
                <h4>  Quantity:{quantity}</h4>
                <h4>  Category:{products.category}</h4>
                <h4>  {products.description}</h4>
                <h3 style={{ color: 'red' }}>Total Price: {products.price}</h3>
                </li>
           
                </p></ul>
            </div>
             <div style={{ justifyContent: 'right' }}>
            <ul> <p style={{ textAlign: 'right' }}><h3 >Address Details: </h3>
                {addresses.map((address) => {
                    // Check if the address id matches the searchId
                    if (address.id === selectedAddress) {
                        return (
                            <li  key={address.id}>
                           <h4 style={{ textAlign: 'left' }}> {address.contactNumber}<br/> {address.street}<br/>  {address.city}<br/>  {address.state} <br/>{address.zipcode}</h4>
                            </li>
                        );
                    }
                    return null; // Skip rendering if the id doesn't match
                })}
            </p></ul>
            </div>
           </div>
     
          <Button onClick={handleConfirmOrder}>Place Order</Button>
          
        </div>
      )}
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button disabled={activeStep===2}
          variant="contained"
         
          onClick={handleNext}
        >
          {activeStep === steps.length - 1 ? null : 'Next'}
        </Button>
      </div>
      <Snackbar
        open={!!snackbarMessage}
        message={snackbarMessage}
        onClose={() => setSnackbarMessage('')}
        autoHideDuration={3000}
      />
    </div>
  );
};





export default CreateOrder;