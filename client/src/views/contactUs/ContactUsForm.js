import React, { useState } from 'react';
import './ContactUsForm.css';

const ContactUsForm = () => {

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    messageTitle: "",
    message: "",
    contactMethod: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleFirstNameInputChange = (event) => {
    console.log(event.target.value);
    setValues({ ...values, firstName: event.target.value })
  }

  const handleLastNameInputChange = (event) => {
    setValues({ ...values, lastName: event.target.value })
  }

  const handlePhoneInputChange = (event) => {
    setValues({ ...values, phone: event.target.value })
  }

  const handleEmailInputChange = (event) => {
    setValues({ ...values, email: event.target.value })
  }

  const handleMessageTitleInputChange = (event) => {
    setValues({ ...values, messageTitle: event.target.value })
  }

  const handleMessageInputChange = (event) => {
    setValues({ ...values, message: event.target.value })
  }

  const handleContactMethodInputChange = (event) => {
    setValues({ ...values, contactMethod: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.firstName &&
      values.lastName &&
      values.phone &&
      values.email &&
      values.messageTitle
      && values.message) {
      setIsValid(true)
    }
    setSubmitted(true);
  }

  return (
    <div className="form-container">
      <div className="images-container"></div>
      <form className="contactUs-form" onSubmit={handleSubmit}>
        {submitted && isValid ? <div className="success-message">Success! Thanks for contacting us</div> : null}
        <input
          className="form-field"
          name="firstName"
          placeholder="First Name"
          value={values.firstName}
          onChange={handleFirstNameInputChange}
        ></input>
        {submitted && !values.firstName ? <span className="error-field">Please enter a first name</span> : null}
        <input
          className="form-field"
          name="lastName"
          placeholder="Last Name"
          value={values.lastName}
          onChange={handleLastNameInputChange}
        ></input>
        {submitted && !values.lastName ? <span className="error-field">Please enter a last name</span> : null}
        <input
          className="form-field"
          name="phone"
          placeholder="Phone Number"
          value={values.phone}
          onChange={handlePhoneInputChange}
        ></input>
        {submitted && !values.phone ? <span className="error-field">Please enter a phone number</span> : null}
        <input
          className="form-field"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleEmailInputChange}
        ></input>
        {submitted && !values.email ? <span className="error-field">Please enter an email</span> : null}
        <input
          className="form-field"
          name="messageTitle"
          placeholder="Message Title"
          value={values.messageTitle}
          onChange={handleMessageTitleInputChange}
        ></input>
        {submitted && !values.messageTitle ? <span className="error-field">Please enter a message title</span> : null}
        <input
          className="form-field"
          name="message"
          placeholder="Content Of The Message"
          value={values.message}
          onChange={handleMessageInputChange}
        ></input>
        {submitted && !values.message ? <span className="error-field">Please enter the message content</span> : null}
        <div>
          <p style={{fontSize: "16px", margin: "0"}}>Preferred contact method</p>
          <label className="label-feild" htmlFor="checkbox">Email
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox-field"
              name="contactMethod"
              value={values.contactMethod}
              onChange={handleContactMethodInputChange}
            /></label>
          <label className="label-feild" htmlFor="checkbox">Phone
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox-field"
              name="contactMethod"
              value={values.contactMethod}
              onChange={handleContactMethodInputChange}
            /></label>
        </div>
        <button
          className="form-field"
          type="submit">Send Us a Message</button>
      </form>
    </div>
  )
}

export default ContactUsForm