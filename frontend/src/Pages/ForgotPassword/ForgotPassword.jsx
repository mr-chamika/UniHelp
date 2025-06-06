import './ForgotPassword.css'

import React, { useState } from "react";
import emailjs from '@emailjs/browser'
import OtpPopup from '../../Components/OtpPopup/OtpPopup'
import { NavLink, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

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


    const navigate = useNavigate()

    const [otp, setOtp] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const [showPopup, setShowPopup] = useState(false)
    const [nPassword, setNPassword] = useState('')
    const [cPassword, setCPassword] = useState('')

    const [matchError, setMatchError] = useState(false)
    const [nPasswordError, setNPasswordError] = useState(false)
    const [cPasswordError, setCPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [error, setError] = useState(false)

    const [forNpwd, setForNpwd] = useState(false)
    const [forCpwd, setForCpwd] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const generate = () => {

        var i = 0;
        var x = "";

        for (i = 0; i < 6; i++) {

            x = x + Math.floor(Math.random(1) * 10).toString()

        }

        return x;

    }

    const validatePassword = (pwd) => {

        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!regex.test(pwd)) {
            return true;
        } else {
            return false;
        }
    };

    const send = (e) => {

        e.preventDefault()

        fetch('http://localhost:5000/user/forgotpassword', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail })

        })
            .then((res) => res.json())
            .then((data) => {

                if (data.message == 'User not found') {

                    setEmailError(true)

                } else {

                    setEmailError(false)

                    if (nPassword == '' || cPassword == '') {

                        if (nPassword == '' && cPassword == '') {

                            setCPasswordError(true)
                            setNPasswordError(true)
                            setMatchError(false)

                        } else if (cPassword == '' && nPassword != '') {

                            setCPasswordError(true)
                            setNPasswordError(false)
                            setMatchError(false)

                        } else {

                            setNPasswordError(true)
                            setCPasswordError(false)
                            setMatchError(false)

                        }



                    } else if (nPassword != cPassword) {

                        setMatchError(true)
                        setNPasswordError(false)
                        setCPasswordError(false)

                    } else {



                        setError(validatePassword(nPassword))

                        if (!error) {

                            setMatchError(false)
                            setNPasswordError(false)
                            setCPasswordError(false)

                            var y = generate()

                            setOtp(y)

                            var emailTemplate = {

                                to_name: data.message,
                                message: y,
                                from_name: 'UniHelp',
                                to_email: userEmail

                            }

                            emailjs.send('service_k761r0g', 'template_ygqoiff', emailTemplate, 'tzsqjrLjyvNx4hd00')

                            setShowPopup(true);


                        }

                    }

                }
            })



    }

    const cancel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsClosing(false);
            setOtp('');
            setNPassword('');
            setCPassword('');
        }, 300);
    }

    const handleDone = (input) => {

        if (input.toString() == otp) {

            alert("Password Changed Successfully")

            const newp = hashed(salted(nPassword))

            fetch('http://localhost:5000/user/changepassword', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail, newp })

            })
                .then((res) => res.json())
                .then((data) => {

                    if (data.message == 'Password updated successfully') {

                        setShowPopup(false);
                        setNPassword('')
                        setCPassword('')
                        navigate('/login')

                    } else {

                        alert('Error while changing password')

                    }
                })

        } else {

            alert("Invalid OTP Code")

        }

    }

    return (

        <div className="c-forgotPassword">

            <header>

                <NavLink className='button' to='/login'>Login</NavLink>
                <NavLink className='button' to='/signup'>Sign Up</NavLink>

            </header>

            <form onSubmit={send}>
                <div className="in">
                    <input placeholder="Student Email ..." type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} ></input>
                    <button className='showing'></button>
                </div>
                <div className="error">
                    {emailError && <p>This email not registered</p>}
                </div>
                <div className="in">
                    <input type={forNpwd ? "text" : "password"} placeholder="New Password ..." value={nPassword} onChange={e => setNPassword(e.target.value)} />
                    <button type="button" className='showing' onClick={() => setForNpwd(!forNpwd)}>{forNpwd ? "Hide" : "Show"}</button>
                </div>
                <div className="error">
                    {nPasswordError && <p>New password must be filled</p>}
                    {error && <p>Password must be at least 8 characters long, include an uppercase letter, and a special character.</p>}
                </div>



                <div className="in">

                    <input type={forCpwd ? "text" : "password"} placeholder="Confirm Password ..." value={cPassword} onChange={e => setCPassword(e.target.value)} />
                    <button type="button" className='showing' onClick={() => setForCpwd(!forCpwd)}>{forCpwd ? "Hide" : "Show"}</button>
                </div>
                <div className="error">
                    {cPasswordError && <p>This field must be filled</p>}
                    {matchError && <p>Passwords do not match</p>}
                </div>



                <button type='submit' className='submit-button'>Confirm</button>
            </form>

            <div className={`popup-container ${showPopup ? 'show' : ''}`}>

                <OtpPopup
                    show={showPopup}
                    cancel={cancel}
                    handleDone={handleDone}
                />

            </div>

        </div>



    );

}

export default ForgotPassword;