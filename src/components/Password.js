import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from "formik";
import './Password.css';

const userSchemaValidation = yup.object({ 
  password: yup.string().required("Password is required").min(8),
  newpassword: yup.string().required("Password is required").min(8)
})

const Password = () => {
  let navigate = useNavigate();
  const tokenParam = new URLSearchParams(window.location.search);
  const decodedToken = tokenParam.get('token');
  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${url}/users/password`, {
          email: values.email,
          password: values.password,
          token: decodedToken
        });
        if (response.status === 200) {
          toast.success(response.data.message)
          navigate('/')
        } else {
          console.log('Unexpected response:', response);
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }

    }
  })

  useEffect(() => {
    console.log('Password component mounted');
    console.log('Decoded Token:', decodedToken);
  }, [decodedToken]);

  return (
    <div className='Password-wrapper'>
      <h1 style={{ "textAlign": "center" }}>Reset Password </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className='add'>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter the Password" className="password" name="password" value={values.password}
            onChange={handleChange} />
          {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='add'>New Password</Form.Label>
          <Form.Control type="password" placeholder="Enter the New Password" className="newpassword" id='newpassword' name="newpassword" value={values.newpassword}
            onChange={handleChange} />
          {touched.newpassword && errors.newpassword ? <p style={{ color: "crimson" }}>{errors.newpassword}</p> : ""}
        </Form.Group>
        <Button variant="primary" type='submit'>
          Reset Password
        </Button>
      </Form>
    </div>
  )
}

export default Password

