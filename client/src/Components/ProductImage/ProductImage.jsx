import React from 'react';

const ProductImage = ({ image, name, discountPercent }) => {
  return (
    <div className="product-image-container">
      <img
        src={image}
        alt={name}
        className="product-image"
      />
      {discountPercent > 0 && (
        <div className="discount-badge">
          -{discountPercent}% OFF
        </div>
      )}
    </div>
  );
};

export default ProductImage;