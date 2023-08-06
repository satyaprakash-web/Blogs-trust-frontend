import React, { useContext } from "react";
import "./sidebar.css";
import UserContext from "../../context/UserContext";
import { motion } from "framer-motion";
import Satyaformal from "../../img/Satyaformal.jpeg";

function Sidebar() {
  const context = useContext(UserContext);
  const { mode } = context;

  return (
    <motion.div
      whileInView={{ opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      className={`sidebar theme-${mode}`}
    >
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={Satyaformal} alt="" />
        <p>
          A technology enthusiast and a passionate learner who aims to increase
          knowledge, to secure a creative and challenging position in a
          reputable organization, to effectively utilize problem solving skills,
          while making a significant contribution to the symbolic growth and
          success of the company.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Travel</li>
          <li className="sidebarListItem">Gaming</li>
          <li className="sidebarListItem">Movies</li>
          <li className="sidebarListItem">Science</li>
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a
            style={{ color: "inherit" }}
            href="https://www.linkedin.com/in/satyaprakash38/"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-linkedin"></i>
          </a>
          <a
            style={{ color: "inherit" }}
            href="https://www.instagram.com/satya_prakash872/"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </a>
          <a
            style={{ color: "inherit" }}
            href="https://www.facebook.com/satyaprakash.rajan.96"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          </a>
          <a
            style={{ color: "inherit" }}
            href="https://www.linkedin.com/in/satyaprakash38/"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;
