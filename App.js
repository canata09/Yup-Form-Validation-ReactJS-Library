import React, { useState } from 'react';
import { login } from './AuthController';
import * as Yup from 'yup';
import styles from './Login.module.css';
import { Link } from "react-router-dom";
import AuthCarousel from './AuthCarousel';
import { Button, TextInput } from "flowbite-react";
import './Dene.css';

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

const Dene = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '', phone: '', firstName: '', lastName: '', password: '',
        city: '', district: '', classLevel: '', branch: '', school: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            // If validation is successful
            const response = await fetch('http://localhost:8000/data');
            const data = await response.json();
            const users = Array.isArray(data) ? data : [];
            const user = login(users, formData.username, formData.password);

            if (user) {
                onLogin(user.username);
                setMessage(`Welcome, ${user.username}!`);
            } else {
                setMessage('User not found.');
            }
        } catch (err) {
            const validationErrors = err.inner.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
            }, {});
            setErrors(validationErrors);
            setMessage('Please fix the errors before submitting');
        }
    };

    return (
        <div className={styles.middledoc}>
            <div className="w-full">
                <div className="md:w-1/2 sm:w-full">
                    <AuthCarousel />
                </div>
                <div className="md:w-1/2 sm:w-full">
                    <h3 className="font-semibold text-left text-xl text-customblue-800">
                        KAYIT OL
                        <p className="text-[10px]">Aşağıdaki gerekli alanları doldurunuz.</p>
                    </h3>
                    <form onSubmit={handleSubmit} className="form-container">
                        {['firstName', 'lastName', 'password', 'city', 'district', 'classLevel', 'branch', 'school', 'email', 'phone'].map((field) => (
                            <div key={field} className="form-group">
                                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <TextInput
                                    type={field === 'password' ? 'password' : 'text'}
                                    name={field}
                                    value={formData[field]}
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
                    <nav>
                        <ul>
                            <li><Link to="/login">Giriş Yap</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Dene;
