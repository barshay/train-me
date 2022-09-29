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
import CustomerPage from './components/customerPage/CostomerPage';
import TrainerPage from './components/trainerPage/TrainerPage';
import AdminPage from './components/adminPage/AdminPage';
import { AdminAccountPage } from './components/accountBox/adminAccount/AdminAccountPage';
import About from './views/about/About';
import NotFound from './views/notFound/NotFound';
import CommonQuestions from './views/commonQuestions/CommonQuestions';
import Contact from './views/contactUs/ContactUsForm';
import axios from 'axios';



const Routing = () => {
  const clock = useClock();
  const [loading, setLoading] = useState(true);

    const [customersData, setCustomersData] = useState([]);
    const [trainersData, setTrainersData] = useState([]);
    const [contuctUsData, setContactUsData] = useState([]);
    const [adminData, setAdminData] = useState([]);

    // get api - fetch from DB
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

        const getAdminApiAnswer = async () => {
            try {
                const contuctUsUrl = 'http://localhost:8000/admin';
                const response = await axios.get(contuctUsUrl);
                console.log(response)
                const data = await response.data;
                setAdminData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getTrainerApiAnswer();
        getCustomersApiAnswer();
        getContuctUsApiAnswer();
        getAdminApiAnswer();
    }, [])

    return (
        <MyContext.Provider
            value={{
                loading,
                setCustomersData,
                setTrainersData,
                setContactUsData,
                setAdminData,
                customersData,
                trainersData,
                contuctUsData,
                adminData,
            }}
        >
            <BrowserRouter>
                <div className="container-header">
                    <span className="container-logo-clock">
                        <img className="logo" src={Logo} alt="logo-pic" />
                        <span className="clock">{clock}</span>
                    </span>
                    <span style={{ marginTop: '1em', marginRight: '1em' }}>
                        <NavLink to="/" className="active-link">Home</NavLink>
                        <NavLink to="/contact" className="active-link">Contact-Us</NavLink>
                        <NavLink to="/about" className="active-link">About</NavLink>
                        <NavLink to="/questions" className="active-link">Common-Questions</NavLink>
                    </span>
                </div>

        {/* {
                isLoggedIn ? ( */}
                <Routes>
                    <Route path="/" element=
                        {<Home
                        // addCartItem={addCartItem}
                        // removeCartItem={removeCartItem}
                        // cart={cart}
                        // loading={loading}
                        />
                        }
                    />
                    <Route path="customer" element={<CustomerPage />} />
                    <Route path="trainer" element={<TrainerPage />} />
                    <Route path="admin" element={<AdminPage />} />
                    <Route path="adminsignup" element={<AdminAccountPage />} />
                    <Route path="about" element={<About />} />
                    <Route path="questions" element={<CommonQuestions />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default Routing;
