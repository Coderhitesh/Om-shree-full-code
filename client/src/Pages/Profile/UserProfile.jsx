import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileTabs from './ProfileTabs';
import ProfileUpdate from './ProfileUpdate';
import OrderHistory from './OrderHistory';
import axios from 'axios';
import toast from 'react-hot-toast';
import Refers from './Refers';
import Withdraw from './Withdraw';

function UserProfile() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    // Safely retrieving user data from sessionStorage
    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    const token = sessionStorage.getItem('authToken');

    if (!user || !token) {
        return (
            <div className="container py-5 text-center">
                <h2>Please login to view your profile</h2>
            </div>
        );
    }

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authToken');
        navigate('/login');
    };

    const handleProfileUpdate = async (updatedData) => {
        const userId = user._id;

        try {
            // Create a FormData object to handle both text and file data
            const formData = new FormData();
            formData.append('FullName', updatedData.FullName);
            formData.append('ContactNumber', updatedData.ContactNumber);
            formData.append('Email', updatedData.Email);

            // Only append userImage if it's present
            if (updatedData.userImage) {
                formData.append('userImage', updatedData.userImage);
            }

            // Make API call to update the user profile
            const res = await axios.put(
                `http://localhost:7000/api/v1/update-user/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Authorization header
                    },
                }
            );

            // console.log("user", res.data.data);

            // Update session storage with the new user data
            const updatedUser = res.data.data; // Assuming the API response includes the updated user object
            sessionStorage.setItem('user', JSON.stringify(updatedUser)); // Ensure it's stored as a string

            // Show success message
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="profile-page">
            <ProfileHeader user={user} />

            <div className="container">
                {user.Role !== 'Affiliate' ? null : <ProfileStats user={user} />}

                <ProfileTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    handleLogout={handleLogout}
                    user={user}
                />

                <div className="tab-content">
                    {activeTab === 'profile' && <ProfileUpdate user={user} onUpdate={handleProfileUpdate} />}
                    {activeTab === 'orders' && <OrderHistory />}
                    {activeTab === 'Refers' && <Refers user={user} />}
                    {activeTab === 'Withdraw_History' && <Withdraw user={user} />}
                </div>

            </div>
        </div>
    );
}

export default UserProfile;
