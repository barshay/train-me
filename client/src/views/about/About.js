import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <div>Hello-Users</div> */}
      <div className="about">
        <div>
          <p>
            Hello,
            <br />Our names are Shay Barnea and Evyatar Hale, and we are a students in GO-CODE
            <br />Academy as part of Full Stack Web Development course.
          </p>
          <p>
            As part of our final project we built a system,
            which mediates between physical training coaches and clients interested in these services,<br />
            It allows trainers to create, edit and delete their courses, and clients to view and register for these courses.
          </p>
          <p>
            A lot of effort was given to this project, which is a product of 2 months of hard work that has taught us a lot.
            <br />Enjoy!
          </p>
        </div>
        <button className="go_back_button" onClick={() => navigate("/")}>Go Back</button>
      </div>
    </>
  )
}

export default About


