import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { url } from '../App';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';

const userSchemaValidation = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  name: yup.string().required('Name is required'),
});

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${url}/users/register`, values);
        toast.success(res.data.message);
        sessionStorage.setItem('token', res.data.token);
        navigate('/');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="register-wrapper">
      <Form className="register-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <i className="fa-brands fa-youtube" style={{ color: '#e50914', fontSize: '32px' }}></i>
          <span style={{ color: '#fff', fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>StreamVibe</span>
        </div>
        <h1>Create account</h1>
        <p style={{ color: '#777', fontSize: '14px', marginBottom: '28px' }}>Join millions of viewers today</p>
        <Form.Group className="mb-3 name-group">
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="name"
            className="name-input"
            value={values.name}
            onChange={handleChange}
          />
          {touched.name && errors.name ? <p className="error-text">{errors.name}</p> : ''}
        </Form.Group>

        <Form.Group className="mb-3 email-group">
          <Form.Control
            type="email"
            placeholder="Email Address"
            name="email"
            className="email-input"
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email ? <p className="error-text">{errors.email}</p> : ''}
        </Form.Group>

        <Form.Group className="mb-3 password-group">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="password-input"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password ? <p className="error-text">{errors.password}</p> : ''}
        </Form.Group>

        <Button type="submit" variant="primary" className="register-button">
          Sign Up
        </Button>
        <div className="register-footer">
          <span>Already have an account?</span>
          <Link to="/">Sign In</Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
