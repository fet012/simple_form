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
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

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
    
    // TO VALIDATE THE FILES
    if (formData.resume) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf']; // IMAGE AND PDF FILES ARE VALID
      if (!validTypes.includes(formData.resume.type)) {
        newErrors.resume = 'Only JPG, PNG, or PDF files are allowed';
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
        
        //  RESET THE FORM DARA
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          zipcode: '',
          resume: null
        });
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Submission error:', error);
        // You could show an error message here
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
        <h1 className="form-title">Online Registration</h1>
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
                Email <span className="required">*</span>
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
                Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
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
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                placeholder="Address"
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

       
        <fieldset className="form-section">
          <legend className="section-title">Resume Upload</legend>
          
          <div className="form-group">
            <label htmlFor="resume" className="form-label">
              Resume <span className="required">*</span>
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleChange}
                className={`file-input ${errors.resume ? 'error' : ''}`}
                accept=".jpg,.jpeg,.PNG,.JPG,.PDF"
                ref={fileInputRef}
              />
              <label htmlFor="resume" className="file-upload-label">
                {formData.resume ? formData.resume.name : 'Choose a file...'}
              </label>
              <button 
                type="button" 
                className="file-upload-button"
                onClick={() => fileInputRef.current.click()}
              >
                Browse
              </button>
            </div>
            <div className="file-hint">
              Accepted formats: JPG, PNG, PDF(Max size: 2MB)
            </div>
            {errors.resume && (
              <span className="error-message">{errors.resume}</span>
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