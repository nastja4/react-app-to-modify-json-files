import React, { useState } from 'react';
import Form from '@rjsf/core';
import { schema } from './schema';
// import validator from '@rjsf/validator-ajv8'; // AJV validator package for JSON Schema validation with '@rjsf/core' (the used version of @rjsf/core requires specifying a validator explicitly due to its type definitions)
import { customizeValidator } from '@rjsf/validator-ajv8';
import { IChangeEvent } from '@rjsf/core';  //  IChangeEvent is part of the React JSON Schema Form (@rjsf/core) library's type definitions, designed to type the event object passed to form event handlers like onChange.


interface FormData {
  // Structure matching expected JSON data
  SystemConfig?: {
    cloud?: {
      certPath: string;
    };
    hardware?: {
      lte?: {
        use: boolean;
      };
      adc?: {
        batteryI2cAddr: string;
      };
    };
    voltage?: {
      battery?: {
        min: number;
        max: number;
        default: number;
      };
    };
    dataParsers?: Array<{
      id: number;
      sensor: {
        hwid: string;
      };
      use: boolean;
      position: number[];
    }>;
  };
}

const downloadJson = (formData: FormData | {}, defaultFilename: string) => {
  const filename = prompt("Enter file name:", defaultFilename) || defaultFilename;
  
  const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


const App: React.FC = () => {              // React.FC (FunctionComponent) is a TypeScript generic type used in React applications to define a functional component with TypeScript
  const [formData, setFormData] = useState<FormData | {}>({});  // The formData state is initialized with a type that can either be an empty object {} or FormData

  const handleChange = (e: IChangeEvent<FormData>) => {      // @rjsf/core library's 'Form' component expects an onChange handler that receives an event object of type IChangeEvent<T>, T is the type of my form data (in this case, FormData).
    setFormData(e.formData ?? {});   // Using ?? operator to fallback to {} if e.formData is undefined
  };

  const handleSubmit = () => console.log(formData);  //  could involve more complex operations like sending the data to a server

  // Function to handle file input change and load the JSON
  // Its purpose is to read the content of the selected file, parse it as JSON, and then update the component's state with this parsed JSON data
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {      // React.ChangeEvent<HTMLInputElement> indicates that the function expects an event argument of type ChangeEvent from an <input> element.
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
  
  //  custom validation function that conforms to both the schema and FormData structure
  const validator = customizeValidator<FormData>();
  
  const handleDownload = () => {
    downloadJson(formData, "JSONconfig.json");
  };


  return (
    <div style={{ display: 'flex', margin: '20px' }}>
      <div>
        <h2>Upload JSON Configuration File <span style={{display: 'block'}}>(for display and editing)</span></h2>
        <input type="file" accept=".json" onChange={handleFileChange} style={{ marginBottom: '10px' }} />     {/* // element lets users choose a .json file from their local device */}
        <Form 
          schema={schema}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit} // a button Submit
          // validator={validator as any}  // bypasses TypeScript's type checks
          validator={validator} // Passing the AJV validator here
        />
        <button onClick={handleDownload} style={{ marginTop: '20px' }}>Download JSON File</button>
      </div>
      <div style={{ marginLeft: '40px' }}>
        <h2>JSON preview</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>   {/* // <pre> tag is used to display the formData as a formatted JSON string (with indentation (2) for readability) */}
      </div>
    </div>
  );
};

export default App;