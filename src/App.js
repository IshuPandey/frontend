import React, { useState } from 'react';
// import axios from 'axios';
 import './App.css'; // Import your CSS file for styling

 function IngredientsList({ foodname,ingredients }) {
  return (
    <div>

    <h2>{foodname}</h2>
    <ul>
      {ingredients?.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
    </div>

  );
}

function App () {
  const [file, setFile] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [response1,setresponse1]=useState()


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFoodNameChange = (e) => {
    setFoodName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', foodName); // Append the food name text to the FormData object

  
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
  
      const responseData = await response.json();
      setresponse1(responseData)
      console.log(response1)
      // console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div className='center'>
        {/* <div>{response1?.food}</div> */}

       <div className="container">
      <h1>Search Food</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={foodName}
          onChange={handleFoodNameChange}
          placeholder="Enter food name..."
        />
        <label htmlFor="fileUpload" className="custom-file-upload">
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            accept="image/*"
          />
          <i className="fas fa-cloud-upload-alt"></i> Upload Image
        </label>
        <button type="submit">Search</button>
      </form>

    </div>
      <IngredientsList foodname={response1?.food} ingredients={response1?.ingredients} />
    </div>
    </div>

  );
};

export default App;
