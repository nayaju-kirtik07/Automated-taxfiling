const Individual = require("../models/individualDetails");

exports.addIndividualDetails = async (req, res) => {
  try {
    const { name, pan_no } = req.body;
    const individualDetail = await new Individual({
      name,
      pan_no,
    }).save();

    res.status(201).send(individualDetail);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.updateIndividualDetails = async (req, res) => {
  try {
    const { name, pan_no } = req.body;
    const individualDetail = await Individual.findByIdAndUpdate(
      req.params.id,
      {
        name,
        pan_no,
      },
      {
        new: true,
      }
    );

    res.status(201).send(individualDetail);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.getIndividualDetails = async (req, res) => {
  try {
    const individualDetail = await Individual.find().populate("pan_no");

    if (!individualDetail) {
      return res.status(404).send("not found");
    }

    res.status(201).send(individualDetail);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.deleteIndividualDetails = async (req, res) => {
  try {
    const individualDetail = await Individual.findByIdAndDelete(
      req.params.id
    );

    if (!individualDetail) {
      return res.status(404).send("Invalid Inputs");
    }

    res.status(201).send(individualDetail);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};
