const express = require("express");
require("dotenv").config();
const cors = require('cors');
const router = require("./routes/url");
const URL = require("./model/shortUrl");
const connectToMongoDB = require("./connectDB");
const userRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const restrictToLoggedInUserOnly = require("./auth/auth");
const port = process.env.PORT;

console.log(port);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended : false}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/url",restrictToLoggedInUserOnly, router);

app.use("/user",userRouter)

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
