import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:7000/api/v1/get-all-product');
        const foundProduct = data.products.find((p) => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, Math.min(value, product?.quantity || 1)));
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="mb-4">
            <svg className="text-danger" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M32 8l32 56H0L32 8z" />
              <path d="M32 48v-20m0 28v-4" />
            </svg>
          </div>
          <h2 className="h3 text-danger mb-3">Oops!</h2>
          <p className="lead text-muted">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
            <li className="breadcrumb-item"><a href="/products" className="text-decoration-none">Products</a></li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Product Image */}
          <div className="col-lg-6">
            <div className="position-relative">
              <div className="ratio ratio-1x1">
                <img
                  src={product.images.url}
                  alt={product.name}
                  className="img-fluid rounded-4 shadow-lg object-fit-cover"
                />
              </div>
              {product.discountPercent > 0 && (
                <div className="position-absolute top-0 end-0 m-4">
                  <div className="badge bg-danger p-3 rounded-pill fs-5 shadow">
                    {product.discountPercent}% OFF
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="sticky-lg-top" style={{ top: '2rem' }}>
              <div className="bg-white p-4 rounded-4 shadow-sm">
                <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
                <p className="lead text-muted mb-4">{product.catchLine.replace(/\*\*/g, '')}</p>

                <div className="mb-4 pb-4 border-bottom">
                  <div className="d-flex align-items-baseline gap-3">
                    <h2 style={{color:"#28834C"}} className="display-6 fw-bold mb-0">₹{product.afterDiscountPrice}</h2>
                    {product.mainPrice !== product.afterDiscountPrice && (
                      <span className="fs-4 text-muted text-decoration-line-through">
                        ₹{product.mainPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold mb-3">Quantity</label>
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="btn headerbtn rounded-circle p-2"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      <Minus size={24} />
                    </button>
                    <input
                      type="number"
                      className="form-control form-control-lg text-center"
                      style={{ width: '100px' }}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    />
                    <button
                      className="btn headerbtn rounded-circle p-2"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>

                <button
                  className="btn addtocartbg btn-lg w-100 d-flex align-items-center justify-content-center gap-3"
                  onClick={() => addToCart(product, quantity)}
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-5">
          <ul className="nav nav-pills nav-fill mb-4" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'howToUse' ? 'active' : ''}`}
                onClick={() => setActiveTab('howToUse')}
              >
                How to Use
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'dosage' ? 'active' : ''}`}
                onClick={() => setActiveTab('dosage')}
              >
                Dosage
              </button>
            </li>
          </ul>

          <div className="tab-content bg-white p-4 rounded-4 shadow-sm">
            <div className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`}>
              <h3 className="h4 mb-4">Product Description</h3>
              <p className="text-muted">{product.description}</p>
            </div>
            <div className={`tab-pane fade ${activeTab === 'howToUse' ? 'show active' : ''}`}>
              <h3 className="h4 mb-4">How to Use</h3>
              <p className="text-muted">{product.howToUse}</p>
            </div>
            <div className={`tab-pane fade ${activeTab === 'dosage' ? 'show active' : ''}`}>
              <h3 className="h4 mb-4">Dosage Information</h3>
              <p className="text-muted">{product.doge}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;