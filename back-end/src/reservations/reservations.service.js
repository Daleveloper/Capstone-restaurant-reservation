const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0]);
}

function list(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot({ status: "finished" })
        .orderBy("reservation_time");
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first();
}

function listByDate(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .orderBy("reservation_time");
}

function update(reservation) {
    return knex("reservations")
        .where({ reservation_id: reservation.reservation_id })
        .update(reservation, "*");
}

function changeStatus(reservation) {
    return knex("reservations")
        .where({ reservation_id: reservation.reservation_id })
        .update({ status: reservation.status }, "*");
}



module.exports = {
    create,
    listByDate,
    list,
    read,
    update,
    changeStatus,
    
};