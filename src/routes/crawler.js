// Router for crawler-related endpoints
const express = require('express');
const router = express.Router();
const crawlerController = require('../crawler/controller');

router.get('/run', (req, res) => crawlerController.runCrawl(req, res));

module.exports = router;
