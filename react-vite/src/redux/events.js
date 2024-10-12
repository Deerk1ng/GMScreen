import { csrfFetch } from "./csrf";

//Action types
const GET_EVENTS = 'events/get_events'
//Action creator
const getEvents = (events) => ({
    type: GET_EVENTS,
    events
})

//Thunk for action
export const get_events_thunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/events`)
    // console.log(res)
    if(res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(getEvents(data.events))
        return data
    }
    return res.errors
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
        default:
            return state
    }
}

export default events_reducer
