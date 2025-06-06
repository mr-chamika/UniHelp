import { useContext, useEffect, useState } from 'react';
import './TimeTable.css'
import FullPopup from '../../Components/FullPopup/FullPopup'
import dlt from '../../assets/EventCard/delete.png'
import edit from '../../assets/EventCard/edit.png'
import { UserContext } from '../../Contexts/userContext'


const TimeTable = () => {

    const { user } = useContext(UserContext)

    const [show, setShow] = useState(false);
    const [active, setActive] = useState(1);
    const [err, setErr] = useState(false);
    const [eShow, setEshow] = useState(false);
    const [reload, setReload] = useState(false)

    const [isDelE, setIsDele] = useState(false)
    const [toDltId, setToDltId] = useState(null)

    const [tabs, setTabs] = useState(

        {
            id: active,
            content: []
        }

    )


    const [row1, setRow1] = useState({ start: '', end: '', subject: '' })
    const [row2, setRow2] = useState({ start: '', end: '', subject: '' })
    const [row3, setRow3] = useState({ start: '', end: '', subject: '' })
    const [row4, setRow4] = useState({ start: '', end: '', subject: '' })



    const handleSubmit = (e) => {

        e.preventDefault()

        if (row1.start.trim().length == 0 || row2.start.trim().length == 0 || row3.start.trim().length == 0 || row4.start.trim().length == 0 ||
            row1.end.trim().length == 0 || row2.end.trim().length == 0 || row3.end.trim().length == 0 || row4.end.trim().length == 0 ||
            row1.subject.trim().length == 0 || row2.subject.trim().length == 0 || row3.subject.trim().length == 0 || row4.subject.trim().length == 0
        ) {

            setErr(true);

        } else {

            setErr(false);

            fetch('http://localhost:5000/event/create-timeslot', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.userId, active, row1, row2, row3, row4 })

            })
                .then(res => res.json())
                .then((data) => { console.log(data); setShow(!show); setRow1({ end: '', start: '', subject: '' }); setRow2({ end: '', start: '', subject: '' }); setRow3({ end: '', start: '', subject: '' }); setRow4({ end: '', start: '', subject: '' }); })
                .catch(error => console.log(error + ' from create time slot'))

        }

    }

    useEffect(() => {

        if (!user && !user.userId) return;

        fetch(`http://localhost:5000/event/get-timeslot/${user.userId}/${active}`)
            .then(res => res.json())
            .then(data => setTabs({ id: active, content: data.slots }))
            .catch(err => console.log(err))

    }, [user, active, show, eShow, reload])

    const openEdit = () => {

        setRow1({ start: tabs.content[0].start, end: tabs.content[0].end, subject: tabs.content[0].subject })
        setRow2({ start: tabs.content[1].start, end: tabs.content[1].end, subject: tabs.content[1].subject })
        setRow3({ start: tabs.content[2].start, end: tabs.content[2].end, subject: tabs.content[2].subject })
        setRow4({ start: tabs.content[3].start, end: tabs.content[3].end, subject: tabs.content[3].subject })

        setEshow(true);

    }

    const handleEsubmit = (e) => {

        e.preventDefault();

        if (row1.start.trim().length == 0 || row2.start.trim().length == 0 || row3.start.trim().length == 0 || row4.start.trim().length == 0 ||
            row1.end.trim().length == 0 || row2.end.trim().length == 0 || row3.end.trim().length == 0 || row4.end.trim().length == 0 ||
            row1.subject.trim().length == 0 || row2.subject.trim().length == 0 || row3.subject.trim().length == 0 || row4.subject.trim().length == 0
        ) {

            setErr(true);

        } else {

            setErr(false);

            fetch(`http://localhost:5000/event/slot/${active}`, {

                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ row1, row2, row3, row4 })

            })
                .then(res => res.json())
                .then((data) => { console.log(data); setEshow(!eShow); setRow1({ end: '', start: '', subject: '' }); setRow2({ end: '', start: '', subject: '' }); setRow3({ end: '', start: '', subject: '' }); setRow4({ end: '', start: '', subject: '' }); })
                .catch(error => console.log(error + ' from edit time slot'))

        }

    }

    const openDlt = () => {

        setIsDele(true);


    }

    const handleDe = () => {

        fetch(`http://localhost:5000/event/slot/${active}`, {

            method: 'DELETE'

        })
            .then(res => res.json())
            .then((data) => { console.log(data); setReload(!reload) })
            .catch(error => console.log(error + ' from delete time slot'))

    }

    return (
        <div>
            <div className="time-table">
                <div className="time-table-content">
                    <nav className="tabs">

                        <button className={active == 1 ? 'active' : ''} onClick={() => { setActive(1) }}>Monday</button>
                        <button className={active == 2 ? 'active' : ''} onClick={() => { setActive(2) }}>Tuesday</button>
                        <button className={active == 3 ? 'active' : ''} onClick={() => { setActive(3) }}>Wednesday</button>
                        <button className={active == 4 ? 'active' : ''} onClick={() => { setActive(4) }}>Thursday</button>
                        <button className={active == 5 ? 'active' : ''} onClick={() => { setActive(5) }}>Friday</button>

                    </nav>
                    {tabs.content.length != 0 &&

                        <div className='buts-over-t'>

                            <button onClick={openEdit}><img src={edit} width='22px' /></button>
                            <button onClick={openDlt}><img src={dlt} width='20px' /></button>

                        </div>

                    }
                    <div className="table">

                        <>
                            {(tabs.content.length != 0) &&

                                <table key={tabs.id} >

                                    <thead>
                                        <th>Time</th>
                                        <th>Subject</th>
                                    </thead>
                                    <tbody>
                                        {tabs.content.map((row) => {
                                            return (
                                                <tr>
                                                    <td>{row.start} - {row.end}</td>
                                                    <td>{row.subject}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>


                                </table>

                            }

                            {

                                (tabs.content.length == 0) &&

                                <button key={tabs.id} className='addIf' onClick={() => setShow(true)}>Add time table</button>

                            }
                        </>

                    </div>

                </div>


            </div >
            {show &&

                <FullPopup show={show}>
                    <form className='in-time' onSubmit={handleSubmit}>
                        <div className="slot">
                            <span>slot 1</span>
                            <label>Start time</label>
                            <input type='time' value={row1.start} onChange={e => setRow1({ ...row1, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row1.end} onChange={e => setRow1({ ...row1, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row1.subject} onChange={e => setRow1({ ...row1, subject: e.target.value })} />
                        </div>
                        <div className="slot">
                            <span>slot 2</span>
                            <label>Start time</label>
                            <input type='time' value={row2.start} onChange={e => setRow2({ ...row2, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row2.end} onChange={e => setRow2({ ...row2, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row2.subject} onChange={e => setRow2({ ...row2, subject: e.target.value })} />
                        </div>
                        <div className="slot">
                            <span>slot 3</span>
                            <label>Start time</label>
                            <input type='time' value={row3.start} onChange={e => setRow3({ ...row3, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row3.end} onChange={e => setRow3({ ...row3, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row3.subject} onChange={e => setRow3({ ...row3, subject: e.target.value })} />
                        </div>
                        <div className="slot">
                            <span>slot 4</span>
                            <label>Start time</label>
                            <input type='time' value={row4.start} onChange={e => setRow4({ ...row4, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row4.end} onChange={e => setRow4({ ...row4, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row4.subject} onChange={e => setRow4({ ...row4, subject: e.target.value })} />
                        </div>

                        {err &&
                            <span className='err'> All fields must be filled </span>
                        }
                        <div className="bottom">
                            <input type='submit' />
                            <button onClick={() => { setShow(false); setRow1({ start: '', end: '', subject: '' }); setRow2({ start: '', end: '', subject: '' }); setRow3({ start: '', end: '', subject: '' }); setRow4({ start: '', end: '', subject: '' }); setErr(false) }}>Cancel</button>
                        </div>
                    </form>
                </FullPopup>

            }

            {eShow &&

                <FullPopup show={eShow}>

                    <form className='in-time' onSubmit={handleEsubmit}>
                        <div className="slot">
                            <span>slot 1</span>
                            <label>Start time</label>
                            <input type='time' value={row1.start} onChange={e => setRow1({ ...row1, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row1.end} onChange={e => setRow1({ ...row1, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row1.subject} onChange={e => setRow1({ ...row1, subject: e.target.value })} />
                        </div>
                        <div className="slot">
                            <span>slot 2</span>
                            <label>Start time</label>
                            <input type='time' value={row2.start} onChange={e => setRow2({ ...row2, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row2.end} onChange={e => setRow2({ ...row2, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row2.subject} onChange={e => setRow2({ ...row2, subject: e.target.value })} />
                        </div>
                        <div className="slot">
                            <span>slot 3</span>
                            <label>Start time</label>
                            <input type='time' value={row3.start} onChange={e => setRow3({ ...row3, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row3.end} onChange={e => setRow3({ ...row3, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row3.subject} onChange={e => setRow3({ ...row3, subject: e.target.value })} />
                        </div>
                        <div className="slot">
                            <span>slot 4</span>
                            <label>Start time</label>
                            <input type='time' value={row4.start} onChange={e => setRow4({ ...row4, start: e.target.value })} />

                            <label>End time</label>
                            <input type='time' value={row4.end} onChange={e => setRow4({ ...row4, end: e.target.value })} />

                            <label>Subject</label>
                            <input type='text' value={row4.subject} onChange={e => setRow4({ ...row4, subject: e.target.value })} />
                        </div>

                        {err &&
                            <span className='err'> All fields must be filled </span>
                        }
                        <div className="bottom">
                            <input type='submit' value='Update' />
                            <button onClick={() => {

                                setEshow(false); setRow1({ start: tabs.content[0].start, end: tabs.content[0].end, subject: tabs.content[0].subject })
                                setRow2({ start: tabs.content[1].start, end: tabs.content[1].end, subject: tabs.content[1].subject })
                                setRow3({ start: tabs.content[2].start, end: tabs.content[2].end, subject: tabs.content[2].subject })
                                setRow4({ start: tabs.content[3].start, end: tabs.content[3].end, subject: tabs.content[3].subject })

                            }}>Cancel</button>
                        </div>
                    </form>

                </FullPopup>

            }

            {isDelE &&
                <FullPopup show={isDelE}>
                    <form className='in-sidebar' onSubmit={handleDe}>
                        <div className="c">
                            <h1>Attention</h1>
                            <p>{user.username}, sure you want to remove this time table ?</p>
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

export default TimeTable;