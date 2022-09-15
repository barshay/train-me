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
import About from './views/about/About';
import NotFound from './views/notFound/NotFound';
import CommonQuestions from './views/commonQuestions/CommonQuestions';
import Contact from './views/contact/Contact';
import axios from 'axios';



const Routing = () => {
    const clock = useClock();
    const [loading, setLoading] = useState(true);

    const [customersData, setCustomersData] = useState([]);
    const [trainersData, setTrainersData] = useState([]);
    const [contuctUsData, setContuctUsData] = useState([]);


    // const [isAdmin, setIsAdmin] = useState(true);
    // const [isTrainer, setIsTrainer] = useState(true);
    // const [isCustomer, setIsCustomer] = useState(true);

    // get api + set loading - fetch from DB
    useEffect(() => {
        const getCustomersApiAnswer = async () => {
            try {
                const customersUrl = 'http://localhost:8080/api/customers';
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
                const trainersUrl = 'http://localhost:8080/api/trainers';
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
                const contuctUsUrl = 'http://localhost:8080/api/allContucts';
                const response = await axios.get(contuctUsUrl);
                console.log(response)
                const data = await response.data;
                setContuctUsData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getTrainerApiAnswer();
        getCustomersApiAnswer();
        getContuctUsApiAnswer();
    }, [])






    // const categories = productsData
    //     .map(p => p.category)
    //     .filter((value, index, array) => array.indexOf(value) === index);

    // const filterProductsByCategory = (category) => {
    //     if (category === "/") {
    //         setFilteredProducts(productsData);
    //         return;
    //     }
    //     const filteredItems = productsData.filter((product) => product.category === category);
    //     setFilteredProducts(filteredItems);
    // }

    // const addCartItem = (product) => {
    //     const productInCart = cart.findIndex((item) => item._id === product.id);
    //     if (productInCart === -1) {
    //         const newCartItems = { ...product, amount: 1 };
    //         setCart((prev) => [newCartItems, ...prev]);
    //     } else {
    //         const newCartItems = [...cart];
    //         newCartItems[productInCart].amount++;
    //         setCart(newCartItems);
    //     }
    // };

    // const removeCartItem = (product) => {
    //     const productInCart = cart.findIndex((item) => item._id === product._id);
    //     if (productInCart === -1) {
    //         return;
    //     }
    //     if (cart[productInCart].amount === 1) {
    //         const newCartItems = cart.filter((item) => item._id !== product._id);
    //         setCart(newCartItems);
    //         return
    //     } else {
    //         const newCartItems = [...cart];
    //         newCartItems[productInCart].amount--;
    //         setCart(newCartItems);
    //     }
    // };


    return (
        <MyContext.Provider
            value={{
                loading,
                setCustomersData,
                setTrainersData,
                setContuctUsData,
                customersData,
                trainersData,
                contuctUsData,

            }}
        >
            <BrowserRouter>
                <div className="container-header">
                    <span>
                        <img className="logo" src={Logo} alt="logo-pic" />
                        <span>{clock}</span>
                    </span>
                    <span style={{ marginTop: '1em' }}>
                        <NavLink to="/" className="active-link">Home</NavLink>
                        <NavLink to="/contact" className="active-link">Contact-Us</NavLink>
                        <NavLink to="/about" className="active-link">About</NavLink>
                        <NavLink to="/questions" className="active-link">Common-Questions</NavLink>
                    </span>
                </div>
                {/* {isAdmin && <NavLink to="/admin" className="active-link">Admin</NavLink>}
                {isTrainer && <NavLink to="/trainer" className="active-link">Trainer</NavLink>}
                {isCustomer && <NavLink to="/customer" className="active-link">Customer</NavLink>} */}

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
                    {/* <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} /> */}
                    <Route path="about" element={<About />} />
                    <Route path="questions" element={<CommonQuestions />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default Routing
