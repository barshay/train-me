import React, { useContext, useState, useRef } from 'react';
import './TrainerPage.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';
import { Marginer } from '../marginer';
import axios from 'axios';
import { FileInput, PreviewPicture } from './styledHelper';
import UpdateModal from './UpdateModal';
import './UpdateModal.css';

const TrainerPage = ({ trainerAvatar }) => {
  const { trainerName, trainerID } = useContext(MyContext);

  const [mandatoryErrors, setMandatoryErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showTrainerHomePage, setShowTrainerHomePage] = useState(true);
  const [postCoursePage, setPostCoursePage] = useState(false);
  const [myCoursesPage, setMyCoursesPage] = useState(false);
  const [filteredCoursesArr, setFilteredCoursesArr] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [toggleFiltered, setToggleFiltered] = useState(false);
  const [isDataExist, setIsDataExist] = useState(false);
  const [customersData, setCustomersData] = useState([]);
  const [customersModal, setCustomersModal] = useState(false);

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
    console.log(e.target.value);
    if ((name && name.length < 2) || name.length > 20) {
      isValid = false;
      setErrors(prevState => ({
        ...prevState,
        [name]: "this is redundant" // I need better way to show the error.
      }));
      errorsConsole.name = "Name must be in a range of 2-20 characters!";
      console.log("errors" + errors.name);
    } else if (!name) {
      setMandatoryErrors(prevState => ({ ...prevState, [name]: 'Name feild is mandatory!' }));
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
      setMandatoryErrors(prevState => ({ ...prevState, [category]: 'category feild is mandatory!' }));
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
      pictureToDB: picture,
      lessontime: lessonTime,
      cost,
      trainer: trainerID,
      date: Date.now(),
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
      resetFileInput(e);
      // const uploadedImg = res.data.cloImageResult;
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleCoursePopup = () => {
    setPostCoursePage(true);
    setShowTrainerHomePage(false);
    setMyCoursesPage(false);
    setIsDataExist(false);
  }

  const closePostCourseHandler = () => {
    setShowTrainerHomePage(true);
    setSubmitted(false);
    setPostCoursePage(false);
    setPicture('');
    setName('');
    setCategory('');
    setDescription('');
    setPicture('');
    setLessonTime('');
    setCost('');
    setErrors([]);
    setMandatoryErrors([]);
  }

  /**
       👇️ Reset the input value of the file after sending, 
       to avoid errors when uploading the file a second time
    */
  const resetFileInput = (e) => {
    e.preventDefault();
    if (inputFileRef.current.value !== null) {
      inputFileRef.current.value = null;
    }
  };

  let filteredCoursesByTrainerId = {};
  let filteredArr = [];
  const getAllCoursesHandle = async () => {

    if (isDataExist) {
      console.log("return");
      return;
    };

    // console.log(trainerID);
    // axios({
    //   method: 'post',
    //   url: "http://localhost:8000/course/courseById",
    //   headers: { 'content-type': 'application/json' },
    //   data: trainerID
    // }).then((res) => {
    //   console.log(res.data);

    // })
    //   .catch((err) => {
    //     console.log(err);
    //   })

    // axios.get('http://localhost:8000/course', {
    //   params: {
    //     ID: trainerID
    //   }
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   })

    try {
      const allCoursesUrl = 'http://localhost:8000/course';
      const response = await axios.get(allCoursesUrl);
      console.log(response);
      const data = await response.data;

      for (const i in data) {
        if (data[i].trainer === trainerID) {
          // console.log(trainerID);
          filteredCoursesByTrainerId[i] = data[i];
          filteredArr.push(filteredCoursesByTrainerId[i]);
        }
      }
      setIsDataExist(true)
      setFilteredCoursesArr(filteredArr);
      // console.log(filteredCoursesByTrainerId);
      // console.log(filteredArr);
      // console.log(filteredCoursesArr);
      setPostCoursePage(false);
      setShowTrainerHomePage(false);
      setMyCoursesPage(true);
    } catch (error) {
      console.log(error);
    }
  }

  const closeCoursesPage = () => {
    setShowTrainerHomePage(true);
    setMyCoursesPage(false);
    setToggleFiltered(false);
    setFilteredCourses([]);
    setIsDataExist(false);
  }

  const filteredCoursesByExistingCustomer = () => {
    const filtered = [];
    // getAllCoursesHandle();
    // console.log("im in");
    console.log(filteredCoursesArr);
    for (const i in filteredCoursesArr) {
      if (filteredCoursesArr[i].customers.length > 0) {
        filtered.push(filteredCoursesArr[i]);
        setToggleFiltered(true);
      }
    }
    setFilteredCourses(filtered);
    console.log(filteredCourses);
  }

  const unfilteredCourse = () => {
    setToggleFiltered(false);
    setFilteredCourses([]);
  }

  // const toggleData = () => {
  //   setIsDataExist(false);
  //   console.log("isDataExist: ", isDataExist)
  // }

  const removeCourseHandler = async (id) => {
    // toggleData();
    setIsDataExist(false);
    console.log("isDataExist: ", isDataExist);
    // if (!isDataExist) {
    try {
      const deleteCourseUrl = `http://localhost:8000/course/${id}`;
      const response = await axios.delete(deleteCourseUrl);
      console.log(response);
      // const data = await response.data;
      getAllCoursesHandle();
      if (toggleFiltered) {
        filteredCoursesByExistingCustomer();
      }
    } catch (error) {
      console.log(error);
    }
    // }

  }

  const getCourseCustomers = async (customersArr) => {
    try {
      setCustomersData([]);
      console.log("Customers Array: ", customersArr);
      const allCustomersUrl = "http://localhost:8000/customer";
      const response = await axios.get(allCustomersUrl);
      console.log(response);
      let data = await response.data;
      for (let x = 0; x < data.length; x++) {
        for (let y = 0; y < customersArr.length; y++) {
          if (data[x]._id === customersArr[y]) {
            if (!customersData.includes(customersArr[y])) {
              setCustomersData(prevState => ([
                ...prevState,
                data[x]
              ]));
            }
          }
        }
      }
      toggleCustomersModal(!customersModal);
      console.log("Customers Data:  ", customersData);
    } catch (err) {
      console.log(err);
    }
  }

  const toggleCustomersModal = () => {
    setCustomersModal(!customersModal);
  };


  return (
    <>
      <div className="trainer-page-container">
        {showTrainerHomePage && <div className="trainer-image-home-container"></div>}
        {postCoursePage &&
          <div className="popup-container">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: "0.3em" }}>
              <button className="close-postCourse-btn" onClick={() => { closePostCourseHandler(); }}>{ }</button>
              {picture && <PreviewPicture src={picture} alt="course-image"></PreviewPicture>}
            </div>
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
                    placeholder="Lesson Time (minutes)"
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

                  <FileInput
                    ref={inputFileRef}
                    className="file-field "
                    type="file"
                    placeholder="Picture"
                    onChange={(e) => { handlePictureChange(e) }}
                    required
                    accept="image/png, image/jpeg, image/jpg, image/jfif"
                  />
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
                type="submit"
                onClick={(e) => { handleSubmitCourseAdding(e) }}>
                Upload course
              </button>
            </form>
          </div>
        }

        {
          (myCoursesPage && filteredCoursesArr.length === 0) &&
          <div className="message-emptyArr">
            There are not Courses yet!
          </div>
        }
        {
          (filteredCoursesArr.length > 0 && myCoursesPage) &&
          <div className="my-courses-form" >
            <div className="courses-buttons-div">
              <button className="close-postCourse-btn" onClick={() => { closeCoursesPage(); }}>{ }</button>
              <div className="filteredButtons-container">
                {
                  !toggleFiltered
                    ?
                    <button className="filteredButtons" onClick={() => { filteredCoursesByExistingCustomer() }}>Courses with Customers</button>
                    :
                    <button className="filteredButtons" onClick={() => { unfilteredCourse() }}>Unfiltered Courses</button>
                }
              </div>
              <div className="coursesAmount-container">
                Courses Amount
                <span style={{ color: "blue", fontSize: "30px", width: "1em" }}>
                  {filteredCourses.length > 0 ? filteredCourses.length : filteredCoursesArr.length}
                </span>
              </div>
            </div>
            <div className="allCoursesCards-container scroller">
              {
                filteredCourses.length > 0 ?
                  filteredCourses.map((course) =>
                    [
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="courseCard-container" key={course._id}>
                          <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
                            <Img courseAvatar={course.picture.public_id} alt="Course avatar"></Img>
                          </div>
                          <div className="course-title">Name: <span className="item">{course.name}</span></div>
                          <div className="course-title">Category: <span className="item">{course.category}</span></div>
                          <div className="course-title">Description: <span className="item">{course.description}</span></div>
                          <div className="course-title">Lesson time: <span className="numeric-items">{course.lessontime}</span></div>
                          <div className="course-title">Cost: <span className="numeric-items">{course.cost}</span></div>
                          <div className="course-title">Customers:
                            <div className="numeric-items" >Amount: {course.customers.length}
                              {/* <div style={{ color: "#334598" }}>Customer/s ID:</div> */}
                            </div>
                            <button onClick={() => { getCourseCustomers(course.customers) }}>
                              View Customer/s
                            </button>

                            {(customersData && customersModal) &&
                              <div className="modal" >
                                <div onClick={toggleCustomersModal} className="overlay-customers"></div>
                                <div className="modal-customer-container" >
                                  {
                                    customersData.map((customer, index) => [
                                      <div key={index} className="customers-modal-card">
                                        <span style={{ fontSize: "15px", color: "white" }}>{customer.firstname + " " + customer.lastname}</span>
                                        <Img customersDisplayAvatar={customer.profilepic.public_id} alt="Customer avatar"></Img>
                                      </div>
                                    ])
                                  }
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                        <div className="card-actions">
                          <UpdateModal courseId={course._id} />
                          <button className="card-btn" onClick={() => { removeCourseHandler(course._id) }}>Remove</button>
                        </div>
                      </div>
                    ]
                  ) :
                  filteredCoursesArr.map((course) =>
                    [
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="courseCard-container" key={course._id}>
                          <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5em", marginBottom: "0.5em" }}>
                            <Img courseAvatar={course.picture.public_id} alt="Course avatar"></Img>
                          </div>
                          <div className="course-title">Name: <span className="item">{course.name}</span></div>
                          <div className="course-title">Category: <span className="item">{course.category}</span></div>
                          <div className="course-title">Description: <span className="item">{course.description}</span></div>
                          <div className="course-title">Lesson time: <span className="numeric-items">{course.lessontime}</span></div>
                          <div className="course-title">Cost: <span className="numeric-items">{course.cost}</span></div>
                          <div className="course-title">Customers:
                            {course.customers < 1 ?
                              <span className="numeric-items">{course.customers.length}</span>
                              :
                              [
                                <div className="numeric-items" >Amount: {course.customers.length}
                                  {/* <div style={{ color: "#334598" }}>Customer/s ID:</div> */}
                                </div>,
                                // <span>
                                //   {course.customers.map((customer, index) =>
                                //     <div style={{ height: "0.7em", display: "flex" }}>
                                //       <span key={index} className="customers-line">{customer}</span>
                                //     </div>
                                //   )}
                                // </span>
                                <button onClick={() => { getCourseCustomers(course.customers) }}>
                                  View Customer/s
                                </button>,

                                (customersData && customersModal) &&
                                <div className="modal" >
                                  <div onClick={toggleCustomersModal} className="overlay-customers"></div>
                                  <div className="modal-customer-container" >
                                    {
                                      customersData.map((customer, index) => [
                                        <div key={index} className="customers-modal-card">
                                          <span style={{ fontSize: "15px", color: "white" }}>{customer.firstname + " " + customer.lastname}</span>
                                          <Img customersDisplayAvatar={customer.profilepic.public_id} alt="Customer avatar"></Img>
                                        </div>
                                      ])
                                    }
                                  </div>
                                </div>

                              ]}
                          </div>
                        </div>
                        <div className="card-actions">
                          <UpdateModal courseId={course._id} />
                          <button className="card-btn" onClick={() => { removeCourseHandler(course._id) }}>Remove</button>
                        </div>
                      </div>
                    ]
                  )
              }
            </div>
          </div>
        }

        <div className="trainer-actions-container">
          {trainerName &&
            <div style={{ display: "flex" }}>
              <div style={{ display: "block" }}>
                <span style={{ color: "blue", fontSize: "14px" }}>Welcome</span>
                <div style={{ overflow: "hidden", display: "table-caption" }}>{trainerName}</div>
              </div>
              {trainerAvatar &&
                <Img trainerAvatar={trainerAvatar} alt="Trainer avatar"></Img>
              }
            </div>}
          <Marginer direction="vertical" margin="1em" />
          <div style={{ marginLeft: "1em" }}>
            <button className="trainer-actions-btn" onClick={() => { handleCoursePopup() }} >
              Add a new Course
            </button>
            <button className="trainer-actions-btn" onClick={() => { getAllCoursesHandle() }} >
              My Courses
            </button>
            <button className="trainer-actions-btn" onClick={() => { getAllCoursesHandle() }} >
              My Customers
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrainerPage