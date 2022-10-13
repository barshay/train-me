import React, { useContext, useEffect, useState } from 'react';
import './AdminPage.css';
import '../../customHooks/Loading.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';
import { Marginer } from '../marginer';
import axios from 'axios';


const AdminPage = ({ loading, setLoading, adminAvatar }) => {

  const [card, setCard] = useState(true);

  const {
    adminName,
    setCustomersData,
    customersData,
    setTrainersData,
    trainersData,
    contactUsData,
    setContactUsData,
  } = useContext(MyContext);

  useEffect(() => {
    // const getCustomersApiAnswer = async () => {
    //   try {
    //     const customersUrl = 'http://localhost:8000/customer';
    //     const response = await axios.get(customersUrl);
    //     console.log(response)
    //     const data = await response.data;
    //     setCustomersData(data);
    //     // setLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // const getTrainerApiAnswer = async () => {
    //   try {
    //     const trainersUrl = 'http://localhost:8000/trainer';
    //     const response = await axios.get(trainersUrl);
    //     console.log(response)
    //     const data = await response.data;
    //     setTrainersData(data);
    //     // setLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }



    // getTrainerApiAnswer();
    // getCustomersApiAnswer();
  }, [])

  const getContactUsApiAnswer = async () => {
    try {
      const contactUsUrl = 'http://localhost:8000/contactUs';
      const response = await axios.get(contactUsUrl);
      console.log(response);
      const data = await response.data;
      setContactUsData(data);
      setLoading(false);
      setCard(false);
    } catch (error) {
      console.log(error);
    }
  }

  const closeHandler = () => {
    setCard(true);
  }

  const deleteAllContactHandler = async () => {
    try {
      const contactUsUrl = 'http://localhost:8000/contactUs/';
      const response = await axios.delete(contactUsUrl);
      console.log(response);
      const data = await response.data;
      setContactUsData(data);
      setCard(true);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteContactById = async (id) => {
    try {
      console.log(id);
      const contactUsUrl = `http://localhost:8000/contactUs/${id}`;
      const response = await axios.delete(contactUsUrl);
      getContactUsApiAnswer();
      console.log(response);
      const data = await response.data;
      // setContactUsData(data);
    } catch (error) {
      console.log(error);
    }
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
                <span style={{ color: "red", fontSize: "14px" }}>Welcome</span><div style={{ overflow: "scroll" ,display: "table-caption"}}>{adminName}</div>
              </div>
              {adminAvatar &&
                <Img adminAvatar={adminAvatar} alt="Admin avatar"></Img>
              }
            </div>}

          <button className="actions-btn" onClick={() => getContactUsApiAnswer()}
          >Receive all contact messages</button>
        </div>
        
        <div className="allContactUs-container">
          {!card &&
            contactUsData.map((item) =>
              <div key={item._id} className="contactUs-container">
                <div className="contact-titles">First Name: <span className="items">{item.firstname}</span></div>
                <div className="contact-titles">Last Name: <span className="items">{item.lastname}</span></div>
                <div className="contact-titles">Email: <span className="items">{item.email}</span></div>
                <div className="contact-titles">Phone: <span className="items">{item.phone}</span></div>
                <div className="contact-titles">Message Title: <span className="items">{item.messagetitle}</span></div>
                <div className="contact-titles">Message: <span className="items">{item.message}</span></div>
                <div className="contact-titles">Gender: <span className="items">{item.gender}</span></div>
                <div className="contact-titles">Contact Method: <span className="items">{item.contactmethod}</span></div>
                <div className="contact-titles">Date Created: <span className="items">{item.createdat}</span></div>
                <Marginer direction="vertical" margin="0.5em" />
                <button onClick={() => { deleteContactById(item._id) }} className="item-btn">Remove Item</button>
              </div>
            )
          }
        </div>
        {!card &&
          <div style={{display: "block", flexDirection: "row"}}>
            <button onClick={closeHandler} className="close-card-btn"></button>
            <button onClick={deleteAllContactHandler} className="deleteAllCards-btn">Delete all</button>
          </div>
        }
      </div>

    </>
  )
}

export default AdminPage