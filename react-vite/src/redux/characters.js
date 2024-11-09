import { csrfFetch } from "./csrf.js";

//Action types
const GET_CHARS = 'characters/get_characters'
const ADD_CHAR = 'characters/add_character'
const DEL_CHAR = 'characters/delete_character'

//Action creator
const getChars = (chars) => ({
    type: GET_CHARS,
    chars
})

const addChars = (char) => ({
    type: ADD_CHAR,
    char
})

const delChars = (char_id) => ({
    type: DEL_CHAR,
    char_id
})

//Thunk for action
export const get_chars_thunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/current`)

    if(res.ok) {
        const data = await res.json()

        dispatch(getChars(data.characters))
        return data
    }
    return res.errors
}

export const create_char_thunk = (character) => async (dispatch) => {
    let { name, level, strength, dexterity, constitution, intelligence, wisdom, charisma, character_class, subclass, race, backstory, personality, appearance} = character
    let new_char = {
        name,
        level,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        character_class,
        subclass,
        race,
        backstory,
        personality,
        appearance,
    }

    const res = await csrfFetch(`/api/characters`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_char)
    })

    const data = await res.json()
    if(res.ok) {
        let new_character = {...data.created_character}
        dispatch(addChars(new_character))
        return new_character
    } else return data.errors
}

export const delete_character_thunk = (char_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${char_id}`, {
        method: "DELETE"
    })

    if(res.ok){
        dispatch(delChars(char_id))
        return res
    } else return res.errors
}

export const update_character_thunk = (char) => async (dispatch) => {
    let { name, level, strength, dexterity, constitution, intelligence, wisdom, charisma, character_class, subclass, race, backstory, personality, appearance} = character
    let new_char = {
        name,
        level,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        character_class,
        subclass,
        race,
        backstory,
        personality,
        appearance,
    }

    const res = await csrfFetch(`/api/characters`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(new_char)
    })

    const data = await res.json()
    if(res.ok) {
        let new_character = {...data.created_character}
        dispatch(addChars(new_character))
        return new_character
    } else return data.errors
}
//Initial State
const initialState = { curr_characters: {} };

//State Change
function characters_reducer(state = initialState, action){
    let new_state
    switch(action.type) {
        case GET_CHARS:
            new_state = structuredClone(state)
            action.chars.forEach(char => {
                new_state['curr_characters'][char.id] = char
            })
            return new_state
        case ADD_CHAR:
            new_state = structuredClone(state)
            new_state['curr_characters'][action.char.id] = action.char
            return new_state
        case DEL_CHAR:
            new_state = structuredClone(state)
            delete new_state['curr_characters'][action.char_id]
            return new_state
        default:
            return state
    }
}

export default characters_reducer
