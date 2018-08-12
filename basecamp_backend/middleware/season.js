//put relatedShow property in req.body
exports.addRelatedShow = function (req, res, next) {
    try {
        req.body.relatedShow = req.params.show;
        next();
    } catch (err) {
        return next(err);
    }
};

//transform season title from '5-season' to '5'
// and put it in req.params.season property
exports.transformSeasonNumber = function (req, res, next) {
    try {
        const splitedSeasonTitle = req.params.season.split('-');
        req.params.season = splitedSeasonTitle[0];
        next();
    } catch (err) {
        return next(err);
    }
};


