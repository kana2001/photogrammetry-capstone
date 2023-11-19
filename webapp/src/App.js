import React from 'react';
import './App.css';
import { BrowserRouter as Route, Routes, Link, HashRouter } from 'react-router-dom'
import NewScan from './views/NewScan';
import CompletedScans from './views/CompletedScans';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the photogrammetry capstone (Proof of concept)</p>
      </header>
      <HashRouter>
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
    </HashRouter>
    </div>
  );
}

export default App;
