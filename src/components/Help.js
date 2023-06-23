import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { url } from '../App';
import axios from 'axios';

import './Help.css';
import { useNavigate } from 'react-router-dom';


const userSchemaValidation = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  message: yup.string().required('Message is required'),
});

function Help() {
  const { handleSubmit, handleChange, errors, touched, values, resetForm } = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${url}/users/help`, { values });
        if (response.status === 200) {
          toast.success(response.data.message);
          resetForm();
          navigate('/home')
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setSubmitting(false);
    },
  });

  let navigate = useNavigate();

  return (
    <div className="help-wrapper">
      <h1 style={{ textAlign: 'center' }}>Help</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" id="luck">
          <Form.Label className="add">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            className="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {touched.name && errors.name ? <p style={{ color: 'crimson' }}>{errors.name}</p> : ''}
        </Form.Group>
        <Form.Group className="mb-3" id="luck">
          <Form.Label className="add1">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {touched.email && errors.email ? <p style={{ color: 'crimson' }}>{errors.email}</p> : ''}
        </Form.Group>
        <Form.Group className="mb-3" id="luck">
          <Form.Label className="add1">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter message"
            className="message"
            name="message"
            value={values.message}
            onChange={handleChange}
          />
          {touched.message && errors.message ? <p style={{ color: 'crimson' }}>{errors.message}</p> : ''}
        </Form.Group>
        <Button variant="primary" type="submit" className="sub">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Help;
