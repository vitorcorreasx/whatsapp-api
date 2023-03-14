const { DateTime } = require("luxon");

const ActualDate = DateTime.now().setZone("America/New_York").toISO();

module.exports = { ActualDate };
