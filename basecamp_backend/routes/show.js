const express = require('express');
const router = express.Router();
const {transformShowTitle} = require('../middleware/show');
const {createShow, readShow, updateShow, deleteShow, showAllShows} = require('../controllers/show');
const {loginRequired, ensureCorrectUser} = require('../middleware/auth');

router.get('/', showAllShows);
router.post('/', loginRequired, ensureCorrectUser, createShow);

router
    .route('/:show')
    .get(transformShowTitle, readShow)
    .put(loginRequired, ensureCorrectUser, transformShowTitle, updateShow)
    .delete(loginRequired, ensureCorrectUser, deleteShow);

module.exports = router;
