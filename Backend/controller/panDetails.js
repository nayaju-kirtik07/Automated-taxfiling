const Pan = require("../models/PanDetails");

exports.addPanNo = async (req, res) => {
  try {
    const {
      registered_name,
      pan_no,
      entity_type,
      incomeSource,
      incomeAmount,
      expenseSource,
      expenseAmount,
    } = req.body;
    
    const PanDetails = await new Pan({
      registered_name,
      pan_no,
      entity_type,
      incomeSource,
      incomeAmount,
      expenseSource,
      expenseAmount,
    }).save();

    res.status(201).send(PanDetails);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

exports.getPanNo = async (req, res) => {
  try {
    const panDetails = await Pan.find();

    if (!panDetails) {
      return res.status(404).send("pan not found");
    }

    res.status(201).send(panDetails);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};
