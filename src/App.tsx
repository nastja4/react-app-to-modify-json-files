import React, { useState } from 'react';
import Form from '@rjsf/core';
import { schema } from './schema';
import validator from '@rjsf/validator-ajv8';

const App: React.FC = () => {
  const [formData, setFormData] = useState({});

  const handleChange = ({ formData }: any) => setFormData(formData);
  const handleSubmit = () => console.log(formData);

  // Function to handle file input change and load the JSON
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        const content = e.target?.result;
        try {
          if (typeof content === 'string') {
            const json = JSON.parse(content);
            setFormData(json);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Failed to parse the file as JSON.");
        }
      };
    }
  };

  return (
    <div>
      <h2>Upload JSON Configuration File</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <Form 
        schema={schema}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit} 
        validator={validator}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;