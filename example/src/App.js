import React from 'react';

import logo from './logo.svg';
import './App.css';

import {ComfyLoc, ComfyNode, ComfyLangButton} from 'react-comfy-localization';

function App() {
  return (
    <ComfyNode defaultLanguage='es' name="test">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ComfyLoc>
            test-string
          </ComfyLoc>

          <ComfyLangButton/>
        </header>
      </div>
    </ComfyNode>
  );
}

export default App;
