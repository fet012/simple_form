import "./styles.css";
import { useState } from "react";

export const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
        ...prev, 
        [name]: files ? files[0] : valuee
    }))
  };


  return (
    <div className="form-page-container">
      {/* MODAL COMPONENT */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Thank you! </h1>
            <p>
              Your response has been recorded, We'll get back to you shortly
            </p>
            <button
              onClick={closeModal}
              className="modal-close-button"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* LOGO CONTAINER  */}
      <div className="logo-container">
        <img
          src="src/assets/alexion_logo.png"
          alt="Company logo"
          className="logo"
        />
      </div>

      {/* MAIN FORM */}
      <div className="form-center-container">
        <form onSubmit={handleSubmit} className="form-card">
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
                className={`form-input ${errors.firstName ? "invalid" : ""}`}
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
                Last Name <span className="required"> *</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.lastName ? "invalid" : ""}`}
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
                id="email"
                name="email"
                className={`form-input ${errors.email ? "invalid" : ""}`}
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
                name="phone"
                id="phone"
                className={`form-input ${errors.phone ? "invalid" : ""}`}
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
                Address <span className="required">*</span>
              </label>

              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                className={`form-input ${error.address ? "invalid" : ""}`}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">
                City <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.city}
                name="city"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="resume">
              Resume(Image only) <span className="required">*</span>
            </label>
            <input
              type="file"
              className={`form-input ${errors.resume ? "invalid" : ""}`}
              name="resume"
              id="resume"
              accept="image/*"
              onChange={handleChange}
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
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};



