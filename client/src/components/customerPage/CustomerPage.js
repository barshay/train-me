import React, { useContext } from 'react';
import './CustomerPage.css';
import '../../customHooks/Loading.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';

const CustomerPage = ({ loading, customerAvatar }) => {
  const { customerName } = useContext(MyContext);

  return (
    <>
      {loading &&
        <section className="smooth spinner" >{ }</section>
      }
      <div className="customer-page-container">
        {customerName && <p>Welcome {customerName}</p>}
        {/* <Img customerAvatar={customerAvatar}></Img> */}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Img customerAvatar={customerAvatar}></Img>
          </div>
      </div>
    </>
  )
}

export default CustomerPage