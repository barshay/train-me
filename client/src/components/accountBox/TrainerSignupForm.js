import React, { useState, useContext } from "react";
import {
    BoldLink,
    BoldLinkCustomer,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import MyContext from '../../MyContext';
import { AccountContext } from "./accountContext";
import axios from 'axios';

export function TrainerSignupForm(props) {
    const { switchToSignin, switchToCustomerSignup } = useContext(AccountContext);

    const { trainersData, setTrainersData } = useContext(MyContext);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [prophilePicture, setProphilePicture] = useState('');
    const [gender, setGender] = useState('');

    const [mandatoryErrors, setMandatoryErrors] = useState([]);
    const [errors, setErrors] = useState([]);

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    let isValid = true;
    const handleSubmitTrainerAdding = (async (event) => {
        // event.preventDefault();

        let errorsConsole = {};
        setErrors([]);
        setMandatoryErrors([]);
        if ((firstName && firstName.length < 2) || firstName.length > 20) {
            setErrors(prevState => ({
                ...prevState,
                [firstName]: "this is redundant" // I need better way to show the error.
            }));
            isValid = false;
            console.log("errors" + errors.firstName);
        } else if (!firstName) {
            setMandatoryErrors(prev => [...prev, 'Name feild is mandatory!']);
            isValid = false;
            errorsConsole.firstName = "Name feild is mandatory!";
        }
        if ((lastName && lastName.length < 2) || lastName.length > 20) {
            isValid = false;
            setErrors(prevState => ({
                ...prevState,
                [lastName]: "Last Name must be in a range of 2-20 characters!"
            }));
            errorsConsole.lastName = "Last Name must in a range of 2-20 characters!";
        } else if (!lastName) {
            isValid = false;
            let updatedValue = {};
            updatedValue = { "lastName": "Last Name feild is mandatory!" };
            setMandatoryErrors(prevState => ({
                ...prevState,
                ...updatedValue
            }));
            errorsConsole.lastName = "Last Name feild is mandatory!";
        }
        if (!email) {
            errorsConsole.email = "Email feild is mandatory!";
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [email]: "Email feild is mandatory!"
            }));
        } else if (!isValidEmail(email)) {
            isValid = false;
            setErrors(prevState => ({
                ...prevState,
                [email]: "This is not a valid email!"
            }));
            errorsConsole.email = "This is not a valid email!";
        };
        if ((phone && phone.length < 7) || phone.length > 12) {
            isValid = false;
            setErrors(prevState => ({
                ...prevState,
                [phone]: "Phone numbers must be in a range of 7-12"
            }));
            errorsConsole.phone = "Phone numbers must be in a range of 7-12";
        } else if (!phone) {
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [phone]: "Phone feild is mandatory!"
            }));
            errorsConsole.phone = "Phone feild is mandatory!";
        };
        if ((password && password.length < 4) || password.length > 10) {
            isValid = false;
            setErrors(prevState => ({
                ...prevState,
                [password]: "Password length must be in the range of 4-10 characters!"
            }));
            errorsConsole.password = "Password length must be in the range of 4-10 characters!"
        } else if (!password) {
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [password]: "Password feild is mandatory!"
            }));
            errorsConsole.password = "Password feild is mandatory!";
        };
        if (confirmPassword && confirmPassword !== password) {
            isValid = false;
            errorsConsole.confirmPassword = "Confirm Password must be the same as password!";
            setErrors(prevState => ({
                ...prevState,
                [confirmPassword]: "Confirm Password must be the same as password!"
            }));
        } else if (!confirmPassword) {
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [confirmPassword]: "Confirm Password feild is mandatory!"
            }));
            errorsConsole.confirmPassword = "Confirm Password feild is mandatory!";
        };
        if (age && age < 16) {
            isValid = false;
            setErrors(prevState => ({
                ...prevState,
                [age]: "You are too young for the courses offered!"
            }));
            errorsConsole.age = "You are too young for the courses offered!";
        } else if (!age) {
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [age]: "Age feild is mandatory!"
            }));
            errorsConsole.age = "Age feild is mandatory!";
        };
        if (gender === "Choose your gender") {
            console.log(gender);
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [gender]: "Gender field is mandatory!"
            }));
            setErrors(prevState => ({
                ...prevState,
                [gender]: "Gender field is mandatory!"
            }));
        }

        if (!isValid) {
            console.log('form isn\'t valid!!');
            errorsConsole.isValid = "form isn't valid!!";
            console.warn(errorsConsole);
            return;
        };
        isValid = true;


        const newTrainer = { firstName, lastName, age, email, phone, password, confirmPassword, gender, prophilePicture };
        setTrainersData((prev) => [newTrainer, ...prev]);
        console.log(trainersData);
        setFirstName('');
        setLastName('');
        setAge('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setGender('');
        setProphilePicture('');


        const trainerToAddToDB = {
            firstname: firstName,
            lastname: lastName,
            age: +age,
            email: email,
            phone: phone,
            password: password,
            confirmPassword: confirmPassword,
            gender: gender,
            prophilePicture: prophilePicture
        };

        // console.log(customerToAddToDB);
        axios({
            method: 'post',
            url: "http://localhost:8080/api/trainer",
            headers: { 'content-type': 'application/json' },
            data: trainerToAddToDB
        })
            .then(res => console.log('Posting a New Trainer ', res.data))
            .catch(err => console.log(err));
    });

    return (
        <BoxContainer>
            <FormContainer>
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }} />
                {mandatoryErrors[firstName] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Name feild is mandatory!
                    </p> : ''
                }
                {errors[firstName] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Name must be in a range of 2 - 20 characters!
                    </p> : ''
                }
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }} />
                {mandatoryErrors[lastName] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Last Name feild is mandatory!
                    </p> : ''
                }
                {errors[lastName] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Last Name must in a range of 2 - 20 characters!
                    </p> : ''
                }
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />
                {mandatoryErrors[email] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Email feild is mandatory!
                    </p> : ''
                }
                {errors[email] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        This is not a valid email!
                    </p> : ''
                }
                <Input
                    type="password"
                    placeholder="Password"
                    // autocomplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    maxLength={10} />
                {mandatoryErrors[password] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Password feild is mandatory!
                    </p> : ''
                }
                {errors[password] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Password length must be in the range of 4 - 10 characters!
                    </p> : ''
                }
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    // autocomplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }} />
                {mandatoryErrors[confirmPassword] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Confirm Password feild is mandatory!
                    </p> : ''
                }
                {errors[confirmPassword] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Confirm Password must be the same as password!
                    </p> : ''
                }
                <Input
                    type="text"
                    placeholder="Prophile Picture"
                    value={prophilePicture}
                    onChange={(e) => { setProphilePicture(e.target.value) }} />
                <Input
                    type="number"
                    placeholder="age"
                    maxlength={2} //why it doesn't work.
                    value={age}
                    onChange={(e) => { setAge(e.target.value) }} />
                {mandatoryErrors[age] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Age feild is mandatory!
                    </p> : ''
                }
                {errors[age] ?
                    <span style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em", paddingRight: "0.3em", display: "flex", alignItems: "center" }}
                    >You are too young for the courses!
                        <video autoPlay loop muted style={{
                            position: 'relative',
                            width: '20%',
                            left: '35%',
                            height: '50px',
                            objectFit: 'cover',
                            transform: "translate(-240%, -50%)",
                        }}>
                            <source src={"https://ak.picdn.net/shutterstock/videos/1069771018/preview/stock-footage-under-sign-warning-symbol-on-transparent-background-with-alpha-channel-animation-of-seamless.webm"}
                                type="video/mp4"
                                alt="Age limit to 16">
                            </source>
                        </video>
                    </span> :
                    ''}
                <Input
                    type="number"
                    placeholder="phone"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }} />
                {mandatoryErrors[phone] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        Phone feild is mandatory!
                    </p> : ''
                }
                {errors[phone] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em", paddingRight: "2em" }}>
                        Phone number must be in a range of 7 - 12 numbers
                    </p> : ''
                }
                <select
                    style={{ fontSize: "12px", backgroundColor: "lightblue", height: "2.7em" }}
                    type="text"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => { setGender(e.target.value) }}>
                    <option>Choose your gender please</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                {mandatoryErrors[gender] ?
                    <p style={{ fontSize: "12px", color: "red", paddingLeft: "0.3em" }}>
                        gender feild is mandatory!
                    </p> : ''
                }
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton
                type="submit"
                onClick={handleSubmitTrainerAdding}>Sign-Up</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Already have an account?
                <Marginer direction="vertical" margin="0.5em" />
                <BoldLink href="#" onClick={switchToSignin}>
                    Sign-In
                </BoldLink>
                <Marginer direction="vertical" margin="0.5em" />
                <BoldLinkCustomer href="#" onClick={switchToCustomerSignup}>
                    Sign-up as a customer
                </BoldLinkCustomer>
                <Marginer direction="vertical" margin="0.5em" />
            </MutedLink>
        </BoxContainer>
    );
}



// picture: string(URL) ?
// age: number , Date format ?
