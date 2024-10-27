import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";


function Navigation() {
  const user = useSelector(state => state.session.user)

  return (
    <div className="Nav-bar">
      <div className="logo-navs">
        <NavLink to="/"><img id='logo-img' src="https://fontmeme.com/permalink/241024/6ac4da749ba09f45af122cba5b384dea.png" alt="Guild Meet Logo"></img></NavLink> {/* give image id='logo-img' */}
        {user && user.id ?
        <div >
            <NavLink className="nav-event" to="/events">Events</NavLink>
        </div> : null}
      </div>
      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
