const express = require("express");

const urlRoute = require("./routes/url")

const { connectMongoDB } = require("./connection");

const URL = require("./models/url");

const app = express();
const PORT = 8001;


connectMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB Connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        }, 
        {
            $push: {
                visitHistory: {
                    timestamp:Date.now(),
                },
            },
        },
        { new: true }
    );
    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));