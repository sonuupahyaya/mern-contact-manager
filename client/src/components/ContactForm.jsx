import { useState } from 'react';
import { UserIcon, MailIcon, PhoneIcon, MessageIcon, SendIcon, AlertCircleIcon, UserPlusIcon } from './Icons';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const initialErrors = {
  name: '',
  email: '',
  phone: '',
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^[\d\s\-\+\(\)]{7,20}$/;
  return regex.test(phone);
};

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!validatePhone(value)) return 'Please enter a valid phone number';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone) &&
      !Object.values(errors).some((error) => error)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true });

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(formData);
      if (result.success) {
        setFormData(initialFormState);
        setErrors(initialErrors);
        setTouched({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card fade-in">
      <div className="card-header">
        <h2>
          <UserPlusIcon /> Add New Contact
        </h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <UserIcon /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter full name"
              className={`form-input ${touched.name && errors.name ? 'error' : ''}`}
              disabled={isSubmitting}
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <div className="error-message">
                <AlertCircleIcon /> {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <MailIcon /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="email@example.com"
              className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
              disabled={isSubmitting}
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <div className="error-message">
                <AlertCircleIcon /> {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <PhoneIcon /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+1 (555) 123-4567"
              className={`form-input ${touched.phone && errors.phone ? 'error' : ''}`}
              disabled={isSubmitting}
              autoComplete="tel"
            />
            {touched.phone && errors.phone && (
              <div className="error-message">
                <AlertCircleIcon /> {errors.phone}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <MessageIcon /> Message <span style={{ color: 'var(--gray-500)', fontWeight: 400 }}>(Optional)</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write a note or message..."
              className="form-input form-textarea"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Creating...
              </>
            ) : (
              <>
                <SendIcon /> Create Contact
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
