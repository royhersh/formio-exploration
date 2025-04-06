import React, { useEffect, useRef, useState } from 'react';
import { Formio } from '@formio/js';
// Import bootstrap icons CSS for the form builder icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@formio/js/dist/formio.full.min.css';
import './FormBuilder.css';
// Import our custom Kanye component
import KanyeFormio from '../../Components/Kanye/KanyeFormio';

// Register the custom component
Formio.use({
  components: {
    kanyequote: KanyeFormio,
  },
});

// Constants
const FORM_SCHEMA_KEY = 'formio_builder_schema';

interface FormComponent {
  type: string;
  key?: string;
  label?: string;
  input?: boolean;
  tableView?: boolean;
  [key: string]: unknown;
}

interface FormSchema {
  components: FormComponent[];
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

interface BuilderInstance {
  on: (event: string, callback: (schema: FormSchema) => void) => void;
  destroy: () => void;
}

const FormBuilder: React.FC = () => {
  const builderRef = useRef<HTMLDivElement>(null);
  const [schema, setSchema] = useState<FormSchema>(() => {
    // Try to load initial schema from localStorage
    const savedSchema = localStorage.getItem(FORM_SCHEMA_KEY);
    return savedSchema
      ? JSON.parse(savedSchema)
      : {
          components: [],
          display: 'form',
          settings: {
            pdf: {
              id: '',
              src: '',
            },
          },
        };
  });

  const handleSaveSchema = () => {
    try {
      localStorage.setItem(FORM_SCHEMA_KEY, JSON.stringify(schema));
      alert('Form schema saved successfully!');
    } catch (error) {
      console.error('Error saving form schema:', error);
      alert('Failed to save form schema');
    }
  };

  const handleClearSchema = () => {
    if (window.confirm('Are you sure you want to clear the saved form schema?')) {
      try {
        localStorage.removeItem(FORM_SCHEMA_KEY);
        setSchema({
          components: [],
          display: 'form',
          settings: {
            pdf: {
              id: '',
              src: '',
            },
          },
        });
        alert('Form schema cleared successfully!');
      } catch (error) {
        console.error('Error clearing form schema:', error);
        alert('Failed to clear form schema');
      }
    }
  };

  useEffect(() => {
    let builder: BuilderInstance | null = null;

    if (builderRef.current) {
      // Initial form schema
      const initialSchema = schema; // Use the schema from state

      // Builder options
      const options = {
        hooks: {
          beforeComponent: (comp: FormComponent) => {
            // Add custom classes or attributes to components if needed
            return comp;
          },
          beforeSubmit: (submission: FormSchema) => {
            console.log('Before submission:', submission);
            return submission;
          },
        },
        builder: {
          basic: {
            default: true,
            components: {
              textfield: true,
              textarea: true,
              email: true,
              phoneNumber: true,
              number: true,
              password: true,
              checkbox: true,
              select: true,
              radio: true,
              button: true,
              kanyequote: true,
            },
          },
          advanced: {
            default: false,
            components: {
              file: true,
              datetime: true,
              day: true,
              time: true,
              currency: true,
              survey: true,
              signature: true,
            },
          },
          layout: {
            default: false,
            components: {
              panel: true,
              table: true,
              tabs: true,
              columns: true,
              fieldset: true,
              well: true,
            },
          },
          data: {
            default: false,
            components: {
              hidden: true,
              container: true,
              dataMap: true,
              dataGrid: true,
            },
          },
          premium: {
            default: false,
          },
        },
      };

      // Create the form builder
      Formio.builder(builderRef.current, initialSchema, options)
        .then((instance: BuilderInstance) => {
          builder = instance;

          builder.on('change', (schema: FormSchema) => {
            setSchema(schema);
            console.log('Form schema updated:', schema);
          });

          // Add custom styling to the builder
          const builderElement = builderRef.current;
          if (builderElement) {
            // Force the builder to use a nice layout
            setTimeout(() => {
              const dragDropArea = builderElement.querySelector('.drag-container');
              if (dragDropArea && !dragDropArea.textContent) {
                dragDropArea.textContent = 'Drag and Drop a form component';
              }
            }, 300);
          }
        })
        .catch((error: Error) => {
          console.error('Error initializing form builder:', error);
        });
    }

    return () => {
      if (builder) {
        builder.destroy();
      }
    };
  }, []);

  return (
    <div className="form-builder-container">
      <h1>Form Builder</h1>
      <div className="form-builder-actions">
        <button className="btn btn-primary me-2" onClick={handleSaveSchema}>
          <i className="bi bi-save me-1"></i>
          Save Form Schema
        </button>
        <button className="btn btn-danger" onClick={handleClearSchema}>
          <i className="bi bi-trash me-1"></i>
          Clear Saved Schema
        </button>
      </div>
      <div className="form-builder-wrapper">
        <div ref={builderRef} className="formio-builder" />
      </div>

      {/* Form Schema Display */}
      <div className="schema-preview">
        <h3>Form Schema</h3>
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormBuilder;
