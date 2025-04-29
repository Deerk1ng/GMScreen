import { csrfFetch } from "./csrf.js";

const GET_CAMPS = 'campaigns/get_campaigns'

const get_campaigns = (campaigns) => ({
    type: GET_CAMPS,
    campaigns
})

export const get_camps_thunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/campaigns/current')

    if(res.ok) {
        const data = await res.json()

        dispatch(get_campaigns(data.campaigns))
        return data
    }
    return res.errors
}

const initialState = { campaigns: {} };
function campaigns_reducer(state = initialState, action){
    let new_state
    switch(action.type) {
        case GET_EVENTS:
            new_state = structuredClone(state)
            action.camnpaigns.forEach(campaign => {
                // add code for naturalizing results
            })
            return new_state
        default:
            return state
    }
}

export default campaigns_reducer
