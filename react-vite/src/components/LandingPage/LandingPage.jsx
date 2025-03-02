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
                <div className='land-desc'>Guild meet is a website designed to make planning for your nerdy events easy.</div>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
                <OpenModalButton
                    buttonText="Log in or Use A Demo account"
                    modalComponent={<LoginFormModal />}
                />
            </div>
            <div>
                <div className='land-desc'>Create a Campaign</div>
                <div>Create campaigns for your players to join</div>
                <div className='land-desc'>Join your friends.</div>
                <div>Create characters and join other's campaigns as you see fit</div>
                <div className='land-desc'>Schedule events.</div>
                <div>Plan events or choose to attend any events available to your campaign</div>
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
