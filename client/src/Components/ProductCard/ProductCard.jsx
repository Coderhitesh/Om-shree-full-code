import React from 'react';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="card h-100 shadow-sm">
            <Link to={`/product/${product._id}`} className="text-decoration-none">
                <div className="position-relative">
                    <img
                        src={product.images.url}
                        alt={product.name}
                        className="card-img-top"
                        style={{ height: '250px', objectFit: 'cover' }}
                    />
                    {product.discountPercent > 0 && (
                        <span className="position-absolute top-0 end-0 mt-3 me-3 badge bg-danger">
                            -{product.discountPercent}% OFF
                        </span>
                    )}
                </div>

                <div style={{paddingBottom:'0px'}} className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{product.name}</h5>
                    <p className="card-text text-muted small">
                        {product.catchLine.replace(/\*\*/g, '')}
                    </p>

                    <div className="d-flex align-items-center mb-3">
                        <Tag className="me-2" size={16} />
                        <small className="text-muted">{product.numberOfCapsule} capsules</small>
                    </div>
                </div>
            </Link>

            <div className="card-footer bg-white border-top-0">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 style={{color:'#28834C'}} className="mb-0">₹{product.afterDiscountPrice}</h4>
                        {product.mainPrice !== product.afterDiscountPrice && (
                            <small className="text-muted text-decoration-line-through">
                                ₹{product.mainPrice}
                            </small>
                        )}
                    </div>
                    <button
                        className="btn addtocartbg"
                        onClick={() => addToCart(product, 1)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;