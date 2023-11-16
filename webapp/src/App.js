import React from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello!</h1>
        <p>Welcome to the photogrammetry capstone.</p>
      </header>
      <body>
        <p>test</p>
        <Button text={'Start Scan'} onClick={() => alert('Scan has commenced!')}></Button>
        <Button text={'View Completed Scans'} onClick={() => alert('Show the scans')}></Button>
      </body>
    </div>
  );
}

export default App;
