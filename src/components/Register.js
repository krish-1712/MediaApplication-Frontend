
import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from "formik";
import './Register.css'

const userSchemaValidation = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(8),
  name: yup.string().required(" name is required"),
})


function Register() {
  let navigate = useNavigate()
  useEffect(() => {
    sessionStorage.clear()
  }, [])

  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",

    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.post(`${url}/users/register`, values)
        console.log(res)
        toast.success(res.data.message)
        sessionStorage.setItem('token', res.data.token)
        navigate('/')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  })
  return (
    <div className='login-wrapper'>
      <h1 style={{ "textAlign": "center" }}>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" id='wid'>
          <Form.Label> Name</Form.Label>
          <Form.Control type="text" placeholder="Enter the  Name" className="name" name="name" value={values.name}
            onChange={handleChange} />
          {touched.name && errors.name ? <p style={{ color: "crimson" }}>{errors.name}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email address" className="email" name="email" value={values.email}
            onChange={handleChange} />
          {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter the Password" className="password" name="password" value={values.password}
            onChange={handleChange} />
          {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
        </Form.Group>
        <Button variant="primary" type='submit'>
          Signup
        </Button>
      </Form>

    </div>

  );
}

export default Register;