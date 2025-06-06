import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/userContext";
import pic from '../../assets/Home/male.png'

import './Home.css';

const Home = () => {

    const { user } = useContext(UserContext);

    var date = new Date();

    const [seconds, setSeconds] = useState(new Date().getSeconds());
    const [mins, setMins] = useState(new Date().getMinutes())
    const [hrs, setHrs] = useState(new Date().getHours())

    setInterval(() => {

        setSeconds(new Date().getSeconds())
        setMins(new Date().getMinutes())
        setHrs(new Date().getHours())

    }, 1000)

    return (
        <div className="c-home">

            <div className="home-content">

                <div className="top">

                    <div className="greeting">

                        <img src={pic} width='150px'></img>
                        <div className="gd">

                            <h1>Good morning {user.username} !!!</h1>
                            <p>{date.toLocaleDateString('en-US', { weekday: 'long' })}, {date.getDate()} {date.toLocaleDateString('en-Us', { month: 'long' })} {date.getFullYear()}</p>

                        </div>

                    </div>
                    <div className="clock">
                        <div className="clock-c">
                            <h1>{hrs >= 10 ? `${hrs} : ` : `0${hrs} : `} </h1>
                            <h1>{mins >= 10 ? `${mins} : ` : `0${mins} : `} </h1>
                            <h1>{seconds >= 10 ? `${seconds}` : `0${seconds}`} </h1>
                            <h1>{hrs >= 12 && mins > 0 ? `PM` : `AM`}</h1>
                        </div>
                        <h1>Work day</h1>
                    </div>

                </div>
                <div className="bottom">

                    <div className="timetable">

                        <table>

                            <thead>

                                <tr>

                                    <th>Time</th>
                                    <th>Subject</th>

                                </tr>

                            </thead>
                            <tbody>

                                <tr>

                                    <td>8.00 - 10.00</td>
                                    <td>Discrete Maths</td>

                                </tr>


                                <tr>

                                    <td>10.00 - 12.00</td>
                                    <td>Mathematical Methods</td>

                                </tr>

                                <tr>

                                    <td className="int" colSpan='2'>INTERVAL</td>

                                </tr>

                                <tr>

                                    <td>13.00 - 15.00</td>
                                    <td>Computer Networks</td>

                                </tr>
                                <tr>

                                    <td>15.00 - 17.00</td>
                                    <td>Enhancment</td>

                                </tr>


                            </tbody>

                        </table>


                    </div>
                    <div className="todo-list">

                        <table>
                            <thead>

                                <tr>
                                    <th>Activity</th>
                                    <th>Status</th>
                                </tr>

                            </thead>

                            <tbody>
                                <tr>
                                    <td>create portfolio</td>
                                    <td className="act pending">Pending</td>
                                </tr>
                                <tr>
                                    <td>trip to jaffna</td>
                                    <td className="act done">Done</td>
                                </tr>
                                <tr>
                                    <td>inclass assignment</td>
                                    <td className="act missed">Missed</td>
                                </tr>

                                <tr>
                                    <td>inclass assignment</td>
                                    <td className="act missed">Missed</td>
                                </tr>

                                <tr>
                                    <td>inclass assignment</td>
                                    <td className="act missed">Missed</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;