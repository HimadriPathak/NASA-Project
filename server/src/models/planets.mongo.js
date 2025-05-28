const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
  //   koiDisposition: {
  //     type: String,
  //     required: true,
  //   },
  //   koiInsol: {
  //     type: Number,
  //     required: true,
  //     min: 0.36,
  //     max: 1.11,
  //   },
  //   koiPrad: {
  //     type: Number,
  //     required: true,
  //     max: 1.6,
  //   },
});

// Connects planetSchema to the "planets" collection in MongoDB
module.exports = mongoose.model("Planet", planetSchema);
