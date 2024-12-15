import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';

const ProfileUpdate = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    FullName: user.FullName,
    ContactNumber: user.ContactNumber,
    Email: user.Email,
    userImage: user.userImage || null,
  });
  const [previewImage, setPreviewImage] = useState(user.userImage || null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        userImage: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start the loader
    onUpdate(formData).finally(() => setIsLoading(false)); // Stop loader after completion
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h4 className="card-title mb-4">Update Profile</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="FullName" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="FullName"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ContactNumber" className="form-label">Contact Number</label>
            <input
              type="tel"
              className="form-control"
              id="ContactNumber"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="userImage" className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              id="userImage"
              name="userImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <div className="mt-3">
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="img-thumbnail"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btnbackground" disabled={isLoading}>
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <FontAwesomeIcon icon={faSave} className="me-2" />
              )}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="reset"
              className="btn btn-outline-secondary"
              onClick={() => setPreviewImage(user.userImage || null)}
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faTimes} className="me-2" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
