import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import jwt_decode from 'jwt-decode';
import './Login.css';
import { Link } from 'react-router-dom';


const userSchemaValidation = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(8),
});

function Login() {
  let navigate = useNavigate();
  let token;
  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.post(`${url}/users/login`, values);
        console.log(res);
        toast.success(res.data.message);
        console.log(res.data.user._id)
        sessionStorage.setItem('user', res.data.user._id);
        sessionStorage.setItem('token', res.data.token);
        console.log(sessionStorage.getItem('token'));
        const token = sessionStorage.getItem('token');
        console.log('Token on load:', token);


        navigate('/home');
      } catch (error) {
        console.log('Error:', error.message);
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const expirationTimestamp = decodedToken.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (expirationTimestamp < currentTimestamp) {
          console.log('Token has expired');
          sessionStorage.removeItem('token');
          navigate('/');
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        sessionStorage.removeItem('token');
        navigate('/');
      }
    }
  }, [navigate, token]);

  return (
    <div className="login-wrapper">
      <Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <i className="fa-brands fa-youtube" style={{ color: '#e50914', fontSize: '32px' }}></i>
          <span style={{ color: '#fff', fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>StreamVibe</span>
        </div>
        <h1>Welcome back</h1>
        <p className="subtitle">Sign in to continue watching</p>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email address"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email ? <p style={{ color: '#ff4d57', fontSize: '12px', marginTop: '6px' }}>{errors.email}</p> : ''}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {touched.password && errors.password ? <p style={{ color: '#ff4d57', fontSize: '12px', marginTop: '6px' }}>{errors.password}</p> : ''}
        </Form.Group>
        <div style={{ textAlign: 'right', marginTop: '-10px', marginBottom: '16px' }}>
          <Link to="/forgot">Forgot password?</Link>
        </div>
        <Button variant="primary" type="submit">Sign In</Button>
        <div className="login-footer-links">
          <span style={{ color: '#666', fontSize: '14px' }}>Don't have an account? <Link to="/register">Sign up</Link></span>
        </div>
      </Form>
    </div>
  );
}

export default Login;







