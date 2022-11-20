import React, { useContext, useEffect, useState } from 'react';
import './AdminPage.css';
import '../../customHooks/Loading.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';
import { Marginer } from '../marginer';
import axios from 'axios';
import '../trainerPage/UpdateModal.css';


const AdminPage = ({ loading, setLoading, adminAvatar }) => {
  // setLoading(false);
  const [contactCardExist, setContactCardExist] = useState(true);
  const [customerCardExist, setCustomerCardExist] = useState(true);
  const [trainerCardExist, setTrainerCardExist] = useState(true);
  const [coursesCardExist, setCoursesCardExist] = useState(true);
  const [courseTrainerData, setCourseTrainerData] = useState([]);
  const [customersModal, setCustomersModal] = useState(false);
  const [courseCustomersData, setCourseCustomersData] = useState([]);

  const [contactUsEmpty, setContactUsEmpty] = useState(false);
  const [customersCardEmpty, setCustomersCardEmpty] = useState(false);
  const [trainersCardEmpty, setTrainersCardEmpty] = useState(false);
  const [coursesCardEmpty, setCoursesCardEmpty] = useState(false);
  const [contactMessageFlag, setContactMessageFlag] = useState(false);
  const [customerMessageFlag, setCustomerMessageFlag] = useState(false);
  const [trainerMessageFlag, setTrainerMessageFlag] = useState(false);
  const [coursesMessageFlag, setCoursesMessageFlag] = useState(false);
  const [toggleFilteredCourses, setToggleFilteredCourses] = useState(true);

  const {
    adminName,
    customersData,
    setCustomersData,
    trainersData,
    setTrainersData,
    contactUsData,
    setContactUsData,
    coursesData,
    setCoursesData
  } = useContext(MyContext);

  useEffect(() => {
    contactUsData.length > 0 && setContactCardExist(false);
    (contactUsData.length === 0 && contactMessageFlag) && setContactUsEmpty(true);

    customersData.length > 0 && setCustomerCardExist(false);
    (customersData.length === 0 && customerMessageFlag) && setCustomersCardEmpty(true);

    trainersData.length > 0 && setTrainerCardExist(false);
    (trainersData.length === 0 && trainerMessageFlag) && setTrainersCardEmpty(true);

    coursesData.length > 0 && setCoursesCardExist(false);
    (coursesData.length === 0 && coursesMessageFlag) && setCoursesCardEmpty(true);

  }, [contactUsData, customersData, trainersData, coursesData])

  const getContactUsApiAnswer = async () => {
    setLoading(true);
    console.log("courseTrainerData: ", courseTrainerData);
    try {
      const contactUsUrl = 'http://localhost:8000/contactUs';
      const response = await axios.get(contactUsUrl);
      console.log(response);
      const data = await response.data;
      setContactUsData(data);
      setContactCardExist(true);
      setContactMessageFlag(true);

      setCustomersData([]);
      setCustomerCardExist(true);
      setCustomersCardEmpty(false);
      setCustomerMessageFlag(false);

      setTrainersData([]);
      setTrainersCardEmpty(false);
      setTrainerCardExist(true);
      setTrainerMessageFlag(false);

      setCoursesData([]);
      setCoursesCardExist(true);
      setCoursesCardEmpty(false);
      setCoursesMessageFlag(false);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const closeContactPageHandler = () => {
    setContactCardExist(true);
    setContactUsData([]);
    setContactMessageFlag(false);
  }

  const deleteAllContactHandler = async () => {
    try {
      const contactUsUrl = 'http://localhost:8000/contactUs';
      const response = await axios.delete(contactUsUrl);
      console.log(response);
      const data = await response.data;
      setContactUsData(data);
      setContactUsEmpty(true);
      setContactCardExist(true);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteContactById = async (id) => {
    try {
      console.log(id);
      const contactUsUrl = `http://localhost:8000/contactUs/${id}`;
      const response = await axios.delete(contactUsUrl);
      console.log(response);
      getContactUsApiAnswer();
    } catch (error) {
      console.log(error);
    }
  }

  const getTrainersApiAnswer = async () => {
    setLoading(true);
    try {
      const allTrainersUrl = 'http://localhost:8000/trainer';
      const response = await axios.get(allTrainersUrl);
      console.log(response);
      const data = await response.data;
      setTrainersData(data);
      setTrainerMessageFlag(true);
      setTrainerCardExist(true);

      setContactUsData([]);
      setContactCardExist(true);
      setContactUsEmpty(false);
      setContactMessageFlag(false);

      setCustomersData([]);
      setCustomerCardExist(true);
      setCustomersCardEmpty(false);
      setCustomerMessageFlag(false);

      setCoursesData([]);
      setCoursesCardExist(true);
      setCoursesCardEmpty(false);
      setCoursesMessageFlag(false);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  const closeTrainerPageHandler = () => {
    setTrainerCardExist(true);
    setTrainersData([]);
    setTrainerMessageFlag(false);
  }

  const deleteTrainerById = async (id) => {
    try {
      console.log(id);
      const contactUsUrl = `http://localhost:8000/trainer/${id}`;
      const response = await axios.delete(contactUsUrl);
      console.log(response);
      getTrainersApiAnswer();
    } catch (error) {
      console.log(error);
    }
  }

  const getCustomersApiAnswer = async () => {
    setLoading(true);
    try {
      const allCustomersUrl = "http://localhost:8000/customer";
      const response = await axios.get(allCustomersUrl);
      console.log(response);
      const data = await response.data;
      setCustomersData(data);
      setCustomerCardExist(true);
      setCustomerMessageFlag(true);

      setContactUsData([])
      setContactCardExist(true);
      setContactUsEmpty(false);
      setContactMessageFlag(false);

      setTrainersData([]);
      setTrainerCardExist(true);
      setTrainersCardEmpty(false);
      setTrainerMessageFlag(false);

      setCoursesData([]);
      setCoursesCardExist(true);
      setCoursesCardEmpty(false);
      setCoursesMessageFlag(false);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const closeCustomerPageHandler = () => {
    setCustomerCardExist(true);
    setCustomersData([]);
    setCustomerMessageFlag(false);
  }

  const deleteCustomerById = async (id) => {
    try {
      console.log(id);
      const contactUsUrl = `http://localhost:8000/customer/${id}`;
      const response = await axios.delete(contactUsUrl);
      console.log(response);
      getCustomersApiAnswer();
    } catch (error) {
      console.log(error);
    }
  }

  const CommonDefinitionForCourses = () => {
    setCoursesCardExist(true);
    setCoursesMessageFlag(true);

    setContactUsData([])
    setContactCardExist(true);
    setContactUsEmpty(false);
    setContactMessageFlag(false);

    setTrainersData([]);
    setTrainerCardExist(true);
    setTrainersCardEmpty(false);
    setTrainerMessageFlag(false);

    setCustomersData([]);
    setCustomerCardExist(true);
    setCustomersCardEmpty(false);
    setCustomerMessageFlag(false);
  }

  const getCoursesApiAnswer = async () => {
    setLoading(true);
    try {
      const allCoursesUrl = 'http://localhost:8000/course/admincourses';
      const response = await axios.get(allCoursesUrl);
      // console.log(response);
      const data = await response.data;
      // console.log("data: ", data);
      setCoursesData(data[0]);
      // console.log("coursesData: ", coursesData);
      setCourseTrainerData(data[1]);
      // console.log("CourseTrainerData: ", courseTrainerData);

      CommonDefinitionForCourses();

      if (!toggleFilteredCourses) {
        setToggleFilteredCourses(!toggleFilteredCourses)
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getCourseCustomersData = async (courseItems) => {
    setLoading(true);
    axios({
      method: 'post',
      url: "http://localhost:8000/course/courseCustomers",
      headers: { 'content-type': 'application/json' },
      data: courseItems
    }).then((res) => {
      console.log('Fetching customers ', res.data);
      setCourseCustomersData(res.data);
      setCustomersModal(!customersModal);
    }).catch((error) => {
      console.log(error);
    });
  }

  const FilteredCoursesWithCustomers = async () => {
    try {
      const allCoursesUrl = 'http://localhost:8000/course/admincourses';
      const response = await axios.get(allCoursesUrl);
      // console.log(response);
      const data = await response.data;

      const filteredCourses = []
      data[0].map((course) => {
        if (course.customers.length > 0) {
          filteredCourses.push(course);
        }
      })
      setCoursesData(filteredCourses);
      // console.log("coursesData: ", coursesData);
      setCourseTrainerData(data[1]);
      // console.log("CourseTrainerData: ", courseTrainerData);

      CommonDefinitionForCourses();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const closeCoursesPageHandler = () => {
    setCoursesCardExist(true);
    setCoursesData([]);
    setCoursesMessageFlag(false);
  }

  const closeMessageHandler = () => {
    setCoursesMessageFlag(false);
    setCoursesCardEmpty(false);
    setContactMessageFlag(false);
    setContactUsEmpty(false);
    setCustomersCardEmpty(false);
    setCustomerMessageFlag(false);
    setTrainersCardEmpty(false);
    setTrainerMessageFlag(false);
  }

  const toggleModal = () => {
    setCustomersModal(!customersModal);
  }

  const toggleFilteredCoursesModal = () => {
    // console.log("Before: ", toggleFilteredCourses)
    // setToggleFilteredCourses(!toggleFilteredCourses);
    // console.log("After: ", toggleFilteredCourses)
    if (toggleFilteredCourses == true) {
      console.log("true-get filtered courses");
      setLoading(true);
      FilteredCoursesWithCustomers();
      setToggleFilteredCourses(!toggleFilteredCourses);
    } else {
      console.log("false-get all courses");
      setLoading(true);
      getCoursesApiAnswer();
      setToggleFilteredCourses(!toggleFilteredCourses);
    }
  }

  return (
    <>
      <div className="admin-page-container">
        <div className="admin-actions-container">
          {adminName &&
            <div style={{ display: "flex" }}>
              <div style={{ display: "block" }}>
                <span style={{ color: "red", fontSize: "14px" }}>Welcome</span>
                <div style={{ overflow: "scroll", display: "table-caption" }}>{adminName}</div>
              </div>
              {adminAvatar &&
                <Img adminAvatar={adminAvatar} alt="Admin avatar"></Img>
              }
            </div>}
          <Marginer direction="vertical" margin="1em" />

          <div style={{ width: "12em" }}>
            <button className="actions-btn" onClick={() => getContactUsApiAnswer()}>
              Contact Us messages
            </button>
            {/* </div>
          <div > */}
            <button className="actions-btn" onClick={() => getCustomersApiAnswer()}>
              List of Customers
            </button>
            {/* </div>
          <div > */}
            <button className="actions-btn" onClick={() => getTrainersApiAnswer()}>
              List of Trainers
            </button>
            {/* </div>
          <div> */}
            <button className="actions-btn" onClick={() => getCoursesApiAnswer()}>
              List of Courses
            </button>
          </div>
        </div>

        <div
          className={
            `${((contactUsData.length > 0 || contactMessageFlag)
              || (customersData.length > 0 || customerMessageFlag)
              || (trainersData.length > 0 || trainerMessageFlag)) ?
              "allCards-container" :
              (coursesData.length > 0 || coursesMessageFlag) ?
                'allAdminCoursesCards-container' :
                'admin-image-home-container'}`
          }
        >
          {contactUsEmpty &&
            [
              <div className="cardEmpty-message">There are not Contact messages!</div>,
              <span className="close-message" onClick={closeMessageHandler}>✖</span>
            ]
          }
          {!contactCardExist &&
            [
              loading && <section className="smooth spinner" >{ }</section>,
              contactUsData.map((item) =>
                <div key={item._id} className="card-container">
                  <div className="titles">First Name: <span className="items">{item.firstname}</span></div>
                  <div className="titles">Last Name: <span className="items">{item.lastname}</span></div>
                  <div className="titles">Email: <span className="numeric-items">{item.email}</span></div>
                  <div className="titles">Phone: <span className="numeric-items">{item.phone}</span></div>
                  <div className="titles">Message Title: <span className="items">{item.messagetitle}</span></div>
                  <div className="titles">Message: <span className="items">{item.message}</span></div>
                  <div className="titles">Gender: <span className="items">{item.gender}</span></div>
                  <div className="titles">Contact Method: <span className="items">{item.contactmethod}</span></div>
                  <div className="titles">Date Created: <span className="items">{item.createdat}</span></div>
                  <Marginer direction="vertical" margin="0.5em" />
                  <button onClick={() => { deleteContactById(item._id) }} className="item-btn">Remove Item</button>
                </div>
              )
            ]
          }

          {customersCardEmpty &&
            [<div className="cardEmpty-message">There are not Customers!</div>,
            <span className="close-message" onClick={closeMessageHandler}>✖</span>]
          }
          {!customerCardExist &&
            customersData.map((item) =>
              <div key={item._id} className="card-container">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Img customersDisplayAvatar={item.profilepic.public_id} alt="Customer avatar"></Img>
                </div>
                <Marginer direction="vertical" margin="0.5em" />
                <div className="titles">First Name: <span className="items">{item.firstname}</span></div>
                <div className="titles">Last Name: <span className="items">{item.lastname}</span></div>
                <div className="titles">Email: <span className="numeric-items">{item.email}</span></div>
                <div className="titles">Phone: <span className="numeric-items">{item.phone}</span></div>
                <div className="titles">Age: <span className="numeric-items">{item.age}</span></div>
                <div className="titles">Gender: <span className="items">{item.gender}</span></div>
                <Marginer direction="vertical" margin="0.5em" />
                <button onClick={() => { deleteCustomerById(item._id) }} className="item-btn">Remove Customer</button>
              </div>
            )
          }

          {trainersCardEmpty &&
            [<div className="cardEmpty-message">There are not Trainers!</div>,
            <span className="close-message" onClick={closeMessageHandler}>✖</span>]
          }
          {!trainerCardExist &&
            trainersData.map((item) =>
              <div key={item._id} className="card-container">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Img trainersDisplayAvatar={item.profilepic.public_id} alt="Trainer avatar"></Img>
                </div>
                <Marginer direction="vertical" margin="0.5em" />
                <div className="titles">First Name: <span className="items">{item.firstname}</span></div>
                <div className="titles">Last Name: <span className="items">{item.lastname}</span></div>
                <div className="titles">Email: <span className="numeric-items">{item.email}</span></div>
                <div className="titles">Phone: <span className="numeric-items">{item.phone}</span></div>
                <div className="titles">Age: <span className="numeric-items">{item.age}</span></div>
                <div className="titles">Gender: <span className="items">{item.gender}</span></div>
                <Marginer direction="vertical" margin="0.5em" />
                <button onClick={() => { deleteTrainerById(item._id) }} className="item-btn">Remove Trainer</button>
              </div>
            )
          }

          {coursesCardEmpty &&
            [<div className="cardEmpty-message">There are not Courses!</div>,
            <span className="close-message" onClick={closeMessageHandler}>✖</span>]
          }

          {(!coursesCardExist && courseTrainerData) &&
            [
              loading && <section className="smooth spinner" >{ }</section>,
              <p className="courses-navbar">Courses Amount:
                <span className="amount-item">{coursesData.length}</span>
                <button
                  className="navbar-btn"
                  onClick={toggleFilteredCoursesModal}
                >{toggleFilteredCourses ? "Courses With Customers" : "All Courses"}</button>
              </p>,
              coursesData.map((item) =>
                <div key={item._id} className="course-card-container">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Img courseAvatar={item.picture.public_id} alt="Course avatar"></Img>
                  </div>
                  <Marginer direction="vertical" margin="0.5em" />
                  <div style={{ display: "flex", flexDirection: "column", width: "7em", padding: "0.5em 0 0 0.8em", justifyContent: "space-evenly" }}>
                    <div className="course-name">{item.name}</div>
                    <div className="course-titles">Category: <span className="items">{item.category}</span></div>
                    <div className="course-titles">Price: <span className="admin-numeric-items">{item.cost} ₪</span></div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", width: "10em", padding: "0.5em 0 0 1em", justifyContent: "space-evenly" }}>
                    <div className="course-titles">Description: <span className="items">{item.description}</span></div>
                    <div className="course-titles">Lesson Time: <span className="admin-numeric-items" >{item.lessontime} Minutes</span></div>
                  </div>
                  <div className="course-titles courseUsers-title">
                    {
                      courseTrainerData.map((trainer, index) => {
                        if (trainer._id === item.trainer) {
                          return (
                            <>
                              <div style={{ display: "flex", flexDirection: "row" }}>
                                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                  <span style={{ paddingBottom: "0.3em", fontFamily: "Lucida Sans" }}>Trainer</span>
                                  <Img courseTrainerAvatar={trainer.profilepic.public_id} alt="Trainer avatar"></Img>
                                </div>
                                <div style={{ display: "block", alignItems: "center", marginLeft: "0.5em" }}>
                                  <div style={{ fontSize: "15px", color: "whitesmoke", marginBottom: "1em", fontFamily: "Lucida Sans", fontWeight: "bold" }}>{trainer.firstname + " " + trainer.lastname}</div>
                                  <div className="course-trainerDetails">
                                    <span style={{ color: "#334598" }}>ID:</span>
                                    <span style={{ fontSize: "12px", color: "white" }}>{trainer._id}</span>
                                    <div style={{ color: "#334598" }}> Rate:
                                      {trainer.rating.rate}
                                    </div>
                                    <div style={{ color: "#334598" }}>Count:
                                      {trainer.rating.count}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        }
                      })
                    }
                    <Marginer direction="vertical" margin="0.5em" />

                    <div className="courseCustomer-title">Customers
                      {item.customers.length === 0 ?
                        <div className="course-customer-length"
                          style={{ color: "rgb(226, 98, 98)" }}
                        > {item.customers.length} </div> :
                        [
                          <div
                            className="course-customer-length"
                            style={{ borderRadius: "50%", color: "rgb(54, 169, 71)" }}
                          > {item.customers.length}
                          </div>,
                          <button
                            className="course-customer-btn"
                            onClick={() => { getCourseCustomersData(item.customers) }}
                          >View Customers
                          </button>,
                          (customersModal && courseCustomersData) &&
                          <div className="modal" >
                            <div className="overlay-customers" onClick={toggleModal}></div>
                            <div className="modal-customer-container" >
                              {
                                courseCustomersData.map((customerData, index) => {
                                  return (
                                    <div key={index} className="customers-modal-card">
                                      <span style={{ fontSize: "15px", color: "white" }}>{customerData.firstname + " " + customerData.lastname}</span>
                                      <Img customersDisplayAvatar={customerData.profilepic.public_id} alt="Customer avatar"></Img>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        ]
                      }
                    </div>

                  </div>

                  {/* <button onClick={() => { deleteCourseById(item._id) }} className="item-btn">Remove Course</button> */}
                </div>
              )
            ]
          }
        </div>

        {(!contactCardExist) &&
          <div style={{ display: "block", flexDirection: "row" }}>
            <button onClick={closeContactPageHandler} className="close-card-btn"></button>
            <button onClick={deleteAllContactHandler} className="deleteAllCards-btn">Delete All</button>
            <p className="amount-container">Contact Amount:
              <span className="amount-item">{contactUsData.length}</span>
            </p>
          </div>
        }

        {(!customerCardExist) &&
          <div >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={closeCustomerPageHandler} className="close-card-btn users-close-btn"></button>
            </div>
            <p className="amount-container">Customers Amount:
              <span className="amount-item">{customersData.length}</span>
            </p>
          </div>
        }

        {(!trainerCardExist) &&
          <div>
            <button onClick={closeTrainerPageHandler} className="close-card-btn users-close-btn"></button>
            <p className="amount-container">Trainers Amount:
              <span className="amount-item">{trainersData.length}</span>
            </p>
          </div>
        }

        {(!coursesCardExist) &&
          <div>
            <button
              onClick={closeCoursesPageHandler}
              className="close-card-btn users-close-btn"
            ></button>
          </div>
        }
      </div>

    </>
  )
}

export default AdminPage





