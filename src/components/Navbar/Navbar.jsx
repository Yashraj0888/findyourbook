import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../../images/logo.png";
import hamburger from "../../images/hamburger.png";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navbarRef = useRef(null); // Reference to the navbar

  const handleNavbar = () => {
    setToggleMenu((prevState) => !prevState); // Toggle the menu
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Collapse the navbar if click is outside the navbar
      if (
        toggleMenu && // Navbar is open
        navbarRef.current && // Reference is set
        !navbarRef.current.contains(event.target) // Click is outside navbar
      ) {
        setToggleMenu(false); // Collapse navbar
      }
    };

    // Add event listener for clicks on the document
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleMenu]);

  return (
    <nav className="navbar" id="navbar" ref={navbarRef}>
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoImg} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">bookhub</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <img src={hamburger} alt="hamburger" className="hamburger" />
          </button>
        </div>

        <div
          className={
            toggleMenu
              ? "navbar-collapse show-navbar-collapse"
              : "navbar-collapse"
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="book"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
                onClick={() => setToggleMenu(false)} // Collapse when clicked
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="about"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
                onClick={() => setToggleMenu(false)} // Collapse when clicked
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
