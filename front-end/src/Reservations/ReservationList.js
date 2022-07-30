import React from "react";

export default function ReversationList({ reservations, cancelHandler }) {
    const path = window.location.pathname;

    return (
        <>

            <div className="scroll-container" >
                <div>
                    {reservations.length !== 0 ? (
                        reservations.map((reservation, index) => (

                            <div className="card text-white m-3 my-4 row-md-2 border-0" key={index}>
                                <h5 className="card-header">Reservation ID: {reservation.reservation_id}</h5>
                                <div className="card-body p-4">
                                    <p className="card-text">
                                        Name: {reservation.first_name} {reservation.last_name}
                                    </p>
                                    <p className="card-text">
                                        People: {reservation.people}
                                    </p>
                                    <p className="card-text">
                                        Mobile Number: {reservation.mobile_number}
                                    </p>
                                    <p className="card-text">
                                        Date/Time: {reservation.reservation_date.slice(0, 10)} / {reservation.reservation_time.slice(0, 10)}
                                    </p>
                                    <p className="card-text-status" data-reservation-id-status={reservation.reservation_id}>
                                        Status: {reservation.status}
                                    </p>
                                </div>

                                <div className=" dark-bg container px-1 pb-3 pe-3">
                                    <div className="row dark-bg pt-3 mx-2 justify-content-between">
                                        <div className="col p-0">
                                            {reservation.status !== "seated" &&
                                                reservation.status !== "finished" &&
                                                reservation.status !== "cancelled" && (
                                                    <a
                                                        style={{ width: 70 }}
                                                        className="btn btn-success"
                                                        href={`/reservations/${reservation.reservation_id}/seat`}
                                                        role="button"
                                                    >
                                                        Seat
                                                    </a>
                                                )}
                                        </div>
                                        <div className="col-auto p-0">
                                            {reservation.status === "booked" && (
                                                <a
                                                    style={{ width: 70 }}
                                                    className="btn btn-secondary mx-2"
                                                    href={`/reservations/${reservation.reservation_id}/edit`}
                                                    role="button"
                                                >
                                                    Edit
                                                </a>
                                            )}
                                            {reservation.status === "booked" && (
                                                <button
                                                    type="button"
                                                    // style={{ width: 70 }}
                                                    className="btn btn-danger"
                                                    data-reservation-id-cancel={reservation.reservation_id}
                                                    onClick={() => {
                                                        window.confirm(
                                                            "Do you want to cancel this reservation? This cannot be undone."
                                                        ) && cancelHandler(reservation.reservation_id);
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                        <div className="col-auto p-0">

                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <div>
                            <p>No reservations found</p>
                        </div>
                    )}
                </div>
            </div>
            {/* </table> */}
        </>
    );
}