import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CartItem from '../CartItem/CartItem';
import AddressModal from '../AddressModal/AddressModal';
import { useCart } from '../../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const token = sessionStorage.getItem('authToken');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralLoading, setReferralLoading] = useState(false);
  const [isReferralValid, setIsReferralValid] = useState(false);
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const user = sessionStorage.getItem('user')
  const UserDetail = JSON.parse(user)
  // console.log(UserDetail)

  const handleReferralCheck = async () => {
    if (!referralCode.trim()) {
      toast.error('Please enter a referral code');
      return;
    }

    try {
      setReferralLoading(true);
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:7000/api/v1/checkReferralCode',
        { code: referralCode },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setIsReferralValid(true);
        toast.success('Referral code applied successfully!');
      } else {
        setIsReferralValid(false);
        toast.error(response.data.message || 'Invalid referral code');
      }
    } catch (error) {
      console.error('Error checking referral code:', error);
      toast.error(error.response?.data?.message || 'Failed to verify referral code');
      setIsReferralValid(false);
    } finally {
      setReferralLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAddressSubmit = async (addressData) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('authToken');

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your connection.');
        return;
      }

      const orderData = {
        ...addressData,
        items: items.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        finalMainPrice: total,
        isReferralCodeApplied: isReferralValid,
        appliedCode: isReferralValid ? referralCode : ''
      };

      const res = await axios.post(
        'http://localhost:7000/api/v1/create-order',
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const order = res.data.data.razorpayOrder;
      if (!order) {
        toast.success('Membership Plan Purchase successfully!')
        window.location.href = '/'
      }
      if (order) {

        const options = {
          key: 'rzp_test_cz0vBQnDwFMthJ',
          amount: total * 100,
          currency: 'INR',
          name: 'Om Shri Sale',
          description: 'Order payment',
          order_id: order?.id || '',
          callback_url: "http://localhost:7000/api/v1/payment-verify",
          prefill: {
            name: UserDetail.FullName, // Prefill customer data
            email: UserDetail.Email,
            contact: UserDetail.ContactNumber
          },
          theme: {
            color: '#F37254'
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.open();
      }
      toast.success('Order placed successfully!');
      localStorage.removeItem('cart');
      // window.location.href = '/';
      setShowAddressModal(false);
      onClose();

    } catch (error) {
      console.log('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="d-flex flex-column h-100">
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <ShoppingCart size={24} />
              <h5 className="mb-0">Shopping Cart</h5>
            </div>
            <button className="btn btn-link text-dark p-0" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow-1 overflow-auto p-3">
            {items.length === 0 ? (
              <div className="text-center py-5">
                <ShoppingCart size={48} className="text-muted mb-3" />
                <h5>Your cart is empty</h5>
                <p className="text-muted">Add items to get started</p>
              </div>
            ) : (
              <>
                {items.map(item => (
                  <CartItem
                    key={item._id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}

                <div className="mt-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter referral code"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      disabled={isReferralValid}
                    />
                    <button
                      className={`btn ${isReferralValid ? 'btn-success' : 'addtocartbg'}`}

                      onClick={handleReferralCheck}
                      disabled={referralLoading || isReferralValid}
                    >
                      {referralLoading ? 'Checking...' : isReferralValid ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {isReferralValid && (
                    <small className="text-success">Referral code applied successfully!</small>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="p-3 border-top bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Total Amount</h5>
              <h5 className="mb-0 nav-link">₹{total}</h5>
            </div>
            {
              token ? (<>
                <button
                  className="btn addtocartbg w-100 py-2"
                  disabled={items.length === 0 || loading}
                  onClick={() => setShowAddressModal(true)}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

              </>) : (<>
                <a className='btn w-100 py-2' style={{ backgroundColor: '#28834C', color: 'white' }} href="/login">Login</a>
              </>)
            }
          </div>
        </div>
      </div>

      <AddressModal
        show={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddressSubmit}
      />
    </>
  );
};

export default Cart;