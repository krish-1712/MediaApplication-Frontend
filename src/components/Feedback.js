import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { url } from '../App';
import axios from 'axios';
import './Feedback.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const userSchemaValidation = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  message: yup.string().required('Message is required'),
});

function FeedBack() {
  let navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const { handleSubmit, handleChange, errors, touched, values, resetForm } = useFormik({
    initialValues: { name: '', email: '', message: '' },
    validationSchema: userSchemaValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${url}/users/feedback`, { values });
        if (response.status === 200) {
          toast.success(response.data.message);
          resetForm();
          setRating(0);
          navigate('/home');
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="feedback-wrapper">
      <div className="feedback-card">
        <div className="feedback-header">
          <div className="feedback-icon-box">💬</div>
          <h1 className="feedback-title">Share Feedback</h1>
          <p className="feedback-subtitle">We'd love to hear what you think. Your feedback helps us improve.</p>
        </div>

        <div className="feedback-stars">
          <p className="support-label" style={{ marginBottom: '10px' }}>Rate your experience</p>
          <div className="stars-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= (hovered || rating) ? 'star-active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
              >★</span>
            ))}
          </div>
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
            <label className="support-label">Your Feedback</label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Tell us about your experience..."
              name="message"
              value={values.message}
              onChange={handleChange}
              className="support-input support-textarea"
            />
            {touched.message && errors.message && <p className="support-error">{errors.message}</p>}
          </div>

          <Button type="submit" className="support-btn feedback-btn">
            Submit Feedback
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FeedBack;
