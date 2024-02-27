const mongoose = require("mongoose");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Restapi");
    console.log("Restapi connected successfully!");
  } catch (error) {
    console.log("Restapi failed to connect");
    throw new Error(error);
  }
}

main();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
