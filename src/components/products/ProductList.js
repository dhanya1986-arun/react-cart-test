import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ selectedCategory, sortOrder }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                let sortedProducts = response.data;

                // Sort products based on the selected sort order
                if (sortOrder === 'priceLowToHigh') {
                    sortedProducts.sort((a, b) => a.price - b.price);
                } else if (sortOrder === 'priceHighToLow') {
                    sortedProducts.sort((a, b) => b.price - a.price);
                } else if (sortOrder === 'newest') {
                    sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                }

                // Filter products by selected category
                if (selectedCategory !== 'all') {
                    sortedProducts = sortedProducts.filter(product => product.category === selectedCategory);
                }

                setProducts(sortedProducts);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, [selectedCategory, sortOrder]);

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;