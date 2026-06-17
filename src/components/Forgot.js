import axios from 'axios';
import React from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import './Forgot.css';

const userSchemaValidation = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
})

const Forgot = () => {
  const { handleSubmit, handleChange, errors, touched, values, resetForm } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${url}/users/reset`, { values });
        if (response.status === 200) {
          toast.success(response.data.message)
          resetForm();
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  })

  return (
    <div className="forgot-wrapper">
      <form onSubmit={handleSubmit} className="forgot-form">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <i className="fa-brands fa-youtube" style={{ color: '#e50914', fontSize: '32px' }}></i>
          <span style={{ color: '#fff', fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>StreamVibe</span>
        </div>
        <div className="forgot-icon">🔑</div>
        <h1 className="forgot-title">Forgot Password?</h1>
        <p className="forgot-subtitle">Enter the email address associated with your account and we'll send you a reset link.</p>
        <label className="forgot-label" htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="forgot-input"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email ? <p style={{ color: '#ff4d57', fontSize: '12px', marginTop: '6px' }}>{errors.email}</p> : ""}
        <button type="submit" className="forgot-button">Send Reset Link</button>
        <div className="forgot-footer">
          <p><Link to="/">← Back to Login</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Forgot
