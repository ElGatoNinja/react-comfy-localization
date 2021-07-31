import logo from './logo.svg';
import './App.css';

import ConfyInt from './ConfyInt';
import ComfyNode from './ComfyNode';
import ComfyLangButton from './LangSelectors/ComfyLangButton';

function App() {
  return (
    <ComfyNode defaultLanguage='es' name="test">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ConfyInt>
            test-string
          </ConfyInt>

          <ComfyLangButton/>
        </header>
      </div>
    </ComfyNode>
  );
}

export default App;
