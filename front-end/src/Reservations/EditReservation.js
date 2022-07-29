import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "./ReservationCard";

export default function EditReservations() {
    let { reservation_id } = useParams();

    const history = useHistory();

    const [formData, setFormData] = useState({});
    const [editError, setEditError] = useState(null);

    useEffect(loadReservation, [reservation_id]);

    function loadReservation() {
        const abortController = new AbortController();
        setEditError(null);
        readReservation({ reservation_id }, abortController.signal)
            .then(setFormData)
            .catch(setEditError);
        return () => abortController.abort();
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();
        async function edit() {
            try {
                await updateReservation( formData , reservation_id);
                history.push(`/dashboard?date=${formData.reservation_date}`);
            } catch (error) {
                setEditError(error);
            }
        }
        edit();
    };
    return (
        <>
            <h1>Edit Reservation</h1>
            <ErrorAlert error={editError} />
            <ReservationCard submitHandler={handleSubmit}changeHandler={changeHandler} formData={formData} />

        </>
    );
}