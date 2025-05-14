import './App.css';
import { useTranslation } from 'react-i18next';
import Auth from './servises/Auth';

function App() {
  const { t } = useTranslation();
  function login() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    if (name) {
      Auth.login(name).then((data: any) => {
        console.log(data);
      });
    }
  }

  return (
    <div id="App">
      <h1 className="title">{t('welcome')}</h1>
      <div className="prompt">{t('prompt_name')}</div>
      <div id="login" className="input-box">
        <input id="name"
          className="input"
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={login}>{t('login')}</button>
      </div>
    </div>
  )
}

export default App
