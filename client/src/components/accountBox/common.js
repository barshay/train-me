import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19); */
`;

export const MutedLink = styled.div`
  font-size: 11px;
  color: #4D1900;
  font-weight: 1000;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 14px;
  color: rgb(307, 120, 15);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const BoldLinkCustomer = styled.a`
  font-size: 14px;
  color: green;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const BoldLinkTrainer = styled.a`
  font-size: 14px;
  color: blue;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const BoldLinkAdmin = styled.a`
  font-size: 14px;
  color: brown;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const BoldCustomer = styled.span`
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  /* margin: 1 2px; */
  margin-right: 5px;
  color: green;
`;

export const BoldTrainer = styled.span`
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  /* margin: 1 2px; */
  margin-right: 28px;
  color: blue;
`;

export const BoldAdmin = styled.span`
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  /* margin: 1 2px; */
  margin-right: 5px;
  margin-right: 32px;
  color: red;
`;

export const BoldHello = styled.span`
    font-size: 16px;
    font-weight: 700;
    /* display: inline-flex; */
`;

export const ErrorStyle = styled.p`
  font-size: 12px;
  color: red; 
  padding-left: 0.3em;
  margin-top: 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 32px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 2);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  margin-top: 0.3em;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
     font-weight: bold;
       /* font-size: 1.2em; */
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  /* padding: 11px 30%; */
  margin: 0;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );

  &:hover {
    filter: brightness(1.15);
    color:rgb(42, 86, 189);
    font-size: large;
  }
`;
