import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import './i18n';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [resultText, setResultText] = useState(t('prompt_name'));
  const [name, setName] = useState('');
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  return (
    <div id="App">
      <img src={logo} id="logo" alt="logo"/>
      <div id="result" className="result">{resultText}</div>
      <div id="input" className="input-box">
        <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
        <button className="btn" onClick={greet}>Greet</button>
      </div>
    </div>
  )
}

export default App
