import "./EventPage.css"
import { useDispatch, useSelector } from "react-redux"
import { get_events_thunk } from "../../redux/events"
import { useEffect, useState } from "react"
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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    dispatch(get_events_thunk())
    .then(() => setIsLoaded(true))
    }, [dispatch, user]);

    return (<>
        {isLoaded ?
            <div className="events main-div">
                <div className="row event-head">
                    <h1 className="third-color">Upcoming Events</h1>
                    <a className="create" href="/events/new">Create New Event</a>
                </div>
            {Object.values(events) ? Object.keys(events).map(key => (
                <div className="container row" key={key}>
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
                            <div className="attendee-box"> Other Attendees:
                                {Object.keys(events[key]['attendees']).map((attkey) => {
                                    return (<div className="attendance row" key={`attend-${attkey}`}>
                                        <div className="attendance-name">{events[key]['attendees'][attkey].user}:</div>
                                        <div className={`attendance-status ${events[key]['attendees'][attkey].status}`}>{events[key]['attendees'][attkey].status}</div>
                                    </div>)
                                })}
                            </div>

                        </div>
                            : <></>
                        }
                    </div>
                </div>
            )): <h1>Loading...</h1>}
            </div>
    : <h1 className="loading">Loading...</h1>}
    </>)
}

export default EventPage
