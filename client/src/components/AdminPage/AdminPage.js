import React, { useState } from 'react';
import './AdminPage.css';
import axios from 'axios';
import Img from '../../customHooks/Img';

const AdminPage = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImg, setUploadedImg] = useState("");

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
      console.log("image: " + image);
    }

  }
  //handle and convert it in base 64
  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);

    previewFiles(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/admin/image", {
        image: image
      })
      const uploadedImg = result.data.public_id;
      setUploadedImg(uploadedImg);
      // console.log(result.data);
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <>
      <div className="admin-page-container">
        Admin Page        
        {/* <Img></Img> */}


        {/* <form className="upload-container" onSubmit={e => handleSubmit(e)}>
          <div className="label-input-container">
            <label htmlFor="fileInput">Upload your photo here!</label>
            <input
              className="upload-file-validation"
              type="file"
              id="fileInput"
              onChange={e => handleChange(e)}
              required
              accept="image/png, image/jpeg, image/jpg, image/jfif">
            </input>
          </div>

          <button className="upload-btn" >Submit</button>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Img uploadedImg={uploadedImg} ></Img>
          </div>
        </form>
        {image && <img src={image} alt="admin-avatar" style={{ width: "20em", height: "12em" }} />} */}
      </div>
    </>
  )
}

export default AdminPage