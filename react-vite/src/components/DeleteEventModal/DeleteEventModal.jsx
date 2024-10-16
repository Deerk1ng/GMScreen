import './DeleteEventModal.css'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { delete_event_thunk } from '../../redux/events';

function DeleteEventModal({event_id}) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(delete_event_thunk(event_id))
        .then(closeModal)
    }

    return (
        <div className='modal'>
            <h1 className='delete-title'>Confirm Delete</h1>
            <div className='delete-desc'>Are you sure you want to delete this Event?</div>
            <button className='delete-button' onClick={handleDelete}>Yes (Delete Review)</button>
            <button className='keep-button' onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteEventModal
