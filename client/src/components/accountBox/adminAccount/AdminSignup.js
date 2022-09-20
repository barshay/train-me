import React, { useState, useContext } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    ErrorStyle,
    SubmitButton,
} from "../common";
import { Marginer } from "../../marginer";
import MyContext from '../../../MyContext';
import { AccountContext } from "../accountContext";
import axios from 'axios';

export function AdminSignup(props) {
    const { switchToSignin } = useContext(AccountContext);

    const { adminData, setAdminData } = useContext(MyContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const [mandatoryErrors, setMandatoryErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const [adminExistErr, setAdminExistErr] = useState('');

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }


    let isValid = true;
    const handleSubmitAdminAdding = (async (event) => {
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
            setMandatoryErrors(prevState => ({
                ...prevState,
                [lastName]: "Last Name feild is mandatory!"
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

        if (!isValid) {
            console.log('form isn\'t valid!!');
            errorsConsole.isValid = "form isn't valid!!";
            console.warn(errorsConsole);
            return;
        };
        isValid = true;

        const newAdmin = { firstName, lastName, email, password, confirmPassword, profilePicture };
        setAdminData((prev) => [newAdmin, ...prev]);
        console.log(adminData.firstName);
        console.log(adminData);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setProfilePicture('');


        const adminToAddToDB = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            profilePicture: profilePicture
        };
        // console.log(adminToAddToDB);
        axios({
            method: 'post',
            url: "http://localhost:8000/admin/signup",
            headers: { 'content-type': 'application/json' },
            data: adminToAddToDB
        })
            .then(res => console.log('Posting a New Admin ', res.data))
            .catch(err => {
                console.log(err);
                setAdminExistErr(err.response.data.error);
                // console.log("errorName" + errorName)
            });
    });

    return (
        <BoxContainer >
            <FormContainer>
                {adminExistErr && <ErrorStyle style={{ fontSize: "14px" }}>{adminExistErr}</ErrorStyle>}
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }} />
                {mandatoryErrors[firstName] ?
                    <ErrorStyle>Name feild is mandatory!</ErrorStyle> : ''
                }
                {errors[firstName] ?
                    <ErrorStyle> Name must be in a range of 2 - 20 characters!</ErrorStyle> : ''
                }
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }} />
                {mandatoryErrors[lastName] ?
                    <ErrorStyle>Last Name feild is mandatory!</ErrorStyle> : ''
                }
                {errors[lastName] ?
                    <ErrorStyle>Last Name must in a range of 2 - 20 characters!</ErrorStyle> : ''
                }
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }} />
                {mandatoryErrors[email] ?
                    <ErrorStyle>Email feild is mandatory!</ErrorStyle> : ''
                }
                {errors[email] ?
                    <ErrorStyle>This is not a valid email!</ErrorStyle> : ''
                }
                <Input
                    type="password"
                    placeholder="Password"
                    // autocomplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    maxLength={10} />
                {mandatoryErrors[password] ?
                    <ErrorStyle>Password feild is mandatory! </ErrorStyle> : ''
                }
                {errors[password] ?
                    <ErrorStyle>Password length must be in the range of 4 - 10 characters!</ErrorStyle> : ''
                }
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    // autocomplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }} />
                {mandatoryErrors[confirmPassword] ?
                    <ErrorStyle>Confirm Password feild is mandatory!</ErrorStyle> : ''
                }
                {errors[confirmPassword] ?
                    <ErrorStyle>Confirm Password must be the same as password!</ErrorStyle> : ''
                }
                <Input
                    type="text"
                    placeholder="Profile Picture"
                    value={profilePicture}
                    onChange={(e) => { setProfilePicture(e.target.value) }} />
            </FormContainer>
            <Marginer direction="vertical" margin="1em" />

            <SubmitButton
                type="submit"
                onClick={handleSubmitAdminAdding}>Sign-Up</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Already have an account?
                <Marginer direction="vertical" margin="0.5em" />
                <BoldLink href="#" onClick={switchToSignin}>
                    Sign-In
                </BoldLink>
                <Marginer direction="vertical" margin="0.5em" />

            </MutedLink>
        </BoxContainer>
    );
}
