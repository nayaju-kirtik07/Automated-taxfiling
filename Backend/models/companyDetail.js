const mongoose = require("mongoose");

const companyDetailSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyRegistration_no: {
      type: Number,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    companyPostCode: {
      type: Number,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companytransactions",
    },
  },
  { timestamps: true }
);

const CompanyDetail = mongoose.model("CompanyDetail", companyDetailSchema);

module.exports = CompanyDetail;
