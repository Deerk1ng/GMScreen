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
        <div className='main-div land-main'>
            <h1 className='third-color'>Welcome to Guild Meet</h1>
            <div>
                <div className='land-desc'>Guild meet is a website designed to make planning for your nerdy events easy. Schedule events that your group mates can sign up to attend. In the future, campaign groups will be implemented, allowing for a more exclusive membership status and for private usage of the schedule feature. </div>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
                <OpenModalButton
                    buttonText="Log in or Use A Demo account"
                    modalComponent={<LoginFormModal />}
                />
            </div>
            <div className='land-mod'>
                <h2 className='land-head'>Register Today</h2>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
                <OpenModalButton
                    buttonText="Log in or Use A Demo account"
                    modalComponent={<LoginFormModal />}
                />
            </div>
        </div>
    )
}

export default LandingPage
