import React, { useEffect, useRef, useState } from 'react';
import { Formio } from '@formio/js';
import '@formio/js/dist/formio.full.min.css';
import './FormRenderer.css';
import '../../Components/Kanye/KanyeFormio';

// Use the same key as in FormBuilder
const FORM_SCHEMA_KEY = 'formio_builder_schema';

interface FormSchema {
  components: Array<{
    type: string;
    key?: string;
    label?: string;
    [key: string]: unknown;
  }>;
  display?: string;
  title?: string;
  settings?: {
    pdf?: {
      id: string;
      src: string;
    };
    [key: string]: unknown;
  };
}

interface FormInstance {
  destroy: () => void;
  submission?: {
    data: Record<string, unknown>;
  };
  on: (event: string, callback: (data: { data: Record<string, unknown> }) => void) => void;
}

const FormRenderer: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formInstance, setFormInstance] = useState<FormInstance | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let form: FormInstance | null = null;

    const initializeForm = async () => {
      try {
        // Load form schema from localStorage
        const savedSchema = localStorage.getItem(FORM_SCHEMA_KEY);
        if (!savedSchema) {
          setError('No form schema found in localStorage. Please create a form first.');
          return;
        }

        const schema: FormSchema = JSON.parse(savedSchema);

        if (formRef.current) {
          // Create the form
          const createdForm = await Formio.createForm(formRef.current, schema, {
            readOnly: false,
            noAlerts: false,
          });

          form = createdForm;

          // Handle form submission
          createdForm.on('submit', (submission: { data: Record<string, unknown> }) => {
            console.log('Form submitted:', submission);
            setFormData(submission.data);
          });

          // Handle form changes
          createdForm.on('change', (changed: { data: Record<string, unknown> }) => {
            console.log('Form data changed:', changed);
            setFormData(changed.data);
          });

          setFormInstance(createdForm);
        }
      } catch (err) {
        console.error('Error initializing form:', err);
        setError('Failed to initialize form. Please check the form schema.');
      }
    };

    initializeForm();

    return () => {
      if (form) {
        form.destroy();
      }
    };
  }, []);

  const handleResetForm = () => {
    if (formInstance) {
      formInstance.submission = { data: {} };
      setFormData({});
    }
  };

  return (
    <div className="form-renderer-container">
      <h1>Form Renderer</h1>

      {error ? (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      ) : (
        <>
          <div className="form-renderer-actions">
            <button className="btn btn-secondary" onClick={handleResetForm}>
              <i className="bi bi-arrow-counterclockwise me-1"></i>
              Reset Form
            </button>
          </div>

          <div className="form-renderer-wrapper">
            <div ref={formRef} />
          </div>

          {Object.keys(formData).length > 0 && (
            <div className="form-data-preview">
              <h3>Form Data</h3>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FormRenderer;
