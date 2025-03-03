import React, { useState } from 'react';
import Modal from './Modal';
import './ModalDemo.css';

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

  return (
    <div className="modal-demo">
      <h2>Modal Component</h2>
      
      <div className="modal-demo-description">
        <p>
          The Modal component provides a way to display content in a layer that sits on top of the main page content.
          It's commonly used for dialogs, forms, or displaying additional information without navigating away from the current page.
        </p>
      </div>

      <div className="modal-demo-examples">
        <h3>Examples</h3>
        
        <div className="modal-demo-cards">
          {/* Basic Modal */}
          <div className="modal-demo-card">
            <h4>Basic Modal</h4>
            <p>A simple modal with a title and content.</p>
            <button 
              className="modal-demo-btn"
              onClick={() => setIsBasicModalOpen(true)}
            >
              Open Basic Modal
            </button>
          </div>

          {/* Custom Header Modal */}
          <div className="modal-demo-card">
            <h4>Custom Header</h4>
            <p>A modal with a custom header color and footer buttons.</p>
            <button 
              className="modal-demo-btn"
              onClick={() => setIsCustomModalOpen(true)}
            >
              Open Custom Modal
            </button>
          </div>

          {/* Form Modal */}
          <div className="modal-demo-card">
            <h4>Form Modal</h4>
            <p>A modal containing a form with validation.</p>
            <button 
              className="modal-demo-btn"
              onClick={() => setIsFormModalOpen(true)}
            >
              Open Form Modal
            </button>
          </div>
        </div>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={isBasicModalOpen}
        onClose={() => setIsBasicModalOpen(false)}
        title="Basic Modal"
      >
        <p>This is a basic modal with simple content.</p>
        <p>Click outside the modal or the X button to close it.</p>
      </Modal>

      {/* Custom Modal */}
      <Modal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        title="Custom Modal"
        headerColor="#4caf50"
        footer={
          <>
            <button 
              className="modal-btn modal-secondary-btn"
              onClick={() => setIsCustomModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="modal-btn modal-primary-btn"
              onClick={() => {
                alert('Action confirmed!');
                setIsCustomModalOpen(false);
              }}
            >
              Confirm
            </button>
          </>
        }
      >
        <div className="modal-content">
          <p>This modal has a custom green header and footer buttons.</p>
          <p>The footer contains Cancel and Confirm buttons with custom actions.</p>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Contact Form"
        headerColor="#9c27b0"
        footer={
          <>
            <button 
              className="modal-btn modal-secondary-btn"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="modal-btn modal-primary-btn"
              type="submit"
              form="contact-form"
            >
              Submit
            </button>
          </>
        }
      >
        <form id="contact-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </form>
      </Modal>

      <div className="modal-demo-api">
        <h3>API Reference</h3>
        <table className="modal-demo-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>isOpen</td>
              <td>boolean</td>
              <td>-</td>
              <td>Controls whether the modal is displayed</td>
            </tr>
            <tr>
              <td>onClose</td>
              <td>function</td>
              <td>-</td>
              <td>Callback function called when the modal is closed</td>
            </tr>
            <tr>
              <td>title</td>
              <td>string</td>
              <td>-</td>
              <td>The title displayed in the modal header</td>
            </tr>
            <tr>
              <td>headerColor</td>
              <td>string</td>
              <td>#3174ad</td>
              <td>Background color of the modal header</td>
            </tr>
            <tr>
              <td>children</td>
              <td>ReactNode</td>
              <td>-</td>
              <td>Content to be displayed in the modal body</td>
            </tr>
            <tr>
              <td>footer</td>
              <td>ReactNode</td>
              <td>undefined</td>
              <td>Optional content for the modal footer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalDemo; 