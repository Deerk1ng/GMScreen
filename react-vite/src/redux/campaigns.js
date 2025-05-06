import { csrfFetch } from "./csrf.js";

const GET_CAMPS = 'campaigns/get_campaigns'
const DEL_CAMP = 'campaigns/delete_campaigns'
const EDIT_CAMP = 'campaigns/edit_campaigns'

const get_campaigns = (campaigns) => ({
    type: GET_CAMPS,
    campaigns
})

const delete_campaigns = (campaign_id) => ({
    type: DEL_CAMP,
    campaign_id
})

const edit_campaigns = (campaign_id, campaign) => ({
    type: EDIT_CAMP,
    campaign,
    campaign_id
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

export const delete_camps_thunk = (campaign_id) => async (dispatch) => {
    const res = await csrfFetch(`api/campaigns/${campaign_id}`, {
        method: 'DELETE'
    })
}
export const edit_camps_thunk = (campaign_id, campaign) => async (dispatch) => {
    const res = await csrfFetch(`api/campaigns/${campaign_id}`, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(campaign)
    })
}


const initialState = { campaigns: {} };
function campaigns_reducer(state = initialState, action){
    let new_state
    switch(action.type) {
        case GET_EVENTS:
            new_state = structuredClone(state)
            action.camnpaigns.forEach(campaign => {
                // add code for naturalizing results
                new_state.campaigns[campaign.id] = campaign
            })
            return new_state
        case DEL_CAMP:
            new_state = structuredClone(state)
            delete new_state['campaigns'][action.campaign_id]
            return new_state
        case EDIT_CAMP:
            new_state = structuredClone(state)
            new_state['campaigns'][action.campaign_id] = action.campaign
            return new_state
        default:
            return state
    }
}

export default campaigns_reducer
