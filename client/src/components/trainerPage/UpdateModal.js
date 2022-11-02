import React, { useState, useRef, useEffect } from "react";
import "./UpdateModal.css";
import { FileInput, PreviewPicture } from './styledHelper';
import axios from 'axios';

const UpdateModal = ({courseId}) => {
    const [modal, setModal] = useState(false);

    const [mandatoryErrors, setMandatoryErrors] = useState([]);
    const [errors, setErrors] = useState([]);

    const [updatedPicture, setUpdatedPicture] = useState('');
    const [updatedLessonTime, setUpdatedLessonTime] = useState('');
    const [updatedCost, setUpdatedCost] = useState('');

    const toggleModal = () => {
        setModal(!modal);
        setUpdatedPicture('');
        setUpdatedLessonTime('');
        setUpdatedCost('');
        setErrors([]);
        setMandatoryErrors([]);
    };

    // if (modal) {
    //     document.body.classList.add('active-modal')
    // } else {
    //     document.body.classList.remove('active-modal')
    // }

    let inputFileRef = useRef(null);
    const handlePictureChange = (e) => {
        inputFileRef = e.target.value;
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            previewFiles(file);
        }
    }

    const previewFiles = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setUpdatedPicture(reader.result);
            console.log("image: " + reader.result);
        }
    }

    let isValid = true;
    const updateCourseHandler = async (id, e) => {
        console.log("ID: ", courseId);
        // e.preventDefault();
        let errorsConsole = {};
        setErrors([]);
        setMandatoryErrors([]);
        // console.log(e.target.value);
        if (!updatedPicture) {
            isValid = false;
            errorsConsole.updatedPicture = "Updated Picture feild is mandatory!";
            setMandatoryErrors(prevState => ({
                ...prevState,
                [updatedPicture]: "Updated Picture feild is mandatory!"
            }));
        };
        if ((updatedLessonTime && updatedLessonTime < 15) || updatedLessonTime > 90) {
            isValid = false;
            setErrors(prevState => ({
                ...prevState,
                [updatedLessonTime]: "Updated Lesson Time must be in the range of 15-90 minutes!"
            }));
            errorsConsole.updatedLessonTime = "Updated Lesson Time must be in the range of 15-90 minutes!"
        } else if (!updatedLessonTime) {
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [updatedLessonTime]: "Updated Lesson time feild is mandatory!"
            }));
            errorsConsole.updatedLessonTime = "lesson time feild is mandatory!";
        };
        if ((updatedCost && updatedCost < 0) || updatedCost > 150) {
            console.log("Updated Price ", updatedCost);
            isValid = false;
            setErrors(prevState => ({
                ...prevState,
                [updatedCost]: "Updated Price must be in a range of 0-150!"
            }));
            errorsConsole.cost = "Updated Price must be lower than 150!"
        }
        else if (!updatedCost) {
            console.log("cost ", updatedCost);
            isValid = false;
            setMandatoryErrors(prevState => ({
                ...prevState,
                [updatedCost]: "Updated price feild is mandatory!"
            }));
            errorsConsole.updatedCost = "Updated price feild is mandatory!";
        };

        if (!isValid) {
            console.log('form isn\'t valid!!');
            errorsConsole.isValid = "form isn't valid!!";
            console.warn(errorsConsole);
            return;
        };
        isValid = true;

        const updatedCourseToAddToDB = {
            picture: updatedPicture,
            lessontime: updatedLessonTime,
            cost: updatedCost
        };

        setUpdatedPicture('');
        setUpdatedLessonTime('');
        setUpdatedCost('');

        axios({
            method: 'put',
            url: `http://localhost:8000/course/${courseId}`,
            headers: { 'content-type': 'application/json' },
            data: updatedCourseToAddToDB
        }).then((res) => {
            console.log('Updating a Course ', res.data);

        }).catch((error) => {
            console.log(error);
        });


        // try {
        //     const updateCourseUrl = `http://localhost:8000/course/${id}`;
        //     const response = await axios.put(updateCourseUrl);
        //     console.log(response);
        //     const data = await response.data;

        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <>
            <button onClick={toggleModal} className="btn-modal" >
                Update
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content-container">
                        <div className={updatedPicture ? "modal-with-image" : "modal-labels"}>
                            <input
                                className="modal-form-field"
                                type="number"
                                placeholder="Lesson Time(minutes)"
                                value={updatedLessonTime}
                                onChange={(e) => { setUpdatedLessonTime(e.target.value) }} />
                            {mandatoryErrors[updatedLessonTime] ?
                                <span style={{ fontSize: "12px", color: "red" }}>
                                    Lesson Time feild is mandatory!
                                </span> : ''
                            }
                            {errors[updatedLessonTime] ?
                                <span style={{ fontSize: "12px", color: "red" }}>
                                    Lesson Time must be in the range of 15-90 minutes!
                                </span> : ''
                            }

                            <input
                                className="modal-form-field"
                                type="number"
                                placeholder="Price"
                                value={updatedCost}
                                onChange={(e) => { setUpdatedCost(e.target.value) }} />
                            {mandatoryErrors[updatedCost] ?
                                <span style={{ fontSize: "12px", color: "red" }}>
                                    Price feild is mandatory!
                                </span> : ''
                            }
                            {errors[updatedCost] ?
                                <span style={{ fontSize: "12px", color: "red" }}>
                                    price must be in a range of 0-150!
                                </span> : ''
                            }

                            <FileInput
                                ref={inputFileRef}
                                style={{ width: "12rem", marginTop: "0.5em" }}
                                type="file"
                                placeholder="Picture"
                                onChange={(e) => { handlePictureChange(e) }}
                                required
                                accept="image/png, image/jpeg, image/jpg, image/jfif" />
                            {mandatoryErrors[updatedPicture] ?
                                <span className="error-span">
                                    Picture feild is mandatory!
                                </span> : ''
                            }

                            {updatedPicture && <PreviewPicture style={{ marginTop: "0.5em" }} src={updatedPicture} alt="course-image"></PreviewPicture>}

                        </div>

                        <div className="close-update-modal-container">
                            <button className="update-modal" onClick={() => { updateCourseHandler() }}>
                                UPDATE
                            </button>
                            <button className="close-modal" onClick={toggleModal}>
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateModal;