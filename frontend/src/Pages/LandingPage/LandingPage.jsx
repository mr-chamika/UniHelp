import { NavLink } from "react-router-dom";

const LandingPage = ()=>{

    return(

        <div>

            <h1>This is Landing Page</h1>
            <NavLink to='/login'>goto login page</NavLink>
            <NavLink to='/signup'>goto signup page</NavLink>

        </div>

    );

}

export default LandingPage;