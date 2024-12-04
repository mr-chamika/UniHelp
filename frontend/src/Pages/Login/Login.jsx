import { useState } from "react";
import './Login.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = ()=>{

        alert('Login clicked');

    }

    return (

        <div className="c-login">
            <div className="wrapper">
                <form onSubmit={handleLogin}>

                    <label>Username</label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)}></input>

                    <label>Password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)}></input>

                    <button type='submit'>Login</button>

                </form>

            </div>
        </div>
    );

}

export default Login;