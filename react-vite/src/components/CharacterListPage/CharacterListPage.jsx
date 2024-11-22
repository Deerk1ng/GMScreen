import './CharacterListPage.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { get_chars_thunk } from '../../redux/characters'

const CharacterListPage = () => {
    const user = useSelector(state => state.session.user)
    const characters = useSelector(state => state.characters.curr_characters)
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [currKey, setCurrKey] = useState(0)
    const [charKeys, setCharKeys] = useState([])
    const [character, setCharacter] = useState({})
    const [char_deets, setCharDeets] = useState({})


    useEffect(() => {
        dispatch(get_chars_thunk())
    }, [dispatch, user]);

    useEffect(() => {
        setCharKeys(Object.keys(characters))
        setCurrKey(charKeys[0])
    }, [characters])

    useEffect(() => {
        setCharacter(characters[currKey])
        setIsLoaded(true)
    }, [currKey])

    useEffect(() => {
        setCharDeets({
            'hit-dice': 10,
            'speed': 30,
            'abilities': {},
            'spellcaster': false,
            'spells' : {},
            'armor' : 15,
        })
    }, [character])

    const mod_conversion = (ascore) => {
        if (!Number(ascore)){
            return "Ability Score is not a number"
        }
        else if(ascore < 10){
            return -1
        }
        else{
            return Math.floor((ascore - 10) / 2)
        }
    }

    const prof_calculator = (level) => {
        if( level < 5){
            return 2
        } else if( level < 9){
            return 3
        } else if( level < 13){
            return 4
        } else if( level < 17){
            return 5
        } else if( level <= 20){
            return 6
        } else{
            return "level is not a valid number"
        }
    }

    return (
        <>
        {isLoaded ?
        <>
        {character && char_deets ?
        <>
            <div className='character-selector'>
                <div >Choose your character</div>
                <select className='first-color' value={currKey} onChange={(e) => setCurrKey(e.target.value)}>
                    <optgroup className='first-color' label="--Please choose a character--">
                    {charKeys.map(key => (
                        <option value={key} key={key}>{characters[key]['name']}</option>
                    ))}
                    </optgroup>
                </select>
                <a className="create" href="/characters/new">Create New Character</a>
            </div>
            <div className='character-page'>
                <div className='char_sec Deets'>
                    <div className='char_details'>Name: {character['name']}</div>
                    <div className='char_details'>Species: {character['race']}</div>
                    <div className='char_details'>Class: {character['character_class']} | {character['subclass']}</div>
                    <div className='char_details'>Level: {character['level']}</div>
                </div>
                <div className='char_sec HP'>
                    <div className='hp'>
                        <div>HP</div>
                        <div>{char_deets['hit-dice']+mod_conversion(character['constitution']) + ((char_deets['hit-dice']/ 2 +mod_conversion(character['constitution']))*character['level'])}</div>
                    </div>
                    <div className='hp'>
                        <div>AC</div>
                        <div>{char_deets['armor']}</div>
                    </div>
                    <div className='hp'>
                        <div>Hit Dice</div>
                        <div>{char_deets['hit-dice']}</div>
                    </div>
                    <div className='hp'>
                        <div>Prof.</div>
                        <div>{prof_calculator(character['level'])}</div>
                    </div>
                    <div className='hp'>
                        <div>Speed</div>
                        <div>{char_deets['speed']}</div>
                    </div>
                </div>
                <div className='char_sec AS'>
                    <div className='abilities-container'>
                        <div className='mod'>{mod_conversion(character['strength'])}</div>
                        <div className='ascore'>{character['strength']}</div>
                        <div className='ability'>Strength</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='mod'>{mod_conversion(character['dexterity'])}</div>
                        <div className='ascore'>{character['dexterity']}</div>
                        <div className='ability'>Dexterity</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='mod'>{mod_conversion(character['constitution'])}</div>
                        <div className='ascore'>{character['constitution']}</div>
                        <div className='ability'>Constitution</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='mod'>{mod_conversion(character['intelligence'])}</div>
                        <div className='ascore'>{character['intelligence']}</div>
                        <div className='ability'>Intelligence</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='mod'>{mod_conversion(character['wisdom'])}</div>
                        <div className='ascore'>{character['wisdom']}</div>
                        <div className='ability'>Wisdom</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='mod'>{mod_conversion(character['charisma'])}</div>
                        <div className='ascore'>{character['charisma']}</div>
                        <div className='ability'>Charisma</div>
                    </div>
                </div>
                <div className='char_sec DESC'>
                    {character['appearance'] ? <div className='char_desc'>Appearance: <span>{character['appearance']}</span></div> : null}
                    {character['backstory'] ? <div className='char_desc'>Backstory: <span>{character['backstory']}</span></div> : null}
                    {character['personality'] ? <div className='char_desc'>Personality: <span>{character['personality']}</span></div> : null}
                </div>
            </div>
            </> : <h1>Loading...</h1> }
        </>
        : <h1>Loading...</h1> }
        </>)
}

export default CharacterListPage
