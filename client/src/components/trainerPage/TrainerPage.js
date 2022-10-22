import React, { useContext, useState, useRef } from 'react';
import './TrainerPage.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';
import { Marginer } from '../marginer';
import axios from 'axios';

const TrainerPage = ({ trainerAvatar }) => {
  const { trainerName, trainerID } = useContext(MyContext);
  const [mandatoryErrors, setMandatoryErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [lessonTime, setLessonTime] = useState('');
  const [cost, setCost] = useState('');

  let inputFileRef = useRef(null);

  const handlePictureChange = (e) => {
    inputFileRef = e.target.value;
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      previewFiles(file);
    }
  }

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPicture(reader.result);
      console.log("image: " + reader.result);
    }
  }



  let isValid = true;
  const handleSubmitCourseAdding = (e) => {
    e.preventDefault();
    let errorsConsole = {};
    setErrors([]);
    setMandatoryErrors([]);
    if ((name && name.length < 2) || name.length > 20) {
      setErrors(prevState => ({
        ...prevState,
        [name]: "this is redundant" // I need better way to show the error.
      }));
      isValid = false;
      errorsConsole.name = "Name must be in a range of 2-20 characters!";
      console.log("errors" + errors.name);
    } else if (!name) {
      setMandatoryErrors(prev => [...prev, 'Name feild is mandatory!']);
      isValid = false;
      errorsConsole.name = "Name feild is mandatory!";
    }
    if ((category && category.length < 2) || category.length > 20) {
      isValid = false;
      setErrors(prevState => ({
        ...prevState,
        [category]: "category must be in a range of 2-20 characters!"
      }));
      errorsConsole.lastName = "category must be in a range of 2-10 characters!";
    } else if (!category) {
      isValid = false;
      let updatedValue = {};
      updatedValue = { "category": "category feild is mandatory!" };
      setMandatoryErrors(prevState => ({
        ...prevState,
        ...updatedValue
      }));
      errorsConsole.category = "category feild is mandatory!";
    }
    if ((description && description.length < 10) || description.length > 60) {
      isValid = false;
      setErrors(prevState => ({
        ...prevState,
        [description]: "description must be in a range of 10-60"
      }));
      errorsConsole.description = "description must be in a range of 10-60";
    } else if (!description) {
      isValid = false;
      setMandatoryErrors(prevState => ({
        ...prevState,
        [description]: "description feild is mandatory!"
      }));
      errorsConsole.description = "description feild is mandatory!";
    };
    if (!picture) {
      isValid = false;
      errorsConsole.picture = "Picture feild is mandatory!";
      setMandatoryErrors(prevState => ({
        ...prevState,
        [picture]: "Picture feild is mandatory!"
      }));
    };
    if ((lessonTime && lessonTime < 15) || lessonTime > 90) {
      isValid = false;
      setErrors(prevState => ({
        ...prevState,
        [lessonTime]: "lesson time must be in the range of 15-90 minutes!"
      }));
      errorsConsole.lessonTime = "lesson time must be in the range of 15-90 minutes!"
    } else if (!lessonTime) {
      isValid = false;
      setMandatoryErrors(prevState => ({
        ...prevState,
        [lessonTime]: "lesson time feild is mandatory!"
      }));
      errorsConsole.lessonTime = "lesson time feild is mandatory!";
    };
    if ((cost && cost < 0) || cost > 150) {
      console.log("cost ", cost);
      isValid = false;
      setErrors(prevState => ({
        ...prevState,
        [cost]: "price must be in a range of 0-150!"
      }));
      errorsConsole.cost = "price must be lower than 150!"
      console.log("cost first if", cost);

    }
    else if (!cost) {
      console.log("cost ", cost);
      isValid = false;
      setMandatoryErrors(prevState => ({
        ...prevState,
        [cost]: "price feild is mandatory!"
      }));
      errorsConsole.cost = "price feild is mandatory!";
    };

    if (!isValid) {
      console.log('form isn\'t valid!!');
      errorsConsole.isValid = "form isn't valid!!";
      console.warn(errorsConsole);
      return;
    };
    isValid = true;

    const courseToAddToDB = {
      name,
      category,
      description,
      picture,
      lessontime: lessonTime,
      cost,
      trainer: trainerID
    };

    setName('');
    setCategory('');
    setDescription('');
    setPicture('');
    setLessonTime('');
    setCost('');


    axios({
      method: 'post',
      url: "http://localhost:8000/course",
      headers: { 'content-type': 'application/json' },
      data: courseToAddToDB
    }).then((res) => {
      console.log('Posting a New Course ', res.data);
      setSubmitted(true);

      const uploadedImg = res.data.cloImageResult;
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleCoursePopup = () => {
    setShowPopup(false);
  }

  const closePostCourseHandler = () => {
    setShowPopup(true);
  }

  return (
    <>
      <div className="trainer-page-container">
        {showPopup && <div className="trainer-image-home-container"></div>}
        {!showPopup &&
          <div className="popup-container">
            <button className="close-postCourse-btn" onClick={() => { closePostCourseHandler(); setSubmitted(false); }}>{ }</button>
            <form className="postCourse-popup">
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "2.5em" }}>
                <div className="popup-labels">
                  <input
                    className="popupForm-field"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }} />
                  {mandatoryErrors[name] ?
                    <span className="error-span">
                      Name field is mandatory!
                    </span> : ''
                  }
                  {errors[name] ?
                    <span className="error-span">
                      Name must be in a range of 2 - 20 characters!
                    </span> : ''
                  }

                  <input
                    className="popupForm-field"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }} />
                  {mandatoryErrors[category] ?
                    <span style={{ fontSize: "12px", color: "red" }}>
                      Category feild is mandatory!
                    </span> : ''
                  }
                  {errors[category] ?
                    <span className="error-span">
                      Category must be in a range of 2 - 20 characters!
                    </span> : ''
                  }

                  <input
                    className="popupForm-field"
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }} />
                  {mandatoryErrors[description] ?
                    <span style={{ fontSize: "12px", color: "red" }}>
                      Description feild is mandatory!
                    </span> : ''
                  }
                  {errors[description] ?
                    <span className="error-span">
                      Description must be in a range of 10- 60 characters!
                    </span> : ''
                  }
                </div>
                <div className="popup-labels">
                  <input
                    className="popupForm-field"
                    type="number"
                    placeholder="Lesson Time"
                    value={lessonTime}
                    onChange={(e) => { setLessonTime(e.target.value) }} />
                  {mandatoryErrors[lessonTime] ?
                    <span style={{ fontSize: "12px", color: "red" }}>
                      Lesson Time feild is mandatory!
                    </span> : ''
                  }
                  {errors[lessonTime] ?
                    <span className="error-span">
                      Lesson Time must be in the range of 15-90 minutes!
                    </span> : ''
                  }

                  <input
                    className="popupForm-field"
                    type="number"
                    placeholder="Price"
                    value={cost}
                    onChange={(e) => { setCost(e.target.value) }} />
                  {mandatoryErrors[cost] ?
                    <span style={{ fontSize: "12px", color: "red" }}>
                      Price feild is mandatory!
                    </span> : ''
                  }
                  {errors[cost] ?
                    <span style={{ fontSize: "12px", color: "red" }}>
                      price must be in a range of 0-150!
                    </span> : ''
                  }
                  {/* <span style={{ fontSize: '12px', textDecoration: 'underLine', color: 'gray' }}>Upload your picture here:</span> */}
                  <input
                    className="file-field "
                    type="file"
                    placeholder="Picture"
                    value={picture}
                    onChange={(e) => { setPicture(e.target.value) }} />
                  {mandatoryErrors[picture] ?
                    <span className="error-span">
                      Picture feild is mandatory!
                    </span> : ''
                  }
                </div>
              </div>
              {submitted &&
                <span className="success-posting">
                  Success! Course was added successfully.
                </span>
              }
              <button
                className="btn-popup"
                type="submit" onClick={(handleSubmitCourseAdding)}>
                Upload course
              </button>
            </form>
          </div>
        }


        <div className="trainer-actions-container">
          {trainerName &&
            <div style={{ display: "flex" }}>
              <div style={{ display: "block" }}>
                <span style={{ color: "blue", fontSize: "14px" }}>Welcome</span>
                <div style={{ overflow: "scroll", display: "table-caption" }}>{trainerName}</div>
              </div>
              {trainerAvatar &&
                <Img trainerAvatar={trainerAvatar} alt="Trainer avatar"></Img>
              }
            </div>}
          <Marginer direction="vertical" margin="1em" />
          <div style={{ marginLeft: "2em" }}>
            <button className="trainer-actions-btn" onClick={() => handleCoursePopup()} >
              Add a new Course
            </button>
            {/* <p>{trainerID}</p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default TrainerPage