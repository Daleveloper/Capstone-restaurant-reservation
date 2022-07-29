import React, { useEffect, useState } from "react";
import { 
  listReservations, 
  listTables,
  finishReservation,
  cancelReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next,  } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ReservationList from "../Reservations/ReservationList";
import ListTables from "../tables/ListTable";



/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date,}) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();
  
  

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }




  const finishHandler = (table_id) => {
    const abortController = new AbortController();
    async function freeTable() {
      try {
        await finishReservation(table_id, abortController.signal);
      } catch (error) {
        setTablesError(error);
      }
    }
    freeTable().then(loadDashboard);
    return () => abortController.abort();
  };

  const cancelHandler = (reservation_id) => {
    const abortController = new AbortController();
    async function cancel() {
      try {
        await cancelReservation(reservation_id, abortController.signal);
      } catch (error) {
        setReservationsError(error);
      }
    }
    cancel().then(loadDashboard);
    return () => abortController.abort();
  };

  useEffect(loadDashboard, [date]);


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

      <div className="d-md-flex mb-3" role="group" aria-label="Basic mixed styles example">
        <button onClick={handlePrevious} type="button" className="btn btn-info">Previous</button>
        <button onClick={handleToday} type="button" className="btn btn-primary">Today</button>
        <button onClick={handleNext} type="button" className="btn btn-success">Next</button>
      </div>



      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations} loadDashboard={loadDashboard} cancelHandler={cancelHandler} />
      <ErrorAlert error={tablesError} />
      <ListTables tables={tables} finishHandler={finishHandler} />

    </main>
  );
}

export default Dashboard;
