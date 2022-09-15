import React, { useContext } from "react";
import {
  BoldLinkTrainer,
  BoldLinkCustomer,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
  const { switchToCustomerSignup, switchToTrainerSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <Marginer direction="vertical" margin="1em" />
        <BoldLinkCustomer href="#" onClick={switchToCustomerSignup}>
          Signup as a customer
        </BoldLinkCustomer>
      </MutedLink>
      <MutedLink href="#">
        <BoldLinkTrainer href="#" onClick={switchToTrainerSignup}>
          Signup as a trainer
        </BoldLinkTrainer>
      </MutedLink>
    </BoxContainer>
  );
}



