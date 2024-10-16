import React, { useState } from 'react';
import * as Yup from 'yup';
import './App.css';

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${name}`}
      className={`form-control ${error ? 'error' : ''}`}
    />
    {error && <p className="error-message">{error}</p>}
  </div>
);

function App() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^5\d{9}$/, 'Phone number must start with 05 and be 10 digits long.').required('Phone number is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    city: Yup.string().required('City is required'),
    district: Yup.string().required('District is required'),
    classLevel: Yup.string().required('Class is required'),
    branch: Yup.string().required('Branch is required'),
    school: Yup.string().required('School is required'),
  });

  const [values, setValues] = useState({
    email: '', phone: '', firstName: '', lastName: '', username: '', password: '',
    city: '', district: '', classLevel: '', branch: '', school: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      setMessage('Form submitted successfully!');
      // Reset form values after successful submission
      setValues({
        email: '', phone: '', firstName: '', lastName: '', username: '', password: '',
        city: '', district: '', classLevel: '', branch: '', school: ''
      });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        {['firstName', 'lastName', 'username', 'password', 'city', 'district', 'classLevel', 'branch', 'school', 'email', 'phone'].map((field) => (
          <InputField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            value={values[field]}
            onChange={handleChange}
            error={errors[field]}
          />
        ))}
        <button type="submit" className="submit-button">
          Continue
        </button>

        <p className="terms-message">
          We’ll text this number to verify your account. Message and data rates may apply. By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default App;
