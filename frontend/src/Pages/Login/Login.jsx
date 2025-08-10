import { useState, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

import './Login.css';
import Eye from '../../assets/Login password hidden/eye.png';
import Hidden from '../../assets/Login password hidden/hidden.png';
import throwing from '../../assets/Login password hidden/throwing.jpg'
import { UserContext } from '../../Contexts/userContext';

//PW = Chamika@1234, perara

const Login = () => {

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);

    //hashing

    const salted = (password) => {

        return "chamika" + password;

    }

    const hashed = (saltedPassword) => {

        var hashedOne = "";

        for (let i = 0; i < saltedPassword.length; i++) {

            hashedOne = hashedOne + saltedPassword.charCodeAt(i).toString();

        }

        return hashedOne;


    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUempty, setIsUempty] = useState(false);
    const [isPempty, setIsPempty] = useState(false);

    const [isPassword, setIsPassword] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [wrongPW, setWrongPW] = useState(false);
    const [userINV, setUserINV] = useState(false);

    const handleP = () => {

        setIsPassword(!isPassword);

    }

    const handleLogin = async (e) => {

        e.preventDefault();

        if (username == '' && password == '') {

            setIsPempty(true);
            setIsUempty(true);
            setInvalid(false);

        } else if (username != '' && password == '') {

            setIsUempty(false);
            setIsPempty(true);
            setInvalid(false);
            setWrongPW(false);

        } else if (username == '' && password != '') {

            setIsPempty(false);
            setIsUempty(true);
            setInvalid(false);
            setUserINV(false)
            setWrongPW(false);

        } else {

            setIsPempty(false);
            setIsUempty(false);

            fetch('http://localhost:5000/user/islogin', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), password: hashed(salted(password.trim())) })

            })
                .then((res) => res.json())
                .then((data) => {

                    if (data) {

                        if (data.message == 'Invalid Username') {

                            setWrongPW(false);
                            setUserINV(true);

                        }

                        if (data.message == 'Wrong Password') {

                            setWrongPW(true);
                            setUserINV(false);

                        }



                        if (data.token) {

                            setInvalid(false);

                            localStorage.setItem('userId', data.userId);
                            localStorage.setItem('username', data.username);
                            localStorage.setItem('role', data.role);
                            localStorage.setItem('token', data.token);

                            setUser({ userId: data.userId, username: data.username, role: data.role });

                            navigate(`/home/dashboard`);

                        }



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
            <div className="left">
                <form onSubmit={handleLogin}>

                    <div className="field">

                        <label>Username</label>
                        <input className='u-in' type="text" onChange={(e) => setUsername(e.target.value)} size={40}></input>
                        {isUempty && <span>* Username field must be filled *</span>}
                        {userINV && <span>* Invalid username *</span>}

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

                <p><NavLink to='/forgotpassword'>Forgot Password</NavLink>?</p>

            </div>

            <div className="right">

                <button><NavLink className='toSign' to='/signup'>sign up</NavLink></button>

                <img className="login-pic" src={throwing}></img>

            </div>
        </div>
    );

}

export default Login;