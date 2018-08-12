//transform show title from 'game-of-thrones' to 'Game of thrones'
// and put it in req.params.show property
exports.transformShowTitle = function (req, res, next) {
    try {
        let showTitle = req.params.show.split('-').join(" "); // transform title from 'game-of-thrones' to 'game of thrones'
        req.params.show = showTitle[0].toUpperCase() + showTitle.slice(1).toLowerCase(); // Uppercase first letter of title
        next();
    } catch (err) {
        return next(err);
    }
};