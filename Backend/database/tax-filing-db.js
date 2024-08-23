const mongoose = require("mongoose");

const url = process.env.CONNECTION_STRING;

async function connectToDatabase(cb) {
  try {
    await mongoose.connect(url);

    cb();
    return mongoose.connection;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { connectToDatabase };
