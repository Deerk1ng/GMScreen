import "./EventPage.css"
import { useDispatch, useSelector } from "react-redux"
import { get_events_thunk } from "../../redux/events"
import { useEffect } from "react"
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal"
import { useNavigate } from "react-router-dom";
import CreateAttendeeModal from "../CreateAttendeeModal/CreateAttendeeModal"
import UpdateAttendeeModal from "../UpdateAttendeeModal"

const EventPage = () => {
    const events = useSelector(state => state.events.all_events)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(get_events_thunk());
    }, [dispatch, user]);

    return (
        <div className="events">
            <a href="/events/new">Create New Event</a>
        {Object.values(events) ? Object.keys(events).map(key => (
            <div className="container" key={key}>
                {events[key].image?.url ?
                    <img className="event-img" src={events[key].image.url} alt="img associated with event" key={`img-${key}`}/>
                :<></>}
                <div className="event-container" key={`event-${key}`}>
                    <h2 className="event-name">{events[key].name}</h2>
                    <h3 className="event-dates third-color">{events[key].start_date} - {events[key].end_date}</h3>
                    <div className="event-description">{events[key].description}</div>
                    {/* <div className="event-capacity">capacity: {events[key].capacity}</div> */}
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
                <div className="attendance-container">
                    {events[key].attendees ?
                    <div>
                        <div className="attendance-self-status">Your Status: {events[key]['attendees'][user.id] ? <span className={events[key]['attendees'][user.id].status}>{events[key]['attendees'][user.id].status}</span>: <span className="Not">Not Attending</span>}</div>
                        <div> Other Attendees:
                            {Object.keys(events[key]['attendees']).map((attkey) => {
                                return (<div className="attendance" key={`attend-${attkey}`}>
                                    <div className="attendance-name">{events[key]['attendees'][attkey].user}:</div>
                                    <div className={`attendance-status ${events[key]['attendees'][attkey].status}`}>{events[key]['attendees'][attkey].status}</div>
                                </div>)
                            })}
                        </div>
                        {events[key]['attendees'][user.id] ?
                            <>{events[key]['attendees'][user.id]['status'] == 'Owner' ?
                                <></> :
                                <OpenModalButton
                                buttonText="Update Attendance Status"
                                className='button'
                                modalComponent={<UpdateAttendeeModal  event_id={key} attendee_id={events[key]['attendees'][user.id]['id']} curr_status={events[key]['attendees'][user.id]['status'].toLowerCase()} user={user} />}
                                />
                            }</>
                        :
                            <OpenModalButton
                            buttonText="Sign Up to Attend"
                            className='button'
                            modalComponent={<CreateAttendeeModal user_id={user.id} event_id={key} user_name={user.username} />}
                            />
                        }
                    </div>
                        : <></>
                    }
                </div>
            </div>
        )): <h1>Loading...</h1>}
        </div>
    )
}

export default EventPage
