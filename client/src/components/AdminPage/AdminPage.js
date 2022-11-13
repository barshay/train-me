import React, { useContext, useEffect, useState } from 'react';
import './AdminPage.css';
import '../../customHooks/Loading.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';
import { Marginer } from '../marginer';
import axios from 'axios';
import '../trainerPage/UpdateModal.css';


const AdminPage = ({ loading, setLoading, adminAvatar }) => {
  const [contactCardExist, setContactCardExist] = useState(true);
  const [customerCardExist, setCustomerCardExist] = useState(true);
  const [trainerCardExist, setTrainerCardExist] = useState(true);
  const [coursesCardExist, setCoursesCardExist] = useState(true);
  const [courseTrainerData, setCourseTrainerData] = useState([]);
  const [customersModal, setCustomersModal] = useState(false);
  const [courseCustomerData, setCourseCustomerData] = useState([]);


  const [contactUsEmpty, setContactUsEmpty] = useState(false);
  const [customersCardEmpty, setCustomersCardEmpty] = useState(false);
  const [trainersCardEmpty, setTrainersCardEmpty] = useState(false);
  const [coursesCardEmpty, setCoursesCardEmpty] = useState(false);
  const [contactMessageFlag, setContactMessageFlag] = useState(false);
  const [customerMessageFlag, setCustomerMessageFlag] = useState(false);
  const [trainerMessageFlag, setTrainerMessageFlag] = useState(false);
  const [coursesMessageFlag, setCoursesMessageFlag] = useState(false);

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

  useEffect((id) => {
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

  const getCoursesApiAnswer = async () => {
    try {
      const allCoursesUrl = 'http://localhost:8000/course';
      const response = await axios.get(allCoursesUrl);
      console.log(response);
      const data = await response.data;
      setCoursesData(data);

      // try {
      const allTrainersUrl = 'http://localhost:8000/trainer';
      const response2 = await axios.get(allTrainersUrl);
      console.log(response);
      const data2 = await response2.data;
      // for (const i in data) {
      //   if (data[i]._id === id) {
      setCourseTrainerData(data2);
      console.log("courseTrainerData", courseTrainerData);
      // }
      // }
      // } catch (err) {
      //   console.log("error in 'getCoursesApiAnswer' ", err);
      // }


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

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getCourseCustomersData = async () => {
    try {
      const allCustomersUrl = "http://localhost:8000/customer";
      const response = await axios.get(allCustomersUrl);
      console.log(response);
      const data = await response.data;
      setCourseCustomerData(data);
      setCustomersModal(!customersModal);

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

  return (
    <>
      {loading &&
        <section className="smooth spinner" >{ }</section>
      }
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
              || (trainersData.length > 0 || trainerMessageFlag)
              || coursesData.length > 0 || coursesMessageFlag) ? "allCards-container" : 'admin-image-home-container'}`
          }
        >
          {contactUsEmpty &&
            [<div className="cardEmpty-message">There are not Contact messages!</div>,
            <span className="close-message" onClick={closeMessageHandler}>✖</span>]
          }
          {!contactCardExist &&
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
            coursesData.map((item) =>
              <div key={item._id} className="card-container">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Img courseAvatar={item.picture.public_id} alt="Course avatar"></Img>
                </div>
                <Marginer direction="vertical" margin="0.5em" />
                <div className="titles">Name: <span className="items">{item.name}</span></div>
                <div className="titles">Category: <span className="items">{item.category}</span></div>
                <div className="titles">Description: <span className="items">{item.description}</span></div>
                <div className="titles">Lesson Time: <span className="numeric-items" >{item.lessontime} Minutes</span></div>
                <div className="titles">Cost: <span className="numeric-items">{item.cost}</span></div>
                <div className="titles courseTrainer-title">Trainer
                  {
                    courseTrainerData.map((trainer) => {
                      if (trainer._id === item.trainer) {
                        return (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <span style={{ fontSize: "15px", color: "black" }}>{trainer.firstname + " " + trainer.lastname}</span>
                            <Img courseTrainerAvatar={trainer.profilepic.public_id} alt="Trainer avatar"></Img>
                          </div>
                        )
                      }
                    })
                  }
                  <Marginer direction="vertical" margin="0.5em" />
                  <span className="items">
                    <div
                      style={{
                        display: "flex",
                        color: "#334598",
                        fontSize: "14px",
                        paddingBottom: "0.5em",
                        paddingTop: "0.3em",
                        justifyContent: "center"
                      }}
                    >Trainer ID:</div>
                    {item.trainer}
                  </span>
                </div>
                <div className="titles courseCustomer-title">Customers
                  {item.customers.length === 0 ?
                    <div className="numeric-items" >Amount: {item.customers.length} </div> :
                    [
                      <div className="course-customer-length" > {item.customers.length}
                      </div>,
                      <button className="course-customer-btn" onClick={getCourseCustomersData}>View Customers</button>,
                      customersModal &&
                      <div className="modal" >
                        <div className="overlay-customers" onClick={getCourseCustomersData}></div>
                        <div className="modal-customer-container" >
                          {
                            [
                              console.log("all customers: ", item.customers),
                              courseCustomerData && courseCustomerData.map((customerData) => {
                                {
                                  return (item.customers.map((customer, index) => {
                                    return (customer === customerData._id) &&
                                      (
                                        // console.log("customer: ", customer),
                                        // console.log("customerData: ", customerData._id),
                                        <div key={index} className="customers-modal-card">
                                          <span style={{ fontSize: "15px", color: "white" }}>{customerData.firstname + " " + customerData.lastname}</span>
                                          <Img customersDisplayAvatar={customerData.profilepic.public_id} alt="Customer avatar"></Img>
                                        </div>)
                                  }))
                                }
                              })
                            ]
                          }
                        </div>
                      </div>

                    ]
                  }
                </div>
                <Marginer direction="vertical" margin="0.5em" />
                {/* <button onClick={() => { deleteCourseById(item._id) }} className="item-btn">Remove Course</button> */}
              </div>
            )
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
            <button onClick={closeCoursesPageHandler} className="close-card-btn users-close-btn"></button>
            <p className="amount-container">Courses Amount:
              <span className="amount-item">{coursesData.length}</span>
            </p>
          </div>
        }
      </div>

    </>
  )
}

export default AdminPage