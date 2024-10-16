import React, { useState } from 'react';
import * as Yup from 'yup';
import './App.css';

function App() {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^5\d{9}$/, 'Phone number must start with 05 and be 10 digits long.').required('Phone number is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
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
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                {['firstName', 'lastName', 'password', 'city', 'district', 'classLevel', 'branch', 'school', 'email', 'phone'].map((field) => (
                    <div key={field} className="form-group">
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <TextInput
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            value={values[field]}
                            onChange={handleChange}
                            placeholder={`Enter your ${field}`}
                            className="form-control"
                        />
                        {errors[field] && <p className="error-message">{errors[field]}</p>}
                    </div>
                ))}
                <Button type="submit">Continue</Button>
                <p className="terms-message">
                    We’ll text this number to verify your account. Message and data rates may apply.
                    By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
