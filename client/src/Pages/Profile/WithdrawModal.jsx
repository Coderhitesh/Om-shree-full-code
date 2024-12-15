import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const WithdrawModal = ({ show, onHide, user, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [receivedMethod, setReceivedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Bank Details
  const [bankDetails, setBankDetails] = useState({
    name: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });

  // UPI Details
  const [upiDetails, setUpiDetails] = useState({
    id: '',
    name: ''
  });

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };

  const handleMethodSelect = (method) => {
    setReceivedMethod(method);
    setStep(2);
  };

  const handleBankDetailsChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleUpiDetailsChange = (e) => {
    setUpiDetails({
      ...upiDetails,
      [e.target.name]: e.target.value
    });
  };

  const validateAmount = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return false;
    }
    if (amount > user.referralCodeBonus) {
      toast.error(`Amount cannot be greater than available balance ₹${user.referralCodeBonus}`);
      return false;
    }
    return true;
  };

  const validateDetails = () => {
    if (receivedMethod === 'Bank') {
      if (!bankDetails.name || !bankDetails.accountNumber || 
          !bankDetails.ifscCode || !bankDetails.accountHolderName) {
        toast.error('Please fill all bank details');
        return false;
      }
    } else if (receivedMethod === 'Upi') {
      if (!upiDetails.id || !upiDetails.name) {
        toast.error('Please fill all UPI details');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateAmount() || !validateDetails()) return;

    try {
      setLoading(true);
      const token = sessionStorage.getItem('authToken');
      const withdrawalData = {
        amount: parseFloat(amount),
        receivedMethod,
        ...(receivedMethod === 'Bank' ? { bankDetails } : { upiDetails })
      };

      const response = await axios.post(
        'http://localhost:7000/api/v1/make-withdrawal',
        withdrawalData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        toast.success('Withdrawal request submitted successfully');
        onSuccess();
        handleReset();
      }
    } catch (error) {
      console.error('Withdrawal request failed:', error);
      toast.error(error.response?.data?.message || 'Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAmount('');
    setReceivedMethod('');
    setBankDetails({ name: '', accountNumber: '', ifscCode: '', accountHolderName: '' });
    setUpiDetails({ id: '', name: '' });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleReset} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Withdraw Funds</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="form-label">Available Balance</label>
              <h3 className="text-success">₹{user.referralCodeBonus}</h3>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="form-label">Enter Amount to Withdraw</label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="d-grid gap-2">
              <button 
                className="btn btn-outline-primary"
                onClick={() => handleMethodSelect('Bank')}
                disabled={!amount}
              >
                Bank Transfer
              </button>
              <button 
                className="btn btn-outline-primary"
                onClick={() => handleMethodSelect('Upi')}
                disabled={!amount}
              >
                UPI Transfer
              </button>
            </div>
          </div>
        )}

        {step === 2 && receivedMethod === 'Bank' && (
          <div>
            <h5 className="mb-3">Bank Details</h5>
            <div className="mb-3">
              <label className="form-label">Bank Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={bankDetails.name}
                onChange={handleBankDetailsChange}
                placeholder="Enter bank name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Number</label>
              <input
                type="text"
                className="form-control"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailsChange}
                placeholder="Enter account number"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">IFSC Code</label>
              <input
                type="text"
                className="form-control"
                name="ifscCode"
                value={bankDetails.ifscCode}
                onChange={handleBankDetailsChange}
                placeholder="Enter IFSC code"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Holder Name</label>
              <input
                type="text"
                className="form-control"
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handleBankDetailsChange}
                placeholder="Enter account holder name"
              />
            </div>
          </div>
        )}

        {step === 2 && receivedMethod === 'Upi' && (
          <div>
            <h5 className="mb-3">UPI Details</h5>
            <div className="mb-3">
              <label className="form-label">UPI ID</label>
              <input
                type="text"
                className="form-control"
                name="id"
                value={upiDetails.id}
                onChange={handleUpiDetailsChange}
                placeholder="Enter UPI ID"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Account Holder Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={upiDetails.name}
                onChange={handleUpiDetailsChange}
                placeholder="Enter account holder name"
              />
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {step === 2 && (
          <Button variant="secondary" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        <Button variant="secondary" onClick={handleReset}>
          Cancel
        </Button>
        {step === 2 && (
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : 'Submit Withdrawal'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default WithdrawModal;