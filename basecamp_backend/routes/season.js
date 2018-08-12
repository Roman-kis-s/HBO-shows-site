const express = require('express');
const router = express.Router({mergeParams: true});
const {transformShowTitle} = require('../middleware/show');
const {transformSeasonNumber, addRelatedShow} = require('../middleware/season');

const {createSeason, readSeason, updateSeason, deleteSeason, showAllSeasons} = require('../controllers/season');

router.get('/', transformShowTitle, showAllSeasons);
router.post('/', transformShowTitle, addRelatedShow, createSeason);

router
    .route('/:season')
    .get(transformShowTitle, transformSeasonNumber, readSeason)
    .put(transformShowTitle, transformSeasonNumber, updateSeason)
    .delete(transformShowTitle, transformSeasonNumber, deleteSeason);

module.exports = router;