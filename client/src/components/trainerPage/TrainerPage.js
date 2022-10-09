import React, { useContext } from 'react';
import './TrainerPage.css';
import '../../customHooks/Loading.css';
import Img from '../../customHooks/Img';
import MyContext from '../../MyContext';

const TrainerPage = ({ loading, trainerAvatar }) => {
  const { trainerName } = useContext(MyContext);


  return (
     <>
      {loading &&
        <section className="smooth spinner" >{ }</section>
      }
      <div className="trainer-page-container">
        {trainerName && <p>Welcome {trainerName}</p>}
      {/* <Img trainerAvatar={trainerAvatar}></Img> */}


        <form className="" /** onSubmit={e => handleSubmit(e) */ >

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Img trainerAvatar={trainerAvatar}></Img>
          </div>
        </form>
      </div>
    </>
  )
}

export default TrainerPage