const CompanyDetail = require("../models/companyDetail");
const mongoose = require("mongoose");

exports.addCompanyDetails = async (req, res) => {
  try {
    const companyDetail = await new CompanyDetail({
      companyName: req.body.companyName,
      companyRegistration_no: req.body.companyRegistration_no,
      companyAddress: req.body.companyAddress,
      companyPostCode: req.body.companyPostCode,
      companyEmail: req.body.companyEmail,
      companyType: req.body.companyType,
      company_id: req.body.company_id,
    }).save();

    res.status(201).send(companyDetail);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.updateCompanyDetails = async (req, res) => {
  try {
    const companyDetail = await CompanyDetail.findByIdAndpdate(
      req.params.id,
      {
        companyName: req.body.companyName,
        companyRegistration_no: req.body.companyRegistration_no,
        companyAddress: req.body.companyAddress,
        companyPostCode: req.body.companyPostCode,
        companyEmail: req.body.companyEmail,
        companyType: req.body.companyType,
        company_id: req.body.company_id,
      },
      {
        new: true,
      }
    );

    if (!companyDetail) {
      return res.status(404).send("Invalid Inputs");
    }

    res.status(201).send(companyDetail);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.getCompanyDetails = async (req, res) => {
  try {
    const companyDetails = await CompanyDetail.find();

    if (companyDetails.length === 0) {
      return res.status(404).send("No company details found");
    }

    res.status(200).json(companyDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.getCompanyDetailsById = async (req, res) => {
  try {
    const companyDetail = await CompanyDetail.findById(req.params.id)
    console.log(companyDetail)

    if (!companyDetail) {
      return res.status(404).send("Invalid Inputs");
    }

    res.status(201).send(companyDetail);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, success: false });
  }
};

exports.getCompanyDetailsByName = async (req, res) => {
  try {
    const companyDetail = await CompanyDetail.findById(req.params.id).populate(
      "company_id"
    );

    if (!companyDetail) {
      return res.status(404).send("Invalid Inputs");
    }

    res.status(201).send(companyDetail);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, success: false });
  }
};
exports.deleteCompanyDetails = async (req, res) => {
  try {
    const companyDetail = await CompanyDetail.findByIdAndDelete(req.params.id);

    if (!companyDetail) {
      return res.status(404).send("Not Found");
    }

    res.status(201).send(companyDetail);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};


