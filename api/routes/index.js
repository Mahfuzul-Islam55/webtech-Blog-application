const express = require("express");
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

router.use('/api/services', userRouter);
router.use('/api/services/post', postRouter);

module.exports = router;