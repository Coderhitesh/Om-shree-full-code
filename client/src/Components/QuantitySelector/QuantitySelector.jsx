import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity, onQuantityChange }) => {
  return (
    <div className="quantity-selector">
      <button
        className="quantity-btn"
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
      >
        <Minus size={20} />
      </button>
      <input
        type="number"
        className="quantity-input"
        value={quantity}
        onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
        min="1"
      />
      <button
        className="quantity-btn"
        onClick={() => onQuantityChange(quantity + 1)}
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default QuantitySelector;