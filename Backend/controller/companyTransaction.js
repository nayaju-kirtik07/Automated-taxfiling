const ComapanyTransaction = require("../models/companyTransaction");

exports.getCompanyTransaction = async (req, res) => {
  const companyTransaction = await ComapanyTransaction.find();

  if (!companyTransaction) {
    return res.status(404).send("Not Found");
  }

  res.status(201).send(companyTransaction);
};

exports.getTransactions = async (req, res) => {
  const { companyId } = req.params;

  try {
    const companyTransaction = await ComapanyTransaction.find({ company_id: companyId });
    console.log(companyTransaction)
    res.status(201).json(companyTransaction);

  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
};

exports.addCompanyTransaction = async (req, res) => {
  try {
    const { companyName, transactions, financialYear } = req.body;

    // Create a new CompanyTransaction document
    const newTransaction = new ComapanyTransaction({
      companyName,
      transactions,
      financialYear,
    });

    // Save the document to the database
    const savedTransaction = await newTransaction.save();

    // Return the saved document
    res.status(201).json(savedTransaction);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
  }
};


exports.payTax = async (req, res) => {
  const { companyId } = req.body;
  try {
    // Find all unpaid transactions for the given company
    const unpaidTransactions = await ComapanyTransaction.find({ company_id: companyId, paymentStatus: 'Unpaid' });

    if (unpaidTransactions.length === 0) {
      return res.status(400).json({ message: 'No unpaid taxes found for this company.' });
    }

    // Mark all unpaid transactions as paid
    const result = await ComapanyTransaction.updateMany(
      { company_id: companyId, paymentStatus: 'Unpaid' },
      { $set: { paymentStatus: 'Paid' } }
    );

    return res.status(200).json({ message: 'Unpaid taxes successfully paid.', updatedCount: result.nModified });
  } catch (error) {
    console.error('Error paying unpaid taxes:', error);
    return res.status(500).json({ message: 'An error occurred while processing the payment.' });
  }
}