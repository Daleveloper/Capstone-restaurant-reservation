const knex = require("../db/connection");

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0]);
}

function list() {
    return knex("reservations").select("*");
}

function listByDate(reservation_date) {
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time");
}


module.exports = {
    create,
    list,
    listByDate,
}