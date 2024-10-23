import { csrfFetch } from "./csrf.js";

//Action types
const GET_EVENTS = 'events/get_events'
const ADD_EVENT = 'events/add_event'
const DELETE_EVENT = 'events/delete_event'
const ADD_ATTENDEE = "attendee/add_attendee"
const DELETE_ATTENDEE = "attendee/delete_attendee"
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

//Thunk for action
export const get_events_thunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/events/`)

    if(res.ok) {
        const data = await res.json()

        dispatch(getEvents(data.events))
        return data
    }
    return res.errors
}

export const create_events_thunk = (event) => async (dispatch) => {
    let {name, start_date, end_date, description, capacity, url, user_id, user} = event
    let new_ev = {
        name,
        start_date: start_date.split("T").join(' ')+":00",
        end_date: end_date.split("T").join(' ')+":00",
        description,
        capacity
    }
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
            const img_res = await csrfFetch(`/api/events/${new_event['id']}/images`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    url
                })
            })
            if(img_res.ok){
                const data = img_res.json()
                new_event['image'] = data['new_image']
            }
        }
        let new_att = {
            status : "owner"
        }
        const att_res = await csrfFetch(`/api/events/${new_event['id']}/attendees`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_att)
        })
        if(att_res.ok) {
            const att_data = await att_res.json()
            let new_attendee = {
                user,
                user_id,
                status: 'Owner',
                id: att_data.new_attendee['id']
            }
            new_event['attendees'][new_attendee.id] = new_attendee
        }
        dispatch(addEvent(new_event))
        return new_event

    }
    return data.errors
}

export const delete_event_thunk = (event_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${event_id}`,{
        method: "DELETE",
    })

    if (res.ok){
        dispatch(removeEvent(event_id))
        return res
    }
    else return res.errors
}

export const delete_attendee_thunk = (event_id, user_id, attendee_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/attendees/${attendee_id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteAttendee(event_id, user_id))
        return res
    }
    else return res.errors
}

export const create_attendee_thunk = (event_id, attendee) => async (dispatch) => {
    let {status, user_id, user} = attendee

    let new_att = {
        status : status.toLowerCase()
    }

    const res = await csrfFetch(`/api/events/${event_id}/attendees`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_att)
    })

    const data = await res.json()
    if(res.ok) {
        let stat = data.new_attendee['status']
        let new_attendee = {
            user,
            user_id,
            status: stat[0].toUpperCase() + stat.slice(1),
            id: data.new_attendee['id']
        }
        dispatch(addAttendee(event_id, new_attendee))
        return new_attendee
    }
    else return data.errors

}

export const update_event_thunk = (event) => async (dispatch) => {
    let {id, name, start_date, end_date, description, capacity, url, prev_url} = event
    if(start_date.endsWith(".000")) start_date = start_date.split(':00')[0]
    if(end_date.endsWith(".000")) end_date = end_date.split(':00')[0]
    let new_ev = {
        name,
        start_date: start_date.split("T").join(' ') + ":00",
        end_date: end_date.split("T").join(' ') + ":00",
        description,
        capacity
    }
    const res = await csrfFetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_ev)
    })

    const data = await res.json()
    if(res.ok) {
        let new_event = {...data.updated_event}
        if (url.length && prev_url?.length){
            // add image here
            let url_obj = {
                url,
                preview : false
            }
            const img_res = await csrfFetch(`/api/events/${new_event['id']}/images`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(url_obj)
            })
            const img_data = await img_res.json()
            if(img_res.ok){
                new_event['image'] = img_data['new_image']
            }
        }else if (url.length && !prev_url?.length) {
                let url_obj = {
                    url,
                    preview : false
                }
                const img_add = await csrfFetch(`/api/events/${new_event['id']}/images`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(url_obj)
                })
                const img_data  = await img_add.json()
                if(img_add.ok){
                    new_event['image'] = img_data['new_image']
                }
        } else if (prev_url.length) {
            const img_del_res = await csrfFetch(`/api/events/${new_event['id']}/images`, {
                method: 'DELETE'
            })
            new_event['image'] = ''
        }
        dispatch(addEvent(new_event))
        return new_event
    }
    return data.errors
}

export const update_attendee_thunk = (event_id, attendee) => async (dispatch) => {
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
        case ADD_ATTENDEE:
            new_state = structuredClone(state)
            new_state['all_events'][action.event_id]['attendees'][action.attendee.user_id] = action.attendee
            return new_state
        case DELETE_ATTENDEE:
            new_state = structuredClone(state)
            delete new_state['all_events'][action.event_id]['attendees'][action.user_id]
            return new_state
        default:
            return state
    }
}

export default events_reducer
