const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");

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

async function list(req, res) {
  const data = await moviesService.list(req.query.is_showing);
  res.json({
    data: [],
  });
}

async function create(req, res) {
  await service
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}


module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, create],
  list,
};
