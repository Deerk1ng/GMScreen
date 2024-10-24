import './UpdateEventPage.css'
import { useDispatch, useSelector } from "react-redux"
import { get_events_thunk, update_event_thunk, add_event_image_thunk, create_attendee_thunk } from "../../redux/events"
import { useEffect, useState } from "react"
import {useParams, useNavigate} from "react-router-dom"

const UpdateEventPage = () => {
    const {event_id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user)
    const events = useSelector(state => state.events.all_events)
    const [name, set_name] = useState('')
    const [start_date, set_start_date] = useState('')
    const [end_date, set_end_date] = useState('')
    const [description, set_description] = useState('')
    const [capacity, set_capacity] = useState(0)
    const [url, set_url] = useState('')
    const [prev_url, setPrev] = useState('')
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(get_events_thunk())
        .then(setIsLoaded(true))
    }, [dispatch, user]);

    useEffect(() => {
        if(events[event_id]) {
            set_name(events[event_id].name)
            let sd = new Date(events[event_id].start_date)
            let sd_year = sd.getFullYear()
            let sd_month = sd.getMonth() + 1
            if(sd_month < 10) sd_month = '0' + `${sd_month}`
            let sd_day = sd.getDate()
            if (sd_day < 10) sd_day = '0' + `${sd_day}`
            let sd_hours = sd.getHours()
            if (sd_hours < 10) sd_hours = '0' + `${sd_hours}`
            let sd_minutes = sd.getMinutes()
            if (sd_minutes < 10) sd_minutes = '0' + `${sd_minutes}`

            sd = `${sd_year}-${sd_month}-${sd_day}T${sd_hours}:${sd_minutes}`

            let ed = events[event_id].end_date
            if(new Date(events[event_id].end_date) == 'Invalid Date'){
                if(ed.slice(-2) == "PM"){
                    let hr = Number(ed.slice(0,2)) + 12
                    ed = sd.slice(0,11) + hr + ed.slice(2, -3)
                } else {
                    ed = sd.slice(0,11) + ed.slice(0,-3) + ":00.000"
                }
            } else {
                ed = new Date(events[event_id].end_date)
                let ed_year = ed.getFullYear()
                let ed_month = ed.getMonth() + 1
                if(ed_month < 10) ed_month = '0' + `${ed_month}`
                let ed_day = ed.getDate()
                if (ed_day < 10) ed_day = '0' + `${ed_day}`
                let ed_hours = ed.getHours()
                if (ed_hours < 10) ed_hours = '0' + `${ed_hours}`
                let ed_minutes = ed.getMinutes()
                if (ed_minutes < 10) ed_minutes = '0' + `${ed_minutes}`
                ed = `${ed_year}-${ed_month}-${ed_day}T${ed_hours}:${ed_minutes}`
            }
            set_start_date(sd)
            set_end_date(ed)
            set_description(events[event_id].description)
            set_capacity(events[event_id].capacity)
            set_url(events[event_id].image?.url)
            setPrev(events[event_id].image?.url)
        }
    }, [events])

    const validateData = () => {
        const error = {}

        if(name.length < 5) error["name"] = "Name must be longer than 5 characters"
        if(name.length > 30) error["name"] = "Name must be longer than 5 characters"
        if(isNaN(capacity) || capacity <=0) error["capacity"] = "Capacity must be a valid number"
        if(description.length < 10) error['description'] = "Description must be longer than 10 characters"
        if(description.length > 300 ) error['description'] = "Description must be less than 300 characters"
        let sd = new Date(start_date)
        let ed = new Date(end_date)
        let now = Date.now()
        if(sd < now) error['start_date'] = "Start date must be after today's date"
        if(ed < now) error['end_date'] = "End date must be after today's date"
        if (ed < sd) error['end_date'] = "End date must be after the start date"
        setErrors(error)

        return Object.keys(error).length == 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validateData()){
            const new_event = {
                id: event_id,
                name,
                start_date,
                end_date,
                description,
                capacity,
            }
            const new_image = {
                url,
                prev_url,
            }

            dispatch(update_event_thunk(new_event))
            .then(dispatch(add_event_image_thunk(event_id, new_image)))
            .then(navigate('/events'))

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errors.name && <p className='errors-msgs'>{errors['name']}</p>}
            <div>
                <div className="label">Event Name</div>
                <input
                    type="text"
                    value={name}
                    onChange={(e)=> set_name(e.target.value)}
                    required
                    className="event-name"
                    />
            </div>
            {errors.start_date && <p className='errors-msgs'>{errors.start_date}</p>}
            <div>
                <div className="label">Start Date and Time</div>
                <input
                    type="datetime-local"
                    value={start_date}
                    onChange={(e)=> set_start_date(e.target.value)}
                    required
                    className="event-date"
                    />
            </div>
            {errors.end_date && <p className='errors-msgs'>{errors.end_date}</p>}
            <div>
                <div className="label">End Date and Time</div>
                <input
                    type="datetime-local"
                    value={end_date}
                    onChange={(e)=> set_end_date(e.target.value)}
                    required
                    className="event-date"
                    />
            </div>
            {errors.description && <p className='errors-msgs'>{errors.description}</p>}
            <div>
                <div className="label">Description</div>
                <input
                    type="textarea"
                    value={description}
                    onChange={(e)=> set_description(e.target.value)}
                    required
                    className="event-description"
                    />
            </div>
            {errors.capacity && <p className='errors-msgs'>{errors.capacity}</p>}
            <div>
                <div className="label">Max Capacity</div>
                <input
                    type="number"
                    value={capacity}
                    onChange={(e)=> set_capacity(e.target.value)}
                    required
                    className="event-name"
                    />
            </div>
            <div>
                <div className="label">Add a photo (optional)</div>
                <input
                    type="url"
                    placeholder="url"
                    value={url}
                    onChange={(e) => set_url(e.target.value)}
                    />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default UpdateEventPage
