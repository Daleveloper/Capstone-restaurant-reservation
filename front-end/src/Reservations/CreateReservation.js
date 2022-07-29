import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservations } from "../utils/api";
import { useHistory } from "react-router-dom";
//import ReservationCard from "./ReservationCard";

export default function CreateReservation() {
    const history = useHistory();

    const initialForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    };

    const [formData, setFormData] = useState({ ...initialForm });
    const [reservationsError, setReservationsError] = useState(null);

    const changeHandler = ({ target }) => {
        let value = target.value;
        if (target.name === "people") {
            value = Number(value);
        }
        setFormData({
            ...formData,
            [target.name]: value,
        });
    };

    const submitHandler = (event) => {
        console.log("submithandler called",)
        event.preventDefault();
        // async function addReservation() {

        return createReservations(formData)
            .then((test) => {
                // console.log("submithandler", test)
                history.push(`/dashboard?date=${formData.reservation_date}`);
            })
            .catch((error) => {
                // console.log("catch error", error)
                setReservationsError(error);
            })
        // }
        // addReservation();
    };

    return (
        <>
            <h1>Create Reservation</h1>
            {/* <ErrorAlert error= {reservationsError} />
            <ReservationCard  changeHandler={changeHandler} formData={formData} /> */}
            <>
                {/* <ErrorAlert error={reservationsError} /> */}
                {reservationsError && (
                    <div className=" alert alert-danger m-2">Error: {reservationsError.message}</div>
                )}
                <form id="reservationCard" onSubmit={submitHandler}>
                    <div className="form-row">
                        <div className="col-md">
                            <label className="form-label" htmlFor="first_name">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                required
                                onChange={changeHandler}
                                value={formData.first_name}
                            />
                        </div>
                        <div className="col-md">
                            <label className="form-label" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                required
                                onChange={changeHandler}
                                value={formData.last_name}
                            />
                        </div>
                        <div className="col-md">
                            <label className="form-label" htmlFor="mobile_number">
                                Mobile Number
                            </label>
                            <input
                                id="mobile_number"
                                name="mobile_number"
                                type="tel"
                                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                className="form-control"
                                placeholder="xxx-xxx-xxxx"
                                required
                                onChange={changeHandler}
                                value={formData.mobile_number}
                            />
                        </div>
                    </div>
                    <div className="form-row mt-3 mb-3">
                        <div className="col-sm">
                            <label className="form-label" htmlFor="reservation_date">
                                Date
                            </label>
                            <input
                                id="reservation_date"
                                name="reservation_date"
                                type="date"
                                className="form-control"
                                placeholder="mm/dd/yyyy"
                                required
                                onChange={changeHandler}
                                value={formData.reservation_date}
                            />
                        </div>
                        <div className="col-sm">
                            <label className="form-label" htmlFor="reservation_time">
                                Time
                            </label>
                            <input
                                id="reservation_time"
                                name="reservation_time"
                                type="time"
                                className="form-control"
                                required
                                onChange={changeHandler}
                                value={formData.reservation_time}
                            />
                        </div>
                        <div className="col-sm">
                            <label className="form-label" htmlFor="people">
                                Party Size
                            </label>
                            <input
                                id="people"
                                name="people"
                                type="number"
                                className="form-control"
                                placeholder="Party size"
                                required
                                onChange={changeHandler}
                                value={formData.people}
                                min="1"
                            />
                        </div>
                        <button className="btn btn-secondary mr-2" onClick={history.goBack}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </>
        </>

    )
};