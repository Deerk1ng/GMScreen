import './LandingPage.css'
import { useNavigate } from "react-router-dom";
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LandingPage = () => {
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    useEffect(() => {
        if(user) navigate('/events')
    }, [user])
    return (
        <>
            <h1>Welcome to Guild Meet</h1>
            <div>Guild meet is a website designed to make planning for your nerdy events easy. Schedule events that your group mates can sign up to attend. In the future, campaign groups will be implemented, allowing for a more exclusive membership status and for private usage of the schedule feature. </div>
            <div>
                <h3>Register Today</h3>
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
            </div>
        </>
    )
}

export default LandingPage
