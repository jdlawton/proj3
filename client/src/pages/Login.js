import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {LOGIN_USER} from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {

    const [login, {error}] = useMutation(LOGIN_USER);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        if (event.target.name === 'email'){
            setEmail(event.target.value);
        }

        if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    }

    //On form submit, this function logs the user into the system and the Auth component stores the token in local storage
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        //console.log('email: ' + email);
        //console.log('password: ' + password);

        try {
            const {data} = await login({
                variables: {email, password}
            })
            console.log(data);
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
    };

    
    return (
        <main>
            <h1>Login Page</h1>
            <div className="loginform">
                <form onSubmit={handleFormSubmit}>

                    <div className="formitem">
                        <label htmlFor="email" className="formlabel">Email:</label><br></br>
                        <input type="text" id="email" name="email" value={email} onChange={handleChange} />
                    </div>

                    <div className="formitem">
                        <label htmlFor="password" className="formlabel">Password:</label><br></br>
                        <input type="password" id="password" name="password" value={password} onChange={handleChange} />
                    </div>

                    <button className='btn' type='submit'>Submit</button>
                </form>
                {error && <div>Login failed</div>}
            </div>
        </main>
    )
}


export default Login;