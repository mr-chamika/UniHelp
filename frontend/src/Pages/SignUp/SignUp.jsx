import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {

    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [uni,setUni] = useState('');
    const [facualty,setFacualty] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');

    const handleSubmit=(e)=>{

        e.preventDefault();

        if(name != '' || uni != '' || facualty != '' || email != '' || phone != '' || username != '' ){

            fetch('http://localhost:5000/user/create',{

                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({name,uni,facualty,email,phone,username})

            })
            .then((res)=>res.json())
            .then((data)=>{console.log(data.newUser);alert('Data submitted successfully.');navigate('/home')})
            .catch((err)=>{console.log('Error from SignUp ',err)});

        }

    }

    return (

        <div className="c-signup">

                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>

                    <input placeholder="W.K. HASITH CHAMIKA WIJESINGHE" type="text" onChange={(e)=>setName(e.target.value)}></input>

                    <label>Username</label>
                    <input placeholder="chamika123" type="text" onChange={(e)=>setUsername(e.target.value)}></input>

                    <label>University</label>
                    <select  onChange={(e)=>setUni(e.target.value)}>
                        <option value="" selected hidden>Select Your University</option>
                        <option value="University of Colombo">University of Colombo</option>
                        <option value="University of Jayawandanapura">University of Jayawandanapura</option>
                        <option value="University of Jaffna">University of Jaffna</option>
                        <option value="University of Ruhuna">University of Ruhuna</option>
                        <option value="University of Peradeniya">University of Peradeniya</option>
                        <option value="University of Uwa">University of Uwa</option>
                    </select>

                    <label>Facualty</label>
                    <select  onChange={(e)=>setFacualty(e.target.value)}>
                        <option value="" selected hidden>Select Your Facualty</option>
                        <option value="UCSC">UCSC</option>
                        <option value="Facualty of Science">Facualty of Science</option>
                        <option value="Faculty of Medicine">Faculty of Medicine</option>
                        <option value="Faculty of Arts">Faculty of Arts</option>
                        <option value="Faculty of Law">Faculty of Law</option>
                        <option value="Faculty of Management">Faculty of Management</option>
                    </select>

                    <label>Student Email</label>
                    <input placeholder="2022cs226@stu.ucsc.cmb.ac.lk" type="email" onChange={(e)=>setEmail(e.target.value)}></input>

                    <label>Mobile Number</label>
                    <input placeholder="078-6715765" type="tel"  onChange={(e)=>setPhone(e.target.value)}></input>

                    <button type="submit">Sign Up</button>

                </form>

        </div>

    );

}

export default SignUp;