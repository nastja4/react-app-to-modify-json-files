import React, { useState } from 'react';
import Form from '@rjsf/core';
import { schema } from './schema';
import validator from '@rjsf/validator-ajv8'; // AJV validator package for JSON Schema validation with '@rjsf/core' (the used version of @rjsf/core require specifying a validator explicitly due to its type definitions)

const App: React.FC = () => {
  const [formData, setFormData] = useState({});

  const handleChange = ({ formData }: any) => setFormData(formData);
  const handleSubmit = () => console.log(formData);


  // Function to handle file input change and load the JSON
  // Its purpose is to read the content of the selected file, parse it as JSON, and then update the component's state with this parsed JSON data
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {  // React.ChangeEvent<HTMLInputElement> indicates that the function expects an event argument of type ChangeEvent from an <input> element.
    const fileReader = new FileReader();                      // 'FileReader' is a Web API that allows for asynchronous reading of the contents of files (or raw data buffers) stored on the user's computer.

    if (event.target.files && event.target.files.length > 0) {   // 'event.target.files' is a FileList object representing the files selected by the user. The code checks that this object exists and contains at least one file.
      const file = event.target.files[0];                   // gets the first file from the FileList
      fileReader.readAsText(file, "UTF-8");

      fileReader.onload = (e) => {                        // 'onload' event handler is called once the read operation is successfully completed
        const content = e.target?.result;
        try {                                             // If the parsing is successful, the parsed JSON object is used to update the component's state with 'setFormData(json)', effectively loading the JSON data into the form.
          if (typeof content === 'string') {
            const json = JSON.parse(content);
            setFormData(json);
          }
        } catch (error) {     // error handling
          console.error("Error parsing JSON:", error);
          alert("Failed to parse the file as JSON.");
        }
      };
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h2>Upload JSON Configuration File</h2>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <Form 
          schema={schema}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit} // a button Submit
          validator={validator}
        />
      </div>
      <div style={{ marginLeft: '40px' }}>
        <h2>JSON preview</h2>
        {/* // <pre> tag is used to display the formData as a formatted JSON string.  */}
        {/* converts the formData object to a JSON string with indentation (2) for readability  */}
        <pre>{JSON.stringify(formData, null, 2)}</pre>   
      </div>
    </div>
  );
};

export default App;