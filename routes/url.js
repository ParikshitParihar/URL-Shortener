const express = require("express");
const {handlegeneratenewshorturl, handlegetanalytics} = require("../controller/url");
const router = express.Router();

router.post("/",handlegeneratenewshorturl);

router.get('/analytics/:shortId', handlegetanalytics);

module.exports = router;