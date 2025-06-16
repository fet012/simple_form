import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (formData.resume) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(formData.resume.type)) {
        newErrors.resume = 'Only JPG, PNG, or GIF files are allowed';
      }
      if (formData.resume.size > 2 * 1024 * 1024) {
        newErrors.resume = 'File size must be less than 2MB';
      }
    } else {
      newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        navigate('/thank-you');
      }, 1000);
    }
  };

  return (
    <div className="form-page-container">
      <div className="logo-container">
        <img 
          src="src/assets/alexion_logo.png" 
          alt="Company Logo" 
          className="logo"
        />
      </div>

      <div className="form-center-container">
        <form 
          onSubmit={handleSubmit}
          className="form-card"
          noValidate
        >
          <div className="form-banner">
            <h2 className="form-title">Online Registration</h2>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.firstName ? 'invalid' : ''}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.lastName ? 'invalid' : ''}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <div className="error-message">{errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className={`form-input ${errors.email ? 'invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
                className={`form-input ${errors.phone ? 'invalid' : ''}`}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <div className="error-message">{errors.phone}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">
                Address
              </label>
              <input
                type="text"
                className="form-input"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">
                City
              </label>
              <input
                type="text"
                className="form-input"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="resume">
              Resume (Image only) <span className="required">*</span>
            </label>
            <input
              type="file"
              className={`form-input ${errors.resume ? 'invalid' : ''}`}
              id="resume"
              name="resume"
              accept="image/*"
              onChange={handleChange}
              required
            />
            <div className="file-hint">
              Please upload an image file (JPG, PNG, GIF) under 2MB
            </div>
            {errors.resume && (
              <div className="error-message">{errors.resume}</div>
            )}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;