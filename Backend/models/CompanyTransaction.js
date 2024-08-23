const mongoose = require('mongoose');
const { Schema } = mongoose;

const companyTransactionSchema = new Schema({
  company_id: {
    type: String,
    required: true,
    ref: 'CompanyDetails', // Reference to the CompanyDetails collection
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
    enum: ['Credit', 'Debit'], // Only allow 'Credit' or 'Debit'
  },
  transactionStatus: {
    type: String,
    required: true,
    enum: ['Completed', 'Pending', 'Failed'], // Only allow specific statuses
  },
  taxRate: {
    type: Number,
    required: true,
  },
  taxAmount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Paid', 'Unpaid', 'Overdue'], // Only allow specific statuses
  },
  totalTaxToPay: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const CompanyTransaction = mongoose.model('CompanyTransaction', companyTransactionSchema);

module.exports = CompanyTransaction;
