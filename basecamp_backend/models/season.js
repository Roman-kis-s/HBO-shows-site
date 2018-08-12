const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    seasonName: String,
    seasonNumber: String,
    relatedShow: {
        type: mongoose.Schema.Types.String,
        ref: 'Show'
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
    userRating: String,
    episodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Episode'
        }
    ]
});

const Season = mongoose.model("Season", seasonSchema);
module.exports = Season;