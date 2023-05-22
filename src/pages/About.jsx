import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import tharunPic from "../assets/tharun.jpg";
import rahulPic from "../assets/rahul.jpg";
import farazPic from "../assets/faraz.png";
import "./About.css";
import { NavBar } from "../api_calls/NavBar";

const developers = [
  {
    name: "Tharun Gade",
    photo: tharunPic,
    email: "tharungade2001@gmail.com",
    github: "tharungade",
    linkedin: "tharungade",
  },
  {
    name: "Rahul Kanna",
    photo: rahulPic,
    email: "kannarahul05@gmail.com",
    github: "imrahulkanna",
    linkedin: "rahulkanna",
  },
  {
    name: "Farazuddin Mohammed",
    photo: farazPic,
    email: "farazuddinmohammed05@gmail.com",
    github: "thefarazxr",
    linkedin: "farazuddinmohammed",
  },
];

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="about-us">
        <h1 className="aboutusTitle">About Us</h1>
        <div className="developers">
          {developers.map((developer, index) => (
            <motion.div
              key={index}
              className="developer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={developer.photo}
                alt={developer.name}
                className="devProfilePic"
              />
              <h2 className="devName">{developer.name}</h2>
              <div className="social-links">
                <a href={`mailto:${developer.email}`}>
                  <FontAwesomeIcon icon={faEnvelope} beatFade size="lg" style={{color: "#ffffff",}} />
                </a>
                <a
                  href={`https://github.com/${developer.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} flip size="lg" style={{ color: "#ffffff" }}/>
                </a>
                <a
                  href={`https://linkedin.com/in/${developer.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} shake size="lg" style={{ color: "#ffffff" }}/>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
