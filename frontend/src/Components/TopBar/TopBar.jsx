import { useContext, useEffect, useState } from 'react';
import Logo from '../../assets/Home/logo.png';
import Notification from '../../assets/Home/notify.png';
import Mode from '../../assets/Home/mode.png';
import User from '../../assets/Home/male.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/userContext';

import './TopBar.css';

const TopBar = ({ }) => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);


    useEffect(() => {

        if (!user?.userId) return;

        fetch(`http://localhost:5000/user/get/${user.userId}`)
            .then(res => res.json())
            .then((data) => {
                setUserData(data.user);
            })
            .catch(err => console.log('Error from get user : ' + err))


    }, [user?.userId])

    const notification = () => {

        alert('No new notifications');

    }

    const darkOrLightMode = () => {

        alert('Switching to dark mode')

    }

    const handleLogoClick = () => {
        if (location.pathname === '/profile') {
            navigate('/home/dashboard');
        } else {
            navigate('/');
        }
    };

    return (

        <div className='c-topbar'>

            <div className='c-topbar-in'>

                <div className='left' onClick={handleLogoClick}>

                    <img className='logo' src={Logo}></img>

                </div>

                <div className='right-wrap'>
                    <div className='right'>

                        {/* <img className='notify' src={Notification} onClick={notification}></img>
                        <img className='mode' src={Mode} onClick={darkOrLightMode}></img> */}

                        <div className='user-field' onClick={() => navigate('/profile')}>

                            <img className='user' src={userData && userData.ProfilePic != " " ? userData.ProfilePic : User}></img>

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