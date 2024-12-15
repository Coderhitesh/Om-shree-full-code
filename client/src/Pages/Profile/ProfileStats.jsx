import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faUsers, faCoins } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ProfileStats = () => {
  const token = sessionStorage.getItem('authToken');
  const [user, setUser] = useState({});

  const handleFetchUser = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/api/v1/user-details', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the headers
        },
      });
      setUser(data?.user || {}); // Fallback to an empty object
    } catch (error) {
      console.log('Internal server error', error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-4">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faGift} className="text-primary mb-3" size="2x" />
            <h5 className="card-title">Referral Bonus</h5>
            <h3 className="mb-0">₹{user?.referralCodeBonus || 0}</h3>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faUsers} className="text-success mb-3" size="2x" />
            <h5 className="card-title">Total Referrals</h5>
            <h3 className="mb-0">{user?.RefrealUserIds?.length || 0}</h3> {/* Fallback to 0 */}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faCoins} className="text-warning mb-3" size="2x" />
            <h5 className="card-title">Account Status</h5>
            <h3 className="mb-0">{user?.isVerified ? 'Verified' : 'Unverified'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
