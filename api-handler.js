const { Router } = require('./router')

const router = new Router()

router.get('register', function (req, res) {
    res.end('Hello world!')
})

function apiHandler(req, res, apiSuffix) {
    return router.exectute(apiSuffix, req, res)
}

module.exports = apiHandler