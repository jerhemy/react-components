import './ModalDemo.css';

import React, { useState } from 'react';

import CodeBlock from './CodeBlock/CodeBlock';
import Modal from './Modal';

const ModalDemo: React.FC = () => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`);
    setIsFormModalOpen(false);
  };

  // Define variations of the modal component
  const variations = [
    {
      title: 'Basic Modal',
      description: 'A simple modal with a title and content.',
      component: (
        <div>
          <button className="demo-button" onClick={() => setIsBasicModalOpen(true)}>
            Open Basic Modal
          </button>
          <Modal
            isOpen={isBasicModalOpen}
            onClose={() => setIsBasicModalOpen(false)}
            title="Basic Modal"
          >
            <p>This is a basic modal with simple content.</p>
            <p>Click outside or the close button to dismiss.</p>
          </Modal>
        </div>
      ),
      code: `// Basic modal usage
import Modal from './Modal';

const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>
  Open Basic Modal
</button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Basic Modal"
>
  <p>This is a basic modal with simple content.</p>
  <p>Click outside or the close button to dismiss.</p>
</Modal>`
    },
    {
      title: 'Custom Header Modal',
      description: 'A modal with a custom header style and footer buttons.',
      component: (
        <div>
          <button className="demo-button" onClick={() => setIsCustomModalOpen(true)}>
            Open Custom Modal
          </button>
          <Modal
            isOpen={isCustomModalOpen}
            onClose={() => setIsCustomModalOpen(false)}
            title="Custom Header Modal"
            headerStyle={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
            footer={
              <div className="modal-footer">
                <button
                  className="demo-button"
                  onClick={() => setIsCustomModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="demo-button demo-button-primary"
                  onClick={() => setIsCustomModalOpen(false)}
                >
                  Confirm
                </button>
              </div>
            }
          >
            <p>This modal has a custom header style and footer buttons.</p>
          </Modal>
        </div>
      ),
      code: `// Custom header modal
import Modal from './Modal';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Header Modal"
  headerStyle={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
  footer={
    <div className="modal-footer">
      <button onClick={() => setIsOpen(false)}>
        Cancel
      </button>
      <button
        className="demo-button-primary"
        onClick={() => setIsOpen(false)}
      >
        Confirm
      </button>
    </div>
  }
>
  <p>This modal has a custom header style and footer buttons.</p>
</Modal>`
    },
    {
      title: 'Form Modal',
      description: 'A modal containing a form with validation.',
      component: (
        <div>
          <button className="demo-button" onClick={() => setIsFormModalOpen(true)}>
            Open Form Modal
          </button>
          <Modal
            isOpen={isFormModalOpen}
            onClose={() => setIsFormModalOpen(false)}
            title="Contact Form"
          >
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="demo-button"
                  onClick={() => setIsFormModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="demo-button demo-button-primary">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
        </div>
      ),
      code: `// Form modal
import Modal from './Modal';

const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission
  setIsOpen(false);
};

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Contact Form"
>
  <form onSubmit={handleSubmit} className="modal-form">
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({
          ...formData,
          name: e.target.value
        })}
        required
      />
    </div>
    {/* Add email and message fields similarly */}
    <div className="modal-footer">
      <button type="button" onClick={() => setIsOpen(false)}>
        Cancel
      </button>
      <button type="submit" className="demo-button-primary">
        Submit
      </button>
    </div>
  </form>
</Modal>`
    }
  ];

  return (
    <div className="modal-demo">
      <h2>Modal Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The Modal component provides a flexible way to display content in a layer
          that sits on top of the main page content. It's commonly used for dialogs,
          forms, or displaying additional information without navigating away from
          the current page.
        </p>
      </div>

      {variations.map((variation, index) => (
        <div key={index} className="demo-variation">
          <h3>{variation.title}</h3>
          <p>{variation.description}</p>

          <div className="demo-preview">
            <h4>Live Preview</h4>
            <div className="preview-container">
              {variation.component}
            </div>
          </div>

          <div className="demo-code">
            <h4>Code Example</h4>
            <CodeBlock code={variation.code} language="typescript" />
          </div>
        </div>
      ))}

      <div className="demo-info">
        <h3>Required CSS</h3>
        <p>
          Include these CSS styles in your project to use the modal component:
        </p>
        <CodeBlock
          code={`.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  color: var(--heading-color);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--secondary-text);
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: var(--text-color);
}

.form-group input,
.form-group textarea {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default ModalDemo; 