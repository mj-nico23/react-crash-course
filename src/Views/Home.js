import React from 'react';
import Loader from '../Components/Loader';
import ProductCard from '../Components/ProductCard';
import { useAxiosGet } from '../Hooks/HttpRequests';

function Home() {
    const url = `https://5f38722b41c94900169bfe48.mockapi.io/api/products?page=1&limit=10`;
    
    let products = useAxiosGet(url);

    let content = null;

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