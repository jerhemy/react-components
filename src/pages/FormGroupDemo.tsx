import './FormGroupDemo.css';

import React, { useState } from 'react';

import Button from '../components/Button/Button';
import FormField from '../components/FormGroup/FormField';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export const FormGroupDemo: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRequired = (value: string) => {
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    return undefined;
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const handleSubmit = async (values: Record<string, any>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const formValues = values as FormValues;
      console.log('Form submitted:', formValues);
      setSubmittedData(formValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  return (
    <div className="form-group-demo">
      <h2>FormGroup Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The FormGroup component provides an easy way to manage form state and validation.
          It uses React Context to share form state with child components and handles form
          submission automatically.
        </p>
      </div>

      <div className="demo-variation">
        <h3>Basic Form Example</h3>
        <p>A simple form with validation and error handling.</p>

        <div className="demo-preview">
          <div className="form-container">
            <div className="demo-form">
              <FormGroup
                onSubmit={handleSubmit}
                initialValues={{
                  name: '',
                  email: '',
                  message: ''
                }}
              >
                <FormField
                  name="name"
                  validate={validateRequired}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <label htmlFor="name">Name</label>
                      <Input
                        id="name"
                        type="text"
                        value={value || ''}
                        onChange={e => onChange(e.target.value)}
                        onBlur={onBlur}
                        placeholder="Enter your name"
                        variant={error && touched ? 'error' : 'default'}
                      />
                      {error && touched && <div className="error-message">{error}</div>}
                    </div>
                  )}
                </FormField>

                <FormField
                  name="email"
                  validate={validateEmail}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <label htmlFor="email">Email</label>
                      <Input
                        id="email"
                        type="email"
                        value={value || ''}
                        onChange={e => onChange(e.target.value)}
                        onBlur={onBlur}
                        placeholder="Enter your email"
                        variant={error && touched ? 'error' : 'default'}
                      />
                      {error && touched && <div className="error-message">{error}</div>}
                    </div>
                  )}
                </FormField>

                <FormField
                  name="message"
                  validate={validateRequired}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <label htmlFor="message">Message</label>
                      <Input
                        id="message"
                        multiline
                        value={value || ''}
                        onChange={e => onChange(e.target.value)}
                        onBlur={onBlur}
                        placeholder="Enter your message"
                        variant={error && touched ? 'error' : 'default'}
                      />
                      {error && touched && <div className="error-message">{error}</div>}
                    </div>
                  )}
                </FormField>

                <div className="button-group">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                  {submittedData && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </FormGroup>
            </div>

            <div className="submitted-data">
              <h4>Submitted Data</h4>
              <pre>
                <code>
                  {submittedData
                    ? JSON.stringify(submittedData, null, 2)
                    : 'No data submitted yet'}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="demo-code">
          <h4>Usage Example</h4>
          <pre>
            <code>{`import { FormGroup, FormField } from '../components/FormGroup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const MyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await submitData(values);
      setSubmittedData(values);
      console.log('Form submitted:', values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateRequired = (value) => {
    return !value ? 'This field is required' : undefined;
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  return (
    <FormGroup
      initialValues={{
        name: '',
        email: '',
        message: ''
      }}
      onSubmit={handleSubmit}
    >
      <FormField
        name="name"
        validate={validateRequired}
      >
        {({ value, onChange, onBlur, error, touched }) => (
          <div className="form-field">
            <label>Name</label>
            <Input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
              placeholder="Enter your name"
              variant={error && touched ? 'error' : 'default'}
            />
            {error && touched && <div className="error">{error}</div>}
          </div>
        )}
      </FormField>

      <FormField
        name="email"
        validate={validateEmail}
      >
        {({ value, onChange, onBlur, error, touched }) => (
          <div className="form-field">
            <label>Email</label>
            <Input
              type="email"
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
              placeholder="Enter your email"
              variant={error && touched ? 'error' : 'default'}
            />
            {error && touched && <div className="error">{error}</div>}
          </div>
        )}
      </FormField>

      <FormField
        name="message"
        validate={validateRequired}
      >
        {({ value, onChange, onBlur, error, touched }) => (
          <div className="form-field">
            <label>Message</label>
            <Input
              multiline
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
              placeholder="Enter your message"
              variant={error && touched ? 'error' : 'default'}
            />
            {error && touched && <div className="error">{error}</div>}
          </div>
        )}
      </FormField>

      <div className="button-group">
        <Button 
          type="submit" 
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        {submittedData && (
          <Button 
            type="button" 
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </div>
    </FormGroup>
  );
};`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FormGroupDemo; 