import { useContext } from 'react';
import Logo from '../../assets/Home/logo.png';
import Notification from '../../assets/Home/notify.png';
import Mode from '../../assets/Home/mode.png';
import User from '../../assets/Home/male.png';

import { UserContext } from '../../Contexts/userContext';

import './TopBar.css';

const TopBar = ({ }) => {

    const { user } = useContext(UserContext);

    const notification = () => {

        alert('No new notifications');

    }

    const darkOrLightMode = () => {

        alert('Switching to dark mode')

    }

    return (

        <div className='c-topbar'>

            <div className='c-topbar-in'>

                <div className='left'>

                    <img className='logo' src={Logo}></img>

                </div>

                <div className='right-wrap'>
                    <div className='right'>

                        <img className='notify' src={Notification} onClick={notification}></img>
                        <img className='mode' src={Mode} onClick={darkOrLightMode}></img>

                        <div className='user-field'>

                            <img className='user' src={User}></img>

                            <div className='user-info'>
                                <h3>{user.username}</h3>
                                <p>{user.role}</p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>

    );

}

export default TopBar;