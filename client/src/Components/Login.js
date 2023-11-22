import React, {useContext, useState} from 'react'
import {Navigate} from 'react-router-dom';
import '../App.css';
import { UserContext } from '../UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext);

  async function login(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className='login' onSubmit={login} action=''>
      <h1 className='title'>Log in Here!</h1>
      <input type='text' 
        className='input-box' 
        placeholder='Username' 
        value={username}
        onChange={(event) => setUsername(event.target.value)} 
        required 
      />
      <input type='text' 
        className='input-box' 
        placeholder='Password' 
        value={password} 
        onChange={(event) => setPassword(event.target.value)} 
        required 
      />
      <button className='button'>Log in!</button>
    </form>
    
  )
}

export default Login