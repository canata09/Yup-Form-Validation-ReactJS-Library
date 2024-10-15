import React, { useState } from 'react';
import * as Yup from 'yup';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('TR');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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


  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^5\d{9}$/, 'Phone number must start with 05 and be 10 digits long.')
      .required('Phone number is required'),
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    password: Yup.string()
      .required('Password is required'),
    city: Yup.string()
      .required('City is required'),
    district: Yup.string()
      .required('District is required'),
    classLevel: Yup.string()
      .required('Class is required'),
    branch: Yup.string()
      .required('Branch is required'),
    school: Yup.string()
      .required('School is required'),
  });

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    validationSchema
      .validateAt('firstName', { firstName: e.target.value })
      .then(() => setFirstNameError(''))
      .catch((err) => setFirstNameError(err.message));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    validationSchema
      .validateAt('lastName', { lastName: e.target.value })
      .then(() => setLastNameError(''))
      .catch((err) => setLastNameError(err.message));
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validationSchema
      .validateAt('password', { password: e.target.value })
      .then(() => setPasswordError(''))
      .catch((err) => setPasswordError(err.message));
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    validationSchema
      .validateAt('city', { city: e.target.value })
      .then(() => setCityError(''))
      .catch((err) => setCityError(err.message));
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    validationSchema
      .validateAt('district', { district: e.target.value })
      .then(() => setDistrictError(''))
      .catch((err) => setDistrictError(err.message));
  };

  const handleClassLevelChange = (e) => {
    setClassLevel(e.target.value);
    validationSchema
      .validateAt('classLevel', { classLevel: e.target.value })
      .then(() => setClassLevelError(''))
      .catch((err) => setClassLevelError(err.message));
  };


  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    validationSchema
      .validateAt('branch', { branch: e.target.value })
      .then(() => setBranchError(''))
      .catch((err) => setBranchError(err.message));
  };

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
    validationSchema
      .validateAt('school', { school: e.target.value })
      .then(() => setSchoolError(''))
      .catch((err) => setSchoolError(err.message));
  };

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
      .validate({
        email,
        phone,
        firstName,
        lastName,
        password,
        city,
        district,
        classLevel,
        branch,
        school,
      })
      .then(() => {
        alert('Form submitted successfully');
      })
      .catch((err) => {
        if (err.path === 'email') {
          setEmailError(err.message);
        } else if (err.path === 'phone') {
          setPhoneError(err.message);
        } else if (err.path === 'firstName') {
          setFirstNameError(err.message);
        } else if (err.path === 'lastName') {
          setLastNameError(err.message);
        } else if (err.path === 'password') {
          setPasswordError(err.message);
        } else if (err.path === 'city') {
          setCityError(err.message);
        } else if (err.path === 'district') {
          setDistrictError(err.message);
        } else if (err.path === 'classLevel') {
          setClassLevelError(err.message);
        } else if (err.path === 'branch') {
          setBranchError(err.message);
        } else if (err.path === 'school') {
          setSchoolError(err.message);
        }
        alert('Please fix the errors before submitting');
      });
  };

  return (
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
  );
};

export default App;
