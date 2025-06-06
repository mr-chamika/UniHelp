import { NavLink, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { useContext, useState } from 'react';
import FullPopup from '../FullPopup/FullPopup';
import { UserContext } from '../../Contexts/userContext';

const SideBar = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext)

    const [isLogout, setIsLogout] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();


        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('username');

        setIsLogout(false);
        navigate('/')

    }

    return (
        <div>

            <div className="c-sidebar">

                <div className="sidebar-wrapper">

                    <div

                        className={`${location.pathname == '/home/dashboard' ? 'active' : 'button'}`}
                        onClick={() => { navigate('/home/dashboard') }}

                    >Dashboard</div>

                    <div

                        className={`${['/home/schedule', '/home/schedule/time-table'].includes(location.pathname) ? 'active' : 'button'}`}
                        onClick={() => { navigate('/home/schedule') }}

                    >Schedule</div>

                    <div

                        className={`${location.pathname == '/home/calculator' ? 'active' : 'button'}`}
                        onClick={() => { navigate('/home/calculator') }}

                    >Calculator</div>

                    <div className="button">Storage</div>
                    <div className="button logout" onClick={() => { setIsLogout(true) }}>Logout</div>


                </div>



            </div>

            {isLogout &&
                <FullPopup show={isLogout}>
                    <form className='in-sidebar' onSubmit={handleSubmit}>
                        <div className="c">
                            <h1>Attention</h1>
                            <p>{user.username}, sure you want to logout ?</p>
                        </div>
                        <div className='b'>
                            <input type="submit" value='Logout' />
                            <button onClick={() => setIsLogout(false)}>Cancel</button>
                        </div>

                    </form>
                </FullPopup>
            }

        </div>
    );

}

export default SideBar;