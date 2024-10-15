import './CreateEventPage.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { create_events_thunk } from '../../redux/events'

const CreateEventPage = () => {
    const [name, set_name] = useState('')
    const [start_date, set_start_date] = useState()
    const [end_date, set_end_date] = useState()
    const [description, set_description] = useState('')
    const [capacity, set_capacity] = useState(0)
    const [url, set_url] = useState('')
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const validateData = () => {
        const error = {}

        if(name.length < 5) error["name"] = "Name must be longer than 5 characters"
        if(name.length > 30) error["name"] = "Name must be longer than 5 characters"
        if(isNaN(capacity) || price <=0) error["capacity"] = "Capacity must be a valid number"
        if(description.length < 10) error['description'] = "Description must be longer than 10 characters"
        if(description.length > 300 ) error['description'] = "Description must be less than 300 characters"

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const new_event = {
            name,
            start_date,
            end_date,
            description,
            capacity,
            url
        }

        return dispatch(create_events_thunk(new_event))
        .catch(async (res) => {
            const data = await res
            if (data && data.errors) {
                setErrors(data.errors)
            } else setErrors(data)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <div>
                <div className="label">Event Name</div>
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
