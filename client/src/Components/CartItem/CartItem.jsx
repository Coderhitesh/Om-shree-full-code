import React from 'react';
import { Trash2 } from 'lucide-react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="card border-0 shadow-sm mb-3 overflow-hidden">
      <div className="card-body p-3">
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              src={item.images.url}
              alt={item.name}
              className="rounded"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
          <div className="col">
            <h6 className="mb-1">{item.name}</h6>
            <p className="text-primary mb-2">₹{item.afterDiscountPrice}</p>
            <div className="d-flex align-items-center gap-3">
              <select
                className="form-select form-select-sm w-auto"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2"
                onClick={() => removeFromCart(item._id)}
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
          <div className="col-auto">
            <h6 className="mb-0">₹{item.afterDiscountPrice * item.quantity}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;