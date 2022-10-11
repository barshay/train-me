import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
} from 'react-router-dom';
import { useClock } from './customHooks/useClock';
import './Routing.css';
import Logo from './images/Logo.png';
import Home from './components/Home';
import CustomerPage from './components/customerPage/CustomerPage';
import TrainerPage from './components/trainerPage/TrainerPage';
import AdminPage from './components/adminPage/AdminPage';
import { AdminAccountPage } from './components/accountBox/adminAccount/AdminAccountPage';
import About from './views/about/About';
import NotFound from './views/notFound/NotFound';
// import CommonQuestions from './views/commonQuestions/CommonQuestions';
import Contact from './views/contactUs/ContactUsForm';
import axios from 'axios';
import { AccountBox } from './components/accountBox/index';



const Routing = () => {
    const clock = useClock();
    const [loading, setLoading] = useState(true);

    const [customersData, setCustomersData] = useState([]);
    const [trainersData, setTrainersData] = useState([]);
    const [contactUsData, setContactUsData] = useState([]);
    const [adminName, setAdminName] = useState('');
    const [adminAvatar, setAdminAvatar] = useState('');
    const [customerAvatar, setCustomerAvatar] = useState('');
    const [trainerAvatar, setTrainerAvatar] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [trainerName, setTrainerName] = useState('');

    // get api - fetch from DB
    useEffect(() => {
        // const getCustomersApiAnswer = async () => {
        //     try {
        //         const customersUrl = 'http://localhost:8000/customer';
        //         const response = await axios.get(customersUrl);
        //         console.log(response)
        //         const data = await response.data;
        //         setCustomersData(data);
        //         setLoading(false);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // const getTrainerApiAnswer = async () => {
        //     try {
        //         const trainersUrl = 'http://localhost:8000/trainer';
        //         const response = await axios.get(trainersUrl);
        //         console.log(response)
        //         const data = await response.data;
        //         setTrainersData(data);
        //         setLoading(false);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // const getContactUsApiAnswer = async () => {
        //     try {
        //         const contactUsUrl = 'http://localhost:8000/getAllContactInquiries';
        //         const response = await axios.get(contactUsUrl);
        //         console.log(response)
        //         const data = await response.data;
        //         setContactUsData(data);
        //         setLoading(false);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // const getAdminApiAnswer = async () => {
        //     try {
        //         const adminUrl = 'http://localhost:8000/admin';
        //         const response = await axios.get(adminUrl);
        //         console.log(response);
        //         const data = await response.data;
        //         setAdminData(data);
        //         setLoading(false);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // getTrainerApiAnswer();
        // getCustomersApiAnswer();
        // getContuctUsApiAnswer();
        // getAdminApiAnswer();        
    }, [])

    const adminAvatarHandler = (publicId) => {
        setAdminAvatar(publicId);
    }

    const customerAvatarHandler = (publicId) => {
        setCustomerAvatar(publicId);
    }

    const trainerAvatarHandler = (publicId) => {
        setTrainerAvatar(publicId);
    }

    // useEffect(() => {
    //     console.log("Admin Avatar: ", adminAvatar);
    // }, [adminAvatar])

    const providerValues = {
        loading,
        setLoading,
        setCustomersData,
        setTrainersData,
        setContactUsData,
        customersData,
        trainersData,
        contactUsData,
        adminAvatarHandler,
        adminAvatar,
        customerAvatarHandler,
        customerAvatar,
        trainerAvatarHandler,
        trainerAvatar,
        setAdminName,
        adminName,
        setCustomerName,
        customerName,
        setTrainerName,
        trainerName
    }

    return (
        <MyContext.Provider
            value={{
                ...providerValues
            }}
        >
            <BrowserRouter>
                <div className="container-header">
                    <span className="container-logo-clock">
                        <img className="logo" src={Logo} alt="logo-pic" />
                        <span className="clock">{clock}</span>
                    </span>
                    <span className="container-link">
                        <NavLink to="/" className="active-link">Home</NavLink>
                        <NavLink to="/account" className="active-link">Account</NavLink>
                        <NavLink to="/contact" className="active-link">Contact-Us</NavLink>
                        <NavLink to="/about" className="active-link">About</NavLink>
                        {/* <NavLink to="/questions" className="active-link">Common-Questions</NavLink> */}
                    </span>
                </div>

                {/* {
                isLoggedIn ? ( */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="customer" element={<CustomerPage loading={loading} customerAvatar={customerAvatar} />} />
                    <Route path="trainer" element={<TrainerPage loading={loading} trainerAvatar={trainerAvatar} />} />
                    <Route path="admin" element={<AdminPage loading={loading} setLoading={setLoading} adminAvatar={adminAvatar} />} />
                    <Route path="account" element={<AccountBox />} />
                    <Route path="adminaccount" element={<AdminAccountPage />} />
                    <Route path="about" element={<About />} />
                    {/* <Route path="questions" element={<CommonQuestions />} /> */}
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default Routing
