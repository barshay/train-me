import React, { useState, useContext } from "react";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const { setCustomerData } = useContext(MyContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [prophilePicture, setProphilePicture] = useState('');
  const [gender, setGender] = useState('');

  // const [isFormValid, setIsFormValid] = useState(true);
  const [error, setError] = useState([]);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmitCustomerAdding = () => {
    let isValid = true;
    setError([]);
    if ((firstName && firstName.length < 2) || firstName.length > 20) {
      setError(prev => [...prev, 'Name cannot be lower than 2 or exceed from 20 character!']);
      isValid = false;
    } else {
      setError(prev => [...prev, 'This feild is mandatory!']);
    }
    if ((lastName && lastName.length < 2) || lastName.length > 20) {
      setError(prev => [...prev, 'Last name cannot be lower than 2 or exceed from 20 character! ']);
      isValid = false;
    } else {
      setError(prev => [...prev, 'This feild is mandatory!']);
    }
    if (!isValidEmail(email)) {
      setError(prev => [...prev, 'This is not a valid email!']);
      isValid = false;
    } else {
      setError(prev => [...prev, 'This feild is mandatory!']);
    }
    if ((phone && phone.length < 7) || phone.length > 12) {
      setError(prev => [...prev, 'This is not a valid phone number!']);
      isValid = false;
    } else {
      setError(prev => [...prev, 'This feild is mandatory!']);
    }
    if ((password && password.length < 4) || password.length > 10) {
      setError(prev => [...prev, 'Password length must be in the range of 4-10!']);
      isValid = false;
    } else {
      setError(prev => [...prev, 'This feild is mandatory!']);
    }
    if (confirmPassword && confirmPassword !== password) {
      setError(prev => [...prev, 'Confirm Password must be the same as password!']);
      isValid = false;
    } else {
      setError(prev => [...prev, 'This feild is mandatory!']);
    }
    if (age && age < 14) {
      setError(prev => [...prev, 'You are too young for the courses offered!']);
      isValid = false;
    } else {
      setError(prev => [...prev, 'This feild is mandatory!']);
    }
    if (!firstName && !lastName && !age && !email && !phone && !password && !confirmPassword && !gender) {
      setError(prev => [...prev, 'the fields is empty, please fill them! ']);
      isValid = false;
    }
     else if (!firstName || !lastName || !age || !email || !phone || !password || !confirmPassword || !gender) {
      // setError(prev => [...prev, 'one or more of the mandatory fields is empty! ']);
      // isValid = false;
      console.log("one of the mandatory field is missing");
    }

    if (!isValid) {
      console.log('form isn\'t valid!!');
      return;
    }

    // if (error.length === 0) {
    //   setIsFormValid(true);
    // }

    const newCustomer = { firstName, lastName, age, email, phone, password, confirmPassword, gender, prophilePicture }
    setCustomerData(prev => [newCustomer, ...prev])
    setFirstName('')
    setLastName('')
    setAge('')
    setEmail('')
    setPhone('')
    setPassword('')
    setConfirmPassword('')
    setGender('')
    setProphilePicture('')
    console.log(newCustomer);
  }


  // const initialValues = {
  //   firstName: "",
  //   lastName: "",
  //   age: "",
  //   email: "",
  //   phone: "",
  //   password: "",
  //   confirmPassword: "",
  //   prophilePicture: "",
  //   gender: "",
  // };

  // const [formValues, setFormValues] = useState(initialValues);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(e.target.value);
  //   setFormValues({ ...formValues, [name]: value });
  //   console.log(formValues);
  // }
  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value) }} />
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
        <Input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => { setGender(e.target.value) }} />

      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmitCustomerAdding}>Signup</SubmitButton>
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
// age: number , Date format?
// gender: enum [male, female] ?
