import '../styles/App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null); // Initialize data as null

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:3005/result');
      if (response.ok) {
        const result = await response.json();
        setData(result); // Set the fetched data
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data', error);
    }
  };

  useEffect(() => {
    getData();
  }, []
  );

  return (
    <div className="hi">
      <h1>Results:</h1>
      {data ? (
        data.map((item, index) => (
          <div key={index}>
            <h2>Total amount of messages sent: {item.fullResult}</h2>
          </div>
        ))
      ) : (
        <h2>Loading...</h2> // If data is null, display "Loading..."
      )}
    </div>
  );
}

export default App;
