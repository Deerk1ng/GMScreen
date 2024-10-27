import { csrfFetch } from "./csrf.js";

const GET_EVENTS = 'attendees/get_events'
const DELETE_EVENT = 'events/delete_event'
const ADD_ATTENDEE = "attendee/add_attendee"
const DELETE_ATTENDEE = "attendee/delete_attendee"

const getEvents = (events) => ({
    type: GET_EVENTS,
    events
})

const removeEvent = (event_id) => ({
    type: DELETE_EVENT,
    event_id
})

const addAttendee = (event_id, attendee) => ({
    type: ADD_ATTENDEE,
    event_id,
    attendee
})

const deleteAttendee = (event_id, user_id) => ({
    type: DELETE_ATTENDEE,
    event_id,
    user_id
})

export const get_attendee_thunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/attendees/current`)

    if(res.ok) {
        const data = await res.json()

        dispatch(getEvents(data.events))
        return data
    }
    return res.errors
}
export const delete_attendee_event_thunk = (event_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${event_id}`,{
        method: "DELETE",
    })

    if (res.ok){
        dispatch(removeEvent(event_id))
        return res
    }
    else return res.errors
}
export const delete_attendee_attendee_thunk = (event_id, user_id, attendee_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/attendees/${attendee_id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteAttendee(event_id, user_id))
        return res
    }
    else return res.errors
}

export const update_attendee_attendee_thunk = (event_id, attendee) => async (dispatch) => {
    let {attendee_id, status, user} = attendee

    let new_att = {
        status,
    }

    const res = await csrfFetch(`/api/attendees/${attendee_id}`, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_att)
    })

    const data = await res.json()
    if(res.ok) {
        let stat = data.updated_attendee['status']
        let new_attendee = {
            ...data.updated_attendee,
            status: stat[0].toUpperCase() + stat.slice(1),
            user
        }
        dispatch(addAttendee(event_id, new_attendee))
        return new_attendee
    }
    else return data.errors
}

const initialState = { attendee_events: {} };

function attendee_reducer(state = initialState, action){
    let new_state;
    switch(action.type) {
        case GET_EVENTS:
            new_state = structuredClone(state)
            action.events.forEach(event => {
                new_state.attendee_events[event.id] = event
            })
            return new_state
        case DELETE_EVENT:
            new_state = structuredClone(state)
            delete new_state['attendee_events'][action.event_id]
            return new_state
        case ADD_ATTENDEE:
            new_state = structuredClone(state)
            new_state['attendee_events'][action.event_id]['attendees'][action.attendee.user_id] = action.attendee
            return new_state
        case DELETE_ATTENDEE:
            new_state = structuredClone(state)
            delete new_state['attendee_events'][action.event_id]['attendees'][action.user_id]
            return new_state
        default:
            return state
        }
    }

export default attendee_reducer
