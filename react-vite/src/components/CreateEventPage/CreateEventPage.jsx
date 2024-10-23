import './CreateEventPage.css'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { create_attendee_thunk, create_events_thunk } from '../../redux/events'

const CreateEventPage = () => {
    const [name, set_name] = useState('')
    const [start_date, set_start_date] = useState('')
    const [end_date, set_end_date] = useState('')
    const [description, set_description] = useState('')
    const [capacity, set_capacity] = useState(0)
    const [url, set_url] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.session.user)

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
                name,
                start_date,
                end_date,
                description,
                capacity,
                url,
            }
            const new_attendee = {
                status: 'owner',
                user : user.username,
                user_id : user.id
            }
            dispatch(create_events_thunk(new_event))
            .then((ev) => dispatch(create_attendee_thunk(ev.id, new_attendee)))
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

export default CreateEventPage
