import React, { useContext } from 'react';
import './CustomerPage.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';
import { Marginer } from '../marginer';
import axios from 'axios';

const CustomerPage = ({ customerAvatar }) => {
  const { customerName } = useContext(MyContext);

  return (
    <>
      <div className="customer-page-container">
        <div className="customer-image-home-container">
        </div>
        <div className="customer-actions-container">
          {customerName &&
            <div style={{ display: "flex" }}>
              <div style={{ display: "block" }}>
                <span style={{ color: "green", fontSize: "14px" }}>Welcome</span>
                <div className="customer-userName">{customerName}</div>
              </div>
              {customerAvatar &&
                <Img customerAvatar={customerAvatar} alt="Customer avatar"></Img>
              }
            </div>}
          <Marginer direction="vertical" margin="1em" />
        </div>
      </div>
    </>
  )
}

export default CustomerPage