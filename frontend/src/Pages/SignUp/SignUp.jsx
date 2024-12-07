import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

import Eye from '../../assets/Login password hidden/eye.png';
import Hidden from '../../assets/Login password hidden/hidden.png';

const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [uni, setUni] = useState('');
    const [facualty, setFacualty] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');//confirm password

    const [usernameExist, setUsernameExists] = useState(false);
    const [emailExist, setEmailExists] = useState(false);
    const [isAllFilled, setIsAllFilled] = useState(true);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const [isPassword, setIsPassword] = useState(true);
    const [isPasswordc, setIsPasswordc] = useState(true);

    const handleP = () => {

        setIsPassword(!isPassword);

    }

    const handlePc = () => {

        setIsPasswordc(!isPasswordc);

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if (name != '' && uni != '' && facualty != '' && email != '' && phone != '' && username != '' && password != '' && cpassword != '') {

            setIsAllFilled(true);

            fetch('http://localhost:5000/user/check', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email })

            })
                .then((res) => res.json())
                .then((data) => {

                    if ((data.username.length == 0 && data.email.length == 0) && (password === cpassword)) {

                        setIsPasswordMatch(true);

                        fetch('http://localhost:5000/user/create', {

                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({ name, uni, facualty, email, phone, username, password })

                        })
                            .then((res) => res.json())
                            .then((data) => { console.log(data.newUser); alert('Data submitted successfully.'); navigate('/home') })
                            .catch((err) => { console.log('Error from SignUp ', err) });

                    } else if (data.username.length == 1 && data.email.length == 0) {

                        if (password === cpassword) { setIsPasswordMatch(true) } else { setIsPasswordMatch(false) }

                        setEmailExists(false);
                        setUsernameExists(true);

                    } else if (data.username.length == 0 && data.email.length == 1) {

                        if (password === cpassword) { setIsPasswordMatch(true) } else { setIsPasswordMatch(false) }

                        setEmailExists(true);
                        setUsernameExists(false);

                    } else {

                        if (password === cpassword) { setIsPasswordMatch(true) } else { setIsPasswordMatch(false) }

                        setEmailExists(true);
                        setUsernameExists(true);

                    }
                })
                .catch((err) => console.log('Error while send email and username to the backend', err));

        } else {

            setIsAllFilled(false);
            setEmailExists(false);
            setUsernameExists(false);
            if (password === cpassword) { setIsPasswordMatch(true) } else { setIsPasswordMatch(false) }

        }

    }

    return (

        <div className="c-signup">

            <form onSubmit={handleSubmit}>

                <label>Full Name</label>

                <input placeholder="W.K. HASITH CHAMIKA WIJESINGHE" type="text" onChange={(e) => setName(e.target.value)}></input>

                <label>Username</label>
                <input placeholder="chamika123" type="text" onChange={(e) => setUsername(e.target.value)}></input>
                {usernameExist && <span>* This Username already taken *</span>}

                <label>University</label>
                <select onChange={(e) => setUni(e.target.value)}>
                    <option value="" selected hidden>Select Your University</option>
                    <option value="University of Colombo">University of Colombo</option>
                    <option value="University of Jayawandanapura">University of Jayawandanapura</option>
                    <option value="University of Jaffna">University of Jaffna</option>
                    <option value="University of Ruhuna">University of Ruhuna</option>
                    <option value="University of Peradeniya">University of Peradeniya</option>
                    <option value="University of Uwa">University of Uwa</option>
                </select>

                <label>Facualty</label>
                <select onChange={(e) => setFacualty(e.target.value)}>
                    <option value="" selected hidden>Select Your Facualty</option>
                    <option value="UCSC">UCSC</option>
                    <option value="Facualty of Science">Facualty of Science</option>
                    <option value="Faculty of Medicine">Faculty of Medicine</option>
                    <option value="Faculty of Arts">Faculty of Arts</option>
                    <option value="Faculty of Law">Faculty of Law</option>
                    <option value="Faculty of Management">Faculty of Management</option>
                </select>

                <label>Student Email</label>
                <input placeholder="2022cs226@stu.ucsc.cmb.ac.lk" type="email" onChange={(e) => setEmail(e.target.value)}></input>
                {emailExist && <span>* This email already exists. Try another one *</span>}

                <label>Mobile Number</label>
                <input placeholder="078-6715765" type="tel" onChange={(e) => setPhone(e.target.value)}></input>



                <label>Create a Password</label>
                <div className='pass'>
                    <input placeholder="**********" type={isPassword ? 'password' : 'text'} onChange={(e) => setPassword(e.target.value)}></input>
                    <div className="eye-buton"><button type='button' onClick={handleP} className="eye"><img src={isPassword ? Hidden : Eye}></img></button></div>
                </div>



                <label>Re-Enter Password</label>
                <div className='pass'>
                    <input placeholder="**********" type={isPasswordc ? 'password' : 'text'} onChange={(e) => setCpassword(e.target.value)}></input>
                    <div className="eye-buton"><button type='button' onClick={handlePc} className="eye"><img src={isPasswordc ? Hidden : Eye}></img></button></div>

                </div>
                {!isPasswordMatch && <span>* Re-entered password does not matches *</span>}

                {!isAllFilled && <span>* All fields must be filled *</span>}

                <button type="submit">Sign Up</button>

            </form>

        </div>

    );

}

export default SignUp;