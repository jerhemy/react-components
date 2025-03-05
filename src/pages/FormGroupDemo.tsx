import './FormGroupDemo.css';

import React, { useState } from 'react';

import Button from '../components/Button/Button';
import Checkbox from '../components/Checkbox/Checkbox';
import FormField from '../components/FormGroup/FormField';
import FormGroup from '../components/FormGroup/FormGroup';
import Input from '../components/Input/Input';
import Radio from '../components/Radio/Radio';
import RadioGroup from '../components/Radio/RadioGroup';
import Select from '../components/Select/Select';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface AdvancedFormValues {
  fullName: string;
  email: string;
  gender: string;
  interests: string[];
  country: string;
  agreeToTerms: boolean;
  notifications: boolean;
}

export const FormGroupDemo: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const [advancedSubmittedData, setAdvancedSubmittedData] = useState<AdvancedFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdvancedSubmitting, setIsAdvancedSubmitting] = useState(false);

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

  const validateCheckbox = (value: boolean) => {
    if (!value) {
      return 'You must agree to the terms';
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

  const handleAdvancedSubmit = async (values: Record<string, any>) => {
    setIsAdvancedSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const formValues = values as AdvancedFormValues;
      console.log('Advanced form submitted:', formValues);
      setAdvancedSubmittedData(formValues);
    } finally {
      setIsAdvancedSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  const handleAdvancedReset = () => {
    setAdvancedSubmittedData(null);
  };

  // Country options for Select component
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' }
  ];

  // Interest options for checkboxes
  const interestOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' }
  ];

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

      {/* Additional form fields */}
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </FormGroup>
  );
};`}</code>
          </pre>
        </div>
      </div>

      <div className="demo-variation">
        <h3>Advanced Form with Multiple Components</h3>
        <p>A comprehensive form that demonstrates using various form components together.</p>

        <div className="demo-preview">
          <div className="form-container">
            <div className="demo-form">
              <FormGroup
                onSubmit={handleAdvancedSubmit}
                initialValues={{
                  fullName: '',
                  email: '',
                  gender: '',
                  interests: [],
                  country: '',
                  agreeToTerms: false,
                  notifications: false
                }}
              >
                {/* Text Input */}
                <FormField
                  name="fullName"
                  validate={validateRequired}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <label htmlFor="fullName">Full Name</label>
                      <Input
                        id="fullName"
                        type="text"
                        value={value || ''}
                        onChange={e => onChange(e.target.value)}
                        onBlur={onBlur}
                        placeholder="Enter your full name"
                        variant={error && touched ? 'error' : 'default'}
                      />
                      {error && touched && <div className="error-message">{error}</div>}
                    </div>
                  )}
                </FormField>

                {/* Email Input */}
                <FormField
                  name="email"
                  validate={validateEmail}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <label htmlFor="email-advanced">Email</label>
                      <Input
                        id="email-advanced"
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

                {/* Radio Group */}
                <FormField
                  name="gender"
                  validate={validateRequired}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <label>Gender</label>
                      <RadioGroup
                        name="gender"
                        value={value || ''}
                        onChange={onChange}
                        error={!!(error && touched)}
                      >
                        <Radio value="male" label="Male" />
                        <Radio value="female" label="Female" />
                        <Radio value="other" label="Other" />
                      </RadioGroup>
                      {error && touched && <div className="error-message">{error}</div>}
                    </div>
                  )}
                </FormField>

                {/* Checkbox Group */}
                <FormField
                  name="interests"
                >
                  {({ value, onChange, onBlur }) => (
                    <div className="form-field">
                      <label>Interests</label>
                      <div className="checkbox-group">
                        {interestOptions.map(option => (
                          <Checkbox
                            key={option.value}
                            label={option.label}
                            checked={Array.isArray(value) && value.includes(option.value)}
                            onChange={e => {
                              const isChecked = e.target.checked;
                              const currentValues = Array.isArray(value) ? [...value] : [];

                              if (isChecked) {
                                onChange([...currentValues, option.value]);
                              } else {
                                onChange(currentValues.filter(v => v !== option.value));
                              }
                            }}
                            onBlur={onBlur}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </FormField>

                {/* Select Component */}
                <FormField
                  name="country"
                  validate={validateRequired}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <label>Country</label>
                      <Select
                        options={countryOptions}
                        value={value}
                        onChange={onChange}
                        placeholder="Select your country"
                        isSearchable
                      />
                      {error && touched && <div className="error-message">{error}</div>}
                    </div>
                  )}
                </FormField>

                {/* Checkbox for Terms */}
                <FormField
                  name="agreeToTerms"
                  validate={validateCheckbox}
                >
                  {({ value, onChange, onBlur, error, touched }) => (
                    <div className="form-field">
                      <Checkbox
                        label="I agree to the terms and conditions"
                        checked={value || false}
                        onChange={e => onChange(e.target.checked)}
                        onBlur={onBlur}
                        error={!!(error && touched)}
                      />
                      {error && touched && <div className="error-message">{error}</div>}
                    </div>
                  )}
                </FormField>

                {/* Checkbox for Notifications */}
                <FormField
                  name="notifications"
                >
                  {({ value, onChange }) => (
                    <div className="form-field">
                      <Checkbox
                        label="Send me notifications about updates and news"
                        checked={value || false}
                        onChange={e => onChange(e.target.checked)}
                      />
                    </div>
                  )}
                </FormField>

                <div className="button-group">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isAdvancedSubmitting}
                  >
                    {isAdvancedSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                  {advancedSubmittedData && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAdvancedReset}
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
                  {advancedSubmittedData
                    ? JSON.stringify(advancedSubmittedData, null, 2)
                    : 'No data submitted yet'}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="demo-code">
          <h4>Advanced Form Example</h4>
          <pre>
            <code>{`import { FormGroup, FormField } from '../components/FormGroup';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import { Radio, RadioGroup } from '../components/Radio';
import { Select } from '../components/Select';
import { Button } from '../components/Button';

const AdvancedForm = () => {
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // more options...
  ];

  const interestOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    // more options...
  ];

  return (
    <FormGroup
      initialValues={{
        fullName: '',
        email: '',
        gender: '',
        interests: [],
        country: '',
        agreeToTerms: false,
        notifications: false
      }}
      onSubmit={handleSubmit}
    >
      {/* Text Input */}
      <FormField name="fullName" validate={validateRequired}>
        {({ value, onChange, error, touched }) => (
          <div className="form-field">
            <label>Full Name</label>
            <Input
              value={value}
              onChange={e => onChange(e.target.value)}
              variant={error && touched ? 'error' : 'default'}
            />
            {error && touched && <div className="error">{error}</div>}
          </div>
        )}
      </FormField>

      {/* Radio Group */}
      <FormField name="gender" validate={validateRequired}>
        {({ value, onChange, error, touched }) => (
          <div className="form-field">
            <label>Gender</label>
            <RadioGroup
              name="gender"
              value={value}
              onChange={onChange}
              error={!!(error && touched)}
            >
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
              <Radio value="other" label="Other" />
            </RadioGroup>
            {error && touched && <div className="error">{error}</div>}
          </div>
        )}
      </FormField>

      {/* Checkbox Group */}
      <FormField name="interests">
        {({ value, onChange }) => (
          <div className="form-field">
            <label>Interests</label>
            <div className="checkbox-group">
              {interestOptions.map(option => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={value.includes(option.value)}
                  onChange={e => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      onChange([...value, option.value]);
                    } else {
                      onChange(value.filter(v => v !== option.value));
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </FormField>

      {/* Select Component */}
      <FormField name="country" validate={validateRequired}>
        {({ value, onChange, error, touched }) => (
          <div className="form-field">
            <label>Country</label>
            <Select
              options={countryOptions}
              value={value}
              onChange={onChange}
              placeholder="Select your country"
            />
            {error && touched && <div className="error">{error}</div>}
          </div>
        )}
      </FormField>

      {/* Submit Button */}
      <Button type="submit">Submit</Button>
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