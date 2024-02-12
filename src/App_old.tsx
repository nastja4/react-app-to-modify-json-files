import React, { useState } from 'react';
import Form from '@rjsf/core'; //  creating a form using the react-jsonschema-form library (@rjsf/core)
import { dataSchema } from './dataSchema';  // Import JSON schema definition
import { JSONSchema7 } from 'json-schema';
import ValidatorType from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';



const App: React.FC = () => {  // 'React Function Component' is a type is is used to define functional components in React when using TypeScript
  const [jsonData, setJsonData] = useState<any>(null); // State to store JSON data
  const [jsonText, setJsonText] = useState<string>(''); // State to store JSON text
  const [formData, setFormData] = useState<any>(null);
  


  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = JSON.parse(reader.result as string);
        setJsonData(data);
        setJsonText(JSON.stringify(data, null, 2));
        setFormData(data); // Set formData to parsed JSON data
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
      setFormData(data); // Set formData to parsed JSON data
    } catch (error) {
      // Handle JSON parsing error
      console.error('Error parsing JSON:', error);
    }
  };


  // // Function to save JSON data
  // const saveJsonData = () => {
  //   // Here saving logic 
  //   console.log('Saving JSON data:', jsonData);
  // };


  // Function to handle form change
  const handleFormChange = ({ formData }: any) => {
    setFormData(formData);
  };

  
  // Function to handle form submission
  const handleSubmit = ({ formData }: any) => {    
    setFormData(formData); // Handle form submission (e.g., update JSON data)
  };


  // Custom validation function - to provide custom validation logic based on the schema
  // const customValidator: ValidatorType<any> = (formData) => {
  //   // Your validation logic here
  //   return {};
  // };

  // const customValidator: ValidatorType<any, JSONSchema7, any> = ({ formData }) => {
  //   // Your validation logic here
  //   return { errors: [] }; // Return an object with 'errors' property, even if it's an empty array
  // };
  const validateFormData = (formData: any, errors: any) =>  {  //  validateFormData function should accept three parameters: data, schema, and optionally context.
    // Initialize an empty object to store validation errors
    const validationErrors: any = {};
  
    // Access the SystemConfig object from formData
    const systemConfig = formData.SystemConfig;
  
    // Validate the cloud property
    if (!systemConfig.cloud || !systemConfig.cloud.certPath) {
      validationErrors['SystemConfig'] = {
        cloud: {
          certPath: 'Cert path is required for cloud configuration.'
        }
      };
    }
  
    // Validate the hardware property
    if (!systemConfig.hardware || !systemConfig.hardware.lte || !systemConfig.hardware.adc) {
      validationErrors['SystemConfig'] = {
        ...validationErrors['SystemConfig'],
        hardware: 'LTE and ADC configurations are required.'
      };
    }
  
    // Validate the voltage property
    if (!systemConfig.voltage || !systemConfig.voltage.battery) {
      validationErrors['SystemConfig'] = {
        ...validationErrors['SystemConfig'],
        voltage: 'Battery voltage configuration is required.'
      };
    } else {
      const battery = systemConfig.voltage.battery;
      if (battery.min >= battery.max) {
        validationErrors['SystemConfig'] = {
          ...validationErrors['SystemConfig'],
          voltage: 'Minimum voltage must be less than maximum voltage.'
        };
      }
    }
  
    // Validate the dataParsers property
    if (!systemConfig.dataParsers || systemConfig.dataParsers.length === 0) {
      validationErrors['SystemConfig'] = {
        ...validationErrors['SystemConfig'],
        dataParsers: 'At least one data parser configuration is required.'
      };
    }
  
    // Return the accumulated validation errors
    return validationErrors;
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
          {/* <button onClick={saveJsonData}>Save</button>
          <button onClick={addKey}>Add Key</button> */}
          {/* <button onClick={() => deleteKey('keyToDelete')}>Delete Key</button> */}
          {/* <button onClick={addDataParser}>Add Data Parser</button> */}
        </>
      )}
  
      <Form
        schema={dataSchema} // 'schema' prop is set to the imported 'dataSchema' (passing Schema to Form component)
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        validator={validateFormData} // 'validateFormData' function is passed to the validate prop of the Form component
        // noValidate
        // noValidate={false}
        // noHtml5Validate={false}
      />
    </div>
  );
};

export default App;


