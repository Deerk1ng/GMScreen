import './UpdateAttendeeModal.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { delete_attendee_thunk,  update_attendee_thunk} from '../../redux/events';

function UpdateAttendeeModal({attendee_id, event_id, curr_status, user}) {
    const [status, setStatus] = useState(curr_status)
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        if(status == 'delete'){
            return dispatch(delete_attendee_thunk(event_id, user.id, attendee_id))
            .then(closeModal)
        }
        const new_attendee = {
            status,
            attendee_id,
            user: user.username
        }

        console.log(curr_status)

        return dispatch(update_attendee_thunk(event_id, new_attendee))
                .then(closeModal)
    }

    return (
        <div className='attendee-modal'>
            <h1>Choose your attendee status</h1>
            <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="attending">Attending</option>
                <option value="unsure">Unsure</option>
                <option value="delete">No Longer Attending</option>
            </select>
            <button onClick={handleSubmit} disabled={status == "" || status == curr_status ? true : false}>Submit</button>
        </div>
    )
}

export default UpdateAttendeeModal
