const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(" connectDB function called");
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongo db connnected", connection.connection.host);
  } catch (err) {
    console.log("error connecting to mongodb", err);
    process.exit();
  }
};

module.exports = connectDB;
