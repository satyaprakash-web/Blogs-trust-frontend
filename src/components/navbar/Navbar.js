import React, { useContext, useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import AddImg from '../../img/add.png'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    // to show stored image in api folderi
    // make Public folder
    const PF = `${process.env.REACT_APP_SERVER}/images/`;

    const context = useContext(UserContext);
    const { user, setUser, mode, setMode } = context;

    const handleLogout = (e) => {
        e.preventDefault();
        setToggle(false);
        localStorage.removeItem("user");
        setUser(null);
    }

    const togglemode = () => {
        if (mode === "dark") {
            setMode("light");
            document.body.style.backgroundColor = '#fff';
        }
        else if (mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = '#001e3c';
        }
    }

    return (
        <nav className={`top theme-${mode}`}>
            <div className="topLeft">
                <a href="https://www.linkedin.com/in/satyaprakash38/" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-linkedin"></i></a>
                <a href="https://www.facebook.com/satyaprakash.rajan.96" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-square-facebook"></i></a>
                <a href="https://www.linkedin.com/in/satyaprakash38/" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-square-twitter"></i></a>
                <a href="https://www.instagram.com/satya_prakash872/" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-square-instagram"></i></a>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link hover" to="/">
                            HOME
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link hover" to="/write">
                            WRITE
                        </Link>
                    </li>
                    <li className="topListItem hover">
                        <Link className="link" to="/about">
                            ABOUT
                        </Link>
                    </li>
                    <li className="topListItem hover">
                        <a className="link" href='https://www.linkedin.com/in/satyaprakash38/' target={"_blank"} rel="noreferrer">
                            CONTACT
                        </a>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {/* no profile pic if there is no user , instead login and register*/}
                {
                    user ? (
                        <>
                            <Link to="/settings">
                                <img className="topImage" src={user.profilePic ? PF + user.profilePic : AddImg} alt="" />
                                <i className="topSettingIcon fa-solid fa-gear"></i>
                            </Link>

                            <Button onClick={handleLogout} endIcon={<LogoutIcon />} className="topLogout">Logout</Button>

                        </>
                    ) :
                        (
                            <ul className='topList'>
                                <Link className='link' to='/login'>
                                    <Button style={{ color: "inherit", fontSize: "16px" }}>Login</Button>
                                </Link>
                                <Link className='link' to='/register'>
                                    <Button style={{ color: "inherit", fontSize: "16px" }}>Register</Button>
                                </Link>

                            </ul>
                        )
                }
                {mode === "light" ?
                    <Button style={{ color: "#0c3b66" }} variant="text" onClick={togglemode}><DarkModeIcon /></Button>
                    :
                    <Button style={{ color: "#D9E24F" }} variant="text" onClick={togglemode}><LightModeIcon /></Button>
                }

            </div>



            {/* for mobile display */}
            <div className="mob-nav">
                <div className="navbar-menu">
                    <i style={{marginLeft:"8px",fontSize:"1.4rem"}} className="fa-solid fa-bars" onClick={() => setToggle(true)} />

                    {toggle && (
                        <motion.div
                            whileInView={{ y: [-300, 0] }} //means 300px
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                        >
                            <HiX onClick={() => setToggle(false)} />
                            <ul>
                                <Link className="link hover" to="/" onClick={() => setToggle(false)}>
                                    HOME
                                </Link>
                                <Link className="link hover" to="/write" onClick={() => setToggle(false)}>
                                    WRITE
                                </Link>
                                <Link className="link hover" to="/about" onClick={() => setToggle(false)}>
                                    ABOUT
                                </Link>
                                <Link className="link hover" to="/settings" onClick={() => setToggle(false)}>
                                    SETTINGS
                                </Link>
                                <a className="link hover" href='https://www.linkedin.com/in/satyaprakash38/' target={"_blank"} rel="noreferrer" onClick={() => setToggle(false)}>
                                    CONTACT
                                </a>

                                <Button onClick={handleLogout} className="topLogout link hover" style={{position:"relative",right:"10px"}}>Logout</Button>

                                <span className="bottom-nav">

                                    <a href="https://www.linkedin.com/in/satyaprakash38/" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-linkedin"></i></a>
                                    <a href="https://www.instagram.com/satya_prakash872/" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-square-instagram"></i></a>
                                    <a href="https://www.facebook.com/satyaprakash.rajan.96" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-square-facebook"></i></a>
                                    <a href="https://www.linkedin.com/in/satyaprakash38/" target={"_blank"} rel="noreferrer" ><i className="topIcon fa-brands fa-square-twitter"></i></a>
                                </span>
                            </ul>
                        </motion.div>
                    )}
                </div>
                <div className="topRight-mob">

                    {mode === "light" ?
                        <Button style={{ color: "#0c3b66" }} variant="text" onClick={togglemode}><DarkModeIcon /></Button>
                        :
                        <Button style={{ color: "#D9E24F" }} variant="text" onClick={togglemode}><LightModeIcon /></Button>
                    }

                    {/* no profile pic if there is no user , instead login and register*/}
                    {
                        user ? (
                            <>
                                <Link to="/settings">
                                    <img className="topImage" src={user.profilePic ? PF + user.profilePic : AddImg} alt="" style={{marginRight:"10px"}} />
                                    {/* <i className="topSettingIcon fa-solid fa-gear"></i> */}
                                </Link>

                            </>
                        ) :
                            (
                                <ul className='topList'>
                                    <Link className='link' to='/login'>
                                        <Button style={{ color: "inherit", fontSize: "16px" }}>Login</Button>
                                    </Link>
                                    <Link className='link' to='/register'>
                                        <Button style={{ color: "inherit", fontSize: "16px" }}>Register</Button>
                                    </Link>

                                </ul>
                            )
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar;
