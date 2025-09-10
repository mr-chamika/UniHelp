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
    const [timetable, setTimetable] = useState([]);


    setInterval(() => {

        setSeconds(new Date().getSeconds())
        setMins(new Date().getMinutes())
        setHrs(new Date().getHours())

    }, 1000)

    useEffect(() => {
        if (!user?.userId) return;

        const today = new Date().getDay(); // 0=Sunday, 1=Monday, ...
        // Assuming your backend expects 1=Monday, 2=Tuesday, etc.
        const activeDay = today === 0 ? 7 : today; // If Sunday, set to 7

        fetch(`http://localhost:5000/event/get-timeslot/${user.userId}/${activeDay}`)
            .then(res => res.json())
            .then(data => setTimetable(data.slots))
            .catch(err => console.log('Error fetching timetable:', err));
    }, [user?.userId]);

    return (
        <div className="c-home">

            <div className="home-content">

                <div className="top">

                    <div className="greeting">

                        <img src={pic} width='150px'></img>
                        <div className="gd">

                            <h1>Good {hrs < 12 ? 'morning ' : (hrs > 12 && hrs < 18) ? 'evening ' : 'night '}{user.username} !!!</h1>
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
                        <h1>{(date.getDay() == 0 || date.getDay() == 6) ? 'Holiday' : 'workday'}</h1>
                    </div>

                </div>
                <div className="bottom">

                    {timetable.length > 0 &&
                        <div className="timetable">

                            <table>

                                <thead>

                                    <tr>

                                        <th>Time</th>
                                        <th>Subject</th>

                                    </tr>

                                </thead>
                                <tbody>

                                    {timetable.map((row, idx) => (
                                        <>
                                            <tr key={idx}>
                                                <td>{row.start} - {row.end}</td>
                                                <td>{row.subject}</td>
                                            </tr>
                                            {/* Insert interval after the second slot */}
                                            {idx === 1 && (
                                                <tr>
                                                    <td className="int" colSpan="2">INTERVAL</td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>

                            </table>


                        </div>}
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