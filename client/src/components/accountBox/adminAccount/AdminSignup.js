import React, { useState, useContext } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    FileInput,
    MutedLink,
    PreviewPicture,
    ErrorStyle,
    SubmitButton,
} from "../common";
import { Marginer } from "../../marginer";
import MyContext from '../../../MyContext';
import { AccountContext } from "../accountContext";
import axios from 'axios';
// import Img from '../../customHooks/Img';
import { useNavigate } from 'react-router-dom'


export function AdminSignup(props) {
    const { switchToSignin } = useContext(AccountContext);

    const { adminData, setAdminData } = useContext(MyContext);

    const navigate = useNavigate();

    const [file, setFile] = useState("");
    const [uploadedImg, setUploadedImg] = useState("");


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const [mandatoryErrors, setMandatoryErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const [adminExistErr, setAdminExistErr] = useState('');

    const handleProfilePicChange = (e) => {
            const file = e.target.files[0];
            console.log(file);
        if (file) {
            setFile(file);
            previewFiles(file);
        }
    }

    const previewFiles = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setProfilePicture(reader.result);
            console.log("image: " + reader.result);
        }
    }

    // const handleChooseFile = () => {
    //     setFile('');
    // }



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
        if (!file) {
            isValid = false;
            errorsConsole.file = "Profile picture feild is mandatory!";
            setMandatoryErrors(prevState => ({
                ...prevState,
                [file]: "Profile picture feild is mandatory!"
            }));
        }

        if (!isValid) {
            console.log('form isn\'t valid!!');
            errorsConsole.isValid = "form isn't valid!!";
            console.warn(errorsConsole);
            return;
        };
        isValid = true;
        console.log("profilePicture is " + profilePicture);
        const newAdmin = { firstName, lastName, email, password, confirmPassword, profilePicture };

        setAdminData(newAdmin);
        // console.log(adminData.firstName);
        // console.log(profilepic);
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
            profilepic: profilePicture
        };
        console.log("admin To Add To DB: " + adminToAddToDB);

        axios({
            method: 'post',
            url: "http://localhost:8000/admin/signup",
            headers: { 'content-type': 'application/json' },
            data: adminToAddToDB
        }).then((res) => {
            console.log('Posting a New Admin ', res.data);
            const uploadedImg = res.data.cloImageResult.public_id;
            setUploadedImg(uploadedImg);
        }).catch((error) => {
            console.log("message from front")
            console.log(error)
            setAdminExistErr(error.response.data.error);
        })
    });

    const handleSubmitAdminPage = (e) => {
        e.preventDefault();
        handleSubmitAdminAdding();
        if (isValid) {
            navigate(`/admin`);
        } else return;
    }

    return (
        <>
            {/* {(!profilePicture && uploadedImg !== "") && <Img uploadedImg={uploadedImg}></Img>} */}
            {profilePicture && <PreviewPicture src={profilePicture} alt="admin-avatar" className="previewPicture"></PreviewPicture>}
            {}
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
                    <FileInput
                        type="file"
                        placeholder="Upload your profile avatar here!"
                        onChange={e => handleProfilePicChange(e)}
                        // onClick={handleChooseFile}
                        required
                        accept="image/png, image/jpeg, image/jpg, image/jfif"
                    />
                    {/* {mandatoryErrors[file] ?
                        <ErrorStyle>Profile Picture feild is mandatory!</ErrorStyle> : ''
                    } */}
                </FormContainer>
                <Marginer direction="vertical" margin="1em" />

                <SubmitButton
                    type="submit"
                    onClick={handleSubmitAdminPage}
                    >Sign-Up</SubmitButton>
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
        </>
    );
}
