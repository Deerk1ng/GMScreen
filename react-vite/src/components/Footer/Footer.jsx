import { Link, NavLink } from 'react-router-dom';
import './Footer.css'
import { FaGithub, FaLinkedin   } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <footer className='footer'>
            <div className='left-ftr'>
                <Link to={'/'} ><img className='img-ftr' src='https://fontmeme.com/permalink/241024/6ac4da749ba09f45af122cba5b384dea.png' alt='Crafty Logo'></img></Link>
            </div>
            <div className='mid-ftr'>
                <h2>About:</h2>
                <div>Guild Meet is a website meant to be a meeting hub for any
                    TTRPG campaigns out there that need a little more visual
                    scheduling than discord offers. The first iteration includes the ability to
                    schedule events and for others to mark themselves as attendees. In future updates,
                    individual campaigns with more exclusivity will be available. My dream is to eventually
                    create a website thats a one stop shop for any campaign where character information, as well as
                    quick rules lookups will be at the tip of everyones fingers</div>
            </div>
            <div className='right-ftr'>
                <div className='footer-header'>
                    <h2>Hayden Ruiz</h2>
                </div>
                <div className='social-media'>
                    <NavLink to={'https://github.com/Deerk1ng/GMScreen'}><FaGithub  className='social'/></NavLink>
                    <NavLink to={'https://www.linkedin.com/in/haydenr1111/'}><FaLinkedin className='social'/></NavLink>
                    <NavLink to={'https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran'}><FaSquareXTwitter className='social'/></NavLink>
                </div>
            </div>



        </footer>
    )
}


export default Footer;
