import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import * as Yup from 'yup';






function App() {
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
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
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




  const [values, setValues] = useState({
    email: '', phone: '', firstName: '', lastName: '', username: '', password: '',
    city: '', district: '', classLevel: '', branch: '', school: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');








  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };






  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      // Handle form submission
      console.log('Form submitted successfully:', values);
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };



  return (

    <>
      <form onSubmit={handleSubmit} className="form-container">

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className="form-control" />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className="form-control" />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>


        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            className="form-control" />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="form-control" />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>


        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
            className="form-control" />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            value={values.district}
            onChange={handleChange}
            className="form-control" />
          {errors.district && <p className="error-message">{errors.district}</p>}
        </div>

        <div className="form-group">
          <label>Class</label>
          <input
            type="text"
            name="classLevel"
            value={values.classLevel}
            onChange={handleChange}
            className="form-control" />
          {errors.classLevel && <p className="error-message">{errors.classLevel}</p>}
        </div>

        <div className="form-group">
          <label>Branch</label>
          <input
            type="text"
            name="branch"
            value={values.branch}
            onChange={handleChange}
            className="form-control" />
          {errors.branch && <p className="error-message">{errors.branch}</p>}
        </div>

        <div className="form-group">
          <label>School</label>
          <input
            type="text"
            name="school"
            value={values.school}
            onChange={handleChange}
            className="form-control" />
          {errors.school && <p className="error-message">{errors.school}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Mobile number</label>
          <input
            type="email"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your mobile number"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>



        <button type="submit" className="submit-button">
          Continue
        </button>

        <p className="terms-message">
          We’ll text this number to verify your account. Message and data rates may apply. By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </form>


      {message && <p>{message}</p>}
    </>

  );
}
export default App;
