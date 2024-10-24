import { Link, NavLink } from 'react-router-dom';
import './Footer.css'
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { RiFacebookBoxFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='left-ftr'>
                <Link to={'/'} ><img className='img-ftr' src='https://fontmeme.com/permalink/241024/6ac4da749ba09f45af122cba5b384dea.png' alt='Crafty Logo'></img></Link>
            </div>
            <div className='right-ftr'>
                <div className='footer-header'>
                    Hayden Ruiz
                    <div>
                        <Link to={'https://github.com/Deerk1ng'}>GitHub</Link>
                    </div>
                    <div>
                        <Link to={'https://www.linkedin.com/in/haydenr1111'}>LinkedIn</Link>
                    </div>
                </div>
                <div className='social-media'>
                    <NavLink to={'https://www.instagram.com/appacademyio/'}><FaInstagram className='social'/></NavLink>
                    <NavLink to={'https://www.facebook.com/appacademyio'}><RiFacebookBoxFill className='social'/></NavLink>
                    <NavLink to={'https://x.com/appacademyio'}><BsTwitterX className='social'/></NavLink>
                    <NavLink to={'https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran'}><FaYoutube className='social'/></NavLink>
                </div>
            </div>



        </footer>
    )
}


export default Footer;
