const express = require("express");
require("dotenv").config();
const router = require("./routes/url");
const URL = require("./model/shortUrl");
const connectToMongoDB = require("./connectDB");
const port = process.env.PORT;

console.log(port);
const app = express();
app.use(express.json());

app.use("/url", router);


app.get("/:shortId", async (req, res) => {
  let shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
      $push: {
        visitHistory: {
            timeStamp : Date.now()
        }
      },
    }
  );
  console.log(entry)

  res.redirect(entry.redirectUrl)
});

// connecting to mongodb cloud
connectToMongoDB(process.env.uri);

// listening to the server
app.listen(port || 8000, () => {
  console.log(`Server is running at port ${port}`);
});
