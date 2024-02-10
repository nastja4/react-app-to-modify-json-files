import React, { useState } from 'react';
import Form from '@rjsf/core';
import { dataSchema } from './dataSchema';  // Import JSON schema definition

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null); // State to store JSON data
  const [jsonText, setJsonText] = useState<string>(''); // State to store JSON text

  const [formData, setFormData] = useState<any>(null);


  const handleFormChange = ({ formData }: any) => {
    setFormData(formData);
  };

  const handleSubmit = ({ formData }: any) => {
    // Handle form submission (e.g., update JSON data)
    setFormData(formData);
  };


  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result as string);
        setJsonData(data);
        setJsonText(JSON.stringify(data, null, 2));
      };
      reader.readAsText(file);
    }
  };

  // Function to handle JSON text change
  const handleJsonTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(event.target.value);
    try {
      const data = JSON.parse(event.target.value);
      setJsonData(data);
    } catch (error) {
      // Handle JSON parsing error
      console.error('Error parsing JSON:', error);
    }
  };

  const addKey = () => {
    // Here logic to add a new key-value pair to the JSON data
  };

  const deleteKey = (key: string) => {
    // Here logic to delete a key from the JSON data
  };
  
  const addDataParser = () => {
    // Here logic to add a new object to the dataParsers array
  }

  // Function to save JSON data
  const saveJsonData = () => {
    // Here saving logic 
    console.log('Saving JSON data:', jsonData);
  };

  return (
    <div>
      <h1>JSON Editor</h1>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <>
          <textarea
            value={jsonText}
            onChange={handleJsonTextChange}
            rows={10}
            cols={50}
          />
          <button onClick={saveJsonData}>Save</button>
          <button onClick={addKey}>Add Key</button>
          <button onClick={() => deleteKey('keyToDelete')}>Delete Key</button>
          <button onClick={addDataParser}>Add Data Parser</button>
        </>
      )}
  
      <Form
        schema={dataSchema}
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;


