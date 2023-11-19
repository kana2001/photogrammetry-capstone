import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NewScan from './views/NewScan';
import CompletedScans from './views/CompletedScans';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the photogrammetry capstone (Proof of concept)</p>
      </header>
      <Router>
      <div>
        <nav>

              <Link to="/">New Scan</Link>

              <Link to="/completed-scans">Completed Scans</Link>

        </nav>

         <Routes>
          <Route path="/" element={<NewScan />}>
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
