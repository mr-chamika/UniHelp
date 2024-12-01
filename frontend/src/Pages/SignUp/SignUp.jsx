import './SignUp.css';

const SignUp = () => {

    const handleSubmit=()=>{

        alert('submit success');

    }

    return (

        <div className="c-signup">

            <fieldset>
                <legend>Application</legend>
                <form onSubmit={handleSubmit}>

                    <label>Name</label>

                    <input placeholder="W.K. HASITH CHAMIKA WIJESINGHE" type="text"></input>

                    <label>University</label>
                    <select>
                        <option value="" selected hidden>Select Your University</option>
                        <option value="University of Colombo">University of Colombo</option>
                        <option value="University of Jayawandanapura">University of Jayawandanapura</option>
                        <option value="University of Jaffna">University of Jaffna</option>
                        <option value="University of Ruhuna">University of Ruhuna</option>
                        <option value="University of Peradeniya">University of Peradeniya</option>
                        <option value="University of Uwa">University of Uwa</option>
                    </select>

                    <label>Facualty</label>
                    <select>
                        <option value="" selected hidden>Select Your Facualty</option>
                        <option value="UCSC">UCSC</option>
                        <option value="Facualty of Science">Facualty of Science</option>
                        <option value="Faculty of Medicine">Faculty of Medicine</option>
                        <option value="Faculty of Arts">Faculty of Arts</option>
                        <option value="Faculty of Law">Faculty of Law</option>
                        <option value="Faculty of Management">Faculty of Management</option>
                    </select>

                    <label>Student Email</label>
                    <input placeholder="2022cs226@stu.ucsc.cmb.ac.lk" type="email"></input>

                    <label>Mobile Number</label>
                    <input placeholder="078-6715765" type="tel"></input>

                    <button type="submit">Sign Up</button>

                </form>

            </fieldset>

        </div>

    );

}

export default SignUp;