import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('TR');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [branch, setBranch] = useState('');
  const [school, setSchool] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cityError, setCityError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [classLevelError, setClassLevelError] = useState('');
  const [branchError, setBranchError] = useState('');
  const [schoolError, setSchoolError] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState('');

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email address';
    return '';
  };

  const validatePhone = (value) => {
    if (!value) return 'Phone number is required';
    if (!/^5\d{9}$/.test(value)) return 'Phone number must start with 05 and be 10 digits long.';
    return '';
  };

  const validateRequired = (value, fieldName) => {
    if (!value) return `${fieldName} is required`;
    return '';
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameError(validateRequired(value, 'First name'));
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameError(validateRequired(value, 'Last name'));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validateRequired(value, 'Password'));
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setCityError(validateRequired(value, 'City'));
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setDistrictError(validateRequired(value, 'District'));
  };

  const handleClassLevelChange = (e) => {
    const value = e.target.value;
    setClassLevel(value);
    setClassLevelError(validateRequired(value, 'Class'));
  };

  const handleBranchChange = (e) => {
    const value = e.target.value;
    setBranch(value);
    setBranchError(validateRequired(value, 'Branch'));
  };

  const handleSchoolChange = (e) => {
    const value = e.target.value;
    setSchool(value);
    setSchoolError(validateRequired(value, 'School'));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePhoneChange = (e) => {
    const phoneInput = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhone(phoneInput);
    setPhoneError(validatePhone(phoneInput));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      email: validateEmail(email),
      phone: validatePhone(phone),
      firstName: validateRequired(firstName, 'First name'),
      lastName: validateRequired(lastName, 'Last name'),
      password: validateRequired(password, 'Password'),
      city: validateRequired(city, 'City'),
      district: validateRequired(district, 'District'),
      classLevel: validateRequired(classLevel, 'Class'),
      branch: validateRequired(branch, 'Branch'),
      school: validateRequired(school, 'School'),
    };

    setErrors(newErrors);
    
    if (Object.values(newErrors).some((error) => error)) {
      setMessage('Please fix the errors before submitting');
      return;
    }

    // Fetch user data from the server
    const response = await fetch('http://localhost:8000/data');
    const data = await response.json();

    // Ensure data is an array
    const users = Array.isArray(data) ? data : [];

    // Validate input and perform login
    const user = login(users, username, password);
    if (user) {
      onLogin(username);
      setMessage(`Welcome, ${user.username}!`);
    } else {
      setMessage('User not found.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">

        <div className="form-group">
          <label>First Name</label>
          <input type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            className="form-control" />
          {firstNameError && <p className="error-message">{firstNameError}</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text"
            value={lastName}
            onChange={handleLastNameChange}
            className="form-control" />
          {lastNameError && <p className="error-message">{lastNameError}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control" />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div className="form-group">
          <label>City</label>
          <input type="text"
            value={city}
            onChange={handleCityChange}
            className="form-control" />
          {cityError && <p className="error-message">{cityError}</p>}
        </div>

        <div className="form-group">
          <label>District</label>
          <input type="text"
            value={district}
            onChange={handleDistrictChange}
            className="form-control" />
          {districtError && <p className="error-message">{districtError}</p>}
        </div>

        <div className="form-group">
          <label>Class</label>
          <input type="text"
            value={classLevel}
            onChange={handleClassLevelChange}
            className="form-control" />
          {classLevelError && <p className="error-message">{classLevelError}</p>}
        </div>

        <div className="form-group">
          <label>Branch</label>
          <input type="text"
            value={branch}
            onChange={handleBranchChange}
            className="form-control" />
          {branchError && <p className="error-message">{branchError}</p>}
        </div>

        <div className="form-group">
          <label>School</label>
          <input type="text"
            value={school}
            onChange={handleSchoolChange}
            className="form-control" />
          {schoolError && <p className="error-message">{schoolError}</p>}
        </div>

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

      <nav>
        <ul>
          <li><Link to="/login">Giriş Yap</Link></li>
        </ul>
      </nav>
      {message && <p>{message}</p>}
    </>
  );
};

export default App;
