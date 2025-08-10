import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Schedule.css';
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullPopup from '../../Components/FullPopup/FullPopup'
import { UserContext } from '../../Contexts/userContext'
import EventCard from '../../Components/EventCard/EventCard';

const Schedule = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext)

    const [title, setTitle] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const [events, setEvents] = useState([])
    const [eCount, setEcount] = useState(0)

    const [show, setShow] = useState(false);
    const [showE, setShowE] = useState(false)
    const [showV, setShowV] = useState(false)
    const [isDelE, setIsDele] = useState(false)

    const [toDltId, setToDltId] = useState(null)

    const [toEdit, setToEdit] = useState(null)
    const [toEditTitle, setToEditTitle] = useState('')
    const [toEditStart, setToEditStart] = useState('')
    const [toEditEnd, setToEditEnd] = useState('')

    //get user
    useEffect(() => {

        if (!user?.userId) return;

        fetch(`http://localhost:5000/user/get/${user.userId}`)
            .then(res => res.json())
            .then((data) => setEcount(data.user.Events))
            .catch(err => console.log('Error from get user : ' + err))


    }, [user?.userId])


    //create events

    const handleSubmit = (e) => {

        e.preventDefault();

        if (title.trim().length == 0 || start.length == 0 || end.length == 0) {

            console.log('All fields must be filled')

        } else {

            setShow(false);
            setTitle(''); setStart(''); setEnd('');

            fetch('http://localhost:5000/event/create', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.userId, title, start, end })

            })
                .then((res) => res.json())
                .then((data) => setEcount(data.count))
                .catch(error => console.log('Error from event getting : ' + error))

        }

    }

    //get events

    useEffect(() => {

        if (!user?.userId) { return };

        fetch(`http://localhost:5000/event/get/${user.userId}`)
            .then(res => res.json())
            .then((data) => setEvents(data.events))
            .catch(err => console.log('Error from get user : ' + err))


    }, [user?.userId, eCount, toEdit])

    //delete event

    const deleteEvent = (key) => {

        setIsDele(true);
        setToDltId(key);

    }

    //view event

    const view = (key) => {


        const event = events.find(eventx => eventx._id == key)

        setToEdit(event)
        setToEditTitle(event.title)
        setToEditStart(event.start)
        setToEditEnd(event.end)

        setShowV(true)

    }
    //edit event

    const edit = (key) => {


        const event = events.find(eventx => eventx._id == key)

        setToEdit(event)
        setToEditTitle(event.title)
        setToEditStart(event.start)
        setToEditEnd(event.end)

        setShowE(true)

    }

    const handleEdit = (e) => {

        e.preventDefault()

        // fetch(`http://localhost:5000/event/${toEdit._id}`, {

        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({})

        // })

        if (toEditTitle.trim().length == 0 || toEditStart.length == 0 || toEditEnd.length == 0) {

            console.log('All fields must be filled')

        } else {


            fetch(`http://localhost:5000/event/${toEdit._id}`, {

                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: toEditTitle, start: toEditStart, end: toEditEnd })

            })
                .then((res) => res.json())
                .then((data) => { setShowE(false); setToEdit(null) })
                .catch(error => console.log('Error from event editting : ' + error))

        }

    }

    const handleDe = () => {

        fetch(`http://localhost:5000/event/${toDltId}`, {

            method: 'DELETE'

        })
            .then(res => res.json())
            .then((data) => { setEcount(data.count); setToDltId(null); })
            .catch(err => console.log('Error from delete user : ' + err))

    }


    return (
        <div>
            <div className="c-schedule">

                <div className="schedule-content">
                    <div className="calendar">
                        <Fullcalendar

                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView={"dayGridMonth"}
                            headerToolbar={{
                                start: "prev,next today",
                                center: "title",
                                end: "dayGridMonth,timeGridWeek,timeGridDay"
                            }}
                            height={'80vh'}
                            events={events}
                            eventDisplay='block'
                        />
                    </div>
                    <div className="side">
                        <div>
                            <div className='top-buttons'>
                                <button className='add' onClick={() => setShow(true)}>Add Event</button>
                                <button className='t' onClick={() => navigate('/home/schedule/time-table')}>Time table</button>
                            </div>
                            <div className='events'>
                                {/* <h1>{eCount} Event(s)</h1> */}
                                <div className="list">

                                    {events.length == 0 && <h1>No events found</h1>}

                                    {
                                        events.map((event) => {

                                            return (

                                                <EventCard
                                                    key={event._id}
                                                    title={event.title}
                                                    start={event.start}
                                                    end={event.end}
                                                    dlt={() => deleteEvent(event._id)}
                                                    edit={() => edit(event._id)}
                                                    view={() => view(event._id)}
                                                />

                                            )

                                        })

                                    }

                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {show &&
                <FullPopup show={show}>
                    <form className='in-c' onSubmit={handleSubmit}>
                        <div className='field'>
                            <label>Enter a title</label>
                            <input maxLength='14' value={title} type='text' onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className='field'>
                            <label>Enter start date</label>
                            <input value={start} type='datetime-local' onChange={e => setStart(e.target.value)} min={new Date().toISOString().split("T")[0]} />

                        </div>
                        <div className='field'>
                            <label>Enter end date</label>
                            <input value={end} type='datetime-local' onChange={e => setEnd(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                        </div>
                        <div className='buts'>
                            <input type='submit'></input>
                            <button onClick={() => { setShow(false); setTitle(''); setStart(''); setEnd(''); }}>Cancel</button>
                        </div>

                    </form>
                </FullPopup>
            }

            {showE &&

                <FullPopup show={showE}>

                    <form className='in-c' onSubmit={handleEdit}>
                        <div className='field'>
                            <label>Enter a title</label>
                            <input maxLength='14' value={toEditTitle} type='text' onChange={e => setToEditTitle(e.target.value)} />
                        </div>
                        <div className='field'>
                            <label>Enter start date</label>
                            <input value={toEditStart} type='datetime-local' onChange={e => setToEditStart(e.target.value)} min={new Date().toISOString().split("T")[0]} />

                        </div>
                        <div className='field'>
                            <label>Enter end date</label>
                            <input value={toEditEnd} type='datetime-local' onChange={e => setToEditEnd(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                        </div>
                        <div className='buts'>
                            <input type='submit'></input>
                            <button onClick={() => { setShowE(false); setToEditTitle(toEdit.title); setToEditStart(toEdit.start); setToEditEnd(toEdit.end) }}>Cancel</button>
                        </div>

                    </form>

                </FullPopup>

            }
            {showV &&

                <FullPopup show={showV}>

                    <form className='in-c'>
                        <div className='field'>
                            <label>Title</label>
                            <input value={toEditTitle} maxLength='14' />
                        </div>
                        <div className='field'>
                            <label>Start date</label>
                            <input value={`${toEditStart.split('T')[0]} @ ${toEditStart.split('T')[1]}`} />

                        </div>
                        <div className='field'>
                            <label>End date</label>
                            <input value={`${toEditEnd.split('T')[0]} @ ${toEditEnd.split('T')[1]}`} />
                        </div>

                        <div className='buts-1'>
                            <button onClick={() => { setShowV(false); }}>CLOSE</button>
                        </div>
                    </form>

                </FullPopup>

            }

            {isDelE &&
                <FullPopup show={isDelE}>
                    <form className='in-sidebar' onSubmit={handleDe}>
                        <div className="c">
                            <h1>Attention</h1>
                            <p>{user.username}, sure you want to remove this event ?</p>
                        </div>
                        <div className='b'>
                            <input type="submit" value='Delete' />
                            <button onClick={() => setIsDele(false)}>Cancel</button>
                        </div>

                    </form>
                </FullPopup>
            }

        </div>
    );

}

export default Schedule;