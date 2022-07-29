import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableCard from "./TableCard";
import { createTable } from "../utils/api";

export default function CreateTable() {
    const history = useHistory();

    const initialForm = {
        table_name: "",
        capacity: "",
    };

    const [formData, setFormData] = useState({ ...initialForm });
    const [tableError, setError] = useState(null);

    const changeHandler = ({ target }) => {
        let value = target.value;
        if (target.name === "capacity") {
            value = Number(value);
        }
        setFormData({
            ...formData,
            [target.name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function addTable() {
            try {
                await createTable( formData );
                history.push(`/dashboard`);
            } catch (error) {
                setError(error);
            }
        }
        addTable();
    };

    return (
        <div>
            <h1>Create Table</h1>
            <ErrorAlert error={tableError} />
            <TableCard handleSubmit={handleSubmit} changeHandler={changeHandler} formData={formData} />
        </div>
    );
}