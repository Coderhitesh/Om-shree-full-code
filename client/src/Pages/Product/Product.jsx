import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { Loader2 } from 'lucide-react';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:7000/api/v1/get-all-product');
      setProducts(data.products);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <p className="text-danger fs-5">{error}</p>
          <button
            onClick={handleFetchProduct}
            className="btn btn-primary mt-3"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">
            Health & Wellness Products
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Discover our range of premium vitamins and supplements designed to support your daily health and wellness journey.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((product) => (
            <div className="col-lg-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;