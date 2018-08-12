const express = require('express');
const router = express.Router({mergeParams: true});
const {transformShowTitle} = require('../middleware/show');
const {transformSeasonNumber, addRelatedShow} = require('../middleware/season');
const {addRelatedSeason} = require('../middleware/episode');
const {transformEpisodeTitle} = require('../middleware/episode');

const {createEpisode, readEpisode, updateEpisode, deleteEpisode, showAllEpisodes} = require('../controllers/episode');

router.get('/', transformShowTitle, transformSeasonNumber, showAllEpisodes);
router.post('/', transformShowTitle, transformSeasonNumber, addRelatedShow, addRelatedSeason, createEpisode);

router
    .route('/:episode')
    .get(transformShowTitle, transformSeasonNumber, transformEpisodeTitle, readEpisode)
    .put(transformShowTitle, transformSeasonNumber, transformEpisodeTitle, updateEpisode)
    .delete(transformShowTitle, transformSeasonNumber, transformEpisodeTitle, deleteEpisode);

module.exports = router;