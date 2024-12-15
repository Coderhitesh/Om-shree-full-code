import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfileTabs = ({ activeTab, setActiveTab, handleLogout, user }) => {
  return (
    <div className="profile-tabs mb-4">
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FontAwesomeIcon icon={faUser} className="me-2" />
            Profile Settings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FontAwesomeIcon icon={faClipboardList} className="me-2" />
            Orders
          </button>
        </li>
        {
          user.Role !== 'Affiliate' ? null : (
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'Refers' ? 'active' : ''}`}
                onClick={() => setActiveTab('Refers')}
              >
                <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                Refers
              </button>
            </li>
          )
        }
        {
          user.Role !== 'Affiliate' ? null : (
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'Withdraw_History' ? 'active' : ''}`}
                onClick={() => setActiveTab('Withdraw_History')}
              >
                <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                Withdraw History
              </button>
            </li>
          )
        }
        <li className="nav-item">
          <button
            className="nav-link text-danger"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileTabs;