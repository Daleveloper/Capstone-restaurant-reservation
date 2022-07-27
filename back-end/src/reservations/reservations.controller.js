const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties("first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people");

function validDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const valid = new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
  if (valid) {
    return next();
  }
  next({ status: 400, message: "reservation_date must be valid date." });
}

function validTime(req, res, next) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  const valid = time.match(regex);
  if (valid) {
    return next();
  }
  next({ status: 400, message: "reservation_time must be valid time." });
}

function validPeople(req, res, next) {
  const people = req.body.data.people;
  console.log(typeof people);
  if (people < 1 || typeof people !== "number") {
    return next({ status: 400, message: "Valid people property required" });
  }
  return next();
}
function isNotOnTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const date = new Date(`${month} ${day}, ${year}`);
  res.locals.date = date;
  if (date.getDay() === 2) {
    return next({ status: 400, message: "Location is closed on Tuesdays" });
  }
  next();
}

function isInTheFuture(req, res, next) {
  const date = res.locals.date;
  const today = new Date();
  if (date < today) {
    return next({ status: 400, message: "Must be a future date" });
  }
  next();
}

function isWithinOpenHours(req, res, next) {
  const reservation = req.body.data;
  const [hour, minute] = reservation.reservation_time.split(":");
  if (hour < 10 || hour > 21) {
    return next({
      status: 400,
      message: "Reservation must be made within business hours",
    });
  }
  if ((hour < 11 && minute < 30) || (hour > 20 && minute > 30)) {
    return next({
      status: 400,
      message: "Reservation must be made within business hours",
    });
  }
  next();
}

async function validateReservationId(request, response, next) {
  const { reservation_id } = request.params;
  const reservation = await service.read(Number(reservation_id));
  if (!reservation) {
    return next({
      status: 404,
      message: `reservation id ${reservation_id} does not exist`,
    });
  }
  response.locals.reservation = reservation;
  next();
}


async function list(req, res, next) {
  const { date, currentDate } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else if (currentDate) {
    const data = await service.listByDate(currentDate);
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

async function read(request, response) {
  response.status(200).json({ data: response.locals.reservation });
}


async function create(req, res, next) {
  const reservation = req.body.data;
  const { reservation_id } = await service.create(reservation);
  reservation.reservation_id = reservation_id;
  res.status(201).json({ data: reservation });
}


module.exports = {
  create: [hasOnlyValidProperties,
    hasRequiredProperties,
    validDate,
    validTime,
    validPeople,
    isNotOnTuesday,
    isInTheFuture,
    isWithinOpenHours,
    asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(validateReservationId), asyncErrorBoundary(read)],
};
