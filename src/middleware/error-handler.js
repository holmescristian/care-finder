exports.validationErrors = (err, req, res, next) => {
    if (!err.errors) {
        return next(err)
    }

    if (err.code && err.code === 11000) {
        err.status = 400
        err.message = err.errmsg
        return next(err)
    }

    res.status(400).json({
        status: 400,
        error: err.errors,
        data: {}
    })
};

exports.catchErrors = (action) => {
    return (req, res, next) => {
        action(req, res).catch(next)
    }
};

exports.invalidRoute = (req, res, next) => {
    const err = new Error('Invalid route: ' + req.method + ': ' + req.route)
    err.status = 404
    next(err)
};
