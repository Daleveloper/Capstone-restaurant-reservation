import React, { useEffect, useState } from "react";
import { 
  listReservations, 
  listTables,
  finishReservation,
  cancelReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import { useHistory, Link } from "react-router-dom";
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

  const todaysDate = today();
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
    <>
      <div className="padded col-lg-7 col-md-5 col-sm-12 col-xs-6  align-self-start m-3 card-main">
        <div className="text-center">
          <div>
            <div className="row p-0 justify-content-center">
              <div className="col-auto p-1">
                <h2>Reservations</h2>
              </div>
              <div className="col-auto plus-button p-1">
                <Link className="nav-link " to="/reservations/new">
                  <span className="oi oi-plus" />
                  &nbsp;
                </Link>
              </div>
            </div>

            <h6 className="my-2">
            Reservations:{date ? date : todaysDate}
            </h6>
            <div className="mb-3">
              <button className="btn btn-secondary m-1" onClick={handlePrevious}>
                Previous Day
              </button>
              <button className="btn btn-secondary m-1" onClick={handleToday}>
                Today
              </button>
              <button className="btn btn-secondary m-1" onClick={handleNext}>
                Next Day
              </button>
            </div>
            <div className="text-left">
              <ReservationList reservations={reservations} loadDashboard={loadDashboard} cancelHandler={cancelHandler} />
              <ErrorAlert error={reservationsError} />
            </div>
          </div>
        </div>
      </div>
      <div className="padded col-lg-3 col-md-5 col-sm-12 col-xs-6 align-self-start m-3 card-main">
        <div className="text-center">
          <div className="row justify-content-center">
            <div className="col-auto p-1">
              <h2>Tables</h2>
            </div>
            <div className="col-auto plus-button p-1">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-plus" />
                &nbsp;
              </Link>
            </div>
          </div>
          <ListTables tables={tables} finishHandler={finishHandler} />
          <ErrorAlert error={tablesError} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
