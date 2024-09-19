import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('TR');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (e) => {
    const phoneInput = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhone(phoneInput);
    
    if (!/^5\d{9}$/.test(phoneInput)) {  // Turkish phone number starting with 05 and 10 digits in total
      setPhoneError('Phone number must start with 05 and be 10 digits long.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError || phoneError || !email || !phone) {
      alert('Please fix the errors before submitting');
    } else {
      alert('Form submitted successfully');
    }
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
