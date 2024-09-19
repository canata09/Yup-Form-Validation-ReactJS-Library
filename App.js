import React, { useState } from 'react';
import * as Yup from 'yup'; 
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('TR');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^5\d{9}$/, 'Phone number must start with 05 and be 10 digits long.')
      .required('Phone number is required'),
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validationSchema
      .validateAt('email', { email: e.target.value })
      .then(() => setEmailError(''))
      .catch((err) => setEmailError(err.message));
  };

  const handlePhoneChange = (e) => {
    const phoneInput = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhone(phoneInput);
    
    validationSchema
      .validateAt('phone', { phone: phoneInput })
      .then(() => setPhoneError(''))
      .catch((err) => setPhoneError(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate({ email, phone })
      .then(() => {
        alert('Form submitted successfully');
      })
      .catch((err) => {
        if (err.path === 'email') {
          setEmailError(err.message);
        } else if (err.path === 'phone') {
          setPhoneError(err.message);
        }
        alert('Please fix the errors before submitting');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="form-control"
          placeholder="Enter your email"
        />
        {emailError && <p className="error-message">{emailError}</p>}
      </div>

      <div className="form-group">
        <label>Mobile number</label>
        <div className="phone-input">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="country-code"
          >
            <option value="TR">TR +90</option>
          </select>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className="form-control"
            placeholder="Enter your mobile number"
          />
        </div>
        {phoneError && <p className="error-message">{phoneError}</p>}
      </div>

      <button type="submit" className="submit-button">
        Continue
      </button>

      <p className="terms-message">
        We’ll text this number to verify your account. Message and data rates may apply. By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </p>
    </form>
  );
};

export default App;
