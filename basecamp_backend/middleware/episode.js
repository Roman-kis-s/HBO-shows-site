//put relatedSeason property in req.body
exports.addRelatedSeason = function (req, res, next) {
    try {
        req.body.relatedSeason = req.params.season;
        next();
    } catch (err) {
        return next(err);
    }
};

//transform episode title from '1-pilot' to {number : 1, name : pilot}
// and put this object in req.params.episode property
exports.transformEpisodeTitle = function (req, res, next) {
    try {
        const splitedEpisodeTitle = req.params.episode.split('-');
        req.params.episode = {
            number: splitedEpisodeTitle[0],
            name: splitedEpisodeTitle.slice(1).join(' ')[0].toUpperCase() + splitedEpisodeTitle.slice(1).join(' ').slice(1).toLowerCase()
        };
        next();
    } catch (err) {
        return next(err);
    }
};