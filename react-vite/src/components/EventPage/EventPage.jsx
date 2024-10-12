import "./EventPage.css"
import { useDispatch, useSelector } from "react-redux"
import { get_events_thunk } from "../../redux/events"
import { useEffect } from "react"

const EventPage = () => {
    const events = useSelector(state => state.events.all_events)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_events_thunk());
    }, [dispatch]);

    return (
        <>
        {Object.values(events) ? Object.keys(events).map(key => (
            <div className="event-container">
                <div>{events[key].name}</div>
            </div>
        )): <h1>Loading...</h1>}
        </>
    )
}

export default EventPage
