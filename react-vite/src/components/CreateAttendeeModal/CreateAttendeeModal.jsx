import './CreateAttendeeModal.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { create_attendee_thunk } from '../../redux/events';

function CreateAttendeeModal({user_id, event_id, user_name}) {
    const [status, setStatus] = useState('')
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        const new_attendee = {
            status,
            user_id,
            user : user_name
        }

        return dispatch(create_attendee_thunk(event_id, new_attendee))
                .then(closeModal)
    }

    return (
        <div className='attendee-modal'>
            <h1>Choose your attendee status</h1>
            <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="attending">Attending</option>
                <option value="unsure">Unsure</option>
            </select>
            <button onClick={handleSubmit} disabled={status == "" ? true : false}>Submit</button>
        </div>
    )
}

export default CreateAttendeeModal
