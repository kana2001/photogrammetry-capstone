import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NewScan from './views/NewScan';
import CompletedScans from './views/CompletedScans';

function App() {
  const [imageServerIP, setImageServerIP] = useState('');
  const [lensPosition, setLensPosition] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>Welcome to the photogrammetry capstone (Proof of concept)</p> */}
      </header>
      <Router>
        <div>
          <nav>

            <Link to="/">New Scan</Link>

            <Link to="/completed-scans">Completed Scans</Link>

          </nav>

          <Routes>
            <Route path="/" element={<NewScan
              imageServerIP={imageServerIP}
              setImageServerIP={setImageServerIP}
              lensPosition={lensPosition}
              setLensPosition={setLensPosition} />}>
            </Route>
            <Route path="/completed-scans" element={<CompletedScans />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
