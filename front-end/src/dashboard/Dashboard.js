import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ReservationsTable from "./ReservationsTable";
import TableRow from "./TableRow";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  tables,
}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const tablesJSX = () => {
    return tables.map((table) => (
      <TableRow
        key={table.table_id}
        table={table}
      />
    ));
  };





  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrevious() {
    const prevDate = previous(date);
    history.push(`/dashboard?date=${prevDate}`);
  }

  function handleNext() {
    const nextDate = next(date);
    history.push(`dashboard?date=${nextDate}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>

      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
        <button onClick={handlePrevious} type="button" className="btn btn-info">Previous</button>
        <button onClick={handleToday} type="button" className="btn btn-primary">Today</button>
        <button onClick={handleNext} type="button" className="btn btn-success">Next</button>
      </div>



      <ErrorAlert error={reservationsError} />
      <ReservationsTable reservations={reservations} loadDashboard={loadDashboard} />
      <div>
        <table className="table table-hover m-1 text-nowrap mb-4">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">Table ID</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col">Reservation ID</th>
              <th scope="col">Finish</th>
            </tr>
          </thead>
          <tbody>{tablesJSX()}</tbody>
        </table>
      </div>

    </main>
  );
}

export default Dashboard;
