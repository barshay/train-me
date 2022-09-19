import React, { useState, useContext } from "react";
import {
  BoldLinkTrainer,
  BoldLinkCustomer,
  BoldLinkAdmin,
  BoxContainer,
  FormContainer,
  ErrorStyle,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from 'react-router-dom';

export function LoginForm(props) {
  const { switchToCustomerSignup, switchToTrainerSignup, switchToAdminSignup } = useContext(AccountContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [mandatoryErrors, setMandatoryErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  let isValid = true;
  const handleSubmitLogin = (async (event) => {
    // event.preventDefault();

    let errorsConsole = {};
    setErrors([]);
    setMandatoryErrors([]);

    if (!email) {
      errorsConsole.email = "Email feild is mandatory!";
      isValid = false;
      setMandatoryErrors(prevState => ({
        ...prevState,
        [email]: "Email feild is mandatory!"
      }));
    } else if (email && !isValidEmail(email)) {
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

    if (!isValid) {
      console.log('form isn\'t valid!!');
      errorsConsole.isValid = "form isn't valid!!";
      console.warn(errorsConsole);
      return;
    };
    isValid = true;
    console.log('logged-in!');



    setEmail('');
    setPassword('');
  });

  const handleSubmitCustomerLogin = (e) => {
    e.preventDefault();
    handleSubmitLogin();
    if (isValid) {
      navigate(`/customer`);
    } else return;
  }

  const handleSubmitTrainerLogin = (e) => {
    e.preventDefault();
    handleSubmitLogin();
    if (isValid) {
      navigate(`/trainer`);
    } else return;
  }

  const handleSubmitAdminLogin = (e) => {
    e.preventDefault();
    handleSubmitLogin();
    if (isValid) {
      navigate(`/admin`);
    } else return;
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        {mandatoryErrors[email] ?
          <ErrorStyle>Email field is mandatory!</ErrorStyle> : ''
        }
        {errors[email] ?
          <ErrorStyle>This is not a valid email!</ErrorStyle> : ''
        }
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        {mandatoryErrors[password] ?
          <ErrorStyle>Password field is mandatory!</ErrorStyle> : ''
        }
        {errors[password] ?
          <ErrorStyle>Password length must be in the range of 4 - 10 characters!</ErrorStyle> : ''
        }
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmitCustomerLogin}>Customer login</SubmitButton>
      <Marginer direction="vertical" margin="0.6em" />
      <SubmitButton type="submit" onClick={handleSubmitTrainerLogin}>Trainer login</SubmitButton>
      <Marginer direction="vertical" margin="0.6em" />
      <SubmitButton type="submit" onClick={handleSubmitAdminLogin}>Admin login</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <p style={{
        fontSize: "13px",
        margin: "0",
        color: "#4D1900",
        fontWeight: "1000",
        textDecoration: "none"
      }}>Don't have an account?{" "}
      </p>
      <MutedLink>
        <Marginer direction="vertical" margin="0.5em" />
        <BoldLinkCustomer href="#" onClick={switchToCustomerSignup}>
          Sign-up as a Customer
        </BoldLinkCustomer>
        <Marginer direction="vertical" margin="0.5em" />
        <BoldLinkTrainer href="#" onClick={switchToTrainerSignup}>
          Sign-up as a Trainer
        </BoldLinkTrainer>
        <Marginer direction="vertical" margin="0.5em" />
        <BoldLinkAdmin href="#" onClick={switchToAdminSignup}>
          Sign-up as an Admin
        </BoldLinkAdmin>
      </MutedLink>

    </BoxContainer>
  );
}



