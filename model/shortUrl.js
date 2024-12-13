const mongoose = require("mongoose");

// schema for the url records
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      uniqued: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    visitHistory: [{ timeStamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url",urlSchema);

module.exports = URL;


