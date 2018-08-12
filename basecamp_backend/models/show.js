const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    subtitle: String,
    dateOfStart: String,
    posterImage: String,
    longDescription: String,
    shortDescription: String,
    priority: String,
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
    seasons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Season'
        }
    ]
});

const Show = mongoose.model("Show", showSchema);
module.exports = Show;