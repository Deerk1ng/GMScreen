import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaDungeon } from "react-icons/fa";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { useNavigate } from "react-router-dom";
import { get_camps_thunk } from "../../redux/campaigns";

function CampaignsButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()
  const userCamps = useSelector((store) => store.session.campaigns);



  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(()=> {
    if (user && user.id ){
      dispatch(get_camps_thunk())
    }
  }, [user])

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout())
    .then(() => navigate('/'));
  };

  return (
    <>
      <button id='profile-btn' onClick={toggleMenu}>
        <FaDungeon className="pfp" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li className="user-name">{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button className="button" onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <div className="profile-items">
              {/*  add different campaigns here */}
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default CampaignsButton;
