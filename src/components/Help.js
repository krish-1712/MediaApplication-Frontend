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
  let navigate = useNavigate();

  const { handleSubmit, handleChange, errors, touched, values, resetForm } = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: userSchemaValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${url}/users/help`, { values });
        if (response.status === 200) {
          toast.success(response.data.message);
          resetForm();
          navigate('/home');
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="support-wrapper">
      <div className="support-card">
        <div className="support-header">
          <div className="support-icon-box">🎧</div>
          <h1 className="support-title">Help Center</h1>
          <p className="support-subtitle">Having trouble? Describe your issue and our team will get back to you shortly.</p>
        </div>

        <Form onSubmit={handleSubmit} className="support-form">
          <div className="support-row">
            <div className="support-field">
              <label className="support-label">Full Name</label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="support-input"
              />
              {touched.name && errors.name && <p className="support-error">{errors.name}</p>}
            </div>
            <div className="support-field">
              <label className="support-label">Email Address</label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="support-input"
              />
              {touched.email && errors.email && <p className="support-error">{errors.email}</p>}
            </div>
          </div>

          <div className="support-field" style={{ marginTop: '18px' }}>
            <label className="support-label">Message</label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Describe your issue in detail..."
              name="message"
              value={values.message}
              onChange={handleChange}
              className="support-input support-textarea"
            />
            {touched.message && errors.message && <p className="support-error">{errors.message}</p>}
          </div>

          <Button type="submit" className="support-btn">
            Send Message
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Help;
