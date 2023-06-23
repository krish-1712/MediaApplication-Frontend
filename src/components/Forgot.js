import axios from 'axios';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { useFormik } from "formik";
import './Forgot.css';


const userSchemaValidation = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
})

const Forgot = () => {
  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${url}/users/reset`, { values });
        if (response.status === 200) {
          toast.success(response.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  })
  return (
    <div className='forgot-wrapper'>
      <h1 style={{ "textAlign": "center" }}>Forgot Password</h1>
      <h4 className='for' style={{ "textAlign": "center" }}>Enter The Email Address Associate With your Account<br></br>
        and we will Send you a Link to Reset your Password </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email address" className="email" id='email' name="email" value={values.email}
            onChange={handleChange} />
          {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}
        </Form.Group>
        <Button variant="primary" type="submit" className='con'>
          Continue
        </Button>
      </Form>
    </div>
  )
}

export default Forgot
