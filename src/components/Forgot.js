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
          console.log(response.data.message)
          resetForm();
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  })
  return (
    <div class="forgot-wrapper">
      <form onSubmit={handleSubmit} class="forgot-form">
        <h1 class="forgot-title">Forgot Password</h1>
        <p class="forgot-subtitle">Enter the email address associated with your account, and we’ll send you a link to reset your password.</p>
        <label class="forgot-label" for="email">Email Address</label>
        <input type="email" id="email" name="email" class="forgot-input" placeholder="Enter email" value={values.email} onChange={handleChange} />
        {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}
        <button type="submit" class="forgot-button">Send Reset Link</button>
        <div class="forgot-footer">
          <p ><Link to="/">Back to Login</Link></p>
        </div>
      </form>
    </div>

  )
}

export default Forgot

