import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername]       = useState('');
  const [loginPassword, setLoginPassword]       = useState('');

  const register = () => {
    let email = registerUsername;
    let password = registerPassword;

    axios.post('/register', {email, password})
      .then(res => {
        setRegisterUsername('');
        setRegisterPassword('');
        console.log(res);
      })
      .catch( e => console.log(e) )
  };

  const login = () => {
    let email = loginUsername;
    let password = loginPassword;
    axios
      .post('/login', {email, password})
      .then(res => {
        setLoginUsername('');
        setLoginPassword('');
        console.log(res);
      })
      .catch( e => {
        console.log(e);
      })
  };

  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:4000/user'
    })
  };







  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)}/>
        <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Submit</button>
      </div>
      
      <div>
        <h1>Login</h1>
        <input placeholder='username' onChange={e => setLoginUsername(e.target.value)}/>
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
      </div>

    </div>
  );
}

export default App;
