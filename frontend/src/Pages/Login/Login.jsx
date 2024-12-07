import { useDebugValue, useState } from "react";
import { useNavigate } from 'react-router-dom';

import './Login.css';
import Eye from '../../assets/Login password hidden/eye.png';
import Hidden from '../../assets/Login password hidden/hidden.png';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUempty, setIsUempty] = useState(false);
    const [isPempty, setIsPempty] = useState(false);

    const [isPassword, setIsPassword] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [wrongPW, setWrongPW] = useState(false);

    const handleP = () => {

        setIsPassword(!isPassword);

    }

    const handleLogin = (e) => {

        e.preventDefault();

        if (username == '' && password == '') {

            setIsPempty(true);
            setIsUempty(true);
            setInvalid(false);

        } else if (username != '' && password == '') {

            setIsUempty(false);
            setIsPempty(true);
            setInvalid(false);

        } else if (username == '' && password != '') {

            setIsPempty(false);
            setIsUempty(true);
            setInvalid(false);

        } else {

            setIsPempty(false);
            setIsUempty(false);

            fetch('http://localhost:5000/user/islogin', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })

            })
                .then((res) => res.json())
                .then((data) => {

                    if (data.response.length == 1) {

                        setInvalid(false);

                        if (password == data.response[0].Password) {

                            console.log(data);
                            navigate('/home');

                        }

                        setWrongPW(true);


                    } else {

                        setWrongPW(false);
                        setInvalid(true);

                    }


                })
                .catch((error) => console.log('Error from login : ', error));

        }

    }

    return (

        <div className="c-login">
            <div className="wrapper">
                <form onSubmit={handleLogin}>

                    <div className="field">

                        <label>Username</label>
                        <input className='u-in' type="text" onChange={(e) => setUsername(e.target.value)} size={40}></input>
                        {isUempty && <span>* Username field must be filled *</span>}

                    </div>

                    <div className="field">

                        <label>Password</label>
                        <div className="passwordField">
                            <input type={isPassword ? 'password' : 'text'} onChange={(e) => setPassword(e.target.value)} size={40} ></input>
                            <div className="eye-button"><button type='button' onClick={handleP} className="eye"><img src={isPassword ? Hidden : Eye}></img></button></div>
                        </div>
                        {isPempty && <span>* Password field must be filled *</span>}
                        {invalid && <span>* Invalid Username or Password *</span>}
                        {wrongPW && <span>* Wrong Password *</span>}

                    </div>

                    <button className='submit' type='submit'>Login</button>

                </form>

            </div>
        </div>
    );

}

export default Login;