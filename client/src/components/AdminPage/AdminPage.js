import React, { useContext, useEffect } from 'react';
import './AdminPage.css';
import '../../customHooks/Loading.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';
import axios from 'axios';


const AdminPage = ({ loading, setLoading, adminAvatar }) => {

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
    const getCustomersApiAnswer = async () => {
      try {
        const customersUrl = 'http://localhost:8000/customer';
        const response = await axios.get(customersUrl);
        console.log(response)
        const data = await response.data;
        setCustomersData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    const getTrainerApiAnswer = async () => {
      try {
        const trainersUrl = 'http://localhost:8000/trainer';
        const response = await axios.get(trainersUrl);
        console.log(response)
        const data = await response.data;
        setTrainersData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    const getContuctUsApiAnswer = async () => {
      try {
        const contuctUsUrl = 'http://localhost:8000/contactus';
        const response = await axios.get(contuctUsUrl);
        console.log(response)
        const data = await response.data;
        setContactUsData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getTrainerApiAnswer();
    getCustomersApiAnswer();
    getContuctUsApiAnswer();
  }, [])


  return (
    <>
      {loading &&
        <section className="smooth spinner" >{ }</section>
      }
      <div className="admin-page-container">
        {adminName && <p>Welcome {adminName}</p>}

        {/* <Img adminAvatar={adminAvatar}></Img> */}
        
          {adminAvatar && <div style={{ display: "flex", justifyContent: "center" }}>
            <Img adminAvatar={adminAvatar} alt="admin avatar"></Img>
          </div>}
      </div>
    </>
  )
}

export default AdminPage