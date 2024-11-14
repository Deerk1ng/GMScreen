import './CharacterListPage.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { get_chars_thunk } from '../../redux/characters'

const CharacterListPage = () => {
    const user = useSelector(state => state.session.user)
    const characters = useSelector(state => state.characters.curr_characters)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [currChar, setCurrChar] = useState(0)
    const [charKeys, setCharKeys] = useState([])


    useEffect(() => {
        dispatch(get_chars_thunk())
        .then(() => setIsLoaded(true))
    }, [dispatch, user]);

    useEffect(() => {
        setCharKeys(Object.keys(characters))
        setCurrChar(charKeys[0])
    }, [characters])

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
        {characters[currChar] ?
            <div className='character-page'>
                <div className='char_sec Deets'>
                    <div className='name'>{characters[currChar]['name']}</div>
                    <div className='name'>{characters[currChar]['race']}</div>
                    <div className='name'>{characters[currChar]['character_class']}</div>
                    <div className='name'>{characters[currChar]['subclass']}</div>
                    <div className='name'>Level: {characters[currChar]['level']}</div>
                </div>
                <div className='char_sec HP'>
                    <div className='hp'>
                        <div>HP</div>
                        <div></div>
                    </div>
                    <div className='hp'>
                        <div>Armor Class</div>
                        <div></div>
                    </div>
                    <div className='hp'>
                        <div>Hit Dice</div>
                        <div></div>
                    </div>
                    <div className='hp'>
                        <div>Proficiency</div>
                        <div>{prof_calculator(characters[currChar]['level'])}</div>
                    </div>
                    <div className='hp'>
                        <div>Speed</div>
                        <div></div>
                    </div>
                </div>
                <div className='char_sec AS'>
                    <div className='abilities-container'>
                        <div className='ability'>Strength</div>
                        <div className='mod'>+{mod_conversion(characters[currChar]['strength'])}</div>
                        <div className='ascore'>{characters[currChar]['strength']}</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='ability'>Dexterity</div>
                        <div className='mod'>+{mod_conversion(characters[currChar]['dexterity'])}</div>
                        <div className='ascore'>{characters[currChar]['dexterity']}</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='ability'>Constitution</div>
                        <div className='mod'>+{mod_conversion(characters[currChar]['constitution'])}</div>
                        <div className='ascore'>{characters[currChar]['constitution']}</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='ability'>Intelligence</div>
                        <div className='mod'>+{mod_conversion(characters[currChar]['intelligence'])}</div>
                        <div className='ascore'>{characters[currChar]['intelligence']}</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='ability'>Wisdom</div>
                        <div className='mod'>+{mod_conversion(characters[currChar]['wisdom'])}</div>
                        <div className='ascore'>{characters[currChar]['wisdom']}</div>
                    </div>
                    <div className='abilities-container'>
                        <div className='ability'>Charisma</div>
                        <div className='mod'>+{mod_conversion(characters[currChar]['charisma'])}</div>
                        <div className='ascore'>{characters[currChar]['charisma']}</div>
                    </div>
                </div>
                <div className='char_sec DESC'>
                    <div>Features</div>
                    <div>Equipment</div>
                    <div>Tool Proficiencies</div>
                    <div>Appearance</div>
                    <div>Backstory</div>
                    <div>Personality</div>
                </div>
            </div>
             : <div>
                <div>currChar: {currChar}, charKeys: {charKeys}, character: {}</div>
             </div> }
        </>
        : <h1>Loading...</h1> }
        </>)
}

export default CharacterListPage
