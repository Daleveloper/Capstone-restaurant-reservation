import React from "react";
import { useHistory } from "react-router-dom";

export default function TableCard({ handleSubmit, changeHandler, formData }) {
const history = useHistory();    
    
    return (
        <>
            <form id="tableForm" onSubmit={handleSubmit}>
                <div className="form-row mb-3">
                    <div className="col">
                        <label className="form-label" htmlFor="table_name">
                            Table Name
                        </label>
                        <input
                            id="table_name"
                            name="table_name"
                            type="text"
                            className="form-control"
                            placeholder="Table name"
                            required
                            onChange={changeHandler}
                            value={formData.table_name}
                        />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="capacity">
                            Capacity
                        </label>
                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            className="form-control"
                            placeholder="capacity"
                            required
                            onChange={changeHandler}
                            value={formData.capacity}
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
    );
}