import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { login } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import ProductFormPage from "../ProductForm";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const myListings = () => {
    closeMenu()
    history.push('/my-products')
  };

  const demoLogin = () => {
    dispatch(login("demo@aa.io", "password"))
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="menu" onClick={openMenu}>
        <i class="head fa-solid fa-circle-user fa-3x" ></i>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.first_name} {user.last_name}</li>
            <li>{user.email}</li>
            <li className="button">
              <OpenModalButton
              buttonText="List a Product"
              onItemClick={closeMenu}
              modalComponent={<ProductFormPage />}
              />
            </li>
            <li className="button" onClick={myListings}>My Listings</li>
            <li className="button" onClick={handleLogout}>
                Log Out
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />

            <div className="demo" onClick={demoLogin}>Demo Login</div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
