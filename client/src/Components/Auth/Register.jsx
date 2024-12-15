import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        ContactNumber: '',
        Password: '',
        getReferralCode: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract referral code from query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const referralCode = params.get('ref');
        if (referralCode) {
            setFormData((prev) => ({ ...prev, getReferralCode: referralCode }));
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:7000/api/v1/Create-User', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Assuming response contains user data and token
            const { token, user } = res.data;

            // Save token and user in sessionStorage
            sessionStorage.setItem('authToken', token);
            sessionStorage.setItem('user', JSON.stringify(user));

            // Navigate to another page (e.g., dashboard or home)
            window.location.href = '/';
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Internal server error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card my-5">
                            <form
                                className="card-body cardbody-color p-lg-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="text-center">
                                    <img
                                        src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                                        className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                        style={{ width: '100px' }}
                                        alt="profile"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="getReferralCode"
                                        placeholder="Referral Code (Optional)"
                                        value={formData.getReferralCode}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="FullName"
                                        placeholder="Name"
                                        value={formData.FullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="Email"
                                        placeholder="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ContactNumber"
                                        placeholder="Phone No."
                                        value={formData.ContactNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="Password"
                                        placeholder="Password"
                                        value={formData.Password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: '#28834C', color: 'white' }}
                                        className="btn btn-color px-5 mb-5 w-100"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            'Register'
                                        )}
                                    </button>
                                </div>
                                <div
                                    id="emailHelp"
                                    className="form-text text-center mb-5 text-dark"
                                >
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-dark fw-bold">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
