import logo from './logo.svg';
import {ComfyString, ComfyNode} from 'comfy-ui';
import './App.css';

function App() {
  return (
    <div className="App">
      <ComfyNode defaultLanguage='es' name="test">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <ComfyString entryId="Test"/>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </ComfyNode>
    </div>
  );
}

export default App;
