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

    return (
        <>
            {isLoaded ?
                <>
                </> : <h1>Loading...</h1> }
        </>)
}

export default CharacterListPage
