import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from 'react-router-dom'
 
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory()
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', credentials)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            history.push('/bubblepage');
        })
        .catch(err => console.log(err))
}
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
          <input name="username" type="text" value={credentials.username} onChange={e => handleChanges(e)}/>
          <input name="password" type="password" value={credentials.password} onChange={e => handleChanges(e)}/>
          <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
