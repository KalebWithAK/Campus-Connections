module.exports.catch404 = (req, res, next) => {
    const error = { message: 'Page not found'}

    if (res.status(404)) {
        return res.render('pages/error', { error })
    }
   
    next()
}