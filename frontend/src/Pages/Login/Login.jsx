import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUempty, setIsUempty] = useState(false);
    const [isPempty, setIsPempty] = useState(false);

    const handleLogin = (e) => {

        e.preventDefault();

        if (username == '' && password == '') {

            setIsPempty(true);
            setIsUempty(true);

        } else if (username != '' && password == '') {

            setIsUempty(false);
            setIsPempty(true);

        } else if (username == '' && password != '') {

            setIsPempty(false);
            setIsUempty(true);

        } else {

            setIsPempty(false);
            setIsUempty(false);

            navigate('/home');

        }

    }

    return (

        <div className="c-login">
            <div className="wrapper">
                <form onSubmit={handleLogin}>

                    <div className="field">

                        <label>Username</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} size={40}></input>
                        {isUempty && <span>* Username field must be filled *</span>}

                    </div>

                    <div className="field">

                        <label>Password</label>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} size={40}></input>
                        {isPempty && <span>* Password field must be filled *</span>}

                    </div>

                    <button type='submit'>Login</button>

                </form>

            </div>
        </div>
    );

}

export default Login;