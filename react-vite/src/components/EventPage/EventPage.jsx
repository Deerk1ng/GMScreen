import "./EventPage.css"
import { useDispatch, useSelector } from "react-redux"
import { get_events_thunk } from "../../redux/events"
import { useEffect } from "react"
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal"
import { useNavigate } from "react-router-dom";


const EventPage = () => {
    const events = useSelector(state => state.events.all_events)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(get_events_thunk());
    }, [dispatch, user]);

    return (
        <div className="events">
        {Object.values(events) ? Object.keys(events).map(key => (
            <div className="event-container" key={key}>
                <h2 className="event-name">{events[key].name}</h2>
                <h3 className="event-dates third-color">{events[key].start_date} - {events[key].end_date}</h3>
                <div className="event-description">{events[key].description}</div>
                <div className="event-capacity">capacity: {events[key].capacity}</div>
                {user && user.id == events[key].user_id ? <div>
                    <OpenModalButton
                        buttonText="Delete"
                        className='delete-button'
                        modalComponent={<DeleteEventModal event_id={events[key].id} />}
                    />
                    <button onClick={() => navigate(`/events/${events[key].id}/update`)}>Update</button>
                    <nav></nav>
                </div> : <></>}
            </div>
        )): <h1>Loading...</h1>}
        </div>
    )
}

export default EventPage
