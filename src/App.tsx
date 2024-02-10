import React, { useState } from 'react';

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null); // State to store JSON data
  const [jsonText, setJsonText] = useState<string>(''); // State to store JSON text

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

  // Function to save JSON data
  const saveJsonData = () => {
    // Implement saving logic here
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
        </>
      )}
    </div>
  );
};

export default App;




// // App.tsx
// import React, { useState } from 'react';
// import JSONEditor from './JSONEditor';
// import SaveButton from './SaveButton';
// import ResetButton from './ResetButton';
// import Feedback from './Feedback';

// interface Data {
//   [key: string]: any;
// }

// const App: React.FC = () => {
//   const [jsonData, setJsonData] = useState<Data>({});
//   const [originalData, setOriginalData] = useState<Data>({});
//   const [feedbackMessage, setFeedbackMessage] = useState<string>('');

//   const handleDataChange = (data: Data) => {
//     setJsonData(data);
//   };

//   const handleSave = () => {
//     // Implement save functionality
//   };

//   const handleReset = () => {
//     setJsonData(originalData);
//     setFeedbackMessage('Data reset successfully');
//   };

//   return (
//     <div className="app">
//       <h1>JSON Editor</h1>
//       <JSONEditor jsonData={jsonData} onDataChange={handleDataChange} />
//       <div className="button-container">
//         <SaveButton onSave={handleSave} />
//         <ResetButton onReset={handleReset} />
//       </div>
//       <Feedback message={feedbackMessage} />
//     </div>
//   );
// };

// export default App;












// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
