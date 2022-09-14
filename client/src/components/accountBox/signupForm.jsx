import React, { useState, useContext, useEffect } from "react";
import {
  BoldLink,
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const { customerData, setCustomerData } = useContext(MyContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [prophilePicture, setProphilePicture] = useState('');
  const [gender, setGender] = useState('');

  // const [isFormValid, setIsFormValid] = useState(false);
  // const [errors, setErrors] = useState({});
  const [error, setError] = useState([]);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  let errors = {};
  const handleSubmitCustomerAdding = (async (event) => {
    let isValid = true;
    errors = {};
    // setErrors({});
    setError([]);
    if ((firstName && firstName.length < 2) || firstName.length > 20) {
      setError(prev => [...prev, 'Name cannot be lower than 2 or exceed from 20 character!']);
      isValid = false;
      errors.firstName = "Name must in a range of 2-20 characters!";
      // setErrors(...errors, "Name must in a range of 2-20 characters!");
      console.log("errors" + errors.firstName);

    } else if (!firstName) {
      setError(prev => [...prev, 'Name feild is mandatory!']);
      isValid = false;
      errors.firstName = "Name feild is mandatory!";
      // setErrors(...errors, "Name feild is mandatory!");
      // setErrors(prevState => ({
      //   ...prevState,
      //   [name]: value
      // }));
      console.log("errors" + errors.firstName);

    }
    if ((lastName && lastName.length < 2) || lastName.length > 20) {
      setError(prev => [...prev, 'Last name cannot be lower than 2 or exceed from 20 character! ']);
      isValid = false;
      errors.lastName = "Last Name must in a range of 2-20 characters!";
    } else if (!lastName) {
      isValid = false;
      setError(prev => [...prev, 'Last Name feild is mandatory!']);
      errors.lastName = "Last Name feild is mandatory!";
    }
    if (!email) {
      setError(prev => [...prev, 'Email feild is mandatory!']);
      errors.email = "Email feild is mandatory!";
      isValid = false;
    } else if (!isValidEmail(email)) {
      setError(prev => [...prev, 'This is not a valid email!']);
      isValid = false;
      errors.email = "This is not a valid email!";
    };
    if ((phone && phone.length < 7) || phone.length > 12) {
      setError(prev => [...prev, 'This is not a valid phone number!']);
      isValid = false;
      errors.phone = "Phone numbers must be in a range of 7-12";
    } else if (!phone) {
      isValid = false;
      setError(prev => [...prev, 'Phone feild is mandatory!']);
      errors.phone = "Phone feild is mandatory!";
    };
    if ((password && password.length < 4) || password.length > 10) {
      setError(prev => [...prev, 'Password length must be in the range of 4-10 characters!']);
      isValid = false;
      errors.password = "Password length must be in the range of 4-10 characters!"
    } else if (!password) {
      isValid = false;
      setError(prev => [...prev, 'Password feild is mandatory!']);
      errors.password = "Password feild is mandatory!";
    };
    if (confirmPassword && confirmPassword !== password) {
      setError(prev => [...prev, 'Confirm Password must be the same as password!']);
      isValid = false;
      errors.confirmPassword = "Confirm Password must be the same as password!";
    } else if (!confirmPassword) {
      isValid = false;
      setError(prev => [...prev, 'Confirm Password feild is mandatory!']);
      errors.confirmPassword = "Confirm Password feild is mandatory!";
    };
    if (age && age < 14) {
      setError(prev => [...prev, 'You are too young for the courses offered!']);
      isValid = false;
      errors.age = "You are too young for the courses offered!";
    } else if (!age) {
      isValid = false;
      setError(prev => [...prev, 'Age feild is mandatory!']);
      errors.age = "Age feild is mandatory!";
    };
    if (!firstName || !lastName || !age || !email || !phone || !password || !confirmPassword || !gender) {
      setError(prev => [...prev, 'one or more of the mandatory fields is missing! ']);
    };

    if (!isValid) {
      console.log('form isn\'t valid!!');
      errors.isValid = "form isn't valid!!"
      console.log("errors" + errors.firstName);
      return;
    };

    // if (error.length === 0) {
    //   setIsFormValid(true);
    // }

    const newCustomer = { firstName, lastName, age, email, phone, password, confirmPassword, gender, prophilePicture };
    setCustomerData((prev) => [newCustomer, ...prev]);
    console.log(customerData);
    setFirstName('');
    setLastName('');
    setAge('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setGender('');
    setProphilePicture('');


    const customerToAddToDB = {
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

    console.log(customerToAddToDB);
    axios({
      method: 'post',
      url: "http://localhost:8080/api/customer",
      headers: { 'content-type': 'application/json' },
      data: customerToAddToDB
    })
      .then(res => console.log('Posting a New Customer ', res.data))
      .catch(err => console.log(err));
  });

  useEffect(() => {
    console.log("errors: " + error);
  }, [error]);

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value) }} />
        {(errors.firstname > 0) ? console.log(typeof (errors.firstname)) : ''}
        {/* console.log("ahaa!!!") */}
        {/* {errors.firstName > 0 ? console.log("ahaa!!!") : ''} */}
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => { setLastName(e.target.value) }} />
        <Input
          type="number"
          placeholder="age"
          value={age}
          onChange={(e) => { setAge(e.target.value) }} />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }} />
        <Input
          type="number"
          placeholder="phone"
          value={phone}
          onChange={(e) => { setPhone(e.target.value) }} />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          maxLength={10} />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value) }} />
        <Input
          type="text"
          placeholder="Prophile Picture"
          value={prophilePicture}
          onChange={(e) => { setProphilePicture(e.target.value) }} />
        <select
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => { setGender(e.target.value) }}>
          <option>Choose your gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton
        type="submit" /** disabled={!isFormValid} */
        onClick={handleSubmitCustomerAdding}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}



// picture: string(URL) ?
// age: number , Date format ?
