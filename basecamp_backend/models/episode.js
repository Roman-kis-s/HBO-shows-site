const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    episodeName: String,
    episodeNumber: String,
    relatedShow: {
        type: mongoose.Schema.Types.String,
        ref: 'Show'
    },
    relatedSeason: {
        type: mongoose.Schema.Types.String,
        ref: 'Season'
    },
    longDescription: String,
    shortDescription: String,
    featuredImage: String,
    dateOfPublish: {
        type: Date,
        default: Date.now
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    },
    videoFragment: String,
    userRating: String
});

const Episode = mongoose.model("Episode", episodeSchema);
module.exports = Episode;