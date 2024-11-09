import './CharacterListPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_chars_thunk } from '../../redux/characters'

const CharacterListPage = () => {
    const user = useSelector(state => state.session.user)
    const characters = useSelector(state => state.characters.curr_characters)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(get_chars_thunk())
        .then(() => setIsLoaded(true))
        }, [dispatch, user]);
        return (<>
            {isLoaded ?
                <>
                </> : null}
        </>)
}
