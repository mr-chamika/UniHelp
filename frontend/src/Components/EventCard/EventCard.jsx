import './EventCard.css'
import pdlt from '../../assets/EventCard/delete.png'
import pedit from '../../assets/EventCard/edit.png'
import pview from '../../assets/EventCard/view.png'

const EventCard = ({ title, start, end, dlt, edit, view }) => {

    return (

        <div className="event-card">

            <div className="content">

                <h2>{title}</h2>
                <p>Start : {start.split('T')[0]}</p>
                <p>Ends  : {end.split('T')[0]}</p>

            </div>
            <div className="buttons">
                <button className="view" onClick={view}><img src={pview} width='18px' /></button>
                <button className="dlt" onClick={dlt}><img src={pdlt} width='17px' /></button>
                <button className="edit" onClick={edit}><img src={pedit} width='18px' /></button>
            </div>

        </div>

    );

}

export default EventCard;