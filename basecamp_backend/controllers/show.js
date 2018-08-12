const db = require('../models');

exports.createShow = async function (req, res, next) {
    try {
        const show = await db.Show.create(req.body);
        return res.status(200).json(show);
    } catch (err) {
        return next(err);
    }
};

exports.readShow = async function (req, res, next) {
    try {
        const show = await db.Show.findOne({title: req.params.show});
        return res.status(200).json(show);
    } catch (err) {
        return next(err);
    }
};

exports.updateShow = async function (req, res, next) {
    try {
        const show = await db.Show.update({title: req.params.show}, {$set: req.body, lastModifiedDate: new Date()});
        return res.status(200).json(show);
    } catch (err) {
        return next(err);
    }
};

exports.deleteShow = async function (req, res, next) {
    try {
        const show = await db.Show.findOneAndDelete({title: req.params.show});
        return res.status(200).json(show);
    } catch (err) {
        return next(err);
    }
};

exports.showAllShows = async function (req, res, next) {
    try {
        const shows = await db.Show.find();
        return res.status(200).json(shows);
    } catch (err) {
        return next(err);
    }
};

exports.priorityShow = async function(req, res, next) {
    try {
        const show = await db.Show.findOne({'priority': 'yes'});
        return res.status(200).json(show);
    } catch (err) {
        return next(err);
    }
};