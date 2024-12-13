const express = require('express');
const {handleNewShortUrl, handleAnalytic} = require('../controller/urlController');
const restrictToLoggedInUserOnly = require('../auth/auth');

const router = express.Router();


router.post('/',handleNewShortUrl);

router.get('/analytics/:shortId',handleAnalytic)


module.exports = router;