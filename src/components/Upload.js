import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { url } from '../App';
import axios from 'axios';
import Dashboard from './Dashboard';
import { useNavigate, Link } from 'react-router-dom';
import './Upload.css';

// Validation schema for Video Upload
const uploadSchemaValidation = yup.object({
  title: yup.string().required('Video title is required').min(3, 'Title should be at least 3 characters'),
  desc: yup.string().required('Description is required').min(10, 'Description should be at least 10 characters'),
  videoUrl: yup.string().required('Video URL is required').url('Please enter a valid URL'),
  category: yup.string().required('Category is required'),
  customTags: yup.string(),
});

function Upload() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Authenticate user check
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    if (!token || !user) {
      toast.error('Please log in to upload videos');
      navigate('/');
    }
  }, [navigate]);

  // Helper function to convert standard YouTube links to embed links
  const formatVideoUrl = (rawUrl) => {
    if (!rawUrl) return '';
    const trimmed = rawUrl.trim();

    // Check if it's already in embed format
    if (trimmed.includes('youtube.com/embed/') || trimmed.includes('player.vimeo.com/video/')) {
      return trimmed;
    }

    // YouTube Watch / Share links regex
    // Matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/v/ID
    const ytMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/v\/|youtube\.com\/embed\/)([^&\s?]+)/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    return trimmed;
  };

  // Helper to compile tags into an array
  const getTagsArray = (category, customTags) => {
    let tagsList = [];
    if (category && category !== 'general') {
      tagsList.push(category.toLowerCase());
    }
    if (customTags) {
      const splitTags = customTags.split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0);
      tagsList = [...tagsList, ...splitTags];
    }
    return tagsList;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/');
  };

  const { handleSubmit, handleChange, errors, touched, values, resetForm } = useFormik({
    initialValues: {
      title: '',
      desc: '',
      videoUrl: '',
      category: 'general',
      customTags: '',
    },
    validationSchema: uploadSchemaValidation,
    onSubmit: async (formValues) => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('user');

        const videoData = {
          userId,
          title: formValues.title,
          desc: formValues.desc,
          videoUrl: formatVideoUrl(formValues.videoUrl),
          tags: getTagsArray(formValues.category, formValues.customTags),
        };

        const response = await axios.post(`${url}/video/add`, videoData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200 || response.status === 201) {
          toast.success('Video uploaded successfully!');
          resetForm();
          // Navigate to Home or the respective category section
          if (formValues.category === 'movies') {
            navigate('/movies');
          } else if (formValues.category === 'news') {
            navigate('/news');
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Upload error:', error);
        const errMsg = error.response?.data?.message || 'Failed to upload video. Please try again.';
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dashboard>
      {/* Top Navbar */}
      <div className="top-bar">
        <div className="navbar">
          <div className="logo">
            <i className="fab fa-netflix"></i>
          </div>
          <div className="nav-links-container">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/news" className="nav-link">News</Link>
            <Link to="/trend" className="nav-link">Trending</Link>
            <Link to="/upload" className="nav-link active">Upload Video</Link>
            <Link to="/help" className="nav-link">Help</Link>
            <Link to="/feedback" className="nav-link">Feedback</Link>
          </div>
          <div className="navbar-right">
            <div className="profile-container">
              <div className="profile-icon" onClick={handleLogout}>
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form content wrapper */}
      <div className="upload-wrapper">
        <div className="upload-card">
          <div className="upload-header">
            <div className="upload-icon-box">📤</div>
            <h1 className="upload-title">Upload Video</h1>
            <p className="upload-subtitle">Publish your favorite video clip or movie link directly to StreamHub.</p>
          </div>

          <Form onSubmit={handleSubmit} className="upload-form">
            {/* Title */}
            <div className="upload-field">
              <label className="upload-label">Video Title</label>
              <Form.Control
                type="text"
                placeholder="Enter an engaging title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="upload-input"
              />
              {touched.title && errors.title && <p className="upload-error">{errors.title}</p>}
            </div>

            {/* Video URL */}
            <div className="upload-field" style={{ marginTop: '18px' }}>
              <label className="upload-label">Video Source URL (YouTube / Vimeo / Direct Link)</label>
              <Form.Control
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                name="videoUrl"
                value={values.videoUrl}
                onChange={handleChange}
                className="upload-input"
              />
              <span className="upload-help-text">
                * Note: YouTube watch links are automatically converted into standard embed links.
              </span>
              {touched.videoUrl && errors.videoUrl && <p className="upload-error">{errors.videoUrl}</p>}
            </div>

            {/* Category and Tags Row */}
            <div className="upload-row" style={{ marginTop: '18px' }}>
              <div className="upload-field">
                <label className="upload-label">Category</label>
                <Form.Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className="upload-input upload-select"
                >
                  <option value="general">General (Home Only)</option>
                  <option value="movies">Movies</option>
                  <option value="news">News</option>
                </Form.Select>
                {touched.category && errors.category && <p className="upload-error">{errors.category}</p>}
              </div>

              <div className="upload-field">
                <label className="upload-label">Custom Tags (Comma separated)</label>
                <Form.Control
                  type="text"
                  placeholder="e.g. music, trailer, fun"
                  name="customTags"
                  value={values.customTags}
                  onChange={handleChange}
                  className="upload-input"
                />
              </div>
            </div>

            {/* Description */}
            <div className="upload-field" style={{ marginTop: '18px' }}>
              <label className="upload-label">Video Description</label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Briefly describe what this video is about..."
                name="desc"
                value={values.desc}
                onChange={handleChange}
                className="upload-input upload-textarea"
              />
              {touched.desc && errors.desc && <p className="upload-error">{errors.desc}</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading} className="upload-btn">
              {loading ? 'Uploading Video...' : 'Publish Video'}
            </Button>
          </Form>
        </div>
      </div>
    </Dashboard>
  );
}

export default Upload;
