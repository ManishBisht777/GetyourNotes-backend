const mongoose = require("mongoose");

const mongooseURI =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connecttomongo = () => {
  mongoose.connect(mongooseURI, () => {
    console.log("connected succesfully");
  });
};

module.exports = connecttomongo;
