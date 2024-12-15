import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Auth() {
    const [formData, setFormData] = useState({
        ContactNumber: '',
        Password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:7000/api/v1/Login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Assuming response contains authToken and user details
            const { token, user } = res.data;

            // Save authToken and user in sessionStorage
            sessionStorage.setItem('authToken', token);
            sessionStorage.setItem('user', JSON.stringify(user));

            // Redirect to dashboard or home page
            // navigate('/');
            window.location.href = '/'
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Internal server error in login:', error);
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
                                        name="ContactNumber"
                                        placeholder="Phone Number"
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
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                                <div
                                    id="emailHelp"
                                    className="form-text text-center mb-5 text-dark"
                                >
                                    Not Registered?{' '}
                                    <Link to="/register" className="text-dark fw-bold">
                                        Create an Account
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

export default Auth;
