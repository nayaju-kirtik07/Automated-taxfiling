const mongoose = require("mongoose");

const PanSchema = mongoose.Schema(
  {
    registered_name: {
      type: String,
      require: true,
    },
    registered_address: {
      type: String,
      require: true,
    },
    pan_no: {
      type: Number,
      require: true,
    },
    entity_type: {
      type: String, // Type of entity, e.g., 'Individual', 'Company'
    },
    incomeSource: {
      type: String,
      require: true,
    },
    incomeAmount: {
      type: Number,
      require: true,
    },
    expenseSource: {
      type: String,
      require: true,
    },
    expenseAmount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Pan = mongoose.model("Pan", PanSchema);

module.exports = Pan;
