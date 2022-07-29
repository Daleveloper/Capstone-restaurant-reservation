import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservations } from "../utils/api";
import { useHistory } from "react-router-dom";
import ReservationCard from "./ReservationCard";

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
        event.preventDefault();
        async function addReservation() {
            return createReservations(formData)
                .then((test) => {
                    history.push(`/dashboard?date=${formData.reservation_date}`);
                })
                .catch((error) => {
                    setReservationsError(error);
                })
        }
        addReservation();
    };

    return (
        <>
            <h1>Create Reservation</h1>
            <ErrorAlert error={reservationsError} />
            <ReservationCard submitHandler={submitHandler}changeHandler={changeHandler} formData={formData} />
        </>

    )
};