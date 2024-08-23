const mongoose = require("mongoose");

const IndividualSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    pan_no: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pan",
    },
  },
  {
    timeStamps: true,
  }
);

const Individual = mongoose.model("Individual", IndividualSchema);

module.exports = Individual;
