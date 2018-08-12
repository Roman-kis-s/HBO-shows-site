const db = require('../models');

//create season in db and save reference in show
exports.createSeason = async function (req, res, next) {
    try {
        const season = await db.Season.create(req.body);
        let foundShow = await db.Show.find({title: req.params.show});
        foundShow[0].seasons.push(season._id);
        await foundShow[0].save();
        return res.status(200).json(season);
    } catch (err) {
        return next(err);
    }
};

exports.readSeason = async function (req, res, next) {
    try {
        const season = await db.Season.findOne({relatedShow: req.params.show, seasonNumber: req.params.season});
        return res.status(200).json(season);
    } catch (err) {
        return next(err);
    }
};

exports.updateSeason = async function (req, res, next) {
    try {
        const season = await db.Season.update({
            relatedShow: req.params.show,
            seasonNumber: req.params.season
        }, {$set: req.body, lastModifiedDate: new Date()});
        return res.status(200).json(season);
    } catch (err) {
        return next(err);
    }
};

//Delete season and remove reference from show
exports.deleteSeason = async function (req, res, next) {
    try {
        const season = await db.Season.findOneAndDelete({relatedShow: req.params.show, seasonNumber: req.params.season});
        const foundShow = await db.Show.findOne({title: req.params.show});
        foundShow.seasons = foundShow.seasons.filter(item => item.toString() !== season._id.toString());
        await foundShow.save();
        return res.status(200).json(season);
    } catch (err) {
        return next(err);
    }
};


exports.showAllSeasons = async function (req, res, next) {
    try {
        const seasons = await db.Season.find({relatedShow: req.params.show});
        return res.status(200).json(seasons);
    } catch (err) {
        return next(err);
    }

};