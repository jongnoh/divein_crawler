// Main router for API endpoints
const express = require('express');
const router = express.Router();

const crawlerRouter = require('./crawler');

router.use('/crawler', crawlerRouter);

module.exports = router;
