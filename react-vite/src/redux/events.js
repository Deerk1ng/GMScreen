import { csrfFetch } from "./csrf";

//Action types
const GET_EVENTS = 'events/get_events'
const ADD_EVENT = 'events/add_event'
const DELETE_EVENT = 'events/delete_event'
//Action creator
const getEvents = (events) => ({
    type: GET_EVENTS,
    events
})

const addEvent = (event) => ({
    type: ADD_EVENT,
    event
})

const removeEvent = (event_id) => ({
    type: DELETE_EVENT,
    event_id
})

//Thunk for action
export const get_events_thunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/events/`)
    // console.log(res)
    if(res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(getEvents(data.events))
        return data
    }
    return res.errors
}

export const create_events_thunk = (event) => async (dispatch) => {
    let {name, start_date, end_date, description, capacity, url} = event
    let new_ev = {
        name,
        start_date: start_date.split("T").join(' ')+":00",
        end_date: end_date.split("T").join(' ')+":00",
        description,
        capacity
    }
    // console.log(start_date.split("T").join(' ')+":00")
    const res = await csrfFetch(`/api/events/`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_ev)
    })

    const data = await res.json()
    if(res.ok) {
        let new_event = {...data.created_event}
        if (url.length){
            // add image here
        }
        dispatch(addEvent(new_event))
        return new_event

    }
    return data.errors
}

export const delete_event_thunk = (event_id) => async (dispatch) => {
    const res = await csrfFetch(`api/events/${event_id}`,{
        method: "DELETE",
    })

    if (res.ok){
        dispatch(removeEvent(event_id))
        return res
    }
    else return res.errors
}

//Initial State
const initialState = { all_events: {} };

//State Change
function events_reducer(state = initialState, action){
    let new_state;
    switch(action.type) {
        case GET_EVENTS:
            new_state = structuredClone(state)
            action.events.forEach(event => {
                new_state.all_events[event.id] = event
            })
            return new_state
        case ADD_EVENT:
            new_state = structuredClone(state)
            new_state['all_events'][action.event.id] = action.event //needs testing
            return new_state
        case DELETE_EVENT:
            new_state = structuredClone(state)
            delete new_state['all_events'][action.event_id]
            return new_state
        default:
            return state
    }
}

export default events_reducer
