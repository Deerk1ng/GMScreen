import './CreateCharacterPage.css'
import { useDispatch } from "react-redux"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { create_char_thunk } from '../../redux/characters'

const CreateCharacterPage = () => {
    const [char_name, setCharName] = useState("")
    const [level, setLevel] = useState(0)
    const [strength, setStr] = useState(0)
    const [dexterity, setDex] = useState(0)
    const [constitution, setCon] = useState(0)
    const [intelligence, setInt] = useState(0)
    const [wisdom, setWis] = useState(0)
    const [charisma, setCha] = useState(0)
    const [character_class, setCharClass] = useState("")
    const [subclass, setSubClass] = useState("")
    const [race, setRace] = useState("")
    const [backstory, setBackStory] = useState("")
    const [personality, setPersonality] = useState("")
    const [appearance, setAppearance] = useState("")
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateData = () => {
        const error = {}

        if(char_name.length < 5) error["char_name"] = "Character Name must be longer than 5 characters"
        if(char_name.length > 30) error["char_name"] = "Character Name must be shorter than 30 characters"
        if(backstory.length > 500) error["backstory"] = "Backstory must be less than 500 characters"
        if(personality.length > 500) error["personality"] = "Personality must be less than 500 characters"
        if(appearance.length > 500) error["appearance"] = "Appearance must be less than 500 characters"
        if(isNaN(level) || level <= 0 || level > 20) error["level"] = "Level must be between 1 and 20"
        if(isNaN(strength) || strength < 8 || strength > 20) error["strength"] = "Strength must be between 8 and 20"
        if(isNaN(dexterity) || dexterity < 8 || dexterity > 20) error["dexterity"] = "dexterity must be between 8 and 20"
        if(isNaN(constitution) || constitution < 8 || constitution > 20) error["constitution"] = "constitution must be between 8 and 20"
        if(isNaN(intelligence) || intelligence < 8 || intelligence > 20) error["intelligence"] = "intelligence must be between 8 and 20"
        if(isNaN(wisdom) || wisdom < 8 || wisdom > 20) error["wisdom"] = "wisdom must be between 8 and 20"
        if(isNaN(charisma) || charisma < 8 || charisma > 20) error["charisma"] = "charisma must be between 8 and 20"
        if(!(character_class == 'Paladin' || character_class == 'Rogue' || character_class == 'Wizard')) error["character_class"] = "Not a valid character class"
        if(!(race == 'Human' || race == 'Half-Orc' || race == 'Elf')) error["race"] = "Not a valid species"

        setErrors(error)
        return Object.keys(error).length == 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validateData()){
            const new_character = {
                name: char_name,
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

            dispatch(create_char_thunk(new_character))

            return navigate('/characters')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='main-div event-main'>
            <h1 className='third-color' >Create a Character</h1>
            {errors.char_name && <p className='errors-msgs'>{errors['char_name']}</p>}
            <div className='lbl-inp'>
                <div className="label">Character Name</div>
                <input
                    type="text"
                    value={char_name}
                    onChange={(e)=> setCharName(e.target.value)}
                    required
                    className="event-name event-inp"
                    />
            </div>
            {errors.level && <p className='errors-msgs'>{errors.level}</p>}
            <div className='lbl-inp'>
                <div className="label">Level</div>
                <input
                    type="number"
                    value={level}
                    min="1"
                    max="20"
                    onChange={(e)=> setLevel(e.target.value)}
                    required
                    className="event-date event-inp"
                    />
            </div>
            {errors.character_class && <p className='errors-msgs'>{errors.character_class}</p>}
            <div className='lbl-inp'>
                <div className="label">character_class</div>
                <select value={character_class} onChange={(e)=> setCharClass(e.target.value)} className="event-date event-inp" >
                    <option className='first-color' value="">--Please choose an option--</option>
                    <option className='first-color' value="Paladin">Paladin</option>
                    <option className='first-color' value="Rogue">Rogue</option>
                    <option className='first-color' value="Wizard">Wizard</option>
                </select>
            </div>
            {errors.subclass && <p className='errors-msgs'>{errors.subclass}</p>}
            <div className='lbl-inp'>
                <div className="label">Subclass</div>
                <select value={subclass} onChange={(e)=> setSubClass(e.target.value)} className="event-date event-inp" >
                    <option className='first-color' value="">--Please choose an option--</option>
                    { character_class == "Paladin" ? <optgroup  className='first-color'  label="Paladin">
                        <option className='first-color'  value="Oath of Devotion">Oath of Devotion</option>
                        <option className='first-color'  value="Oath of the Ancients">Oath of the Ancients</option>
                        <option className='first-color'  value="Oath of Vengeance">Oath of Vengeance</option>
                    </optgroup> : null}
                    { character_class == "Rogue" ? <optgroup  className='first-color'  label="Rogue">
                        <option className='first-color'  value="Thief">Thief</option>
                        <option className='first-color'  value="Assassin">Assassin</option>
                        <option className='first-color'  value="Arcane Trickster">Arcane Trickster</option>
                    </optgroup> : null}
                    { character_class == "Wizard" ? <optgroup className='first-color'  label="Wizard">
                        <option className='first-color'  value="Abjuration">Abjuration</option>
                        <option className='first-color'  value="Conjuration">Conjuration</option>
                        <option className='first-color'  value="Divination">Divination</option>
                    </optgroup> : null}
                </select>
            </div>
            {errors.race && <p className='errors-msgs'>{errors.race}</p>}
            <div className='lbl-inp'>
                <div className="label">Species</div>
                <select value={race} onChange={(e)=> setRace(e.target.value)} className="event-date event-inp" >
                    <option className='first-color' value="">--Please choose an option--</option>
                    <option className='first-color' value="Human">Human</option>
                    <option className='first-color' value="Elf">Elf</option>
                    <option className='first-color' value="Half-Orc">Half-Orc</option>
                </select>
            </div>

            <h2 className='third-color' >Ability Scores</h2>
            {errors.strength && <p className='errors-msgs'>{errors.strength}</p>}
            <div className='lbl-inp'>
                <div className="label">Strength</div>
                <input
                    type="number"
                    value={strength}
                    onChange={(e)=> setStr(e.target.value)}
                    min = "8"
                    max = "100"
                    required
                    className="event-date event-inp"
                    />
            </div>
            {errors.dexterity && <p className='errors-msgs'>{errors.dexterity}</p>}
            <div className='lbl-inp'>
                <div className="label">Dexterity</div>
                <input
                    type="number"
                    value={dexterity}
                    onChange={(e)=> setDex(e.target.value)}
                    required
                    className="event-date event-inp"
                    />
            </div>
            {errors.constitution && <p className='errors-msgs'>{errors.constitution}</p>}
            <div className='lbl-inp'>
                <div className="label">Constitution</div>
                <input
                    type="number"
                    value={constitution}
                    onChange={(e)=> setCon(e.target.value)}
                    required
                    className="event-date event-inp"
                    />
            </div>
            {errors.intelligence && <p className='errors-msgs'>{errors.intelligence}</p>}
            <div className='lbl-inp'>
                <div className="label">Intelligence</div>
                <input
                    type="number"
                    value={intelligence}
                    onChange={(e)=> setInt(e.target.value)}
                    required
                    className="event-date event-inp"
                    />
            </div>
            {errors.wisdom && <p className='errors-msgs'>{errors.wisdom}</p>}
            <div className='lbl-inp'>
                <div className="label">Wisdom</div>
                <input
                    type="number"
                    value={wisdom}
                    onChange={(e)=> setWis(e.target.value)}
                    required
                    className="event-date event-inp"
                    />
            </div>
            {errors.charisma && <p className='errors-msgs'>{errors.charisma}</p>}
            <div className='lbl-inp'>
                <div className="label">Charisma</div>
                <input
                    type="number"
                    value={charisma}
                    onChange={(e)=> setCha(e.target.value)}
                    required
                    className="event-date event-inp"
                    />
            </div>

            <h2 className='third-color' >Character Details</h2>
            {errors.backstory && <p className='errors-msgs'>{errors.backstory}</p>}
            <div className='lbl-inp'>
                <div className="label">Backstory</div>
                <input
                    type="textarea"
                    value={backstory}
                    onChange={(e)=> setBackStory(e.target.value)}
                    className="event-description event-inp"
                    />
            </div>
            {errors.personality && <p className='errors-msgs'>{errors.personality}</p>}
            <div className='lbl-inp'>
                <div className="label">Personality</div>
                <input
                    type="textarea"
                    value={personality}
                    onChange={(e)=> setPersonality(e.target.value)}
                    className="event-description event-inp"
                    />
            </div>
            {errors.appearance && <p className='errors-msgs'>{errors.appearance}</p>}
            <div className='lbl-inp'>
                <div className="label">Appearance</div>
                <input
                    type="textarea"
                    value={appearance}
                    onChange={(e)=> setAppearance(e.target.value)}
                    className="event-description event-inp"
                    />
            </div>

            <button className='event-bttn' type="submit">Submit</button>
        </form>
    )
}

export default CreateCharacterPage
