import React, {useState} from 'react';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-type': 'application/json'},
    })
    if (response.status === 200) {
      alert('Registration successful')
    } else {
      alert('Registration failed')
    }
  }

  return (
    <form className='register' onSubmit={register} action=''>
      <h1 className='title'>Register New Account</h1>
      <input type='text' 
        className='input-box'
        value={username} 
        onChange={(event) => setUsername(event.target.value)}
        placeholder='Username' 
        required 
      />
      <input type='text' 
        className='input-box' 
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder='Password' 
        required 
      />
      <button className='button'>Register</button>
    </form>
  )
}

export default Register