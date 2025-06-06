import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SignUp.css';

import Eye from '../../assets/Login password hidden/eye.png';
import Hidden from '../../assets/Login password hidden/hidden.png';
import set from '../../assets/Login password hidden/set.jpg'
import OtpPopup from '../../Components/OtpPopup/OtpPopup'
import emailjs from '@emailjs/browser';

const SignUp = () => {

    const navigate = useNavigate();

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

    // for user inputs

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [uni, setUni] = useState('');
    const [facualty, setFacualty] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [tpassword, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');//confirm password

    const [usernameExist, setUsernameExists] = useState(false);
    const [emailExist, setEmailExists] = useState(false);
    const [isAllFilled, setIsAllFilled] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const [isPassword, setIsPassword] = useState(true);
    const [isPasswordc, setIsPasswordc] = useState(true);

    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [uniError, setUniError] = useState(false);
    const [facultyError, setFacultyError] = useState(false);
    const [usernameFormatError, setUsernameFormatError] = useState(false);

    const [otp, setOtp] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return !regex.test(pwd);
    };

    const validateName = (name) => {
        const regex = /^[a-zA-Z\s]{2,50}$/;
        return !regex.test(name);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return !regex.test(phone);
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9_]{4,20}$/;
        return !regex.test(username);
    };

    const generate = () => {
        let x = "";
        for (let i = 0; i < 6; i++) {
            x = x + Math.floor(Math.random() * 10).toString();
        }
        return x;
    };

    const cancel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsClosing(false);
            setOtp('');
        }, 300);
    };

    const handleP = () => {

        setIsPassword(!isPassword);

    }

    const handlePc = () => {

        setIsPasswordc(!isPasswordc);

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        setNameError(false);
        setPhoneError(false);
        setEmailFormatError(false);
        setUniError(false);
        setFacultyError(false);
        setPasswordError(false);
        setUsernameFormatError(false);
        setIsPasswordMatch(true);
        setIsAllFilled(true);

        const isNameInvalid = validateName(name);
        const isPhoneInvalid = validatePhone(phone);
        const isEmailInvalid = validateEmail(email);
        const isPasswordInvalid = validatePassword(tpassword);
        const isUsernameInvalid = validateUsername(username);
        const isUniEmpty = uni === '';
        const isFacultyEmpty = facualty === '';

        setNameError(isNameInvalid);
        setPhoneError(isPhoneInvalid);
        setEmailFormatError(isEmailInvalid);
        setUniError(isUniEmpty);
        setFacultyError(isFacultyEmpty);
        setPasswordError(isPasswordInvalid);
        setUsernameFormatError(isUsernameInvalid);

        if (tpassword !== cpassword) {
            setIsPasswordMatch(false);
            return;
        }

        if (isNameInvalid || isPhoneInvalid || isEmailInvalid ||
            isPasswordInvalid || isUniEmpty || isFacultyEmpty ||
            isUsernameInvalid) {
            return;
        }

        if (name != '' && uni != '' && facualty != '' && email != '' && phone != '' && username != '' && tpassword != '' && cpassword != '') {

            setIsAllFilled(true);

            fetch('http://localhost:5000/user/check', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email })

            })
                .then((res) => res.json())
                .then((data) => {

                    if ((data.username.length == 0 && data.email.length == 0) && (tpassword === cpassword)) {

                        setIsPasswordMatch(true);

                        const x = salted(tpassword)
                        const password = hashed(x)

                        const y = generate();
                        setOtp(y);

                        const emailTemplate = {
                            to_name: name,
                            message: y,
                            from_name: 'UniHelp',
                            to_email: email
                        };

                        setUserDetails({
                            name,
                            uni,
                            facualty,
                            email,
                            phone,
                            username,
                            password: hashed(salted(tpassword))
                        });

                        emailjs.send('service_k761r0g', 'template_ygqoiff', emailTemplate, 'tzsqjrLjyvNx4hd00')

                        setShowPopup(true);


                    } else if (data.username.length == 1 && data.email.length == 0) {

                        if (tpassword === cpassword) { setIsPasswordMatch(true) } else { setIsPasswordMatch(false) }

                        setEmailExists(false);
                        setUsernameExists(true);

                    } else if (data.username.length == 0 && data.email.length == 1) {

                        if (tpassword === cpassword) { setIsPasswordMatch(true) } else { setIsPasswordMatch(false) }

                        setEmailExists(true);
                        setUsernameExists(false);

                    } else {

                        if (tpassword === cpassword) { setIsPasswordMatch(true) } else { setIsPasswordMatch(false) }

                        setEmailExists(true);
                        setUsernameExists(true);

                    }
                })
                .catch((err) => console.log('Error while send email and username to the backend', err));

        } else {

            setIsAllFilled(false);
            setEmailExists(false);
            setUsernameExists(false);

        }

    }

    const handleDone = (input) => {
        if (input.toString() === otp) {
            fetch('http://localhost:5000/user/create', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userDetails)
            })
                .then((res) => res.json())
                .then((data) => {
                    alert('Account created successfully.');
                    navigate(`/home/${data.newUser._id}`);
                })
                .catch((err) => {
                    console.log('Error from SignUp ', err);
                });
        } else {
            alert("Invalid OTP Code");
        }
    };

    return (

        <div className="c-signup">
            <div className="left">

                <img src={set} alt="signup image" className="signup-pic" />

            </div>
            <div className="right">
                <div className="signup-wrapper">
                    <form onSubmit={handleSubmit}>


                        <input placeholder="Full Name" type="text" onChange={(e) => setName(e.target.value)}></input>
                        {nameError && <span className="error">* Name should only contain letters and be 2-50 characters long *</span>}

                        <input placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)}></input>
                        {usernameFormatError && <span className="error">* Username must be 4-20 characters long and can only contain letters, numbers, and underscores *</span>}
                        {usernameExist && <span className="error">* This Username is already taken *</span>}

                        <select onChange={(e) => setUni(e.target.value)}>
                            <option value="" selected hidden>Select Your University</option>
                            <option value="University of Colombo">University of Colombo</option>
                            <option value="University of Jayawandanapura">University of Jayawandanapura</option>
                            <option value="University of Jaffna">University of Jaffna</option>
                            <option value="University of Ruhuna">University of Ruhuna</option>
                            <option value="University of Peradeniya">University of Peradeniya</option>
                            <option value="University of Uwa">University of Uwa</option>
                        </select>
                        {uniError && <span className="error">* Please select your university *</span>}

                        <select onChange={(e) => setFacualty(e.target.value)}>
                            <option value="" selected hidden>Select Your Facualty</option>
                            <option value="UCSC">UCSC</option>
                            <option value="Facualty of Science">Facualty of Science</option>
                            <option value="Faculty of Medicine">Faculty of Medicine</option>
                            <option value="Faculty of Arts">Faculty of Arts</option>
                            <option value="Faculty of Law">Faculty of Law</option>
                            <option value="Faculty of Management">Faculty of Management</option>
                        </select>
                        {facultyError && <span className="error">* Please select your faculty *</span>}

                        <input placeholder="University Student Email" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                        {emailFormatError && <span className="error">* Please enter a valid email address *</span>}
                        {emailExist && <span>* This email already exists. Try another one *</span>}

                        <input placeholder="Mobile Number" type="tel" onChange={(e) => setPhone(e.target.value)}></input>
                        {phoneError && <span className="error">* Please enter a valid 10-digit phone number *</span>}



                        <div className='pass'>
                            <input placeholder="Enter Password ...." type={isPassword ? 'password' : 'text'} onChange={(e) => setPassword(e.target.value)}></input>
                            <button type='button' onClick={handleP} className="eye"><img src={isPassword ? Hidden : Eye} alt="toggle password"></img></button>
                        </div>
                        {passwordError && <span className="error">* Password must be at least 8 characters long, include an uppercase letter, and a special character *</span>}

                        <div className='pass'>
                            <input placeholder="Re-Enter Password ...." type={isPasswordc ? 'password' : 'text'} onChange={(e) => setCpassword(e.target.value)}></input>
                            <button type='button' onClick={handlePc} className="eye"><img src={isPasswordc ? Hidden : Eye}></img></button>

                        </div>
                        {!isPasswordMatch && <span className="error">* Re-entered password does not match *</span>}

                        {!isAllFilled && <span>* All fields must be filled *</span>}
                        <br /><br />
                        <button type="submit" className='signup-button'>Sign Up</button>

                    </form>

                    <p>Already have an account ? <NavLink to='/login'>Login</NavLink></p>
                </div>
            </div>
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

export default SignUp;