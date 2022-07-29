import React from "react";
import {useHistory} from "react-router-dom";

export default function ReservationsCard({ submitHandler,  changeHandler, formData }) {
const history = useHistory();

    return (
        <>
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
                        className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}