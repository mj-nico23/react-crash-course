import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import ProductCard from '../Components/ProductCard';

function Home() {
    const url = `https://5f38722b41c94900169bfe48.mockapi.io/api/products?page=1&limit=10`;
    const [products, setProducts] = useState({
        loading: false,
        data: null,
        error: false
    });
    let content = <div></div>

    useEffect(() => {
        setProducts({
            loading: true,
            data: null,
            error: false
        });
        axios.get(url)
            .then(response => {
                setProducts({
                    loading: false,
                    data: response.data,
                    error: false
                });
            })
            .catch(error => {
                setProducts({
                    loading: false,
                    data: null,
                    error: true
                });
            });
    }, [url]);

    if (products.loading) {
        content = <Loader />
    }

    if (products.error) {
        content = <p>
            There was an error please try again later.
        </p>
    }

    if (products.data) {
        content =
            products.data.map((product) => 
                <div key={product.id}>
                    <ProductCard product={product}/>
                </div>
            );
            
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-3">
                Best Sellers
            </h1>
            {content}
        </div>
    );
}

export default Home;