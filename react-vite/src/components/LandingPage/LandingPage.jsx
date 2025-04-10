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
                <div className='land-main-desc'>Guild meet is a website designed to make planning for your nerdy events easy.</div>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
                <OpenModalButton
                    buttonText="Log in"
                    modalComponent={<LoginFormModal />}
                />
            </div>
            <div className='land-triple'>
                    <div className='land-desc b-text'>Create a Campaign
                        {/* <div>add image here</div> */}
                        <div className='b-text'>Create campaigns to invite your friends and bring them together. Campaigns will be able to create events and have multiple group members join</div>
                    </div>
                    <div className='land-desc b-text'>Join your friends.
                        {/* <div>add image here</div> */}
                        <div className='b-text'>Create characters and join other's campaigns as you see fit. Characters will be able to join as many campaigns as they'd like, each being separate groups to allow for socializing and organization</div>
                    </div>
                    <div className='land-desc b-text'>Schedule events.
                        {/* <div>add image here</div> */}
                        <div className='b-text'>Plan events or choose to attend any events available to your campaign. Anyone will be able to create an event and all members will be able to mark themselves as Attending, Unsure, or Not Attending.</div>
                    </div>
            </div>
            <div className='land-mod'>
                <h2 className='land-head'>Register Today</h2>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
                <OpenModalButton
                    buttonText="Log in"
                    modalComponent={<LoginFormModal />}
                />
            </div>
        </div>
    )
}

export default LandingPage
