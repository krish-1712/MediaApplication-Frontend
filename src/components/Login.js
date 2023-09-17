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
  let token = sessionStorage.getItem('token');

  console.log('Token:', token);

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
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" id='wid' >
          <Form.Label className="add">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            className="email"
            name="email"
            value={values.email}
            onChange={handleChange}

          />
          {touched.email && errors.email ? <p style={{ color: 'crimson' }}>{errors.email}</p> : ''}
        </Form.Group>
        <Form.Group className="mb-3" id='wid' >
          <Form.Label className="add1">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter the Password"
            className="password"
            name="password"
            value={values.password}
            onChange={handleChange}

          />
          {touched.password && errors.password ? <p style={{ color: 'crimson' }}>{errors.password}</p> : ''}
        </Form.Group>
        <Button variant="primary" type="submit" className="sub">
          Submit
        </Button><br></br><br></br> 
        <Link to="/register">Create Account</Link><br></br><br></br>
        <Link to="/password"> Password</Link><br></br>
        <Link to="/forgot">Forgot Password</Link><br></br>
      

      </Form>
    </div>
  );
}

export default Login;







