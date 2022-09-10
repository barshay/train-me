import React, { useState } from 'react';
import Home from './components/Home';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import MyContext from './MyContext';
import About from './components/about/About';
import NotFound from './notFound/NotFound';
import { useClock } from './customHooks/useClock';
import './StyledLink.css';

// import IconButton from "@mui/material/IconButton";
// import PunchClockIcon from '@mui/icons-material/PunchClock';
// import axios from 'axios';



const Routing = () => {
    const clock = useClock();
    const [loading, setLoading] = useState(true);

    const [productsData, setProductsData] = useState([]);

    const [isAdmin, setisAdmin] = useState(true);

    // get api + set loading - fetch api
    // useEffect(() => {
    //     const getApiAnswer = async () => {
    //         try {
    //             const response = await fetch('https://gocode-bituach-yashir.glitch.me/products')
    //             const dataFromApi = await response.json()

    //             setProductsData(dataFromApi);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getApiAnswer();
    // }, [])

    // get api + set loading - fetch from DB
    // useEffect(() => {
    //     const getApiAnswer = async () => {
    //         try {
    //             const productsUrl = 'http://localhost:8000/api/products';
    //             const response = await axios.get(productsUrl);
    //             console.log(response)
    //             const data = await response.data;
    //             setProductsData(data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getApiAnswer();
    // }, [])





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
                productsData,
                loading
            }}
        >
            <BrowserRouter>
                <NavLink to="/" className="active-link"> Home</NavLink>
                <NavLink to="/about" className="active-link">
                    About
                </NavLink>
                {isAdmin && <NavLink to="/admin" className="active-link">Admin</NavLink>}
                {isTrainer && <NavLink to="/trainer" className="active-link">Trainer</NavLink>}
                {isCustomer && <NavLink to="/customer" className="active-link">Customer</NavLink>}

                {/* <span>
                    <IconButton
                        style={{
                            display: "inline-flex",
                            alignSelf: "flex-start",
                            marginLeft: "115vh",
                            color: "lightgray",
                            fontSize: "20px"
                        }}
                        // aria-label="add an alarm"
                        variant="outline"
                        sx={{ m: -1 }}>
                        <span >{clock}</span>
                        <PunchClockIcon style={{ color: "rgb(142, 135, 86)" }} />
                    </IconButton>
                </span> */}
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
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="about" element={<About />} />
                    {/* <Route path="cart" element=
                        {<Cart removeCartItem={removeCartItem} />}
                    /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </MyContext.Provider>
    );
}

export default Routing
