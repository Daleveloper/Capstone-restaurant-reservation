import React, { useState } from "react";
import { createReservations } from "../utils/api";
import { Link, useHistory } from "react-router-dom";



const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
};

function CreateReservation() {
    const [formData, setFormData] = useState({ ...initialFormState });
    const history = useHistory();

    const changeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const cancelHandler = (e) => {
        console.log("Cancel Clicked!", e.target);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const ac = new AbortController();
        try {
            await createReservations(formData, ac.signal)
            history.push(`/dashboard`)
        } catch (error) {
            console.log(error);
        }
        return () => ac.abort();
    };











    return (
        <div>
            <h1>Create Reservation</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="Please Enter First Name"
                            aria-label="First name"
                            required={true}
                            onChange={changeHandler}
                            value={formData.first_name}
                        />
                    </div>
                    <div className="col">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Please Enter Last name"
                            aria-label="Last name"
                            required={true}
                            onChange={changeHandler}
                            value={formData.last_name}
                        />
                    </div>
                    <div className="col">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="mobile_number"
                            className="form-control"
                            placeholder="Please Enter 10 Digit Number"
                            aria-label="Phone NUmber"
                            required={true}
                            onChange={changeHandler}
                            value={formData.mobile_number}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Date</label>
                        <input
                            type="date"
                            name="reservation_date"
                            className="form-control"
                            placeholder="Date"
                            aria-label="Date"
                            required={true}
                            onChange={changeHandler}
                            value={formData.reservation_date}
                        />
                    </div>
                    <div className="col">
                        <label>Time</label>
                        <input
                            type="time"
                            name="reservation_time"
                            className="form-control"
                            placeholder="Time"
                            aria-label="Time"
                            required={true}
                            onChange={changeHandler}
                            value={formData.reservation_time}
                        />
                    </div>
                    <div className="col">
                        <label>People</label>
                        <input
                            type="text"
                            name="people"
                            className="form-control"
                            placeholder="Please Enter Party Size Number"
                            aria-label="Party Size"
                            required={true}
                            onChange={changeHandler}
                            value={formData.people}
                        />
                    </div>
                </div>
                <div className="row justify-content-between px-2">
                    <div className="pr-1">
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <Link to={`/`}>
                        <button href="#" className="btn btn-danger" onClick={cancelHandler}>
                            <i className="bi bi-trash pr-1"></i>Cancel
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CreateReservation;
