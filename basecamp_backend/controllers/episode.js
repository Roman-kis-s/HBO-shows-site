const db = require('../models');

exports.createEpisode = async function (req, res, next) {
    try {
        const episode = await db.Episode.create(req.body);
        let foundSeason = await db.Season.find({seasonNumber: req.params.season});
        foundSeason[0].episodes.push(episode._id); //create reference between seasons and episodes
        await foundSeason[0].save();
        return res.status(200).json(episode);
    } catch (err) {
        return next(err);
    }
};

exports.readEpisode = async function (req, res, next) {
    try {
        const episode = await db.Episode.findOne({
            relatedShow: req.params.show,
            relatedSeason: req.params.season,
            episodeName: req.params.episode.name,
            episodeNumber: req.params.episode.number
        });
        return res.status(200).json(episode);
    } catch (err) {
        return next(err);
    }
};

exports.updateEpisode = async function (req, res, next) {
    try {
        const episode = await db.Episode.update({
                relatedShow: req.params.show,
                relatedSeason: req.params.season,
                episodeName: req.params.episode.name,
                episodeNumber: req.params.episode.number
            },
            {$set: req.body, lastModifiedDate: new Date()}); //update only passed data and date
        return res.status(200).json(episode);
    } catch (err) {
        return next(err);
    }
};

//Delete episode and its reference in season
exports.deleteEpisode = async function (req, res, next) {
    try {
        const episode = await db.Episode.findOneAndDelete({
            relatedShow: req.params.show,
            relatedSeason: req.params.season,
            episodeName: req.params.episode.name,
            episodeNumber: req.params.episode.number
        });
        const foundSeason = await db.Season.findOne({relatedShow: req.params.show, seasonNumber: req.params.season});
        foundSeason.episodes = foundSeason.episodes.filter(item => item.toString() !== episode._id.toString());
        await foundSeason.save();
        return res.status(200).json(episode);
    } catch (err) {
        return next(err);
    }
};


exports.showAllEpisodes = async function (req, res, next) {
    try {
        const episodes = await db.Episode.find({relatedShow: req.params.show, relatedSeason: req.params.season});
        return res.status(200).json(episodes);
    } catch (err) {
        return next(err);
    }
};