import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import WithdrawModal from './WithdrawModal';

const ProfileHeader = ({ user }) => {
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBecomeAffiliate = async () => {
        try {
            const response = await axios.post(`http://localhost:7000/api/v1/become-affliate/${user._id}`);
            if (response.status === 200) {
                setShowOtpModal(true);
            }
        } catch (error) {
            console.error('Error while becoming an affiliate:', error);
            toast.error('Failed to initiate affiliate request');
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        if (!otp) {
            toast.error('Please enter OTP');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:7000/api/v1/verify-become-affliate/${user._id}`,
                { otp }
            );

            if (response.status === 200) {
                setShowOtpModal(false);
                toast.success('Affiliate status confirmed!');
                const updatedUser = response.data.user;
                sessionStorage.setItem('user', JSON.stringify(updatedUser));
                window.location.href = '/user-profile';
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            toast.error('Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
            setOtp('');
        }
    };

    const handleRefer = () => {
        const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;
        const message = `Hi! I've been using this amazing platform. Sign up using my referral link: ${referralLink}`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    const handleWithdrawSuccess = () => {
        // Refresh user data or update UI as needed
        window.location.reload();
    };

    return (
        <div className="userhead text-white py-5 rounded-3 mb-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <div className="profile-avatar">
                            {user.userImage ? (
                                <div className="profileImage">
                                    <img
                                        src={user.userImage.url}
                                        alt="Profile"
                                        className="rounded-circle"
                                    />
                                </div>
                            ) : (
                                <div className="bg-light rounded-circle p-3">
                                    <FontAwesomeIcon icon={faUser} size="4x" className="text-secondary" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <h1 className="mb-2">{user.FullName}</h1>
                        <p className="mb-1">
                            <strong>Email:</strong> {user.Email}
                        </p>
                        <p className="mb-1">
                            <strong>Phone:</strong> {user.ContactNumber}
                        </p>
                        {user.Role === 'Affiliate' && (
                            <p className="mb-1">
                                <strong>Referral Code:</strong> {user.referralCode}
                            </p>
                        )}
                        {/* {user.Role === 'Affiliate' && (
                            <p className="mb-0">
                                <strong>Available Balance:</strong> ₹{user.referralCodeBonus}
                            </p>
                        )} */}
                    </div>
                    <div className="col-auto">
                        {user.Role !== 'Affiliate' ? (
                            <button
                                className="btn btn-light btn-lg"
                                onClick={handleBecomeAffiliate}
                            >
                                Become an Affiliate
                            </button>
                        ) : (
                            <div className="d-flex flex-column gap-2">
                                <span className="badge p-2 badgebgcolor mb-2">Affiliate Member</span>
                                <button
                                    className="btn btn-outline-light w-100"
                                    onClick={handleRefer}
                                >
                                    <i className="fab fa-whatsapp me-2"></i>
                                    Refer via WhatsApp
                                </button>
                                <button
                                    className="btn btn-light w-100"
                                    onClick={() => setShowWithdrawModal(true)}
                                >
                                    <i className="fas fa-wallet me-2"></i>
                                    Withdraw Funds
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Verify OTP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">Enter OTP</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                            placeholder="Enter the OTP sent to your email"
                        />
                        <small className="text-muted mt-2">
                            Please check your email for the OTP
                        </small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Withdraw Modal */}
            <WithdrawModal
                show={showWithdrawModal}
                onHide={() => setShowWithdrawModal(false)}
                user={user}
                onSuccess={handleWithdrawSuccess}
            />
        </div>
    );
};

export default ProfileHeader;