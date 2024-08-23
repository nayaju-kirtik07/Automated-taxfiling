const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const CompanyDetail = require('./models/companyDetail');
const CompanyTransaction = require('./models/companyTransaction');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/TaxFiling'; // Replace with your actual MongoDB URI and database name
const exchangeRate = 120; // Example exchange rate: 1 USD = 120 NRS

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

async function seedDatabase() {
    try {
        // Clear existing data
        await CompanyDetail.deleteMany({});
        await CompanyTransaction.deleteMany({});
        console.log('Cleared existing collections');

        // Seed CompanyDetail collection
        const companies = [];

        for (let i = 0; i < 10; i++) { // Creating 10 companies
            const company = new CompanyDetail({
                companyName: faker.company.name(),
                companyRegistration_no: faker.datatype.number({ min: 100000, max: 999999 }), // Generating a 6-digit number
                companyAddress: faker.address.streetAddress(),
                companyPostCode: faker.datatype.number({ min: 10000, max: 99999 }), // Generating a 5-digit postcode
                companyEmail: faker.internet.email(),
                companyType: faker.company.bs(),
            });

            await company.save(); // Save each company and get the _id
            companies.push(company);
        }

        console.log('Seeded company details collection');

        // Seed CompanyTransaction collection
        for (const company of companies) {
            const transactions = [];
            let totalTaxToPay = 0;

            const numberOfTransactions = faker.datatype.number({ min: 1, max: 5 }); // 1 to 5 transactions per company

            for (let j = 0; j < numberOfTransactions; j++) {
                const transactionAmountUSD = parseFloat(faker.finance.amount());
                const transactionAmountNRS = transactionAmountUSD * exchangeRate; // Convert USD to NRS
                const taxRate = parseFloat((faker.datatype.number({ min: 5, max: 20 }) / 100).toFixed(2)); // Random tax rate between 5% and 20%
                const taxAmount = parseFloat((transactionAmountNRS * taxRate).toFixed(2));
                const totalAmount = parseFloat((transactionAmountNRS + taxAmount).toFixed(2));

                totalTaxToPay += taxAmount;

                const transaction = new CompanyTransaction({
                    company_id: company._id, // Linking to CompanyDetail's _id
                    transactionDate: faker.date.past(),
                    transactionAmount: transactionAmountNRS.toFixed(2), // Store the amount in NRS
                    transactionType: faker.helpers.arrayElement(['Credit', 'Debit']),
                    transactionStatus: faker.helpers.arrayElement(['Completed', 'Pending', 'Failed']),
                    taxRate: taxRate,
                    taxAmount: taxAmount,
                    totalAmount: totalAmount,
                    paymentStatus: faker.helpers.arrayElement(['Paid', 'Unpaid', 'Overdue']),
                    totalTaxToPay: totalTaxToPay,
                });

                transactions.push(transaction);
            }

            await CompanyTransaction.insertMany(transactions);
        }

        console.log('Seeded company transaction collection');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
        console.log('Connection to MongoDB closed');
    }
}