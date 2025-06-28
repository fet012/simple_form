import { useState, useRef } from 'react';
import './styles.css';

const FormComponent = () => {
  // SETTING FORM STATE
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipcode: '',
    idFront: null,      // Front of ID
    idSelfie: null,     // Selfie with ID
    idBack: null        // Back of ID
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const idFrontRef = useRef(null);
  const idSelfieRef = useRef(null);
  const idBackRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    // Clears the error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    // TO VALIDATE ALL THE REQUIRED FIELDS
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Validate ID Front
    if (!formData.idFront) {
      newErrors.idFront = 'Front of ID is required';
    } else {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(formData.idFront.type)) {
        newErrors.idFront = 'Only JPG or PNG files are allowed';
      }
      if (formData.idFront.size > 2 * 1024 * 1024) {
        newErrors.idFront = 'File size must be less than 2MB';
      }
    }

    // Validate ID Selfie
    if (!formData.idSelfie) {
      newErrors.idSelfie = 'Selfie with ID is required';
    } else {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(formData.idSelfie.type)) {
        newErrors.idSelfie = 'Only JPG or PNG files are allowed';
      }
      if (formData.idSelfie.size > 2 * 1024 * 1024) {
        newErrors.idSelfie = 'File size must be less than 2MB';
      }
    }

    // Validate ID Back
    if (!formData.idBack) {
      newErrors.idBack = 'Back of ID is required';
    } else {
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(formData.idBack.type)) {
        newErrors.idBack = 'Only JPG or PNG files are allowed';
      }
      if (formData.idBack.size > 2 * 1024 * 1024) {
        newErrors.idBack = 'File size must be less than 2MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // BACKEND TO PROCESS IT TO EMAIL.JS
        // const response = await fetch('/api/submit-form', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success modal
        setShowModal(true);
        
        // RESET THE FORM DATA
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          zipcode: '',
          idFront: null,
          idSelfie: null,
          idBack: null
        });
        
        // Reset file inputs
        if (idFrontRef.current) idFrontRef.current.value = '';
        if (idSelfieRef.current) idSelfieRef.current.value = '';
        if (idBackRef.current) idBackRef.current.value = '';
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="form-container">
      {/* Success Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-icon">✓</div>
            <h3 className="modal-title">Thank You!</h3>
            <p className="modal-message">
              Your response has been received. We'll get back to you shortly.
            </p>
            <button 
              onClick={closeModal} 
              className="modal-button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="form-header">
        <img 
          src="src/assets/alexion_logo.png" 
          alt="Company Logo" 
          className="logo"
        />
        <p className="form-subtitle">
          Please fill out the form below to complete your registration
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="form" noValidate>
        <fieldset className="form-section">
          <legend className="section-title">Personal Information</legend>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Email address"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type='tel'
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend className="section-title">Address Information</legend>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Home Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                placeholder="Home address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipcode" className="form-label">
                Zip code 
              </label>
              <input
                type="tel"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="form-input"
                placeholder="Zip Code"
                maxLength={5}
              />
            </div>
          </div>
        </fieldset>

        {/* ID Verification Section */}
        <fieldset className="form-section">
          <legend className="section-title">ID Verification</legend>
          
          {/* Front of ID */}
          <div className="form-group">
            <label htmlFor="idFront" className="form-label">
              Front of Government-Issued ID <span className="required">*</span>
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                id="idFront"
                name="idFront"
                onChange={handleChange}
                className={`file-input ${errors.idFront ? 'error' : ''}`}
                accept=".jpg,.jpeg,.png"
                ref={idFrontRef}
              />
              <label htmlFor="idFront" className="file-upload-label">
                {formData.idFront ? formData.idFront.name : 'Upload front of ID...'}
              </label>
              <button 
                type="button" 
                className="file-upload-button"
                onClick={() => idFrontRef.current.click()}
              >
                Browse
              </button>
            </div>
            <div className="file-hint">
              Clear photo of the front of your ID (JPG/PNG, max 2MB)
            </div>
            {errors.idFront && (
              <span className="error-message">{errors.idFront}</span>
            )}
          </div>

          {/* Selfie with ID */}
          <div className="form-group">
            <label htmlFor="idSelfie" className="form-label">
              Selfie with Your ID <span className="required">*</span>
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                id="idSelfie"
                name="idSelfie"
                onChange={handleChange}
                className={`file-input ${errors.idSelfie ? 'error' : ''}`}
                accept=".jpg,.jpeg,.png"
                ref={idSelfieRef}
              />
              <label htmlFor="idSelfie" className="file-upload-label">
                {formData.idSelfie ? formData.idSelfie.name : 'Upload selfie with ID...'}
              </label>
              <button 
                type="button" 
                className="file-upload-button"
                onClick={() => idSelfieRef.current.click()}
              >
                Browse
              </button>
            </div>
            <div className="file-hint">
              Clear selfie holding your ID (JPG/PNG, max 2MB)
            </div>
            {errors.idSelfie && (
              <span className="error-message">{errors.idSelfie}</span>
            )}
          </div>

          {/* Back of ID */}
          <div className="form-group">
            <label htmlFor="idBack" className="form-label">
              Back of Government-Issued ID <span className="required">*</span>
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                id="idBack"
                name="idBack"
                onChange={handleChange}
                className={`file-input ${errors.idBack ? 'error' : ''}`}
                accept=".jpg,.jpeg,.png"
                ref={idBackRef}
              />
              <label htmlFor="idBack" className="file-upload-label">
                {formData.idBack ? formData.idBack.name : 'Upload back of ID...'}
              </label>
              <button 
                type="button" 
                className="file-upload-button"
                onClick={() => idBackRef.current.click()}
              >
                Browse
              </button>
            </div>
            <div className="file-hint">
              Clear photo of the back of your ID (JPG/PNG, max 2MB)
            </div>
            {errors.idBack && (
              <span className="error-message">{errors.idBack}</span>
            )}
          </div>
        </fieldset>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;