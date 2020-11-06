import React, { useState } from 'react';
import {useMutation} from '@apollo/react-hooks';
import {ADD_USER} from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser, {error}] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    //console.log(event);
    //console.log(event.target.name);

    if (event.target.name === 'username'){
      setUsername(event.target.value);
    }

    if (event.target.name === 'email'){
      setEmail(event.target.value);
    }

    if (event.target.name === 'password'){
      setPassword(event.target.value);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('username: ' + username);
    console.log('email: ' + email);
    console.log('password: ' + password);

    try {
      //execute addUser mutation and pass in variable data from form
      const {data} = await addUser({
        variables: {username, email, password}
      })
      Auth.login(data.addUser.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
          <h4>Sign Up</h4>
          <div className="adduserform">
            <form onSubmit={handleFormSubmit}>

              <div className="formitem">
                <label htmlFor="username" className="formlabel">Username:</label><br></br>
                <input type="text" id="username" name="username" value={username} onChange={handleChange}/>
              </div>

              <div className="formitem">
                <label htmlFor="email" className="formlabel">Email:</label><br></br>
                <input type="text" id="email" name="email" value={email} onChange={handleChange}/>
              </div>

              <div className="formitem">
                <label htmlFor="password" className="formlabel">Password:</label><br></br>
                <input type="password" id="password" name="password" value={password} onChange={handleChange}/>
              </div>

              <button className='btn' type='submit'>Submit</button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
    </main>
  );
};

export default Signup;
